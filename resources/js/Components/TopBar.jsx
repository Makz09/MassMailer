export default function TopBar({ user }) {
    return (
        <header className="flex items-center justify-between px-10 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 shadow-sm font-manrope tracking-tight">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-teal-500/50 rounded-lg">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input 
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-0 dark:bg-slate-900 dark:text-slate-200" 
                        placeholder="Search campaigns, patients, or reports..." 
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="h-8 w-px bg-slate-200 mx-2 dark:bg-slate-800"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs font-bold text-[#084C4B] dark:text-teal-200">{user?.name || 'Dr. Sarah Whiskers'}</p>
                        <p className="text-[10px] text-slate-500">{user?.role || 'Clinic Manager'}</p>
                    </div>
                    <img 
                        alt="User Avatar" 
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrZRfIyqJid637LFrUa17v4VqWi51TZDngUL8ivK6yW4VOMYbFrC_vNgIQ_us97bh_Y0q9BlxJb0VgZfA4dZxdWA9WzwBScqaPIzdNz7la9NbgxvKkXo8h-BFd_rM5P8RHrREIkn4v3oZ3mLU9Ig77OqOOzKD66JOlW91gxPE3ct70wwOIBM9P4cQ9S-fURp-9Eds_TzFKMnDrVyYhAOUdqjITtdwaldxtk2P0_tt5WgZROLA4kEZ4a_-PFKdDxkTcJF4HuAQ73Go" 
                    />
                </div>
            </div>
        </header>
    );
}
