import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Templates({ templates = [] }) {
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: '',
        subject: '',
        body: '',
        category: 'General',
        status: 'Live',
    });

    const openCreateModal = () => {
        setEditingId(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (template) => {
        setEditingId(template.id);
        setData({
            name: template.name,
            subject: template.subject,
            body: template.body,
            category: template.category,
            status: template.status,
        });
        setShowModal(true);
    };

    const handleDestroy = (id) => {
        if (confirm('Are you sure you want to delete this template? This will be a soft delete.')) {
            router.delete(route('templates.destroy', id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            patch(route('templates.update', editingId), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route('templates.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    const categories = [
        "All Categories", "Vaccination Reminders", "Post-Surgery Care", 
        "New Patient Welcome", "Seasonal Newsletters", "Wellness Check-ups", "Prescription Refills"
    ];

    return (
        <AppLayout>
            <Head title="Email Template Library" />

            <div className="max-w-[1720px] mx-auto px-10 pt-2 pb-10 font-manrope">
                {/* Header & Filter Area */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                        <div className="space-y-1">
                            <h1 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Template Library</h1>
                            <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 leading-relaxed">Manage and deploy automated communications for your feline patients.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={openCreateModal}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                New Template
                            </button>
                        </div>
                    </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {templates.map((template) => (
                        <TemplateCard 
                            key={template.id}
                            title={template.name}
                            desc={template.subject || 'No subject defined.'}
                            category={template.category}
                            status={template.status}
                            statusColor={template.status === 'Live' ? 'bg-teal-500' : template.status === 'Draft' ? 'bg-amber-500' : 'bg-slate-400'}
                            edited={new Date(template.updated_at).toLocaleDateString()}
                            img={template.preview_image}
                            onEdit={() => openEditModal(template)}
                            onDelete={() => handleDestroy(template.id)}
                        />
                    ))}
                    {templates.length === 0 && (
                        <div className="col-span-full py-12 text-center text-outline dark:text-slate-500 italic">
                            No templates found.
                        </div>
                    )}
                </div>

                {/* Edit/Create Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">
                                    {editingId ? 'Edit Email Template' : 'Create New Template'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Template Name</label>
                                        <input required value={data.name} onChange={e => setData('name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Category</label>
                                        <input required value={data.category} onChange={e => setData('category', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Subject</label>
                                    <input required value={data.subject} onChange={e => setData('subject', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Body (Markdown)</label>
                                    <textarea required value={data.body} onChange={e => setData('body', e.target.value)} rows="8" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 font-mono outline-none focus:ring-2 focus:ring-primary/20" placeholder="Hello {{patient_name}}..." />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400">Cancel</button>
                                    <button disabled={processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                        {processing ? 'Saving...' : (editingId ? 'Update Template' : 'Create Template')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function TemplateCard({ title, desc, status, statusColor, edited, img, icon, onEdit, onDelete }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0 flex items-center justify-center">
                {img ? (
                    <img src={img} alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">{icon || 'mail'}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-4">
                    <span className={`px-2.5 py-1 ${statusColor} text-white text-[10px] font-bold rounded uppercase tracking-wider`}>{status}</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-sm text-primary dark:text-teal-100 font-bold leading-tight">{title}</h3>
                </div>
                <p className="font-body-sm text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{desc}</p>
                <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500 mb-6">
                    <span className="material-symbols-outlined text-xs mr-1">schedule</span>
                    Last edited {edited}
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 text-primary dark:text-teal-400 text-[11px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Preview</button>
                    <button onClick={onEdit} className="flex-1 py-2 bg-primary-container text-white text-[11px] font-bold rounded-lg hover:opacity-90 transition-colors">Edit</button>
                    <button onClick={onDelete} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
