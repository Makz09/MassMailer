import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';

export default function Clients(props) {
    const patients = props.patients || { data: [], links: [] };
    const availableColumns = props.availableColumns || [];
    const suggestions = props.suggestions || { breeds: [], veterinarians: [], branches: [], statuses: [] };
    const [showModal, setShowModal] = useState(false);
    const [showColumnModal, setShowColumnModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        breed: '',
        age_years: '',
        weight_kg: '',
        owner_first_name: '',
        owner_last_name: '',
        owner_email: '',
        owner_phone: '',
        assigned_veterinarian: '',
        branch: '',
        status: 'Active',
        health_score: 80,
        first_visit_at: '',
        last_visit_at: '',
        last_vaccination_at: '',
        medical_history: '',
    });

    const columnForm = useForm({
        name: '',
        type: 'string'
    });

    const importForm = useForm({
        file: null,
    });

    const queryParams = props.queryParams || {};
    const [searchQuery, setSearchQuery] = useState(queryParams.search || '');
    const [statusFilter, setStatusFilter] = useState(queryParams.status || 'All');
    const [sortColumn, setSortColumn] = useState(queryParams.sort_by || 'created_at');
    const [sortOrder, setSortOrder] = useState(queryParams.sort_order || 'desc');

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortOrder === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newOrder);
        
        router.get(route('clients'), {
            ...queryParams,
            sort_by: column,
            sort_order: newOrder
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleFilterChange = (newStatus) => {
        setStatusFilter(newStatus);
        router.get(route('clients'), {
            ...queryParams,
            status: newStatus
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        router.get(route('clients'), {
            ...queryParams,
            search: query
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const getSortIcon = (column) => {
        if (sortColumn !== column) return 'unfold_more';
        return sortOrder === 'asc' ? 'expand_less' : 'expand_more';
    };

    const openCreateModal = () => {
        setEditingId(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (patient) => {
        setEditingId(patient.id);
        setData({
            ...patient,
            first_visit_at: patient.first_visit_at ? new Date(patient.first_visit_at).toISOString().split('T')[0] : '',
            last_visit_at: patient.last_visit_at ? new Date(patient.last_visit_at).toISOString().split('T')[0] : '',
            last_vaccination_at: patient.last_vaccination_at ? new Date(patient.last_vaccination_at).toISOString().split('T')[0] : '',
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this feline client? This action cannot be undone.')) {
            router.delete(route('clients.destroy', id), {
                onSuccess: () => alert('Patient deleted successfully'),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            router.put(route('clients.update', editingId), data, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            router.post(route('clients.store'), data, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    const handleAddColumn = (e) => {
        e.preventDefault();
        columnForm.post(route('clients.add-column'), {
            onSuccess: () => {
                setShowColumnModal(false);
                columnForm.reset();
            }
        });
    };

    const handleInlineUpdate = (patientId, field, value) => {
        axios.patch(route('clients.inline-update', patientId), { field, value })
            .then(res => {
                // Trigger a partial reload to get fresh data from the server (e.g. calculated names)
                // without a full page visit or scroll reset.
                router.reload({ only: ['patients'], preserveScroll: true });
            })
            .catch(err => {
                console.error('Update failed:', err);
                // The local state in EditableCell will handle the revert if we wanted, 
                // but for now we just log it.
            });
    };

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [columnToRename, setColumnToRename] = useState(null);
    const renameForm = useForm({
        old_name: '',
        new_name: ''
    });

    const openRenameModal = (col) => {
        setColumnToRename(col);
        renameForm.setData({
            old_name: col,
            new_name: col.replace(/_/g, ' ')
        });
        setShowRenameModal(true);
    };

    const handleRenameColumn = (e) => {
        e.preventDefault();
        renameForm.post(route('clients.rename-column'), {
            onSuccess: () => {
                setShowRenameModal(false);
                renameForm.reset();
            }
        });
    };

    const handleDropColumn = (col) => {
        if (confirm(`Are you sure you want to delete the "${col.replace(/_/g, ' ')}" column? All data in this column for all patients will be permanently lost.`)) {
            router.post(route('clients.drop-column'), { column_name: col });
        }
    };

    // Real-time Data Sync: Poll the server every 5 seconds for fresh data
    useEffect(() => {
        const liveSync = setInterval(() => {
            // only refresh the patients list to keep it lightweight
            router.reload({ 
                only: ['patients'], 
                preserveScroll: true, 
                preserveState: true 
            });
        }, 5000);

        return () => clearInterval(liveSync);
    }, []);

    const filteredPatients = patients.data || [];

    // Determine column groups for the spreadsheet view
    const coreColumns = ['name', 'owner_name', 'owner_email', 'status', 'branch', 'assigned_veterinarian', 'age_years', 'weight_kg', 'date_created'];
    const visitColumns = ['last_visit_at', 'first_visit_at', 'last_vaccination_at'];
    const dynamicColumns = availableColumns.filter(c => !coreColumns.includes(c) && !visitColumns.includes(c) && !['id', 'breed', 'owner_first_name', 'owner_last_name', 'owner_phone', 'health_score', 'medical_history', 'created_at', 'updated_at', 'deleted_at'].includes(c));

    return (
        <AppLayout>
            <Head title="Client Database" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>CRM</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Patient Database</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Client Database</h2>
                        <p className="text-outline text-body-md dark:text-slate-400 mt-2">Manage and track your feline clients with spreadsheet efficiency.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => window.location.href = route('clients.download-template')}
                            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                            Import Template
                        </button>
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="px-6 py-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl font-bold text-sm text-red-600 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg">upload_file</span>
                            Import Clients
                        </button>
                        <button 
                            onClick={() => setShowColumnModal(true)}
                            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg">view_column</span>
                            Add Column
                        </button>
                        <button 
                            onClick={openCreateModal}
                            className="px-6 py-3 bg-slate-900 dark:bg-teal-500 dark:text-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-xl"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            New Client
                        </button>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-100 dark:border-slate-800">
                            <span className="material-symbols-outlined text-slate-400 text-lg">filter_list</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filters :</span>
                        </div>
                        {['All', 'Active', 'Inactive', 'Critical'].map(status => (
                            <button
                                key={status}
                                onClick={() => handleFilterChange(status)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                    statusFilter === status 
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/30'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 max-w-sm relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Search patients or owners..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none dark:text-slate-200"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Showing {patients.data?.length || 0} of {patients.total || 0} Results</p>
                        <button onClick={() => router.get(route('clients'))} className="text-[10px] font-black text-primary dark:text-teal-400 uppercase tracking-widest hover:underline whitespace-nowrap">Clear all</button>
                    </div>
                </div>

                {/* Patient Spreadsheet Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                                    <th className="w-16 px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">#</th>
                                    <th onClick={() => handleSort('name')} className="w-64 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center gap-1">
                                            Patient & Owner
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('name')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('owner_email')} className="w-56 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center gap-1">
                                            Email
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('owner_email')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('breed')} className="w-32 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center gap-1">
                                            Breed
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('breed')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('assigned_veterinarian')} className="w-48 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center gap-1">
                                            Veterinarian
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('assigned_veterinarian')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('branch')} className="w-32 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center justify-center gap-1">
                                            Branch
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('branch')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('age_years')} className="w-24 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center justify-center gap-1">
                                            Age
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('age_years')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('weight_kg')} className="w-24 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center justify-center gap-1">
                                            Weight
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('weight_kg')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('status')} className="w-40 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center justify-center gap-1">
                                            Status
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('status')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('date_created')} className="w-32 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center justify-center gap-1">
                                            Date Created
                                            <span className="material-symbols-outlined text-[14px]">{getSortIcon('date_created')}</span>
                                        </div>
                                    </th>
                                    <th className="w-48 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visits & Vax</th>
                                    {dynamicColumns.map(col => (
                                        <th key={col} className="w-48 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest relative group/header">
                                            <div className="flex items-center justify-between">
                                                <span onClick={() => handleSort(col)} className="cursor-pointer hover:text-primary flex items-center gap-1">
                                                    {col.replace(/_/g, ' ')}
                                                    <span className="material-symbols-outlined text-[14px]">{getSortIcon(col)}</span>
                                                </span>
                                                <div className="flex items-center gap-1 opacity-0 group-hover/header:opacity-100 transition-all">
                                                    <button 
                                                        onClick={() => openRenameModal(col)}
                                                        className="p-1 hover:text-primary transition-colors"
                                                        title="Rename Column"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDropColumn(col)}
                                                        className="p-1 hover:text-red-500 transition-colors"
                                                        title="Delete Column"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="w-32 px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredPatients.map((patient, idx) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                                        <td className="px-4 py-4 text-center text-xs font-bold text-slate-300 dark:text-slate-700">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black flex-shrink-0">
                                                    {patient.name?.[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <EditableCell 
                                                        value={patient.name} 
                                                        onSave={(val) => handleInlineUpdate(patient.id, 'name', val)}
                                                        className="font-bold text-slate-900 dark:text-teal-100 truncate block"
                                                    />
                                                    <EditableCell 
                                                        value={patient.owner_name} 
                                                        disabled={true} // Calculcated field
                                                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate block mt-0.5 pl-[4px]"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <EditableCell 
                                                value={patient.owner_email} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'owner_email', val)}
                                                className="text-sm font-bold text-slate-700 dark:text-slate-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <EditableCell 
                                                value={patient.breed} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'breed', val)}
                                                className="text-xs font-bold text-slate-500 dark:text-slate-400"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <EditableCell 
                                                value={patient.assigned_veterinarian} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'assigned_veterinarian', val)}
                                                className="text-xs font-bold text-primary dark:text-teal-400"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <EditableCell 
                                                value={patient.branch} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'branch', val)}
                                                className="text-xs font-black text-slate-400 uppercase tracking-tighter"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <EditableCell 
                                                value={patient.age_years} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'age_years', val)}
                                                className="text-sm font-bold text-slate-600 dark:text-slate-400"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <EditableCell 
                                                value={patient.weight_kg ? `${patient.weight_kg}kg` : '—'} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'weight_kg', val.replace('kg', ''))}
                                                className="text-sm font-bold text-slate-600 dark:text-slate-400"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-block">
                                                {patient.status === 'Critical' ? (
                                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[8px] font-black rounded uppercase border border-red-100">Critical</span>
                                                ) : patient.status === 'Inactive' ? (
                                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-black rounded uppercase border border-slate-100">Inactive</span>
                                                ) : (
                                                    <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[8px] font-black rounded uppercase border border-teal-100">Active</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <EditableCell 
                                                value={patient.date_created} 
                                                onSave={(val) => handleInlineUpdate(patient.id, 'date_created', val)}
                                                className="text-xs font-bold text-slate-500 dark:text-slate-400"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-[10px] space-y-0.5 text-center">
                                                <p className="text-slate-400">Last: <span className="font-bold text-slate-600 dark:text-slate-300">{patient.last_visit_at ? new Date(patient.last_visit_at).toLocaleDateString() : '—'}</span></p>
                                                <p className="text-slate-400 text-teal-500 font-black uppercase tracking-tighter">Vax: {patient.last_vaccination_at ? new Date(patient.last_vaccination_at).toLocaleDateString() : '—'}</p>
                                                <p className="text-[9px] text-slate-300">First: {patient.first_visit_at ? new Date(patient.first_visit_at).toLocaleDateString() : '—'}</p>
                                            </div>
                                        </td>
                                        {dynamicColumns.map(col => (
                                            <td key={col} className="px-6 py-4">
                                                <EditableCell 
                                                    value={patient[col] || ''} 
                                                    onSave={(val) => handleInlineUpdate(patient.id, col, val)}
                                                    className="text-sm text-slate-600 dark:text-slate-400"
                                                />
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEditModal(patient)} title="Edit Full Record" className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-lg">edit_note</span>
                                                </button>
                                                <button onClick={() => handleDelete(patient.id)} title="Delete Record" className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <tr>
                                        <td colSpan={availableColumns.length + 5} className="px-8 py-20 text-center text-slate-400 italic">No patients found matching your filters.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    {patients.links && patients.links.length > 3 && (
                        <div className="mt-8 mb-8 flex justify-center">
                            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                {patients.links.map((link, i) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                                link.active 
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-4 py-2 text-xs font-bold rounded-lg opacity-30 cursor-not-allowed text-slate-600 dark:text-slate-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Column Modal */}
                {showColumnModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">Create New Column</h3>
                                <button onClick={() => setShowColumnModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleAddColumn} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">Column Name</label>
                                    <input 
                                        required 
                                        value={columnForm.data.name} 
                                        onChange={e => columnForm.setData('name', e.target.value.replace(/\s+/g, '_'))} 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" 
                                        placeholder="e.g. Allergy_Info" 
                                    />
                                    {columnForm.errors.name && <p className="text-[10px] text-error font-bold mt-1">{columnForm.errors.name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">Data Type</label>
                                    <select 
                                        value={columnForm.data.type} 
                                        onChange={e => columnForm.setData('type', e.target.value)} 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="string">Single Line Text</option>
                                        <option value="text">Long Text / Notes</option>
                                        <option value="integer">Number</option>
                                        <option value="date">Date</option>
                                        <option value="boolean">Checkbox / Toggle</option>
                                    </select>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowColumnModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400">Cancel</button>
                                    <button disabled={columnForm.processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20">
                                        {columnForm.processing ? 'Creating...' : 'Add Column'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Rename Column Modal */}
                {showRenameModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">Rename Column</h3>
                                <button onClick={() => setShowRenameModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleRenameColumn} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">Current Name</label>
                                    <input disabled value={renameForm.data.old_name.replace(/_/g, ' ')} type="text" className="w-full bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none opacity-50" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">New Column Name</label>
                                    <input 
                                        required 
                                        value={renameForm.data.new_name} 
                                        onChange={e => renameForm.setData('new_name', e.target.value.replace(/\s+/g, '_'))} 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20" 
                                        placeholder="e.g. Special_Requirements" 
                                    />
                                    {renameForm.errors.new_name && <p className="text-[10px] text-error font-bold mt-1">{renameForm.errors.new_name}</p>}
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowRenameModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400">Cancel</button>
                                    <button disabled={renameForm.processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20">
                                        {renameForm.processing ? 'Renaming...' : 'Apply Rename'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Import Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">Mass Client Import</h3>
                                <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                importForm.post(route('clients.import'), {
                                    onSuccess: () => {
                                        setShowImportModal(false);
                                        importForm.reset();
                                        alert('Import successful!');
                                    }
                                });
                            }} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">Select CSV File</label>
                                    <input 
                                        required 
                                        type="file" 
                                        accept=".csv"
                                        onChange={e => importForm.setData('file', e.target.files[0])}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-sm outline-none focus:border-primary/50 transition-all text-center" 
                                    />
                                    {importForm.errors.file && <p className="text-[10px] text-error font-bold mt-1">{importForm.errors.file}</p>}
                                </div>
                                <div className="bg-teal-50 dark:bg-teal-900/10 p-3 rounded-lg border border-teal-100 dark:border-teal-800">
                                    <p className="text-[10px] text-teal-700 dark:text-teal-400 leading-relaxed font-medium">
                                        <span className="font-bold uppercase tracking-tight mr-1">Pro Tip:</span> 
                                        Make sure your CSV headers match the database columns. Use the template for the best results.
                                    </p>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowImportModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400">Cancel</button>
                                    <button disabled={importForm.processing} type="submit" className="flex-1 py-3 bg-slate-900 dark:bg-teal-500 dark:text-slate-900 text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg">
                                        {importForm.processing ? 'Importing...' : 'Start Import'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal for Add/Edit Patient */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">
                                    {editingId ? 'Edit Feline Patient' : 'Add New Feline Patient'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Cat Name</label>
                                        <input required value={data.name} onChange={e => setData('name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Luna" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Breed</label>
                                        <input list="breed-suggestions" required value={data.breed} onChange={e => setData('breed', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Siamese" />
                                        <InputError message={errors.breed} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Age (Years)</label>
                                        <input value={data.age_years} onChange={e => setData('age_years', e.target.value)} type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. 3" />
                                        <InputError message={errors.age_years} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Weight (kg)</label>
                                        <input value={data.weight_kg} onChange={e => setData('weight_kg', e.target.value)} type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. 4.5" />
                                        <InputError message={errors.weight_kg} />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-3">Owner Contact Information</p>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">First Name</label>
                                            <input required value={data.owner_first_name} onChange={e => setData('owner_first_name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Last Name</label>
                                            <input required value={data.owner_last_name} onChange={e => setData('owner_last_name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input required value={data.owner_email} onChange={e => setData('owner_email', e.target.value)} type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />
                                            <InputError message={errors.owner_email} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Phone Number</label>
                                            <input value={data.owner_phone} onChange={e => setData('owner_phone', e.target.value)} type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+63..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-3">Clinical Details</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Assigned Veterinarian</label>
                                            <input list="vet-suggestions" value={data.assigned_veterinarian} onChange={e => setData('assigned_veterinarian', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Dr. Sarah" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Clinic Branch</label>
                                            <select list="branch-suggestions" value={data.branch} onChange={e => setData('branch', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                                                <option value="">Select Branch...</option>
                                                {suggestions.branches.map(branch => (
                                                    <option key={branch} value={branch}>{branch}</option>
                                                ))}
                                                <option value="Downtown">Downtown</option>
                                                <option value="North Side">North Side</option>
                                                <option value="East Side">East Side</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-3">Medical History & Timeline</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Last Vaccination</label>
                                            <input value={data.last_vaccination_at} onChange={e => setData('last_vaccination_at', e.target.value)} type="date" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Status</label>
                                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                                                <option value="Active">Active</option>
                                                <option value="Recovering">Recovering</option>
                                                <option value="Critical">Critical</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Medical History Notes</label>
                                        <textarea value={data.medical_history} onChange={e => setData('medical_history', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px] resize-none" placeholder="e.g. Allergy to penicillin, Previous surgery in 2023..." />
                                    </div>
                                </div>
                                
                                {/* Dynamic Fields in Modal */}
                                {dynamicColumns.length > 0 && (
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Additional Information</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {dynamicColumns.map(col => (
                                                <div key={col} className="space-y-1">
                                                    <label className="text-[10px] font-black text-outline uppercase tracking-widest">{col.replace(/_/g, ' ')}</label>
                                                    <input 
                                                        value={data[col] || ''} 
                                                        onChange={e => setData(col, e.target.value)} 
                                                        type="text" 
                                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
                                    <button disabled={processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                                        {processing ? 'Saving...' : (editingId ? 'Update Patient' : 'Add Patient')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            {/* Autocomplete Datalists */}
            <datalist id="breed-suggestions">
                {suggestions.breeds.map(breed => (
                    <option key={breed} value={breed} />
                ))}
            </datalist>
            <datalist id="vet-suggestions">
                {suggestions.veterinarians.map(vet => (
                    <option key={vet} value={vet} />
                ))}
            </datalist>
        </AppLayout>
    );
}

function EditableCell({ value, onSave, className, disabled = false }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onSave(localValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            setIsEditing(false);
        }
    };

    if (disabled) {
        return <span className={className}>{value}</span>;
    }

    return isEditing ? (
        <input
            ref={inputRef}
            autoFocus
            className={`w-full bg-white dark:bg-slate-800 border-2 border-primary rounded px-1 outline-none ${className}`}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        />
    ) : (
        <span 
            onClick={() => setIsEditing(true)} 
            className={`cursor-pointer hover:bg-primary/5 rounded px-1 transition-colors ${className}`}
        >
            {value || <span className="opacity-30 italic text-xs">Click to add</span>}
        </span>
    );
}

function FilterChip({ label }) {
    return (
        <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:border-primary transition-all">
            {label}
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
    );
}

function ProgressItem({ label, value, color }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-900 dark:text-teal-100">{value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}
