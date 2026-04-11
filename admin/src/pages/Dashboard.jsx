import { LayoutDashboard, Image as ImageIcon, ShoppingBag, Grid2X2, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="mt-2 text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        {trend && (
            <div className="flex items-center gap-1 mt-2 text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-tighter">+{trend}% this week</span>
            </div>
        )}
      </div>
      <div className={`rounded-2xl bg-${color}-50 p-4 transition-transform duration-500 group-hover:scale-110`}>
        <Icon className={`h-7 w-7 text-${color}-600`} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { userInfo } = useAuth();

  const stats = [
    { title: 'Total Posters', value: '12', icon: ImageIcon, color: 'orange', trend: '12' },
    { title: 'New Arrivals', value: '48', icon: ShoppingBag, color: 'emerald', trend: '8' },
    { title: 'Categories', value: '8', icon: Grid2X2, color: 'orange', trend: '0' },
    { title: 'Site Visits', value: '2.4k', icon: LayoutDashboard, color: 'emerald', trend: '24' },
  ];

  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">Summary Dashboard</h2>
          <p className="mt-1 sm:mt-2 text-slate-500 font-medium text-sm sm:text-base">Hello {userInfo?.name}! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full ring-1 ring-emerald-500/20">Market Open</span>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm shadow-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Quick Actions</h3>
          <p className="mt-1 sm:mt-2 text-slate-400 font-medium text-xs sm:text-sm">Update your store content instantly.</p>
          
          <div className="mt-6 sm:mt-8 grid gap-4 grid-cols-2">
            <button className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl bg-slate-50 p-4 sm:p-8 text-xs sm:text-sm font-black text-slate-900 transition-all hover:bg-orange-500 hover:text-white group hover:shadow-2xl hover:shadow-orange-500/30">
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 transition-colors group-hover:text-white" />
              <span className="text-center">Hero Sliders</span>
            </button>
            <button className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl bg-slate-50 p-4 sm:p-8 text-xs sm:text-sm font-black text-slate-900 transition-all hover:bg-emerald-600 hover:text-white group hover:shadow-2xl hover:shadow-emerald-600/30">
              <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 transition-colors group-hover:text-white" />
              <span className="text-center">New Stock</span>
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Live Activity</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Past 24H</span>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((item, i) => (
              <div key={item} className="flex items-center gap-6 group">
                <div className={`h-12 w-12 rounded-2xl ${i === 0 ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-400'} flex items-center justify-center font-black group-hover:scale-110 transition-transform`}>
                    0{i+1}
                </div>
                <div className="flex-1 pb-4 border-b border-slate-50">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                        {item === 1 ? 'New product "Silk Gown" published' : item === 2 ? 'Hero Poster "Summer Sale" updated' : 'Login detected from New Device'}
                    </p>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">
                    {item === 1 ? '5 MIN AGO' : item === 2 ? '2 HOURS AGO' : '3 HOURS AGO'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors border-t border-slate-50 pt-6">
            View All Performance Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
