import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Calendar({ appointments = [] }) {
    return (
        <AppLayout>
            <Head title="Clinic Schedule" />

            <div className="flex-1 px-10 pt-6 pb-10 max-w-[1720px] mx-auto font-manrope">
                {/* Calendar Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="space-y-1">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-teal-50 leading-none">Clinic Schedule</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Manage appointments, email campaigns, and upcoming events.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 p-1 shadow-sm">
                            <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold font-label-md text-label-md">Month</button>
                            <button className="px-4 py-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 font-medium font-label-md text-label-md">Week</button>
                            <button className="px-4 py-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 font-medium font-label-md text-label-md">Day</button>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 px-3 py-2 shadow-sm">
                            <button className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full p-1">chevron_left</button>
                            <span className="font-headline-md text-headline-md px-2 dark:text-teal-50">October 2026</span>
                            <button className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full p-1">chevron_right</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Grid Section */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden">
                            {/* Calendar Days Header */}
                            <div className="grid grid-cols-7 bg-surface-container-low dark:bg-slate-800 border-b border-outline-variant dark:border-slate-700">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-3 text-center font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-widest">{day}</div>
                                ))}
                            </div>
                            
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 grid-auto-rows-[minmax(120px,auto)] bg-slate-50 dark:bg-slate-950">
                                {/* Week 1 (Partial) */}
                                <Day number={27} isOutside />
                                <Day number={28} isOutside />
                                <Day number={29} isOutside />
                                <Day number={30} isOutside />
                                <Day number={1}>
                                    <EventBadge type="campaign" label="Email: Dental Health" />
                                </Day>
                                <Day number={2}>
                                    <EventBadge type="surgery" label="Surgery: Luna (9AM)" />
                                </Day>
                                <Day number={3} />

                                {/* ... (Simplified Grid for brevity) */}
                                {[...Array(28)].map((_, i) => (
                                    <Day key={i+4} number={i+4} isToday={i+4 === new Date().getDate()} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        <div className="bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-container rounded-full opacity-50 blur-2xl"></div>
                            <h3 className="font-headline-md text-headline-md mb-2">Schedule Activity</h3>
                            <p className="text-white/80 font-body-sm text-body-sm mb-6">Quickly add a new slot or campaign to your calendar.</p>
                            <div className="space-y-2">
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
                                    <span className="material-symbols-outlined">add_task</span>
                                    New Appointment
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-headline-md text-[18px] text-on-surface dark:text-teal-50">Upcoming Agenda</h3>
                                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">{appointments.length} EVENTS</span>
                            </div>
                            <div className="space-y-4">
                                {appointments.map((apt) => (
                                    <ScheduleItem 
                                        key={apt.id}
                                        color={apt.type === 'surgery' ? 'bg-secondary' : 'bg-primary'} 
                                        title={`${apt.title}: '${apt.patient?.name}'`} 
                                        time={`${new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — Room ${Math.floor(Math.random() * 3) + 1}`} 
                                    />
                                ))}
                                {appointments.length === 0 && (
                                    <p className="text-xs text-outline dark:text-slate-500 italic">No upcoming events found.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <h3 className="font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Legend</h3>
                            <div className="space-y-3">
                                <LegendItem color="bg-teal-600" label="Campaigns" />
                                <LegendItem color="bg-secondary" label="Surgeries" />
                                <LegendItem color="bg-primary-container" label="Checkups" />
                                <LegendItem color="bg-tertiary" label="Clinic Events" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 pb-12">
                    <StatCard icon="event_available" iconBg="bg-teal-50 dark:bg-teal-900/20" iconColor="text-teal-600" label="Month Occupancy" value="84%" />
                    <StatCard icon="outbox" iconBg="bg-pink-50 dark:bg-pink-900/20" iconColor="text-pink-600" label="Campaigns Sent" value="12" />
                    <StatCard icon="person_add" iconBg="bg-slate-50 dark:bg-slate-800" iconColor="text-slate-600" label="New Patients" value="28" />
                    <StatCard icon="payments" iconBg="bg-primary-fixed dark:bg-teal-900/40" iconColor="text-on-primary-fixed-variant dark:text-teal-400" label="Revenue Forecast" value="$14.2k" />
                </div>
            </div>
        </AppLayout>
    );
}

function Day({ number, isOutside = false, isToday = false, children }) {
    return (
        <div className={`p-3 border-r border-b border-outline-variant dark:border-slate-800 transition-colors min-h-[120px] ${
            isOutside ? 'bg-surface-container-lowest dark:bg-slate-900 opacity-40' : 
            isToday ? 'bg-teal-50/30 dark:bg-teal-900/10 ring-2 ring-primary dark:ring-teal-500 ring-inset' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}>
            <span className={`font-body-sm text-body-sm ${isToday ? 'font-bold text-primary dark:text-teal-400' : 'font-semibold dark:text-slate-300'}`}>
                {number} {isToday && '(Today)'}
            </span>
            <div className="mt-2 space-y-1">
                {children}
            </div>
        </div>
    );
}

function EventBadge({ type, label }) {
    const styles = {
        campaign: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800',
        surgery: 'bg-secondary-container text-on-secondary-container border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800',
        event: 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-container dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-700',
        checkup: 'bg-primary-fixed text-on-primary-fixed-variant border-primary-container dark:bg-teal-900/40 dark:text-teal-200 dark:border-teal-700',
        meeting: 'bg-teal-600 text-white',
        grooming: 'bg-secondary-container text-on-secondary-container border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800'
    };

    const icons = {
        campaign: 'campaign',
        surgery: 'medical_services',
        event: 'celebration',
        checkup: 'vaccines',
        meeting: 'star',
        grooming: 'pets'
    };

    return (
        <div className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${styles[type]}`}>
            <span className="material-symbols-outlined text-[12px]">{icons[type]}</span>
            {label}
        </div>
    );
}

function BoardingNote({ label, sub }) {
    return (
        <div className="h-12 border-l-2 border-primary-container dark:border-teal-500 ml-2 my-1 px-2 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-primary dark:text-teal-400">{label}</span>
            {sub && <span className="text-[9px] text-slate-500 dark:text-slate-400">{sub}</span>}
        </div>
    );
}

function ScheduleItem({ color, title, time }) {
    return (
        <div className="flex gap-3">
            <div className={`w-1 ${color} rounded-full`}></div>
            <div>
                <p className="text-body-sm font-bold text-on-surface dark:text-slate-200">{title}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400">{time}</p>
            </div>
        </div>
    );
}

function LegendItem({ color, label }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 dark:bg-slate-800" type="checkbox"/>
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">{label}</span>
        </label>
    );
}

function StatCard({ icon, iconBg, iconColor, label, value }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-outline-variant dark:border-slate-800 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
            </div>
            <div>
                <p className="text-body-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="font-headline-md text-headline-md dark:text-teal-50">{value}</p>
            </div>
        </div>
    );
}
