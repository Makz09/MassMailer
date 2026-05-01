import AppLayout from '@/Layouts/AppLayout';
import MetricCard from '@/Components/MetricCard';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats = {}, recent_patients = [] }) {
    return (
        <AppLayout>
            <Head title="Marketing Dashboard" />
            
            <div className="px-10 pt-6 pb-10 mx-auto max-w-[1720px]">
                <header className="mb-10">
                    <div className="flex justify-between items-center w-full">
                        <div className="space-y-1">
                            <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Marketing Dashboard</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Monitoring your clinic's outreach and feline health engagement.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <MetricCard 
                        title="Active Campaigns" 
                        value={stats.active_campaigns || 0} 
                        icon="mail" 
                        trend="Live" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-teal-50 dark:bg-teal-900/20" 
                        iconColor="text-[#084C4B] dark:text-teal-400" 
                    />
                    <MetricCard 
                        title="Avg Opens" 
                        value={Math.round(stats.avg_open_rate || 0)} 
                        icon="drafts" 
                        trend="Avg" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-blue-50 dark:bg-blue-900/20" 
                        iconColor="text-blue-600 dark:text-blue-400" 
                    />
                    <MetricCard 
                        title="Conversion" 
                        value={Math.round(stats.conversion || 0)} 
                        icon="ads_click" 
                        trend="Avg" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-pink-50 dark:bg-pink-900/20" 
                        iconColor="text-secondary dark:text-pink-400" 
                    />
                    <MetricCard 
                        title="Total Patients" 
                        value={stats.total_patients || 0} 
                        icon="person_add" 
                        trend="Total" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-amber-50 dark:bg-amber-900/20" 
                        iconColor="text-amber-600 dark:text-amber-400" 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-outline-variant dark:border-slate-800 flex justify-between items-center">
                            <h4 className="font-headline-md text-headline-md text-primary dark:text-teal-50">Recent Patients</h4>
                            <button className="text-sm font-semibold text-[#084C4B] dark:text-teal-400 hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">PATIENT NAME</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">BREED</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">STATUS</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">HEALTH</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                                    {recent_patients.map((patient) => (
                                        <PatientRow 
                                            key={patient.id}
                                            name={patient.name} 
                                            breed={patient.breed} 
                                            status={patient.status} 
                                            statusColor={patient.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}
                                            score={patient.health_score}
                                        />
                                    ))}
                                    {recent_patients.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-outline dark:text-slate-500 italic">
                                                No recent patients found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-primary p-6 rounded-xl text-white shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <h5 className="font-headline-md text-headline-md mb-2">Grow your clinic</h5>
                                <p className="font-body-sm text-body-sm mb-6 text-on-primary-container">Launch a new automated campaign to re-engage inactive patients.</p>
                                <button className="bg-secondary-fixed text-on-secondary-fixed px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Create Campaign
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <span className="material-symbols-outlined text-[120px]">pets</span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm">
                            <h5 className="font-semibold text-primary dark:text-teal-50 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary dark:text-pink-400">stars</span>
                                Monthly Goal
                            </h5>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant dark:text-slate-400">Campaign Success Rate</span>
                                    <span className="font-bold text-primary dark:text-teal-400">85% / 100%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary-container to-secondary-fixed-dim rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-tight">You're only 15% away from your best performing month this year! Keep it up.</p>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm">
                            <h5 className="font-semibold text-primary dark:text-teal-50 mb-4">Upcoming Schedule</h5>
                            <div className="space-y-4">
                                <ScheduleItem month="Oct" day="24" title="Deworming Reminder" desc="Automated • 850 rec." />
                                <ScheduleItem month="Oct" day="27" title="Halloween Pet Safety" desc="Newsletter • 5.2k rec." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function PatientRow({ name, breed, status, statusColor, score }) {
    return (
        <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#084C4B] dark:text-teal-400">pets</span>
                    </div>
                    <div>
                        <p className="font-semibold text-[#084C4B] dark:text-teal-200">{name}</p>
                        <p className="text-xs text-on-surface-variant dark:text-slate-400">{breed}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 font-body-sm text-body-sm dark:text-slate-300">{breed}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor}`}>{status}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${score < 50 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${score}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold dark:text-slate-300">{score}%</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary dark:hover:text-teal-400">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </td>
        </tr>
    );
}

function ScheduleItem({ month, day, title, desc }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg w-12 h-12 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400">{month}</span>
                <span className="text-lg font-bold text-[#084C4B] dark:text-teal-400">{day}</span>
            </div>
            <div>
                <p className="text-sm font-semibold text-primary dark:text-teal-50">{title}</p>
                <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{desc}</p>
            </div>
        </div>
    );
}
