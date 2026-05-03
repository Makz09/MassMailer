import AppLayout from '@/Layouts/AppLayout';
import MetricCard from '@/Components/MetricCard';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats = {}, recent_patients = [], upcoming_campaigns = [] }) {
    return (
        <AppLayout>
            <Head title="Marketing Dashboard" />
            
            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                <header className="mb-10">
                    <div className="flex justify-between items-center w-full">
                        <div className="space-y-1">
                            <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                                <span>Main</span>
                                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                <span className="text-primary-container">Dashboard</span>
                            </nav>
                            <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Marketing Dashboard</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Monitoring your clinic's outreach and feline health engagement.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <MetricCard 
                        title="Total Clients" 
                        value={stats.total_clients || 0} 
                        icon="groups" 
                        trend="Active" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-blue-50 dark:bg-blue-900/20" 
                        iconColor="text-blue-600 dark:text-blue-400" 
                    />
                    <MetricCard 
                        title="Total Cats" 
                        value={stats.total_cats || 0} 
                        icon="pets" 
                        trend="Patients" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-teal-50 dark:bg-teal-900/20" 
                        iconColor="text-[#084C4B] dark:text-teal-400" 
                    />
                    <MetricCard 
                        title="Campaigns Sent" 
                        value={stats.campaigns_sent || 0} 
                        icon="mail" 
                        trend="Completed" 
                        trendColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                        iconBg="bg-pink-50 dark:bg-pink-900/20" 
                        iconColor="text-secondary dark:text-pink-400" 
                    />
                    <MetricCard 
                        title="Emails Delivered" 
                        value={stats.emails_delivered || 0} 
                        icon="send" 
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
                            <Link href={route('clients')} className="text-sm font-semibold text-[#084C4B] dark:text-teal-400 hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">PATIENT NAME</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">OWNER & CONTACT</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800 text-center">VITAL STATS</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">STATUS</th>
                                        <th className="px-6 py-3 border-b border-outline-variant dark:border-slate-800">HEALTH</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                                    {recent_patients.map((patient) => (
                                        <PatientRow 
                                            key={patient.id}
                                            name={patient.name} 
                                            breed={patient.breed} 
                                            ownerName={patient.owner_name}
                                            email={patient.owner_email}
                                            phone={patient.owner_phone}
                                            age={patient.age_years}
                                            weight={patient.weight_kg}
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
                                <Link href={route('campaigns')} className="bg-secondary-fixed text-on-secondary-fixed px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Create Campaign
                                </Link>
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
                                    <span className="font-bold text-primary dark:text-teal-400">{stats.monthly_success_rate || 0}% / 50%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary-container to-secondary-fixed-dim rounded-full transition-all duration-1000" 
                                        style={{ width: `${Math.min((stats.monthly_success_rate / 50) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-tight">
                                    {(stats.monthly_success_rate || 0) >= 50 
                                        ? "Great job! You've surpassed this month's engagement goal." 
                                        : `You're ${Math.max(0, 50 - (stats.monthly_success_rate || 0))}% away from your monthly target. Keep it up!`}
                                </p>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm">
                            <h5 className="font-semibold text-primary dark:text-teal-50 mb-4">Upcoming Schedule</h5>
                            <div className="space-y-4">
                                {upcoming_campaigns.length > 0 ? (
                                    upcoming_campaigns.map((camp) => (
                                        <ScheduleItem 
                                            key={camp.id}
                                            month={camp.month} 
                                            day={camp.day} 
                                            title={camp.name} 
                                            desc={`${camp.type} • ${camp.recipients} rec.`} 
                                        />
                                    ))
                                ) : (
                                    <p className="text-slate-400 italic text-sm">No upcoming campaigns scheduled.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function PatientRow({ name, breed, ownerName, email, phone, age, weight, status, statusColor, score }) {
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
            <td className="px-6 py-4">
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{ownerName}</p>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 dark:text-slate-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">mail</span>
                            {email}
                        </span>
                        {phone && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">call</span>
                                {phone}
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{age} yrs</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{weight} kg</span>
                </div>
            </td>
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
