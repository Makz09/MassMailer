import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Campaigns({ campaigns = [], templates = [], segments = [] }) {
    const [campaignName, setCampaignName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedSegmentId, setSelectedSegmentId] = useState('');
    const [isLaunching, setIsLaunching] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (!selectedTemplate || !campaignName || !selectedSegmentId) {
            return alert('Please fill in all fields before launching.');
        }

        setIsLaunching(true);
        router.post(route('campaigns.send'), {
            campaign_name: campaignName,
            template_id: selectedTemplate,
            segment_id: selectedSegmentId
        }, {
            onSuccess: () => {
                setCampaignName('');
                setSelectedTemplate('');
                setSelectedSegmentId('');
                setIsLaunching(false);
            },
            onFinish: () => setIsLaunching(false)
        });
    };

    return (
        <AppLayout>
            <Head title="Campaigns" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>Communications</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Campaigns</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Campaign Launchpad</h2>
                        <p className="text-outline text-body-md dark:text-slate-400 mt-2">Deploy mass communications to your targeted segments.</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Launch Form */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-6">Create New Campaign Blast</h3>
                            <form onSubmit={handleSend} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">label</span>
                                        1. Campaign Internal Name
                                    </label>
                                    <input 
                                        required 
                                        value={campaignName} 
                                        onChange={e => setCampaignName(e.target.value)} 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                                        placeholder="e.g. Q2 Vaccination Reminder Blast" 
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-outline uppercase tracking-widest flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px]">bookmarks</span>
                                            2. Target Audience Segment
                                        </label>
                                        <select 
                                            required 
                                            value={selectedSegmentId} 
                                            onChange={e => setSelectedSegmentId(e.target.value)} 
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        >
                                            <option value="">Choose a segment...</option>
                                            {segments.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.recipient_count} recipients)</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-outline uppercase tracking-widest flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px]">mail</span>
                                            3. Email Template
                                        </label>
                                        <select 
                                            required 
                                            value={selectedTemplate} 
                                            onChange={e => setSelectedTemplate(e.target.value)} 
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        >
                                            <option value="">Choose a template...</option>
                                            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                    <button 
                                        disabled={isLaunching}
                                        type="submit" 
                                        className={`px-10 py-4 bg-slate-900 dark:bg-teal-500 dark:text-slate-900 text-white rounded-xl font-black text-sm hover:opacity-90 transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-3 uppercase tracking-widest ${isLaunching ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span className={`material-symbols-outlined ${isLaunching ? 'animate-spin' : ''}`}>
                                            {isLaunching ? 'progress_activity' : 'rocket_launch'}
                                        </span>
                                        {isLaunching ? 'Sending Blast...' : 'Launch Email Blast'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Quick Stats / History */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-primary dark:bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 border border-primary/50 overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Campaigns</p>
                                    <span className="material-symbols-outlined opacity-60">analytics</span>
                                </div>
                                <h3 className="text-5xl font-black mb-2">{campaigns.length}</h3>
                                <p className="text-sm opacity-80 leading-relaxed">Active communication blasts deployed this year.</p>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Recent History</h4>
                            <div className="space-y-4">
                                {campaigns.slice(0, 5).map(c => (
                                    <div key={c.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-sm text-slate-400">check_circle</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{c.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-black mt-0.5">{new Date(c.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {campaigns.length === 0 && (
                                    <div className="py-6 text-center italic text-slate-400 text-xs">
                                        No campaigns launched yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
