import { useState, useEffect } from 'react';
import api from '../api';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Loader2, 
  AlertCircle, 
  Upload, 
  DollarSign, 
  Tags, 
  CheckCircle,
  MoreVertical,
  ChevronDown,
  Eye,
  Filter
} from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    gender: 'Female',
    category: '',
    sizes: ['S', 'M', 'L'],
  });
  const [files, setFiles] = useState([]);

  const fetchInitialData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'sizes') {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    files.forEach(file => {
      submitData.append('images', file);
    });

    try {
      await api.post('/products', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchInitialData();
      setShowForm(false);
      setFormData({ name: '', description: '', price: '', gender: 'Female', category: '', sizes: ['S', 'M', 'L'] });
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchInitialData();
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (fetchLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">New Arrivals</h2>
          <p className="mt-2 text-slate-500 font-medium">Add and manage your latest seasonal stock.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-black text-white transition-all shadow-xl active:translate-y-0.5 ${showForm ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-slate-950 hover:bg-black shadow-slate-900/20 translate-y-[-2px]'}`}
        >
          {showForm ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{showForm ? 'CANCEL' : 'STOCK PRODUCT'}</span>
        </button>
      </div>

      {showForm && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm shadow-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><Tags className="h-3 w-3" /> Product Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Flare Midnight Dress"
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Product Story / Desc</label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe fit, fabric and style notes."
                />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><DollarSign className="h-3 w-3" /> Price</label>
                  <input
                    name="price"
                    type="number"
                    required
                    className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-100 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="99.00"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Gender</label>
                  <select
                    name="gender"
                    className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold ring-1 ring-inset ring-slate-100 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500 appearance-none"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Unisex</option>
                    <option>Kids</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Stock Sizes</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black ring-2 ring-inset transition-all duration-300 ${
                        formData.sizes.includes(size)
                          ? 'bg-emerald-600 text-white ring-emerald-500 shadow-xl shadow-emerald-500/20 translate-y-[-2px]'
                          : 'bg-slate-50 text-slate-400 ring-slate-100 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

               <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Sync Category</label>
                <select
                  name="category"
                  className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-slate-900 font-bold ring-1 ring-inset ring-slate-100 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500 appearance-none"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Independent Stock</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2"><Upload className="h-3 w-3" /> Visual Assets (Max 5)</label>
                <div className="relative">
                    <input
                    type="file"
                    multiple
                    className="w-full rounded-xl sm:rounded-2xl border-0 bg-slate-50 py-3 sm:py-4 px-5 sm:px-6 text-[10px] sm:text-sm text-slate-900 font-bold ring-1 ring-inset ring-slate-100 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-[9px] sm:file:text-[10px] file:font-black file:uppercase file:bg-orange-500 file:text-white hover:file:bg-orange-600 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    accept="image/*"
                    />
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-emerald-600 px-6 py-3.5 sm:py-4.5 text-xs sm:text-sm font-black text-white transition-all hover:bg-emerald-500 shadow-xl shadow-emerald-500/20 translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-0"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>PUBLISH STOCK</span>}
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

      {/* Inventory Table & Mobile Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Inventory</h3>
          <div className="flex items-center gap-2 text-slate-400">
             <Filter className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Filters Applied</span>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {products.map((product) => (
            <div key={product._id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 shadow-inner">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <ShoppingBag className="m-6 h-8 w-8 text-slate-200" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-slate-900 truncate">{product.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {product._id.slice(-6)}</p>
                    </div>
                    <span className="font-black text-orange-600">${product.price}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-lg bg-orange-50 px-2 py-0.5 text-[9px] font-black text-orange-600 ring-1 ring-inset ring-orange-200 uppercase tracking-widest">
                      {product.gender}
                    </span>
                    {product.sizes.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-50 text-[9px] font-black text-slate-500 border border-slate-100">
                        {s}
                      </span>
                    ))}
                    {product.sizes.length > 3 && <span className="text-[9px] font-black text-slate-400">+{product.sizes.length - 3}</span>}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100">
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
                <button 
                  onClick={() => deleteProduct(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-50 text-[10px] font-black uppercase tracking-widest text-orange-600 hover:bg-orange-100"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-100 p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-900">
              <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="px-8 py-5">Product Details</th>
                  <th className="px-8 py-5">Value</th>
                  <th className="hidden md:table-cell px-8 py-5 text-center">Identity</th>
                  <th className="hidden lg:table-cell px-8 py-5">Sizing</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((product) => (
                  <tr key={product._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-100 group-hover:scale-105 transition-transform shadow-inner">
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <ShoppingBag className="m-5 h-6 w-6 text-slate-200" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">{product.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID: {product._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-slate-900 text-lg">${product.price}</span>
                    </td>
                    <td className="hidden md:table-cell px-8 py-6 text-center">
                      <span className="inline-flex items-center rounded-xl bg-orange-50 px-3 py-1 text-[10px] font-black text-orange-600 ring-1 ring-inset ring-orange-200 uppercase tracking-widest group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {product.gender}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-8 py-6">
                      <div className="flex gap-2">
                        {product.sizes.map(s => (
                          <span key={s} className="min-w-[24px] h-6 flex items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white text-[9px] font-black text-slate-500 border border-slate-100 transition-colors">
                             {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
                              <Eye className="h-4 w-4" />
                          </button>
                          <button
                          onClick={() => deleteProduct(product._id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition-all"
                          >
                          <Trash2 className="h-4 w-4" />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {products.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center bg-white">
            <ShoppingBag className="h-12 w-12 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-bold italic">No products found in active inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
