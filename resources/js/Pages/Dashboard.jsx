import AppLayout from '@/Layouts/AppLayout';
import MetricCard from '@/Components/MetricCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ stats = {}, recent_patients = [], upcoming_campaigns = [] }) {
    const { flash } = usePage().props;
    const [isGenerating, setIsGenerating] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Sync toast with flash message
    useEffect(() => {
        if (flash.success) {
            setToastMessage(flash.success);
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    const handleGenerateAudit = () => {
        setIsGenerating(true);
        window.location.href = route('dashboard.audit');
        
        setTimeout(() => {
            setIsGenerating(false);
            setToastMessage('Diabetic Patient Audit has been generated and downloaded successfully.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }, 2000);
    };

    return (
        <AppLayout>
            <Head title="Marketing Dashboard" />
            
            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope relative">
                {/* Success Toast */}
                {showToast && (
                    <div className="fixed top-24 right-10 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-10 duration-500">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">done_all</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Action Successful</p>
                            <p className="text-[11px] opacity-90">{toastMessage}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-4 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                )}
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

                {/* Health & Growth Ribbon */}
                <div className="bg-[#0B1219] dark:bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl mb-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/50">
                        {/* Section 1: Health Milestones */}
                        <div className="p-6 flex flex-col justify-center group/tooltip relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-teal-400 text-sm">health_metrics</span>
                                <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Health Milestones</h6>
                                <span className="material-symbols-outlined text-[14px] text-slate-600 cursor-help hover:text-teal-400 transition-colors">info</span>
                                
                                {/* Tooltip Content */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-64 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-2xl border border-slate-700 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50">
                                    <p className="font-bold mb-1 text-teal-400">Health Tracking Logic:</p>
                                    <ul className="space-y-1 text-slate-300">
                                        <li>• <span className="text-white">Vaccination:</span> % of patients with any recorded vaccination date.</li>
                                        <li>• <span className="text-white">Senior Wellness:</span> % of patients aged 10+ with a visit in the last 180 days.</li>
                                    </ul>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800 border-r border-b border-slate-700"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                                        <span className="text-slate-300">Vaccination Coverage</span>
                                        <span className="text-teal-400">{stats.vaccination_coverage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${stats.vaccination_coverage}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                                        <span className="text-slate-300">Senior Wellness</span>
                                        <span className="text-teal-400">{stats.senior_wellness_checks}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]" style={{ width: `${stats.senior_wellness_checks}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: New Registrations */}
                        <div className="p-6 flex items-center justify-between group relative group/reg">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Growth</h6>
                                    <span className="material-symbols-outlined text-[14px] text-slate-600 cursor-help hover:text-teal-400 transition-colors">info</span>
                                    
                                    {/* Tooltip Content */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-48 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-2xl border border-slate-700 opacity-0 group-hover/reg:opacity-100 pointer-events-none transition-all z-50">
                                        <p className="font-bold mb-1 text-teal-400">Growth Tracking:</p>
                                        <p className="text-slate-300">Total number of patients created in the database since Monday 12:00 AM.</p>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800 border-r border-b border-slate-700"></div>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-headline-lg text-white leading-none">+{stats.new_registrations}</span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded">This Week</span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium">New patients joined the clinic</p>
                            </div>
                            <div className="shrink-0 p-3 rounded-xl bg-teal-500/5 border border-teal-500/10 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-teal-500 text-3xl">person_add</span>
                            </div>
                        </div>

                        {/* Section 3: Quick Action */}
                        <div className="p-6 bg-teal-950/20 flex flex-col justify-between relative group group/action rounded-br-2xl md:rounded-tr-2xl">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <h6 className="text-[10px] font-black text-teal-400/60 uppercase tracking-[0.2em]">Priority Action</h6>
                                    <span className="material-symbols-outlined text-[14px] text-teal-400/30 cursor-help hover:text-teal-400 transition-colors">info</span>
                                    
                                    {/* Tooltip Content */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-48 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-2xl border border-slate-700 opacity-0 group-hover/action:opacity-100 pointer-events-none transition-all z-50">
                                        <p className="font-bold mb-1 text-teal-400">Automated Audit:</p>
                                        <p className="text-slate-300">Scans all patients for 'Diabetes' in medical history and generates a missing-checkup report.</p>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800 border-r border-b border-slate-700"></div>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-slate-300 leading-relaxed mb-4">Run health audit report for all Diabetic patients.</p>
                                <button 
                                    onClick={handleGenerateAudit}
                                    disabled={isGenerating}
                                    className={`w-full bg-white text-[#084C4B] py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${isGenerating ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                                            Processing...
                                        </>
                                    ) : (
                                        'Generate Audit'
                                    )}
                                </button>
                            </div>
                            {/* Decorative background icon */}
                            <span className="absolute -right-4 -bottom-6 material-symbols-outlined text-[120px] text-teal-500/5 group-hover:rotate-12 transition-transform pointer-events-none">analytics</span>
                        </div>
                    </div>
                </div>

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
                                <div className="flex justify-between items-center text-sm relative group/reach">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-on-surface-variant dark:text-slate-400">Monthly Reach Goal</span>
                                        <span className="material-symbols-outlined text-[14px] text-slate-400 cursor-help hover:text-teal-400 transition-colors">info</span>
                                        
                                        {/* Tooltip Content */}
                                        <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-2xl border border-slate-700 opacity-0 group-hover/reach:opacity-100 pointer-events-none transition-all z-50">
                                            <p className="font-bold mb-1 text-teal-400">Audience Reach:</p>
                                            <p className="text-slate-300 leading-relaxed">Tracks the percentage of your total patient database reached via email campaigns this month.</p>
                                            <div className="absolute top-full left-4 -translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800 border-r border-b border-slate-700"></div>
                                        </div>
                                    </div>
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
                                        ? "Great job! You've surpassed this month's audience reach goal." 
                                        : `You're ${Math.max(0, 50 - (stats.monthly_success_rate || 0))}% away from your monthly target. Keep it up!`}
                                </p>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-semibold text-primary dark:text-teal-50">Upcoming Schedule</h5>
                                <Link href={route('calendar')} className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">View More</Link>
                            </div>
                            <div className="space-y-4">
                                {upcoming_campaigns.length > 0 ? (
                                    upcoming_campaigns.map((item) => (
                                        <ScheduleItem 
                                            key={item.id}
                                            month={item.month} 
                                            day={item.day} 
                                            title={item.name} 
                                            desc={item.desc} 
                                        />
                                    ))
                                ) : (
                                    <p className="text-slate-400 italic text-sm">No upcoming campaigns or appointments.</p>
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
