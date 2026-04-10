import { useState, useEffect } from 'react';
import api from '../api';
import { Upload, X, Trash2, CheckCircle, AlertCircle, Plus, Loader2, Image as ImageIcon } from 'lucide-react';

const Posters = () => {
  const [posters, setPosters] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosters = async () => {
    try {
      const { data } = await api.get('/posters');
      setPosters(data);
    } catch (err) {
      setError('Failed to fetch posters');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      await api.post('/posters', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPosters();
      setFile(null);
      setTitle('');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const deletePoster = async (id) => {
    if (!window.confirm('Delete this poster?')) return;
    try {
      await api.delete(`/posters/${id}`);
      fetchPosters();
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (fetchLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Hero Sliders</h2>
          <p className="mt-2 text-slate-500 font-medium">Manage the auto-scrolling posters for your homepage.</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm shadow-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/10">
            <Upload className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post New Slide</h2>
        </div>
        
        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-600 ring-1 ring-inset ring-orange-200 animate-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Poster Title (Optional)</label>
            <input
              type="text"
              className="w-full rounded-2xl border-0 bg-slate-50 py-4 px-6 text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
              placeholder="e.g. Summer Collection 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Image Content</label>
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 py-4 px-6 text-sm font-bold text-slate-900 ring-1 ring-inset ring-slate-100 transition-all hover:bg-slate-100/50 hover:ring-slate-200"
              >
                <span className="truncate max-w-[200px]">{file ? file.name : 'Select JPG, PNG or WebP'}</span>
                <Plus className="h-5 w-5 text-orange-500" />
              </label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading || !file}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition-all hover:bg-black shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-orange-500/20 active:translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 translate-y-[-2px]"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Upload className="h-4 w-4" /><span>UPLOAD & PUBLISH</span></>}
            </button>
          </div>
        </form>
      </div>

      {/* Posters Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Library</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-500/20">Live Sync</span>
        </div>
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posters.map((poster) => (
            <div key={poster._id} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
                <img src={poster.imageUrl} alt={poster.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-sm font-black text-white drop-shadow-md">{poster.title || 'Untitled Poster'}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active</span>
                </div>
                <button
                  onClick={() => deletePoster(poster._id)}
                  className="rounded-xl p-2.5 text-slate-300 hover:bg-orange-50 hover:text-orange-500 transition-all active:scale-90"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {posters.length === 0 && (
            <div className="col-span-full py-20 text-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30">
               <ImageIcon className="h-12 w-12 text-slate-200 mx-auto mb-4" />
               <p className="text-slate-400 font-bold">No posters found. Add your first slider above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posters;
