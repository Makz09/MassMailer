import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Reports() {
    return (
        <AppLayout>
            <Head title="Reports Engine" />

            <div className="max-w-[1720px] mx-auto px-10 pt-6 pb-10 font-manrope">
                {/* Welcome & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Reports Engine</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">Access deep-dive analytics and performance metrics. Generate professional insights for your clinic's growth and patient engagement.</p>
                    </div>
                    <button className="flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 group">
                        <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-300">add_chart</span>
                        <span className="font-bold tracking-tight">Generate New Report</span>
                    </button>
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
                                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Email Marketing</span>
                                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase tracking-wider">SMS Alerts</span>
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">Last updated: 2h ago</span>
                            <button className="text-primary dark:text-teal-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Configure Report <span className="material-symbols-outlined text-sm">chevron_right</span>
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
                                <p className="text-on-primary-container opacity-90 text-body-md mb-8 max-w-sm">Deep analysis of pet owner loyalty, appointment frequency, and post-visit satisfaction levels.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Satisfaction</p>
                                        <p className="text-white text-2xl font-black">94.8%</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Retention</p>
                                        <p className="text-white text-2xl font-black">+12.4%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-1 items-center justify-center">
                                <img className="rounded-xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEbjEp6UHLTEH8o1bOnsHpCgm4hwuz8L2uinLv3NBXlnaNqhuCrFiKYEQOEHhabijaFdZ7nkhYw6-ZotP4L9nDAKhkDWlbHv5HxIF71SJH63rw1DLWmjdE-8E_nmTIEvj-ImQC1SbqT94TmZMamT5doPEZhnGQMKfN3L8DqhkGpGOiHixXjWxgRvc_P2Ir7gc7J3Dgz1ZP6qIYzx7P7riZVPC1YW1TT1l9fBuB5n4uKkuQE6JfBxCteYVDtsiBMXJ5uplq-qaXD_oz" alt="Data visualization" />
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
                            <p className="text-on-secondary-fixed-variant dark:text-slate-400 text-body-md max-w-2xl">Compare multi-location performance, staff efficiency, and resource allocation across all "The Cat Desk" partner clinics.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-white dark:bg-slate-700 text-secondary dark:text-teal-400 font-bold px-6 py-3 rounded-lg border border-secondary-container dark:border-slate-600 hover:bg-secondary-container dark:hover:bg-slate-600 transition-colors">Download All Logs</button>
                            <button className="bg-primary text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">View Map Distribution</button>
                        </div>
                    </div>
                </div>

                {/* Recent Reports Table */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-12">
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <div>
                            <h3 className="font-headline-md text-headline-md text-primary dark:text-teal-100">Recent Generative Reports</h3>
                            <p className="text-body-sm text-slate-500 dark:text-slate-400">History of the last reports processed by the engine.</p>
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
                                    name="Q3_Patient_Growth_Analysis" 
                                    meta="PDF • 4.2 MB" 
                                    category="Client Engagement" 
                                    catColor="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                    span="Jul 2023 - Sep 2023"
                                    status="Complete"
                                    statusColor="bg-emerald-500"
                                />
                                <ReportRow 
                                    name="Spring_Vaccination_Campaign_ROI" 
                                    meta="XLSX • 1.8 MB" 
                                    category="Campaign Performance" 
                                    catColor="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                                    span="Mar 2023 - May 2023"
                                    status="Complete"
                                    statusColor="bg-emerald-500"
                                    icon="campaign"
                                />
                                <ReportRow 
                                    name="Annual_Branch_Efficiency_2023" 
                                    meta="Generating..." 
                                    category="Branch Statistics" 
                                    catColor="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                                    span="Jan 2023 - Oct 2023"
                                    status="Processing"
                                    statusColor="bg-amber-400 animate-pulse"
                                    icon="hub"
                                    isProcessing
                                />
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Footer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FooterStat icon="trending_up" color="bg-secondary-container dark:bg-pink-900/20 text-secondary dark:text-pink-400" label="Storage Used" value="12.4 GB" sub="/ 50GB" />
                    <FooterStat icon="task_alt" color="bg-primary-fixed dark:bg-teal-900/40 text-primary dark:text-teal-400" label="Scheduled Reports" value="8 Active" />
                    <FooterStat icon="group_add" color="bg-tertiary-fixed dark:bg-teal-900/20 text-tertiary dark:text-teal-400" label="Shared With" value="4 Staff Members" />
                </div>
            </div>
        </AppLayout>
    );
}

function ReportRow({ name, meta, category, catColor, span, status, statusColor, icon = 'description', isProcessing = false }) {
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
                    <button className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-lg transition-colors">
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
