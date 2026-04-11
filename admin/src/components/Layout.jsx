import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  ShoppingBag, 
  Grid2X2, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  ChevronRight
} from 'lucide-react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userInfo, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Hero Posters', icon: ImageIcon, path: '/posters' },
    { title: 'New Arrivals', icon: ShoppingBag, path: '/products' },
    { title: 'Categories', icon: Grid2X2, path: '/categories' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setIsSidebarOpen(true)}></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-slate-950 text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/20">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">GRID<span className="text-orange-500">OX</span></span>
            </Link>
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto p-6 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 translate-x-1'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isActive(item.path) ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.title}</span>
                </div>
                {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="mt-auto border-t border-white/10 p-6 bg-white/5">
            <div className="flex items-center items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 text-emerald-400 shadow-inner">
                <UserIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-black text-white">{userInfo?.name || 'Admin'}</p>
                <p className="truncate text-[10px] text-emerald-500 uppercase tracking-widest font-black">Authorized</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 text-white/30 hover:text-orange-500 transition-all rounded-xl hover:bg-orange-500/10 active:scale-95"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        {/* Header */}
        <header className="flex h-16 sm:h-20 items-center justify-between border-b border-slate-100 bg-white/90 px-4 sm:px-8 backdrop-blur-xl z-10 sticky top-0">
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="lg:hidden text-slate-400 hover:text-slate-900 transition-colors p-1" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 sm:h-7 sm:h-7" />
            </button>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 truncate max-w-[150px] sm:max-w-none">
              {menuItems.find(item => isActive(item.path))?.title || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Store Status</p>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <p className="text-sm font-bold text-emerald-600">Active & Syncing</p>
              </div>
            </div>
            <div className="h-8 sm:h-10 w-px bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-2 sm:gap-3">
               <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
               </div>
               <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center lg:hidden">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
               </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 sm:p-8 lg:p-10">
           <div className="max-w-7xl mx-auto">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
