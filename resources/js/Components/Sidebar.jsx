import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { clinic } = usePage().props;

    return (
        <aside className="fixed left-0 top-0 h-screen flex flex-col z-40 bg-slate-50 dark:bg-slate-900 w-64 border-r border-slate-200 dark:border-slate-800 font-manrope text-sm antialiased">
            {/* Logo & Navigation Section */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center gap-3 mb-8">
                    <img 
                        alt="Clinic Logo" 
                        className="w-10 h-10 rounded-xl shadow-sm object-cover" 
                        src={clinic?.logo_path || '/images/logo.png'} 
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[13px] font-black tracking-tight text-[#084C4B] dark:text-teal-50 leading-tight uppercase">{clinic?.name || 'The Cat Clinic'}</h1>
                        <p className="text-[9px] text-slate-400 font-black tracking-[0.15em] uppercase leading-none mt-0.5">Feline Care</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} icon="dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink href={route('clients')} active={route().current('clients')} icon="groups">
                        Client
                    </NavLink>
                    <NavLink href={route('segments.index')} active={route().current('segments.*')} icon="bookmarks">
                        Segments
                    </NavLink>
                    <NavLink href={route('campaigns')} active={route().current('campaigns')} icon="rocket_launch">
                        Campaigns
                    </NavLink>
                    <NavLink href={route('templates')} active={route().current('templates')} icon="mail">
                        Email Library
                    </NavLink>
                    <NavLink href={route('analytics')} active={route().current('analytics')} icon="bar_chart">
                        Analytics 
                    </NavLink>
                    <NavLink href={route('calendar')} active={route().current('calendar')} icon="calendar_month">
                        Calendar
                    </NavLink>
                    <NavLink href={route('reports')} active={route().current('reports')} icon="description">
                        Reports
                    </NavLink>
                </nav>
            </div>

            {/* Bottom Section (Sticky Footer) */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="space-y-1">
                    <NavLink href={route('settings')} active={route().current('settings')} icon="settings">
                        Settings
                    </NavLink>
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 ease-in-out hover:pl-5 group rounded-lg"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">logout</span>
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}

function NavLink({ href, icon, children, active = false }) {
    return (
        <Link 
            href={href} 
            className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-200 ease-in-out hover:pl-5 rounded-lg ${
                active 
                ? 'text-[#084C4B] dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-900/30 border-r-4 border-[#084C4B] dark:border-teal-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className={active ? 'font-bold' : 'font-medium'}>{children}</span>
        </Link>
    );
}
