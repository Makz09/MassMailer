import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex font-manrope">
            <Head title="Log in" />

            {/* Left Side: Background Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
                <img 
                    src="/images/background-image.jpg" 
                    alt="The Cat Clinic" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative z-10 w-full flex flex-col justify-center p-20 text-white">
                    <div className="max-w-xl">
                        <h1 className="text-[64px] font-black leading-[1.1] mb-6 drop-shadow-lg">
                            Where Cats Come<br/>First. Always.
                        </h1>
                        <p className="text-[18px] text-slate-100 leading-relaxed mb-12 max-w-md drop-shadow-md">
                            The Philippines' first and leading feline-exclusive veterinary hospital — providing advanced, specialized medical care designed only for cats.
                        </p>

                        <div className="border-l-2 border-teal-300 pl-6 py-1">
                            <p className="text-[14px] italic text-slate-200 mb-1">
                                "When Rome burned, the emperor's cats still expected to be fed on time."
                            </p>
                            <span className="text-[12px] text-slate-400">— Seanan McGuire</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-8">
                <div className="w-full max-w-[440px]">
                    {/* Header Icon & Title */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100/50">
                            <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                        </div>
                        <h2 className="text-[28px] font-bold text-slate-900 mb-1">Welcome Back</h2>
                        <p className="text-[12px] font-bold text-slate-500 tracking-[0.1em] uppercase">Sign in to your account</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-teal-50 text-teal-700 text-sm font-bold border border-teal-100">
                            {status}
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-[12px] font-black text-slate-700 uppercase tracking-wider mb-3">Username</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-[12px] font-black text-slate-700 uppercase tracking-wider mb-3">Password</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-[#76D1D1] hover:bg-[#65bcbc] text-white font-bold rounded-xl shadow-lg shadow-teal-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                            >
                                {processing ? (
                                    <span className="material-symbols-outlined animate-spin">sync</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                )}
                                Log In
                            </button>
                        </form>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-10 text-center">
                        <a 
                            href="https://www.catclinic.ph/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[13px] font-bold text-primary hover:text-teal-600 transition-colors flex items-center justify-center gap-1 group"
                        >
                            Visit Official Website
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
