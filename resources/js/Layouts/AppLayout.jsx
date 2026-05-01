import Sidebar from '@/Components/Sidebar';
import TopBar from '@/Components/TopBar';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-[#f8f9ff] dark:bg-slate-950">
            <Sidebar />
            
            <div className="ml-64 min-h-screen flex flex-col">
                <TopBar user={auth.user} />
                
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
