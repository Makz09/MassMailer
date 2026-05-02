import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Analytics({ metrics, engagementTrends, segmentation, recentCampaigns }) {
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
                        <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 leading-relaxed">Deep dive into engagement metrics and patient conversion trends.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-primary dark:text-teal-400">calendar_month</span>
                            <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">Last 30 Days</span>
                            <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                        </div>
                        <button className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricBox 
                        icon="mail" 
                        label="Average Open Rate" 
                        value={`${metrics.avgOpenRate}%`} 
                        trend="+12%" 
                        progress={metrics.avgOpenRate} 
                        color="bg-primary"
                        iconBg="bg-teal-50 dark:bg-teal-900/20"
                    />
                    <MetricBox 
                        icon="ads_click" 
                        label="Click-Through Rate" 
                        value={`${metrics.avgClickRate}%`} 
                        trend="+5.2%" 
                        progress={metrics.avgClickRate} 
                        color="bg-secondary"
                        iconBg="bg-secondary-container dark:bg-pink-900/20"
                    />
                    <MetricBox 
                        icon="event_available" 
                        label="Appt. Conversion" 
                        value={metrics.totalBookings} 
                        trend="0.5%" 
                        isFlat
                        sub="Total campaign bookings"
                        iconBg="bg-primary-container dark:bg-teal-900/40"
                    />
                    <MetricBox 
                        icon="group_add" 
                        label="Total Patients" 
                        value={metrics.totalPatients} 
                        trend="+24%" 
                        sub="Total active patients"
                        iconBg="bg-tertiary-container dark:bg-teal-900/60"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    {/* Engagement Trends */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Engagement Trends</h3>
                                <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400">Comparison of open and click rates across recent campaigns</p>
                            </div>
                            <div className="flex gap-4">
                                <LegendItem color="bg-primary" label="Open Rate" />
                                <LegendItem color="bg-secondary" label="Click Rate" />
                            </div>
                        </div>
                        {/* Real-time Chart */}
                        <div className="relative w-full h-64 flex items-end justify-between px-2 pt-4">
                            <div className="absolute inset-0 flex flex-col justify-between py-1">
                                {[1,2,3,4].map(i => <div key={i} className="border-b border-slate-100 dark:border-slate-800 w-full h-0"></div>)}
                            </div>
                            {engagementTrends.length > 0 ? (
                                engagementTrends.map((data, idx) => (
                                    <ChartBar key={idx} date={data.date} open={data.open_rate} click={data.click_rate} />
                                ))
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-sm">No campaign data available yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Audience Segmentation */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100 mb-2">Audience Segmentation</h3>
                        <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400 mb-8">Patient distribution by breed</p>
                        <div className="space-y-6">
                            {segmentation.map((seg, idx) => (
                                <SegmentRow key={idx} label={seg.label} value={seg.value} percent={seg.percent} color={idx % 2 === 0 ? 'bg-primary' : 'bg-secondary'} />
                            ))}
                            {segmentation.length === 0 && (
                                <p className="text-slate-400 italic text-sm">No segmentation data found.</p>
                            )}
                        </div>
                        <div className="mt-10 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-sm">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD0ZifY1k9Ywy8XeCIZVrO3_C6pPqRvf7mWhpo42kVNUAAfZok0kMo-rxpPEiCRRTGmW7N6RKiLNlMRRsPJTv3IZGvuyNzSNwMquj_7LOu_21kJeimLvT1oXaX1vWH9epdfAm_u3dRzMH8XUqTF7ffvh3QVAu0tlAXnHO5fCK9P7uqkuM6oORsEldEx3O4PnXKEjshtlVC3oRq2AJUfNNBjmpRX0vfvk-I57_C6X4E_R2jSoRo2lyG_sQWtH8iWCbmPQx5DRmTJX4U" alt="Insight" />
                            </div>
                            <div>
                                <p className="font-label-md text-label-md text-primary dark:text-teal-400 font-bold">CAMPAIGN INSIGHT</p>
                                <p className="font-body-sm text-body-sm text-slate-600 dark:text-slate-400">"Persian cat owners" are 3x more likely to book grooming via email.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Metrics Table */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Recent Campaign Metrics</h3>
                        <button className="text-primary dark:text-teal-400 font-semibold text-sm hover:underline">View All Campaigns</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Campaign Name</th>
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date/Status</th>
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Opens</th>
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clicks</th>
                                    <th className="px-6 py-5 font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bookings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {recentCampaigns.map((camp, idx) => (
                                    <CampaignStatRow 
                                        key={idx}
                                        name={camp.name} 
                                        target={camp.target} 
                                        status={camp.status} 
                                        date={camp.date} 
                                        opens={camp.opens} 
                                        clicks={camp.clicks} 
                                        bookings={camp.bookings} 
                                        isOngoing={camp.isOngoing}
                                    />
                                ))}
                                {recentCampaigns.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400 italic">No campaigns found in history.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function MetricBox({ icon, label, value, trend, progress, color, isFlat = false, sub, iconBg }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 ${iconBg} rounded-lg`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`flex items-center font-bold text-sm px-2 py-0.5 rounded-full ${
                    isFlat ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                }`}>
                    <span className="material-symbols-outlined text-xs mr-1">{isFlat ? 'trending_flat' : 'trending_up'}</span> {trend}
                </span>
            </div>
            <p className="font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="font-headline-lg text-headline-lg text-primary dark:text-teal-100 mt-1">{value}</p>
            {progress !== undefined ? (
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className={`${color} h-full`} style={{ width: `${progress}%` }}></div>
                </div>
            ) : (
                <p className="font-body-sm text-body-sm text-slate-400 dark:text-slate-500 mt-2">{sub}</p>
            )}
        </div>
    );
}

function LegendItem({ color, label }) {
    return (
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span className="font-label-md text-label-md text-slate-600 dark:text-slate-400">{label}</span>
        </div>
    );
}

function ChartBar({ date, open, click }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-end gap-2 group cursor-pointer h-full">
            <div className="w-full flex items-end justify-center gap-1 h-full px-1">
                <div className="w-3 bg-primary rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${open}%` }}></div>
                <div className="w-3 bg-secondary rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${click}%` }}></div>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{date}</span>
        </div>
    );
}

function SegmentRow({ label, value, percent, color }) {
    return (
        <div>
            <div className="flex justify-between font-label-md text-label-md text-slate-700 dark:text-slate-300 mb-2">
                <span>{label}</span>
                <span>{value} ({percent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}

function CampaignStatRow({ name, target, status, date, opens, clicks, bookings, isOngoing }) {
    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
            <td className="px-6 py-5">
                <p className="font-body-md text-body-md text-primary dark:text-teal-100 font-bold">{name}</p>
                <p className="font-body-sm text-body-sm text-slate-400 dark:text-slate-500">{target}</p>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isOngoing ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 font-body-sm text-body-sm text-slate-600 dark:text-slate-400">{date}</td>
            <td className="px-6 py-4 font-body-sm text-body-sm text-slate-900 dark:text-slate-200 font-bold">{opens}</td>
            <td className="px-6 py-4 font-body-sm text-body-sm text-slate-900 dark:text-slate-200 font-bold">{clicks}</td>
            <td className="px-6 py-4 font-body-sm text-body-sm text-primary dark:text-teal-400 font-bold">{bookings}</td>
        </tr>
    );
}
