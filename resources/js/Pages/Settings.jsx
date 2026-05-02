import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';

export default function Settings({ clinic, users = [] }) {
    const { auth } = usePage().props;
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    const isSuperAdmin = auth.user.role === 'Super Admin';

    // Clinic Profile Form
    const clinicForm = useForm({
        name: clinic?.name || '',
        email: clinic?.email || '',
        phone: clinic?.phone || '',
        address: clinic?.address || '',
        sender_name: clinic?.sender_name || '',
        reply_to_email: clinic?.reply_to_email || '',
    });

    // New/Edit User Form
    const userForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'Others',
        phone: '',
        address: '',
    });

    const handleClinicUpdate = (e) => {
        e.preventDefault();
        clinicForm.post(route('settings.clinic.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const openAddUser = () => {
        setEditingUserId(null);
        userForm.reset();
        userForm.clearErrors();
        setShowUserModal(true);
    };

    const openEditUser = (user) => {
        setEditingUserId(user.id);
        userForm.setData({
            name: user.name,
            email: user.email,
            password: '', // Keep empty for edit
            role: user.role,
            phone: user.phone || '',
            address: user.address || '',
        });
        userForm.clearErrors();
        setShowUserModal(true);
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (editingUserId) {
            userForm.put(route('settings.users.update', editingUserId), {
                onSuccess: () => {
                    setShowUserModal(false);
                    userForm.reset();
                },
            });
        } else {
            userForm.post(route('settings.users.store'), {
                onSuccess: () => {
                    setShowUserModal(false);
                    userForm.reset();
                },
            });
        }
    };

    const handleDeleteUser = (id) => {
        if (confirm('Are you sure you want to remove this staff member?')) {
            router.delete(route('settings.users.destroy', id));
        }
    };

    const rolesList = ['Super Admin', 'Admin', 'Marketing', 'Recepts', 'Others'];

    return (
        <AppLayout>
            <Head title="Workspace Settings" />

            <div className="max-w-[1720px] mx-auto px-10 pt-8 pb-10 font-manrope">
                <div className="mb-10 space-y-1">
                    <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                        <span>System</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span className="text-primary-container">Global Settings</span>
                    </nav>
                    <h2 className="font-headline-lg text-headline-lg text-primary dark:text-teal-50 leading-none">Workspace Settings</h2>
                    <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 leading-relaxed">Configure your veterinary clinic's hub, team members, and communication preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Clinic Profile */}
                    <form onSubmit={handleClinicUpdate} className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary dark:text-teal-400 text-2xl">clinical_notes</span>
                                <h3 className="font-headline-md text-headline-md text-teal-950 dark:text-teal-100">Clinic Profile</h3>
                            </div>
                            <button 
                                type="submit" 
                                disabled={clinicForm.processing}
                                className="px-6 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {clinicForm.processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-col items-center gap-4">
                                <div 
                                    onClick={() => document.getElementById('clinic-logo-input').click()}
                                    className="h-32 w-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden relative group cursor-pointer"
                                >
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={clinicForm.data.logo ? URL.createObjectURL(clinicForm.data.logo) : (clinic?.logo_path || '/images/logo.png')} 
                                        alt="Clinic Logo" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="material-symbols-outlined text-white">upload</span>
                                    </div>
                                    <input 
                                        id="clinic-logo-input"
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={e => clinicForm.setData('logo', e.target.files[0])}
                                    />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Clinic Branding</p>
                                <InputError message={clinicForm.errors.logo} />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Clinic Name</label>
                                    <input value={clinicForm.data.name} onChange={e => clinicForm.setData('name', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                    <InputError message={clinicForm.errors.name} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Contact Email</label>
                                    <input type="email" value={clinicForm.data.email} onChange={e => clinicForm.setData('email', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                    <InputError message={clinicForm.errors.email} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Phone Number</label>
                                    <input type="tel" value={clinicForm.data.phone} onChange={e => clinicForm.setData('phone', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                    <InputError message={clinicForm.errors.phone} />
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Office Address</label>
                                    <textarea value={clinicForm.data.address} onChange={e => clinicForm.setData('address', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200 resize-none" rows="2" />
                                    <InputError message={clinicForm.errors.address} />
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Email Configuration */}
                    <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary dark:text-teal-400 text-2xl">mail</span>
                            <h3 className="font-headline-md text-headline-md text-teal-950 dark:text-teal-100">Email Hub</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Sender Name</label>
                                <input value={clinicForm.data.sender_name} onChange={e => clinicForm.setData('sender_name', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                <InputError message={clinicForm.errors.sender_name} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Reply-to Email</label>
                                <input type="email" value={clinicForm.data.reply_to_email} onChange={e => clinicForm.setData('reply_to_email', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                <InputError message={clinicForm.errors.reply_to_email} />
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                <button 
                                    type="button"
                                    onClick={handleClinicUpdate}
                                    disabled={clinicForm.processing}
                                    className="w-full py-3 bg-secondary text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-lg">save</span>
                                    {clinicForm.processing ? 'Saving...' : 'Save Hub Changes'}
                                </button>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">verified</span>
                                        <div>
                                            <p className="text-xs font-bold text-teal-900 dark:text-teal-100">Domain Active</p>
                                            <p className="text-[10px] text-teal-600 dark:text-teal-400 uppercase tracking-widest">Email Ready</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Management */}
                    <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-0 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary dark:text-teal-400 text-2xl">group</span>
                                <h3 className="font-headline-md text-headline-md text-teal-950 dark:text-teal-100">User Management</h3>
                            </div>
                            {isSuperAdmin && (
                                <button 
                                    onClick={openAddUser}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Add User
                                </button>
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Staff Member</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Phone Number</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Last Active</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center text-primary dark:text-teal-200 font-bold border border-teal-100/50">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-teal-100">{user.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase tracking-wider">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{user.phone || '--'}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                                    {user.last_active_at ? new Date(user.last_active_at).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : 'Never'}
                                                </p>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                {isSuperAdmin && (
                                                    <div className="flex items-center justify-end gap-2 transition-opacity">
                                                        <button 
                                                            onClick={() => openEditUser(user)}
                                                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        {auth.user.id !== user.id && (
                                                            <button 
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-lg">delete</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Add/Edit User Modal */}
                {showUserModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-primary dark:text-teal-50">
                                    {editingUserId ? 'Edit Team Member' : 'Add Team Member'}
                                </h3>
                                <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-error">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleUserSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Full Name</label>
                                        <input required value={userForm.data.name} onChange={e => userForm.setData('name', e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                        <InputError message={userForm.errors.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Email Address</label>
                                        <input required value={userForm.data.email} onChange={e => userForm.setData('email', e.target.value)} type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                        <InputError message={userForm.errors.email} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Role</label>
                                        <select value={userForm.data.role} onChange={e => userForm.setData('role', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200">
                                            {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Phone Number</label>
                                        <input value={userForm.data.phone} onChange={e => userForm.setData('phone', e.target.value)} type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Office Address</label>
                                    <textarea value={userForm.data.address} onChange={e => userForm.setData('address', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200 resize-none" rows="2" />
                                </div>
                                {!editingUserId && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-outline dark:text-slate-400 uppercase tracking-widest">Initial Password</label>
                                        <input required value={userForm.data.password} onChange={e => userForm.setData('password', e.target.value)} type="password" minLength="8" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-slate-200" />
                                        <InputError message={userForm.errors.password} />
                                    </div>
                                )}
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
                                    <button disabled={userForm.processing} type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                        {userForm.processing ? 'Processing...' : (editingUserId ? 'Update User' : 'Add User')}
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
