import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Campaigns({ campaigns = [], templates = [] }) {
    const [filters, setFilters] = useState([
        { field: 'Status', op: 'is', val: 'Active' }
    ]);
    const [campaignName, setCampaignName] = useState('New Campaign — ' + new Date().toLocaleDateString());
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id || '');

    const { post, processing, errors } = useForm();

    const handleAddFilter = () => {
        setFilters([...filters, { field: 'Name', op: 'contains', val: '' }]);
    };

    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const handleUpdateFilter = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };

    const handleSend = (e) => {
        e.preventDefault();
        router.post(route('campaigns.send'), {
            template_id: selectedTemplate,
            campaign_name: campaignName,
            filters: filters
        }, {
            onSuccess: () => {
                alert('Campaign initiated successfully!');
            }
        });
    };

    const handleDeleteCampaign = (id) => {
        if (confirm('Are you sure you want to delete this campaign record? This is a soft delete.')) {
            router.delete(route('campaigns.destroy', id));
        }
    };

    const totalRecipients = useMemo(() => campaigns.reduce((acc, curr) => acc + (curr.total_recipients || 0), 0), [campaigns]);
    const totalOpens = useMemo(() => campaigns.reduce((acc, curr) => acc + (curr.opens || 0), 0), [campaigns]);
    const totalClicks = useMemo(() => campaigns.reduce((acc, curr) => acc + (curr.clicks || 0), 0), [campaigns]);

    return (
        <AppLayout>
            <Head title="Advanced Recipient Filtering" />

            <div className="max-w-[1720px] mx-auto px-10 pt-2 pb-10 font-manrope">
                {/* Breadcrumbs & Header */}
                <div className="mb-4">
                    <nav className="flex items-center gap-2 text-label-md text-outline mb-2">
                        <span>Campaigns</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-primary font-bold">Segment Builder</span>
                    </nav>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Campaign Builder</h2>
                            <p className="text-body-md text-outline dark:text-slate-400">Define precise rules to segment your feline database and deploy targeted campaigns.</p>
                        </div>
                        <button 
                            onClick={handleSend}
                            disabled={processing || !selectedTemplate}
                            className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">rocket_launch</span>
                            Deploy Campaign
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Filter Rules Canvas */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        {/* Rule Group 1 */}
                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-primary dark:text-teal-400">
                                        <span className="material-symbols-outlined text-sm">tune</span>
                                    </div>
                                    <h3 className="font-bold text-on-surface dark:text-teal-50">Segmentation Rules</h3>
                                </div>
                                <span className="text-xs font-bold text-outline dark:text-slate-500 uppercase tracking-widest">Logic: AND</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                {filters.map((filter, index) => (
                                    <FilterRow 
                                        key={index}
                                        field={filter.field}
                                        op={filter.op}
                                        val={filter.val}
                                        onChange={(f, v) => handleUpdateFilter(index, f, v)}
                                        onRemove={() => handleRemoveFilter(index)}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={handleAddFilter}
                                className="w-full py-4 border-2 border-dashed border-outline-variant dark:border-slate-800 rounded-xl text-body-sm font-bold text-outline hover:text-primary hover:border-primary dark:hover:text-teal-400 dark:hover:border-teal-400 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Add Segmentation Rule
                            </button>
                        </div>

                        {/* Template Selection Section */}
                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-on-surface dark:text-teal-50 mb-6">Execution & Payload</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-outline uppercase tracking-widest">Campaign Label</label>
                                    <input 
                                        type="text" 
                                        value={campaignName}
                                        onChange={e => setCampaignName(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 font-medium focus:ring-2 focus:ring-primary dark:text-slate-200" 
                                        placeholder="Enter campaign name..." 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-outline uppercase tracking-widest">Select Template</label>
                                    <select 
                                        value={selectedTemplate}
                                        onChange={e => setSelectedTemplate(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-4 py-3 font-medium focus:ring-2 focus:ring-primary dark:text-slate-200"
                                    >
                                        <option value="" disabled>Choose a template...</option>
                                        {templates.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reach Prediction Sidebar */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Real-time Count Card */}
                        <div className="bg-primary-container text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-on-primary-container font-bold text-label-md uppercase tracking-widest">Global Reach</span>
                                    <span className="material-symbols-outlined text-on-primary-container">groups</span>
                                </div>
                                <div className="text-[42px] font-extrabold leading-none mb-2">{totalRecipients.toLocaleString()}</div>
                                <p className="text-body-sm text-on-primary-container opacity-90">Total recipients across all sent campaigns.</p>
                                <div className="mt-6 bg-white/10 rounded-full h-2 w-full overflow-hidden">
                                    <div className="bg-secondary-fixed h-full w-[65%]"></div>
                                </div>
                            </div>
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-tertiary-container/30 rounded-full blur-3xl"></div>
                        </div>

                        {/* Breakdown */}
                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h3 className="font-headline-md text-primary dark:text-teal-100 mb-4 text-[18px]">Performance Snapshot</h3>
                            <div className="space-y-4">
                                <BreakdownRow color="bg-primary" label="Total Opens" count={totalOpens} />
                                <BreakdownRow color="bg-secondary" label="Total Clicks" count={totalClicks} />
                                <BreakdownRow color="bg-teal-300" label="Active Campaigns" count={campaigns.filter(c => c.status === 'Sent' || c.status === 'Completed').length} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaign History Table */}
                <div className="mt-6 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm mb-6">
                    <div className="p-6 border-b border-outline-variant dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="font-headline-md text-[20px] text-primary dark:text-teal-100">Campaign History</h3>
                        <div className="flex items-center gap-2 text-body-sm text-outline dark:text-slate-400">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            Showing last {campaigns.length} campaigns
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-outline-variant dark:border-slate-700 text-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-5 font-bold">Campaign Name</th>
                                    <th className="px-6 py-5 font-bold">Status</th>
                                    <th className="px-6 py-5 font-bold">Sent Date</th>
                                    <th className="px-6 py-5 font-bold">Engagement</th>
                                    <th className="px-6 py-5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                                {campaigns.map(campaign => (
                                    <CampaignHistoryRow 
                                        key={campaign.id}
                                        name={campaign.name}
                                        status={campaign.status}
                                        date={campaign.sent_at ? new Date(campaign.sent_at).toLocaleDateString() : 'Pending'}
                                        recipients={campaign.total_recipients}
                                        opens={campaign.opens}
                                        onDelete={() => handleDeleteCampaign(campaign.id)}
                                    />
                                ))}
                                {campaigns.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-outline italic">No campaign history found.</td>
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

function CampaignHistoryRow({ name, status, date, recipients, opens, onDelete }) {
    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
            <td className="px-6 py-4">
                <div className="font-bold text-on-surface dark:text-slate-200">{name}</div>
                <div className="text-xs text-outline dark:text-slate-500">Scheduled Payload: Standard JSON</div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    status === 'Completed' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-primary-container/10 text-primary-container'
                }`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-body-sm text-outline dark:text-slate-400">{date}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="text-body-sm font-bold text-on-surface dark:text-slate-200">{recipients} <span className="text-[10px] text-outline font-normal">Recipients</span></div>
                    <div className="text-body-sm font-bold text-teal-600">{opens} <span className="text-[10px] text-outline font-normal">Opens</span></div>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-primary transition-colors rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button onClick={onDelete} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}

function FilterRow({ field, op, val, onChange, onRemove }) {
    const fields = ['Name', 'Breed', 'Status', 'Health Score', 'Last Visit'];
    const operators = ['is', 'is not', 'contains', 'greater than', 'less than'];
    const type = field === 'Last Visit' ? 'date' : field === 'Health Score' ? 'number' : 'text';

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl group transition-all">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <select 
                    value={field}
                    onChange={e => onChange('field', e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-4 py-2 text-body-sm focus:ring-2 focus:ring-primary outline-none dark:text-slate-200"
                >
                    {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <select 
                    value={op}
                    onChange={e => onChange('op', e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-4 py-2 text-body-sm focus:ring-2 focus:ring-primary outline-none dark:text-slate-200"
                >
                    {operators.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <input 
                    className="w-full bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-4 py-2 text-body-sm focus:ring-2 focus:ring-primary outline-none dark:text-slate-200" 
                    type={type} 
                    value={val}
                    onChange={e => onChange('val', e.target.value)}
                    placeholder="Value..."
                />
            </div>
            <button 
                onClick={onRemove}
                className="p-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
}

function BreakdownRow({ color, label, count }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${color}`}></div>
                <span className="text-body-sm text-outline dark:text-slate-400 font-medium">{label}</span>
            </div>
            <span className="text-body-sm font-bold text-on-surface dark:text-slate-200">{count.toLocaleString()}</span>
        </div>
    );
}
