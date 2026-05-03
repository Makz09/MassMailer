import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
export default function Analytics({ metrics, systemMetrics, branchDistribution, segmentation, recentCampaigns, insight, totalCats, currentRange }) {
    const [segPage, setSegPage] = useState(0);
    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(currentRange || 'Last 30 Days');
    const [isExporting, setIsExporting] = useState(false);

    // Sync state with prop if it changes via router
    useEffect(() => {
        if (currentRange) setSelectedRange(currentRange);
    }, [currentRange]);

    const itemsPerPage = 4;
    const totalSegPages = Math.ceil(segmentation.length / itemsPerPage);
    const paginatedSeg = segmentation.slice(segPage * itemsPerPage, (segPage + 1) * itemsPerPage);

    const handleExportPDF = () => {
        setIsExporting(true);
        setTimeout(() => {
            window.print();
            setIsExporting(false);
        }, 1000);
    };

    const dateRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'All Time'];
    return (
        <AppLayout>
            <Head title="Marketing Analytics" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                {/* Header Area */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>Insights</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Data Analytics</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Email Campaign Performance</h2>
                        <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 leading-relaxed">Deep dive into system growth and patient conversion trends.</p>
                    </div>
                    <div className="flex gap-3 relative no-print">
                        <div 
                            onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm min-w-[160px]"
                        >
                            <span className="material-symbols-outlined text-primary dark:text-teal-400">calendar_month</span>
                            <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">{selectedRange}</span>
                            <span className={`material-symbols-outlined text-slate-400 text-sm transition-transform ${isDateMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </div>

                        {/* Date Range Dropdown */}
                        {isDateMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                {dateRanges.map((range) => (
                                    <div 
                                        key={range}
                                        onClick={() => {
                                            setSelectedRange(range);
                                            setIsDateMenuOpen(false);
                                            router.get(route('analytics'), { range }, { 
                                                preserveState: true,
                                                preserveScroll: true,
                                                only: ['metrics', 'systemMetrics', 'branchDistribution', 'segmentation', 'recentCampaigns', 'insight', 'totalCats', 'currentRange']
                                            });
                                        }}
                                        className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${
                                            selectedRange === range 
                                            ? 'text-primary dark:text-teal-400 bg-primary/5 dark:bg-teal-400/5' 
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        {range}
                                    </div>
                                ))}
                            </div>
                        )}

                        <button 
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-sm">
                                {isExporting ? 'sync' : 'download'}
                            </span>
                            {isExporting ? 'Generating...' : 'Export PDF'}
                        </button>
                    </div>
                </div>

                {/* Performance Pulse Strip */}
                <div className="mb-8">
                    <PerformancePulse metrics={metrics} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    {/* System Metrics Chart */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary dark:text-teal-400">analytics</span>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">System Metrics</h3>
                        </div>

                        <div className="relative w-full h-[450px] flex items-end justify-around px-8">
                            {/* Dynamic Grid Mapping */}
                            {(() => {
                                const allRawValues = systemMetrics.map(m => {
                                    if (!m.value) return 0;
                                    return typeof m.value === 'string' ? parseInt(m.value.replace(/,/g, '')) : Number(m.value);
                                });
                                const peakValue = Math.max(...allRawValues, 10);
                                // Calculate a "nice" ceiling (nearest 10, 100, etc.)
                                const magnitude = Math.pow(10, Math.floor(Math.log10(peakValue)));
                                const normalized = peakValue / magnitude;
                                let ceiling;
                                if (normalized <= 1) ceiling = magnitude;
                                else if (normalized <= 2) ceiling = magnitude * 2;
                                else if (normalized <= 5) ceiling = magnitude * 5;
                                else ceiling = magnitude * 10;

                                const gridSteps = [ceiling, ceiling * 0.8, ceiling * 0.6, ceiling * 0.4, ceiling * 0.2, 0];

                                return (
                                    <>
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between py-2 px-8">
                                            {gridSteps.map((val, i) => (
                                                <div key={i} className="flex items-center gap-4 w-full">
                                                    <span className="text-[10px] text-slate-400 font-bold w-6 text-right">
                                                        {val >= 1000 ? (val / 1000).toFixed(1) + 'k' : Math.round(val)}
                                                    </span>
                                                    <div className="border-b border-slate-100 dark:border-slate-800 flex-1 h-0"></div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* System Bars */}
                                        {systemMetrics?.map((item, idx) => {
                                            const barColor = [
                                                'bg-blue-500',
                                                'bg-emerald-500',
                                                'bg-cyan-500',
                                                'bg-amber-500'
                                            ][idx] || 'bg-slate-500';
                                            
                                            const val = allRawValues[idx];
                                            const heightPercent = Math.min(Math.max((val / ceiling) * 85, 4), 100);
                                            
                                            return (
                                                 <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-2 z-10 px-2 group h-full">
                                                    <span className="text-[10px] font-bold text-primary dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {val.toLocaleString()}
                                                    </span>
                                                    <div 
                                                        className={`w-full max-w-[100px] ${barColor} rounded-t-sm shadow-lg transition-all duration-700 ease-out hover:brightness-110 cursor-help`} 
                                                        style={{ height: `${heightPercent}%` }}
                                                        title={`${item.label}: ${val.toLocaleString()}`}
                                                    ></div>
                                                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center mt-2">{item.label}</span>
                                                </div>
                                            );
                                        })}
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Audience Segmentation */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary dark:text-teal-400">pie_chart</span>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Audience Segmentation</h3>
                        </div>
                        <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400 mb-8">Patient distribution by breed</p>
                        <div className="space-y-6 min-h-[220px]">
                            {paginatedSeg.map((seg, idx) => (
                                <SegmentRow key={idx} label={seg.label} value={seg.value} total={totalCats} percent={seg.percent} color={(segPage * itemsPerPage + idx) % 2 === 0 ? 'bg-primary' : 'bg-secondary'} />
                            ))}
                            {segmentation.length === 0 && (
                                <p className="text-slate-400 italic text-sm">No segmentation data found.</p>
                            )}
                        </div>

                        {/* Pagination Controls for Segmentation */}
                        {totalSegPages > 1 && (
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <button 
                                    disabled={segPage === 0}
                                    onClick={() => setSegPage(prev => prev - 1)}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary dark:hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Page {segPage + 1} of {totalSegPages}
                                </span>
                                <button 
                                    disabled={segPage >= totalSegPages - 1}
                                    onClick={() => setSegPage(prev => prev + 1)}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary dark:hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        )}
                        <div className="mt-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-sm">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD0ZifY1k9Ywy8XeCIZVrO3_C6pPqRvf7mWhpo42kVNUAAfZok0kMo-rxpPEiCRRTGmW7N6RKiLNlMRRsPJTv3IZGvuyNzSNwMquj_7LOu_21kJeimLvT1oXaX1vWH9epdfAm_u3dRzMH8XUqTF7ffvh3QVAu0tlAXnHO5fCK9P7uqkuM6oORsEldEx3O4PnXKEjshtlVC3oRq2AJUfNNBjmpRX0vfvk-I57_C6X4E_R2jSoRo2lyG_sQWtH8iWCbmPQx5DRmTJX4U" alt="Insight" />
                            </div>
                            <div>
                                <p className="font-label-md text-label-md text-primary dark:text-teal-400 font-bold">CAMPAIGN INSIGHT</p>
                                <p className="font-body-sm text-body-sm text-slate-600 dark:text-slate-400">{insight}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branch Distribution Overview */}
                <div className="mb-8">
                    <CombinedDistributionCard 
                        title="Branch Distribution Overview" 
                        sub="Comparative analysis of clients and patients by location" 
                        data={branchDistribution} 
                    />
                </div>

                {/* Recent Metrics Table */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary dark:text-teal-400">history</span>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Recent Campaign Performance</h3>
                        </div>
                        <Link href={route('campaigns')} className="text-primary dark:text-teal-400 font-semibold text-sm hover:underline">View All Campaigns</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Campaign Name</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Template</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Segment Used</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clinic Staff</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Recipients Count</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Campaign Status</th>
                                    <th className="px-6 py-5 font-bold text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Date Sent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {recentCampaigns.data.map((camp, idx) => (
                                    <CampaignStatRow 
                                        key={idx} 
                                        name={camp.name} 
                                        template={camp.template} 
                                        segment={camp.segment}
                                        staff={camp.staff}
                                        recipients={camp.recipients} 
                                        status={camp.status} 
                                        dateSent={camp.date_sent} 
                                        isOngoing={camp.isOngoing} 
                                    />
                                ))}
                                {recentCampaigns.data.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-400 italic">No campaigns found in history.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {recentCampaigns.links && recentCampaigns.links.length > 3 && (
                        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Showing <span className="font-bold text-slate-900 dark:text-slate-200">{recentCampaigns.from}</span> to <span className="font-bold text-slate-900 dark:text-slate-200">{recentCampaigns.to}</span> of <span className="font-bold text-slate-900 dark:text-slate-200">{recentCampaigns.total}</span> campaigns
                            </div>
                            <div className="flex gap-1">
                                {recentCampaigns.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                                            link.active 
                                            ? 'bg-primary text-white shadow-sm' 
                                            : link.url 
                                                ? 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700' 
                                                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function PerformancePulse({ metrics }) {
    const pulseItems = [
        { label: 'Busiest Day', value: metrics.busiestDay, sub: `${metrics.busiestDayCount} Appointments • ${metrics.busiestDayType}`, trend: 'Peak', color: 'text-rose-500', spark: 'M0 20 L10 18 L20 15 L30 18 L40 5 L50 18 L60 20' },
        { label: 'Busiest Month', value: metrics.busiestMonth, sub: `${metrics.busiestMonthCount} Total`, trend: 'High', color: 'text-emerald-500', spark: 'M0 15 L10 12 L20 18 L30 14 L40 10 L50 4 L60 8' },
        { label: 'Top Template', value: metrics.topTemplate, sub: `${metrics.topTemplateCount} Uses`, trend: 'Hot', color: 'text-indigo-500', spark: 'M0 10 L10 5 L20 12 L30 8 L40 15 L50 10 L60 12' },
        { label: 'Top Segment', value: metrics.topSegment, sub: `${metrics.topSegmentCount} Campaigns`, trend: 'Targeted', color: 'text-cyan-500', spark: 'M0 20 L10 18 L20 12 L30 15 L40 10 L50 8 L60 5' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800">
                {pulseItems.map((item, idx) => (
                    <div key={idx} className="px-8 py-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{item.label}</span>
                            <span className={`text-[10px] font-bold ${item.trend.startsWith('+') || item.trend === 'Peak' ? 'text-emerald-500' : 'text-rose-500'} bg-emerald-500/10 px-1.5 py-0.5 rounded`}>
                                {item.trend}
                            </span>
                        </div>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <span className="text-3xl font-headline-lg text-slate-900 dark:text-white leading-none">
                                    {item.value}
                                </span>
                                {item.sub && <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-tighter">{item.sub}</p>}
                            </div>
                            <div className="shrink-0 pb-1">
                                <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className={item.color}>
                                    <path d={item.spark} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SegmentRow({ label, value, total, percent, color }) {
    return (
        <div>
            <div className="flex justify-between font-label-md text-label-md text-slate-700 dark:text-slate-300 mb-2">
                <span>{label}</span>
                <span>{value} / {total} Cats</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}

function CampaignStatRow({ name, template, segment, staff, recipients, status, dateSent, isOngoing }) {
    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800/50">
            <td className="px-6 py-5">
                <p className="font-bold text-slate-800 dark:text-slate-100 text-[13px]">{name}</p>
            </td>
            <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400 text-[13px]">
                {template}
            </td>
            <td className="px-6 py-5 font-medium text-slate-500 dark:text-slate-500 text-[12px]">
                {segment}
            </td>
            <td className="px-6 py-5 text-[12px]">
                <p className="font-bold text-slate-800 dark:text-slate-200 leading-none mb-1">{staff.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{staff.role}</p>
            </td>
            <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300 text-[13px] text-right">
                {recipients}
            </td>
            <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                    status === 'Completed' || status === 'Sent' 
                    ? 'bg-emerald-500 text-white' 
                    : isOngoing ? 'bg-blue-500 text-white' : 'bg-slate-500 text-white'
                }`}>
                    {status === 'Completed' ? 'Sent' : status}
                </span>
            </td>
            <td className="px-6 py-4 font-medium text-slate-400 dark:text-slate-500 text-[11px] text-right">
                {dateSent}
            </td>
        </tr>
    );
}
function CombinedDistributionCard({ title, sub, data }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                <div className="space-y-1">
                    <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100 flex items-center gap-2">
                        <span className="material-symbols-outlined">donut_large</span>
                        {title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400">{sub}</p>
                </div>
                <div className="flex gap-4 px-4 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Clients</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="text-[10px] uppercase font-bold text-primary dark:text-teal-400 tracking-wider">Patients</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-4">
                <div className="relative shrink-0">
                    <PieChart data={data} type="cats" />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm border border-slate-200 dark:border-slate-700">
                        Patient Vol.
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 flex-1 w-full py-4">
                    {data?.map((item, idx) => {
                        const colors = ['#3b82f6', '#10b981', '#06b6d4', '#f59e0b', '#6366f1', '#f43f5e', '#8b5cf6', '#f97316'];
                        return (
                            <div key={idx} className="flex items-center justify-between group border-b border-slate-100 dark:border-slate-800 pb-3 transition-colors hover:border-primary/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-10 rounded-full shadow-sm" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-none mb-1.5">{item.name}</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Branch</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10 text-right">
                                    <div>
                                        <p className="font-black text-slate-500 dark:text-slate-400 text-base leading-none mb-1">{item.clients}</p>
                                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Clients</p>
                                    </div>
                                    <div className="min-w-[40px]">
                                        <p className="font-black text-primary dark:text-teal-400 text-base leading-none mb-1">{item.cats}</p>
                                        <p className="text-[9px] text-primary dark:text-teal-400 uppercase font-bold tracking-tighter">Patients</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function PieChart({ data, type }) {
    const total = data?.reduce((acc, curr) => acc + (curr[type] || 0), 0) || 0;
    const colors = ['#3b82f6', '#10b981', '#06b6d4', '#f59e0b', '#6366f1', '#f43f5e', '#8b5cf6', '#f97316'];
    let accumulated = 0;
    const gradientParts = data?.map((item, idx) => {
        const percent = total > 0 ? (item[type] / total) * 100 : 0;
        const start = accumulated;
        accumulated += percent;
        return `${colors[idx % colors.length]} ${start}% ${accumulated}%`;
    }).join(', ');

    return (
        <div className="relative w-56 h-56 rounded-full shadow-2xl overflow-hidden flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-800" style={{ background: total > 0 ? `conic-gradient(${gradientParts})` : '#e2e8f0' }}>
            <div className="w-36 h-36 bg-white dark:bg-slate-900 rounded-full shadow-inner flex flex-col items-center justify-center border-4 border-slate-50 dark:border-slate-800">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total</span>
                <span className="text-3xl font-black text-primary dark:text-teal-100 tracking-tighter">{total.toLocaleString()}</span>
            </div>
        </div>
    );
}
