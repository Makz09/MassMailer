import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

export default function TopBar({ user }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length >= 2) {
                performSearch();
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const performSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('search'), { params: { q: query } });
            setResults(response.data.results);
            setShowResults(true);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = (link) => {
        setShowResults(false);
        setQuery('');
        router.visit(link);
    };

    return (
        <header className="flex items-center justify-between px-10 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 shadow-sm font-manrope tracking-tight">
            <div className="flex items-center gap-4 flex-1">
                <div ref={searchRef} className="relative w-full max-w-md">
                    <div className="relative group">
                        <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-colors ${loading ? 'text-teal-500 animate-spin' : 'text-slate-400 group-focus-within:text-teal-500'}`}>
                            {loading ? 'progress_activity' : 'search'}
                        </span>
                        <input 
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-900 dark:text-slate-200 transition-all outline-none" 
                            placeholder="Quick find patients..." 
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => query.length >= 2 && setShowResults(true)}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="max-h-[400px] overflow-y-auto">
                                {results.length > 0 ? (
                                    <div className="py-2">
                                        {results.map((result, idx) => (
                                            <button
                                                key={`${result.type}-${result.id}-${idx}`}
                                                onClick={() => handleResultClick(result.link)}
                                                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 dark:group-hover:bg-teal-900/30 dark:group-hover:text-teal-400 transition-colors">
                                                    <span className="material-symbols-outlined text-lg">{result.icon}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{result.title}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                        <span className="text-teal-600 dark:text-teal-400">{result.type}</span>
                                                        <span>•</span>
                                                        <span className="truncate">{result.subtitle}</span>
                                                    </p>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-sm">chevron_right</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-10 text-center">
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="material-symbols-outlined text-slate-300">search_off</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-400">No results found for "{query}"</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Try a different keyword</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Search Active</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 mx-2"></div>
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right">
                        <p className="text-sm font-black text-primary dark:text-teal-300 leading-none mb-1 tracking-tight">{user?.name || 'Admin User'}</p>
                        <div className="flex items-center justify-end gap-2">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{user?.role || 'Clinic Manager'}</p>
                            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                            <p className="text-[9px] font-black text-teal-600 dark:text-teal-500 uppercase flex items-center gap-0.5 leading-none">
                                <span className="material-symbols-outlined text-[11px]">location_on</span>
                                {user?.branch || 'Main Branch'}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <img 
                            alt="User Avatar" 
                            className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 shadow-sm object-cover group-hover:scale-105 transition-transform duration-300" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrZRfIyqJid637LFrUa17v4VqWi51TZDngUL8ivK6yW4VOMYbFrC_vNgIQ_us97bh_Y0q9BlxJb0VgZfA4dZxdWA9WzwBScqaPIzdNz7la9NbgxvKkXo8h-BFd_rM5P8RHrREIkn4v3oZ3mLU9Ig77OqOOzKD66JOlW91gxPE3ct70wwOIBM9P4cQ9S-fURp-9Eds_TzFKMnDrVyYhAOUdqjITtdwaldxtk2P0_tt5WgZROLA4kEZ4a_-PFKdDxkTcJF4HuAQ73Go" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

