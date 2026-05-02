import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Segments({ campaigns = [], templates = [], segments = [], availableColumns = [] }) {
    const [groups, setGroups] = useState([
        { id: Date.now(), matchType: 'ALL', rules: [{ id: Date.now() + 1, field: 'branch', op: 'is', val: '' }] }
    ]);
    const [previewResults, setPreviewResults] = useState({ 
        patients: [], 
        total: 0,
        stats: {
            total_database: 0,
            branches: [],
            status: [],
            due_vaccination: 0
        }
    });

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const addGroup = () => {
        setGroups([...groups, { id: Date.now(), matchType: 'ALL', rules: [{ id: Date.now() + 1, field: 'branch', op: 'is', val: '' }] }]);
    };

    const removeGroup = (groupId) => {
        if (groups.length > 1) setGroups(groups.filter(g => g.id !== groupId));
    };

    const addRule = (groupId) => {
        setGroups(groups.map(g => g.id === groupId ? { ...g, rules: [...g.rules, { id: Date.now(), field: 'branch', op: 'is', val: '' }] } : g));
    };

    const removeRule = (groupId, ruleId) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                const newRules = g.rules.filter(r => r.id !== ruleId);
                return { ...g, rules: newRules.length > 0 ? newRules : [{ id: Date.now(), field: 'branch', op: 'is', val: '' }] };
            }
            return g;
        }));
    };

    const updateRule = (groupId, ruleId, updates) => {
        setGroups(groups.map(g => g.id === groupId ? { ...g, rules: g.rules.map(r => r.id === ruleId ? { ...r, ...updates } : r) } : g));
    };

    // Auto-fetch preview on groups change with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPreview();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [groups]);

    const fetchPreview = async () => {
        setLoadingPreview(true);
        try {
            const response = await axios.post(route('campaigns.preview'), { groups });
            setPreviewResults(response.data);
            setShowPreview(true);
        } catch (error) {
            console.error('Preview failed', error);
        } finally {
            setLoadingPreview(false);
        }
    };

    const saveSegment = () => {
        const name = prompt('Enter a name for this segment:');
        if (name) {
            router.post(route('segments.store'), {
                name,
                rules: groups,
                recipient_count: previewResults.total
            });
        }
    };

    const applySegment = (segment) => {
        setGroups(segment.rules);
        setShowPreview(false);
    };

    const deleteSegment = (id) => {
        if (confirm('Are you sure you want to delete this segment?')) {
            router.delete(route('segments.destroy', id));
        }
    };

    const renameSegment = (id, currentName) => {
        const name = prompt('Enter new name:', currentName);
        if (name && name !== currentName) {
            router.put(route('segments.update', id), { name });
        }
    };

    const duplicateSegment = (id) => {
        router.post(route('segments.duplicate', id));
    };

    // Calculate segment potential percentage
    const segmentPotential = previewResults.stats.total_database > 0 
        ? Math.round((previewResults.total / previewResults.stats.total_database) * 100) 
        : 0;

    const generateTip = () => {
        if (previewResults.stats.due_vaccination > 0) {
            return `Insight: ${previewResults.stats.due_vaccination} patients in this segment are overdue for vaccinations. A clinical reminder could boost bookings by 15%.`;
        }
        if (previewResults.total > 50) {
            return "Tip: Large segments are great for newsletters, but smaller, highly-targeted segments (under 20) often see 3x higher click rates.";
        }
        return "Tip: Targeting owners based on their preferred branch ensures a more personalized and local experience for your clients.";
    };

    return (
        <AppLayout>
            <Head title="Audience Segmentation" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                {/* Header with Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>Campaigns</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Audience Segmentation</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Advanced Recipient Filtering</h2>
                        <p className="text-outline text-body-md dark:text-slate-400 mt-2">Build precise segments based on owner data and feline medical history.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={saveSegment} className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            Save Segment
                        </button>
                    </div>
                </div>

                {/* Saved Segments Horizontal Bar */}
                {segments.length > 0 && (
                    <div className="mb-8 overflow-hidden">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-slate-400 text-sm">bookmarks</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saved Segments :</span>
                        </div>
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
                            {segments.map((s) => (
                                <div 
                                    key={s.id} 
                                    className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 shadow-sm hover:border-primary/30 transition-all group shrink-0"
                                >
                                    <button 
                                        onClick={() => applySegment(s)}
                                        className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        {s.name}
                                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-md font-black">
                                            {s.recipient_count}
                                        </span>
                                    </button>
                                    
                                    <div className="flex items-center gap-1 ml-2 border-l border-slate-100 dark:border-slate-800 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => duplicateSegment(s.id)} title="Duplicate" className="p-1 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm">content_copy</span>
                                        </button>
                                        <button onClick={() => renameSegment(s.id, s.name)} title="Rename" className="p-1 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button onClick={() => deleteSegment(s.id)} title="Delete" className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Rule Builder */}
                    <div className="col-span-8 space-y-6">
                        {groups.map((group, gIdx) => (
                            <div key={group.id} className="relative">
                                {gIdx > 0 && (
                                    <div className="flex items-center justify-center my-6">
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                        <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">OR</span>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                    </div>
                                )}
                                
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md uppercase tracking-wider">Group {gIdx + 1}</span>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Match ALL of the following rules</p>
                                        </div>
                                        <button onClick={() => removeGroup(group.id)} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Delete Group
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {group.rules.map((rule) => (
                                            <FilterRow 
                                                key={rule.id} 
                                                rule={rule} 
                                                availableColumns={availableColumns}
                                                onUpdate={(updates) => updateRule(group.id, rule.id, updates)}
                                                onRemove={() => removeRule(group.id, rule.id)}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => addRule(group.id)}
                                        className="mt-6 flex items-center gap-2 text-[10px] font-black text-primary dark:text-teal-400 uppercase tracking-widest hover:opacity-80 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-sm">add_circle</span>
                                        Add Rule
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button 
                            onClick={addGroup}
                            className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/50 hover:text-primary transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-2xl">add</span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold">Add Alternative Rule Group</p>
                                <p className="text-xs">Target recipients who meet a different set of criteria.</p>
                            </div>
                        </button>
                    </div>

                    {/* Right Column: Insights & Quick Stats */}
                    <div className="col-span-4 space-y-6">
                        <div className="bg-primary dark:bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 border border-primary/50 overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Recipients</p>
                                <span className="material-symbols-outlined opacity-60">groups</span>
                            </div>
                            <h3 className="text-5xl font-black mb-2">{previewResults.total.toLocaleString()}</h3>
                            <p className="text-sm opacity-80 leading-relaxed mb-6">Recipients match your current filter settings.</p>
                            
                            <div className="space-y-2">
                                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-400" style={{ width: `${segmentPotential}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider opacity-60">
                                    <span>0%</span>
                                    <span>{segmentPotential}% Segment Potential</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Segment Breakdown</h4>
                            <div className="space-y-6">
                                {previewResults.stats.branches.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Branch Distribution</p>
                                        <div className="space-y-3">
                                            {previewResults.stats.branches.map(b => (
                                                <BreakdownItem key={b.branch} label={b.branch || 'Unknown'} value={b.total} color="bg-primary" />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {previewResults.stats.status.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Health Status</p>
                                        <div className="space-y-3">
                                            {previewResults.stats.status.map(s => (
                                                <BreakdownItem key={s.status} label={s.status} value={s.total} color={s.status === 'Critical' ? 'bg-orange-400' : 'bg-teal-500'} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {previewResults.total === 0 && (
                                    <div className="py-10 text-center">
                                        <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">analytics</span>
                                        <p className="text-xs text-slate-400 italic">No data to display. Please preview your filters.</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" className="w-full h-32 object-cover rounded-lg mb-3" />
                                <p className="text-[10px] font-bold text-primary dark:text-teal-400 leading-relaxed italic">
                                    "{generateTip()}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipient Preview List */}
                {showPreview && previewResults.patients.length > 0 && (
                    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Live Recipient Preview (Top 10)</h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {previewResults.patients.length} of {previewResults.total} matched records</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient & Owner</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {previewResults.patients.map(p => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{p.name}</p>
                                                <p className="text-[10px] text-slate-500 uppercase font-medium">{p.owner_name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400 font-medium">{p.email}</td>
                                            <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">{p.branch}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${p.status === 'Active' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'}`}>{p.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-slate-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function FilterRow({ rule, onUpdate, onRemove, availableColumns = [] }) {
    const currentColumn = availableColumns.find(c => c.name === rule.field) || availableColumns[0] || { name: 'branch', type: 'string', label: 'Branch' };
    const type = currentColumn.type;
    const [recommendations, setRecommendations] = useState([]);
    const [showRecs, setShowRecs] = useState(false);
    const recRef = useRef(null);

    const fetchRecs = async () => {
        if (type === 'date' || type === 'boolean') return;
        try {
            const response = await axios.get(route('segments.values'), { params: { column: rule.field } });
            setRecommendations(response.data);
            setShowRecs(true);
        } catch (error) {
            console.error('Failed to fetch recommendations', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (recRef.current && !recRef.current.contains(event.target)) {
                setShowRecs(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const operatorsByType = {
        date: [
            { label: 'Is exactly', value: 'eq' },
            { label: 'Is today', value: 'today' },
            { label: 'Is before', value: 'before' },
            { label: 'Is after', value: 'after' },
            { label: 'Is between', value: 'between' },
            { label: 'Is more than', value: 'more_than' },
            { label: 'Is less than', value: 'less_than' },
            { label: 'Is known', value: 'known' },
            { label: 'Is unknown', value: 'unknown' },
            { label: 'Relative Range...', value: 'preset' },
        ],
        string: [
            { label: 'Contains', value: 'contains' },
            { label: 'Does not contain', value: 'does_not_contain' },
            { label: 'Starts with', value: 'starts_with' },
            { label: 'Ends with', value: 'ends_with' },
            { label: 'Is exactly', value: 'is' },
            { label: 'Is not', value: 'is_not' },
            { label: 'Is known', value: 'known' },
            { label: 'Is unknown', value: 'unknown' },
        ],
        number: [
            { label: 'Equal to (=)', value: 'eq' },
            { label: 'Not equal to (≠)', value: 'not_eq' },
            { label: 'Greater than (>)', value: 'greater_than' },
            { label: 'Less than (<)', value: 'less_than' },
            { label: 'Between', value: 'between' },
            { label: 'Is known', value: 'known' },
            { label: 'Is unknown', value: 'unknown' },
        ],
        boolean: [
            { label: 'Is True', value: 'eq' },
            { label: 'Is False', value: 'not_eq' },
        ]
    };

    const currentOperators = operatorsByType[type] || operatorsByType.string;

    const datePresets = [
        { group: 'Days', options: [
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'Tomorrow', value: 'tomorrow' },
            { label: 'Last 7 days', value: 'last_7_days' },
            { label: 'Last 30 days', value: 'last_30_days' },
            { label: 'Last 90 days', value: 'last_90_days' },
            { label: 'Last 360 days', value: 'last_360_days' },
        ]},
        { group: 'Current Periods', options: [
            { label: 'This week', value: 'this_week' },
            { label: 'This week so far', value: 'this_week_so_far' },
            { label: 'This month', value: 'this_month' },
            { label: 'This month so far', value: 'this_month_so_far' },
            { label: 'This quarter', value: 'this_quarter' },
            { label: 'This year', value: 'this_year' },
        ]},
        { group: 'Past/Future', options: [
            { label: 'Last week', value: 'last_week' },
            { label: 'Last month', value: 'last_month' },
            { label: 'Last quarter', value: 'last_quarter' },
            { label: 'Last year', value: 'last_year' },
            { label: 'Next month', value: 'next_month' },
            { label: 'Next year', value: 'next_year' },
        ]}
    ];

    const needsManualValue = !['known', 'unknown', 'today', 'preset'].includes(rule.op);
    const isBetween = rule.op === 'between';
    const isPreset = rule.op === 'preset';

    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/50 transition-all hover:border-primary/20">
            <div className="flex items-center gap-3">
                <div className="w-56">
                    <select 
                        value={rule.field} 
                        onChange={e => {
                            const newCol = availableColumns.find(c => c.name === e.target.value);
                            onUpdate({ 
                                field: e.target.value, 
                                op: newCol.type === 'date' ? 'preset' : (newCol.type === 'number' ? 'eq' : 'contains'), 
                                val: '' 
                            });
                            setShowRecs(false);
                        }}
                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        {availableColumns.map(f => <option key={f.name} value={f.name}>{f.label}</option>)}
                    </select>
                </div>

                <div className="w-52">
                    <select 
                        value={rule.op} 
                        onChange={e => onUpdate({ op: e.target.value, val: e.target.value === 'preset' ? 'today' : '' })}
                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-medium"
                    >
                        {currentOperators.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>

                <div className="flex-1 flex items-center gap-2 relative" ref={recRef}>
                    {isPreset ? (
                        <select 
                            value={rule.val}
                            onChange={e => onUpdate({ val: e.target.value })}
                            className="flex-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                        >
                            {datePresets.map(group => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    ) : isBetween ? (
                        <div className="flex-1 flex items-center gap-2">
                            <input 
                                type={type === 'date' ? 'date' : 'number'}
                                value={rule.val?.split(',')[0] || ''} 
                                onChange={e => onUpdate({ val: `${e.target.value},${rule.val?.split(',')[1] || ''}` })}
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                placeholder="From"
                            />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">and</span>
                            <input 
                                type={type === 'date' ? 'date' : 'number'}
                                value={rule.val?.split(',')[1] || ''} 
                                onChange={e => onUpdate({ val: `${rule.val?.split(',')[0] || ''},${e.target.value}` })}
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                placeholder="To"
                            />
                        </div>
                    ) : needsManualValue ? (
                        <div className="relative flex-1">
                            <input 
                                type={type === 'date' ? 'date' : (type === 'number' ? 'number' : 'text')}
                                value={rule.val} 
                                onFocus={fetchRecs}
                                onChange={e => onUpdate({ val: e.target.value })}
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                placeholder={type === 'number' ? 'Enter number...' : 'Type value...'}
                            />
                            {showRecs && recommendations.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] max-h-48 overflow-y-auto py-2 custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                                    <p className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 mb-1">Recommended Inputs</p>
                                    {recommendations.map((rec, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => {
                                                onUpdate({ val: rec });
                                                setShowRecs(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium flex items-center justify-between group"
                                        >
                                            {rec}
                                            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                            No manual input required
                        </div>
                    )}
                </div>

                <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-lg">cancel</span>
                </button>
            </div>
        </div>
    );
}

function BreakdownItem({ label, value, color }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{value}</span>
        </div>
    );
}
