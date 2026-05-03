import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function ReportRow({ name, meta, category, catColor, span, status, statusColor, icon = 'description', isProcessing = false, onDownload }) {
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-700 dark:text-teal-400">
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                        <p className="font-bold text-teal-900 dark:text-teal-100">{name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{meta}</p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5">
                <span className={`px-3 py-1 ${catColor} rounded-full text-xs font-semibold`}>{category}</span>
            </td>
            <td className="px-8 py-5">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{span}</p>
            </td>
            <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
                    <span className={`text-sm font-bold ${isProcessing ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{status}</span>
                </div>
            </td>
            <td className="px-8 py-5 text-right">
                <div className={`flex justify-end gap-2 ${isProcessing ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                    <button 
                        onClick={onDownload}
                        className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">{isProcessing ? 'cancel' : 'download'}</span>
                    </button>
                    {!isProcessing && (
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

function FooterStat({ icon, color, label, value, sub }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-primary dark:text-teal-100">{value} {sub && <span className="text-sm font-normal text-slate-400 dark:text-slate-500">{sub}</span>}</p>
            </div>
        </div>
    );
}

export default function Reports({ metrics }) {
    const { flash = {} } = usePage().props;
    const [isGenerating, setIsGenerating] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const safeMetrics = metrics || {};
    const campaignStats = safeMetrics.campaigns || {};
    const engagementStats = safeMetrics.engagement || {};
    const growthStats = safeMetrics.growth || {};

    // Sync toast with flash message
    useEffect(() => {
        if (flash && flash.success) {
            setToastMessage(flash.success);
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleDownloadMaster = () => {
        setToastMessage('Preparing Clinic Master Log for download...');
        setShowToast(true);
        window.location.href = route('reports.download.master');
        setTimeout(() => setShowToast(false), 5000);
    };

    const handleDownloadCampaigns = () => {
        setIsGenerating(true);
        setToastMessage('Generating Campaign Performance Report...');
        setShowToast(true);
        window.location.href = route('reports.download.campaigns');
        setTimeout(() => {
            setIsGenerating(false);
            setTimeout(() => setShowToast(false), 3000);
        }, 2000);
    };

    const handleDownloadGrowth = () => {
        setToastMessage('Compiling Monthly Growth Summary...');
        setShowToast(true);
        window.location.href = route('reports.download.growth');
        setTimeout(() => setShowToast(false), 5000);
    };

    return (
        <AppLayout>
            <Head title="Reports Engine" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope relative">
                {/* Success Toast */}
                {showToast && (
                    <div className="fixed top-24 right-10 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-10 duration-500">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">analytics</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Processing Report</p>
                            <p className="text-[11px] opacity-90">{toastMessage}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-4 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                )}

                {/* Welcome & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>Admin</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Performance Reports</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Reports Engine</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">Access deep-dive analytics and performance metrics. Generate professional insights for your clinic's growth and patient engagement.</p>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-6 mb-12">
                    {/* Campaign Performance */}
                    <div className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-teal-50 dark:bg-teal-900/10 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary-fixed-dim dark:bg-teal-900/40 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary dark:text-teal-400">auto_graph</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100 mb-2">Campaign Performance</h3>
                            <p className="text-on-surface-variant dark:text-slate-400 text-body-sm leading-relaxed mb-6">Track ROI, conversion rates, and engagement metrics for all active marketing initiatives.</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Reach: {(campaignStats.recipients || 0).toLocaleString()}</span>
                                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Success: {campaignStats.avg_success || 0}%</span>
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">Active Initiatives: {campaignStats.total || 0}</span>
                            <button 
                                onClick={handleDownloadCampaigns} 
                                disabled={isGenerating}
                                className="text-primary dark:text-teal-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all disabled:opacity-50"
                            >
                                {isGenerating ? 'Generating...' : 'Get Campaign Report'} 
                                <span className={`material-symbols-outlined text-sm ${isGenerating ? 'animate-spin' : ''}`}>
                                    {isGenerating ? 'progress_activity' : 'download'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Client Engagement */}
                    <div className="col-span-12 lg:col-span-7 bg-primary-container text-white rounded-xl p-8 shadow-md relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        <div className="relative z-10 flex flex-col md:flex-row h-full gap-8">
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-white">person_celebrate</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-2">Client Engagement</h3>
                                <p className="text-on-primary-container opacity-90 text-body-md mb-8 max-w-sm">Analysis of patient loyalty based on health scores and visit frequency across {engagementStats.total_patients || 0} clients.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Health Wellness</p>
                                        <p className="text-white text-2xl font-black">{engagementStats.rate || 0}%</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Active Growth</p>
                                        <p className="text-white text-2xl font-black">+{growthStats.new_this_month || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-1 items-center justify-center">
                                <div className="w-full h-40 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center border-dashed">
                                    <span className="material-symbols-outlined text-[64px] opacity-20">analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branch Statistics */}
                    <div className="col-span-12 bg-secondary-fixed dark:bg-slate-800 text-primary dark:text-teal-400 rounded-xl p-8 border border-secondary-container/50 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 group">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm">
                                    <span className="material-symbols-outlined text-secondary dark:text-teal-400">hub</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md dark:text-teal-50">Branch Statistics & Logistics</h3>
                            </div>
                            <p className="text-on-secondary-fixed-variant dark:text-slate-400 text-body-md max-w-2xl">Manage and export data across all partner clinics. Current database contains {(growthStats.total || 0).toLocaleString()} active patient records.</p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={handleDownloadMaster}
                                className="bg-white dark:bg-slate-700 text-secondary dark:text-teal-400 font-bold px-6 py-3 rounded-lg border border-secondary-container dark:border-slate-600 hover:bg-secondary-container dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download Master Logs
                            </button>
                            <Link href={route('calendar')} className="bg-primary text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                View Schedule
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Reports Table */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-12">
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <div>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Generative Reports History</h3>
                            <p className="text-body-sm text-slate-500 dark:text-slate-400">On-demand exports processed by the engine.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-slate-400">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                            <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-slate-400">
                                <span className="material-symbols-outlined">sort</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-label-md text-[11px] uppercase tracking-[0.1em]">
                                    <th className="px-8 py-5">Report Identity</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Data Span</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <ReportRow 
                                    name="Master_Patient_Database_Export" 
                                    meta="CSV • Realtime" 
                                    category="Database" 
                                    catColor="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                    span="Lifetime"
                                    status="Ready"
                                    statusColor="bg-emerald-500"
                                    onDownload={handleDownloadMaster}
                                />
                                <ReportRow 
                                    name="Campaign_Performance_Analysis" 
                                    meta="CSV • Realtime" 
                                    category="Analytics" 
                                    catColor="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                                    span="Current Year"
                                    status="Ready"
                                    statusColor="bg-emerald-500"
                                    icon="campaign"
                                    onDownload={handleDownloadCampaigns}
                                />
                                <ReportRow 
                                    name="Monthly_Growth_Summary" 
                                    meta="CSV • Realtime" 
                                    category="Growth" 
                                    catColor="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                                    span="Current Month"
                                    status="Ready"
                                    statusColor="bg-emerald-500"
                                    icon="hub"
                                    onDownload={handleDownloadGrowth}
                                />
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Footer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FooterStat icon="trending_up" color="bg-secondary-container dark:bg-pink-900/20 text-secondary dark:text-pink-400" label="Growth Rate" value={`+${growthStats.new_this_month || 0}`} sub="this month" />
                    <FooterStat icon="task_alt" color="bg-primary-fixed dark:bg-teal-900/40 text-primary dark:text-teal-400" label="Active Engagement" value={`${engagementStats.rate || 0}%`} />
                    <FooterStat icon="group_add" color="bg-tertiary-fixed dark:bg-teal-900/20 text-tertiary dark:text-teal-400" label="Total Patients" value={(growthStats.total || 0).toLocaleString()} />
                </div>
            </div>
        </AppLayout>
    );
}

