import { useState, useEffect } from 'react';
import api from '../api';
import { Grid2X2, Plus, Trash2, Loader2, AlertCircle, Upload, Type, FileText, ChevronRight } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
      await api.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchCategories();
      setShowForm(false);
      setName('');
      setDescription('');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (fetchLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Gridox Categories</h2>
          <p className="mt-2 text-slate-500 font-medium">Manage your navigation grid with custom names and covers.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-black text-white transition-all shadow-xl active:translate-y-0.5 ${showForm ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-slate-950 hover:bg-black shadow-slate-900/20 translate-y-[-2px]'}`}
        >
          {showForm ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{showForm ? 'CANCEL' : 'NEW CATEGORY'}</span>
        </button>
      </div>

      {showForm && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm shadow-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><Type className="h-3 w-3" /> Category Label</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Formal Wear"
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><FileText className="h-3 w-3" /> Grid Story</label>
                <textarea
                  required
                  rows="3"
                  className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short, catchy text to appear on the grid."
                />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><Upload className="h-3 w-3" /> Grid Visual</label>
                <div className="relative">
                   <input
                    type="file"
                    className="hidden"
                    id="cat-upload"
                    required
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="cat-upload"
                    className="flex cursor-pointer items-center justify-between rounded-xl sm:rounded-2xl bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm font-bold text-slate-900 ring-1 ring-inset ring-slate-100 transition-all hover:bg-slate-100/50 min-h-[48px] sm:min-h-[56px] hover:ring-slate-200"
                  >
                    <span className="truncate max-w-[150px] sm:max-w-[200px]">{file ? file.name : 'Select grid cover image'}</span>
                    <Plus className="h-5 w-5 text-orange-500" />
                  </label>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={loading || !file}
                  className="flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-emerald-600 px-6 py-3.5 sm:py-4.5 text-xs sm:text-sm font-black text-white transition-all hover:bg-emerald-500 shadow-xl shadow-emerald-500/20 translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-0"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>PUBLISH CATEGORY</span>}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 rounded-3xl bg-orange-50 p-5 text-sm font-bold text-orange-600 ring-1 ring-inset ring-orange-200">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="group relative h-[400px] overflow-hidden rounded-[32px] bg-white shadow-sm shadow-slate-100 ring-1 ring-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2">
            <img src={category.imageUrl} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-8 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2 block">Premium Collection</span>
                <h4 className="text-3xl font-black text-white mb-2 tracking-tighter">{category.name}</h4>
                <p className="text-sm text-slate-300 line-clamp-2 mb-6 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {category.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-orange-500 transition-colors">
                        <span>SYNC DETAILS</span>
                        <ChevronRight className="h-3 w-3" />
                    </button>
                    <button 
                    onClick={() => deleteCategory(category._id)}
                    className="rounded-xl p-2.5 text-white/50 hover:bg-orange-500/20 hover:text-orange-500 transition-colors active:scale-90"
                    >
                    <Trash2 className="h-5 w-5" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full py-24 text-center rounded-[32px] border-2 border-dashed border-slate-100 bg-slate-50/30">
              <Grid2X2 className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold italic">No categories found. Build your grid above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
