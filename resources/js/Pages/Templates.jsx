import AppLayout from '../Layouts/AppLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Templates(props) {
    const templates = props.templates || { data: [], links: [] };
    const filters = props.filters || {};
    const categories = props.categories || [];

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const editorRef = useRef(null);
    const isInitialMount = useRef(true);

    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const availableColumns = props.availableColumns || [];

    // Map dynamic database columns to email placeholders
    const PLACEHOLDERS = availableColumns.map(col => ({
        label: col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: `{{${col}}}`
    }));

    const insertPlaceholder = (placeholder) => {
        if (editorRef.current) {
            editorRef.current.insertContent(placeholder);
        }
    };

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: '',
        subject: '',
        body: '',
        category: 'General',
        status: 'Live',
    });

    // Handle Search Debounce
    useEffect(() => {
        if (isInitialMount.current) return;

        const timer = setTimeout(() => {
            router.get(route('templates'), { 
                search, 
                category: categoryFilter, 
                status: statusFilter 
            }, { 
                preserveState: true, 
                replace: true 
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Handle Instant Filters (Category & Status)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        router.get(route('templates'), { 
            search, 
            category: categoryFilter, 
            status: statusFilter 
        }, { 
            preserveState: true, 
            replace: true 
        });
    }, [categoryFilter, statusFilter]);

    // Real-time Placeholder Sync: Poll for new database columns
    useEffect(() => {
        const syncPlaceholders = setInterval(() => {
            router.reload({ only: ['availableColumns'], preserveScroll: true, preserveState: true });
        }, 5000);
        return () => clearInterval(syncPlaceholders);
    }, []);

    const openCreateModal = () => {
        setEditingId(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (template) => {
        setEditingId(template.id);
        setData({
            name: template.name || '',
            subject: template.subject || '',
            body: template.body || '',
            category: template.category || 'General',
            status: template.status || 'Live',
        });
        setShowModal(true);
    };

    const handleDestroy = (id) => {
        if (confirm('Are you sure you want to delete this template?')) {
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
                onError: (err) => {
                    console.error('Update failed:', err);
                }
            });
        } else {
            post(route('templates.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
                onError: (err) => {
                    console.error('Store failed:', err);
                }
            });
        }
    };

    const statusOptions = ['Live', 'Active', 'Inactive', 'Draft', 'Upcoming', 'Archived'];

    return (
        <AppLayout>
            <Head title="Email Template Library" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div className="space-y-1">
                            <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                                <span>Marketing</span>
                                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                <span className="text-primary-container">Email Library</span>
                            </nav>
                            <h1 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Template Library</h1>
                            <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">Manage and deploy automated communications for your feline patients.</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Status Segmented Control */}
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800 overflow-x-auto no-scrollbar">
                                {[
                                    { label: 'All', value: '' },
                                    { label: 'Live', value: 'Live' },
                                    { label: 'Active', value: 'Active' },
                                    { label: 'Inactive', value: 'Inactive' },
                                    { label: 'Draft', value: 'Draft' },
                                    { label: 'Upcoming', value: 'Upcoming' },
                                    { label: 'Archived', value: 'Archived' }
                                ].map((opt) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                                            statusFilter === opt.value
                                                ? 'bg-white dark:bg-slate-700 text-primary dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-slate-200'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={openCreateModal}
                                className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                New Template
                            </button>
                        </div>
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <button
                            onClick={() => setCategoryFilter('')}
                            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                                categoryFilter === ''
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/30'
                            }`}
                        >
                            All Categories
                        </button>
                        {Array.isArray(categories) && categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                                    categoryFilter === cat
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {templates?.data && templates.data.map((template) => (
                        <TemplateCard 
                            key={template.id}
                            title={template.name}
                            desc={template.subject || 'No subject defined.'}
                            category={template.category}
                            status={template.status}
                            statusColor={
                                template.status?.toLowerCase() === 'live' || template.status?.toLowerCase() === 'active' ? 'bg-teal-500' : 
                                template.status?.toLowerCase() === 'draft' || template.status?.toLowerCase() === 'upcoming' ? 'bg-amber-500' : 
                                'bg-slate-400'
                            }
                            edited={template.updated_at ? new Date(template.updated_at).toLocaleDateString() : 'Never'}
                            img={template.preview_image}
                            onEdit={() => openEditModal(template)}
                            onPreview={() => setPreviewTemplate(template)}
                            onDelete={() => handleDestroy(template.id)}
                        />
                    ))}
                    {(!templates?.data || templates.data.length === 0) && (
                        <div className="col-span-full py-20 text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-4xl text-slate-300">folder_off</span>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No templates matching your filters.</p>
                        </div>
                    )}
                </div>

                {templates?.links && templates.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            {templates.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                                            link.active 
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-4 py-2 text-sm font-bold rounded-lg opacity-30 cursor-not-allowed text-slate-600 dark:text-slate-400"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}

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
                                        <input required value={data.name} onChange={e => setData('name', e.target.value)} type="text" className={`w-full bg-slate-50 dark:bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200`} />
                                        {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Category</label>
                                        <input required value={data.category} onChange={e => setData('category', e.target.value)} type="text" className={`w-full bg-slate-50 dark:bg-slate-800 border ${errors.category ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200`} />
                                        {errors.category && <p className="text-[10px] text-red-500 font-bold">{errors.category}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Subject</label>
                                        <input required value={data.subject} onChange={e => setData('subject', e.target.value)} type="text" className={`w-full bg-slate-50 dark:bg-slate-800 border ${errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200`} />
                                        {errors.subject && <p className="text-[10px] text-red-500 font-bold">{errors.subject}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Template Status</label>
                                        <select value={data.status} onChange={e => setData('status', e.target.value)} className={`w-full bg-slate-50 dark:bg-slate-800 border ${errors.status ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200`}>
                                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                        {errors.status && <p className="text-[10px] text-red-500 font-bold">{errors.status}</p>}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Body</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Insert:</span>
                                            <select 
                                                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-[11px] py-1 pl-2 pr-8 outline-none focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer"
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        insertPlaceholder(e.target.value);
                                                        e.target.value = '';
                                                    }
                                                }}
                                            >
                                                <option value="">Choose Placeholder...</option>
                                                {PLACEHOLDERS.map(p => (
                                                    <option key={p.value} value={p.value}>{p.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                        <Editor
                                            tinymceScriptSrc="/tinymce/tinymce.min.js"
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            value={data.body}
                                            onEditorChange={(content) => setData('body', content)}
                                            init={{
                                                height: 350,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Manrope,Arial,sans-serif; font-size:14px; color: #334155; }',
                                                skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
                                                content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
                                                base_url: '/tinymce',
                                                suffix: '.min',
                                                license_key: 'gpl'
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {PLACEHOLDERS.map(p => (
                                            <button 
                                                key={p.value}
                                                type="button"
                                                onClick={() => insertPlaceholder(p.value)}
                                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:text-teal-400 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all"
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
                                    <button disabled={processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                        {processing ? 'Saving...' : (editingId ? 'Update Template' : 'Create Template')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {previewTemplate && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <div>
                                    <h3 className="font-bold text-xl text-primary dark:text-teal-50">{previewTemplate.name}</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Email Preview</p>
                                </div>
                                <button onClick={() => setPreviewTemplate(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-error transition-all">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-10 bg-slate-50 dark:bg-slate-950">
                                <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-2">
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase w-12">From:</span>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">The Cat Clinic &lt;care@catclinic.ph&gt;</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase w-12">Subject:</span>
                                            <span className="text-xs font-bold text-primary dark:text-teal-400">{previewTemplate.subject}</span>
                                        </div>
                                    </div>
                                    <div className="p-10 prose dark:prose-invert max-w-none prose-sm sm:prose-base">
                                        <div 
                                            dangerouslySetInnerHTML={{ 
                                                __html: (previewTemplate.body || '')
                                                    .replace(/{{patient_name}}/g, '<strong>Luna</strong>')
                                                    .replace(/{{owner_name}}/g, '<strong>Elena Jenkins</strong>')
                                                    .replace(/{{clinic_name}}/g, '<strong>The Cat Clinic</strong>')
                                            }} 
                                        />
                                    </div>
                                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
                                            © 2026 The Cat Clinic Philippines<br/>
                                            All Rights Reserved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                                <button 
                                    onClick={() => setPreviewTemplate(null)}
                                    className="px-10 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function TemplateCard({ title, desc, status, statusColor, edited, img, icon, onEdit, onPreview, onDelete }) {
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
                    <h3 className="font-headline-md text-sm text-primary dark:text-teal-100 font-bold leading-tight line-clamp-1">{title}</h3>
                </div>
                <p className="font-body-sm text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{desc}</p>
                <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500 mb-6">
                    <span className="material-symbols-outlined text-xs mr-1">schedule</span>
                    Last edited {edited}
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={onPreview} className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 text-primary dark:text-teal-400 text-[11px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Preview</button>
                    <button onClick={onEdit} className="flex-1 py-2 bg-primary/10 text-primary text-[11px] font-bold rounded-lg hover:bg-primary/20 transition-colors">Edit</button>
                    <button onClick={onDelete} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
