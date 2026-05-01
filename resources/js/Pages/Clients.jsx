import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';

export default function Clients({ patients = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        breed: '',
        owner_name: '',
        owner_email: '',
        owner_phone: '',
        status: 'Active',
        health_score: 80,
    });

    const openCreateModal = () => {
        setEditingId(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (patient) => {
        setEditingId(patient.id);
        setData({
            name: patient.name,
            breed: patient.breed,
            owner_name: patient.owner_name,
            owner_email: patient.owner_email,
            owner_phone: patient.owner_phone || '',
            status: patient.status,
            health_score: patient.health_score,
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this feline client? This will be a soft delete and can be restored by an administrator.')) {
            router.delete(route('clients.destroy', id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('clients.update', editingId), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route('clients.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Client Database" />

            <div className="max-w-[1720px] mx-auto px-10 pt-2 pb-10 font-manrope">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>CRM</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Patient Database</span>
                        </nav>
                        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Client Database</h2>
                        <p className="text-outline text-body-md dark:text-slate-400 leading-relaxed">Manage and track your feline clients across all clinic branches.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={openCreateModal}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            New Patient
                        </button>
                    </div>
                </div>

                {/* Modal for Add/Edit Patient */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">
                                    {editingId ? 'Edit Feline Patient' : 'Add New Feline Patient'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Patient Name</label>
                                        <input required value={data.name} onChange={e => setData('name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Luna" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Breed</label>
                                        <input required value={data.breed} onChange={e => setData('breed', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Siamese" />
                                        <InputError message={errors.breed} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Owner Name</label>
                                    <input required value={data.owner_name} onChange={e => setData('owner_name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Jane Doe" />
                                    <InputError message={errors.owner_name} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Owner Email</label>
                                    <input required value={data.owner_email} onChange={e => setData('owner_email', e.target.value)} type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. jane@example.com" />
                                    <InputError message={errors.owner_email} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Status</label>
                                        <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Health Score (%)</label>
                                        <input value={data.health_score} onChange={e => setData('health_score', e.target.value)} type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                                    <button disabled={processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                                        {processing ? 'Saving...' : (editingId ? 'Update Patient' : 'Add Patient')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Patient Table Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-5 text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Patient & Breed</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Owner / Contact</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Last Visit</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center text-primary dark:text-teal-400 border border-teal-100/50 dark:border-teal-800/50">
                                                    <span className="material-symbols-outlined">pets</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-teal-100">{patient.name}</p>
                                                    <p className="text-xs text-outline dark:text-slate-400">{patient.breed}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patient.owner_name}</p>
                                            <p className="text-xs text-outline dark:text-slate-400">{patient.owner_email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                {patient.last_visit_at ? new Date(patient.last_visit_at).toLocaleDateString() : '—'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                patient.status === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : 
                                                patient.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 
                                                'bg-teal-50 text-teal-700 border border-teal-100'
                                            }`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 transition-opacity">
                                                <button 
                                                    onClick={() => openEditModal(patient)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg transition-colors"
                                                    title="Edit Patient"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors rounded-lg"
                                                    title="Delete Patient"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {patients.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-outline dark:text-slate-500 italic">
                                            No patients found.
                                        </td>
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
