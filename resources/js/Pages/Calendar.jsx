import { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Calendar({ 
    appointments = [], 
    patients = [], 
    appointmentTypes = [], 
    monthAppointments = 0,
    totalCampaigns = 0,
    totalPatients = 0,
    todayAppointments = 0
}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        type: 'checkup',
        patient_id: '',
        start_time: '',
        end_time: '',
        description: '',
    });

    const openCreateModal = (date) => {
        reset();
        if (date) {
            // Format for datetime-local input: YYYY-MM-DDTHH:mm
            const isoStr = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
            setData('start_time', isoStr);
        }
        setIsModalOpen(true);
    };

    const openViewModal = (e, appointment) => {
        e.stopPropagation();
        setSelectedAppointment(appointment);
        setIsViewModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('calendar.appointments.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const [filters, setFilters] = useState({
        campaign: true,
        surgery: true,
        checkup: true,
        event: true
    });

    const toggleFilter = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const isVisible = (apt) => {
        const type = apt.type?.toLowerCase();
        if (type === 'campaign') return filters.campaign;
        if (type === 'surgery' || type === 'grooming') return filters.surgery;
        if (type === 'checkup') return filters.checkup;
        return filters.event; // Default/Others
    };

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Month name
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
        
        // First day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
        
        const days = [];
        
        // Prev Month padding
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, isOutside: true, date: new Date(year, month - 1, prevMonthLastDay - i) });
        }
        
        // Current Month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, isOutside: false, date: new Date(year, month, i) });
        }
        
        // Next Month padding
        const remaining = 42 - days.length; // Use 42 to always show 6 weeks for stability
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, isOutside: true, date: new Date(year, month + 1, i) });
        }
        
        return { days, monthName, year };
    }, [currentDate]);

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(newDate);
    };

    const getAppointmentsForDate = (date) => {
        if (!date) return [];
        return appointments.filter(apt => {
            const aptDate = new Date(apt.start_time);
            return aptDate.getFullYear() === date.getFullYear() &&
                   aptDate.getMonth() === date.getMonth() &&
                   aptDate.getDate() === date.getDate() &&
                   isVisible(apt);
        });
    };

    const [agendaPage, setAgendaPage] = useState(0);
    const AGENDA_PAGE_SIZE = 5;

    const upcomingAppointmentsData = useMemo(() => {
        const filtered = [...appointments]
            .filter(apt => new Date(apt.start_time) >= new Date() && isVisible(apt))
            .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        
        return {
            items: filtered.slice(agendaPage * AGENDA_PAGE_SIZE, (agendaPage + 1) * AGENDA_PAGE_SIZE),
            total: filtered.length,
            hasNext: (agendaPage + 1) * AGENDA_PAGE_SIZE < filtered.length,
            hasPrev: agendaPage > 0
        };
    }, [appointments, agendaPage, filters]);

    const upcomingAppointments = upcomingAppointmentsData.items;

    return (
        <AppLayout>
            <Head title="Clinic Schedule" />

            <div className="flex-1 px-10 pt-8 pb-10 max-w-[1720px] mx-auto font-manrope">
                {/* Calendar Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-[10px] font-bold text-outline mb-2 uppercase tracking-[0.1em]">
                            <span>Operations</span>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-primary-container">Service Calendar</span>
                        </nav>
                        <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-teal-50 leading-none">Clinic Schedule</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">Manage appointments, email campaigns, and upcoming events.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 p-1 shadow-sm">
                            <button 
                                onClick={() => setView('month')}
                                className={`px-4 py-2 rounded-lg transition-all font-label-md text-label-md ${view === 'month' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 font-medium'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => setView('week')}
                                className={`px-4 py-2 rounded-lg transition-all font-label-md text-label-md ${view === 'week' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 font-medium'}`}
                            >
                                Week
                            </button>
                            <button 
                                onClick={() => setView('day')}
                                className={`px-4 py-2 rounded-lg transition-all font-label-md text-label-md ${view === 'day' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 font-medium'}`}
                            >
                                Day
                            </button>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 px-3 py-2 shadow-sm">
                            <button 
                                onClick={() => changeMonth(-1)}
                                className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full p-1 transition-colors"
                            >
                                chevron_left
                            </button>
                            <span className="font-headline-md text-headline-md px-2 dark:text-teal-50 min-w-[180px] text-center">
                                {calendarData.monthName} {calendarData.year}
                            </span>
                            <button 
                                onClick={() => changeMonth(1)}
                                className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-full p-1 transition-colors"
                            >
                                chevron_right
                            </button>
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
                                {calendarData.days.map((day, idx) => {
                                    const dayAppointments = getAppointmentsForDate(day.date);
                                    const isToday = day.date && day.date.toDateString() === new Date().toDateString();

                                    return (
                                        <Day 
                                            key={idx} 
                                            number={day.day} 
                                            isOutside={day.isOutside}
                                            isToday={isToday}
                                            onClick={() => openCreateModal(day.date)}
                                        >
                                            {dayAppointments.map(apt => (
                                                <EventBadge 
                                                    key={apt.id} 
                                                    type={apt.type || 'checkup'} 
                                                    label={`${apt.type === 'surgery' ? 'Surgery' : 'Appt'}: ${apt.patient?.name || 'Unknown'}`} 
                                                    onClick={(e) => openViewModal(e, apt)}
                                                />
                                            ))}
                                        </Day>
                                    );
                                })}
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
                                <button 
                                    onClick={() => openCreateModal()}
                                    className="w-full py-3 bg-white text-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors shadow-md"
                                >
                                    <span className="material-symbols-outlined">add_task</span>
                                    New Appointment
                                </button>
                                <Link 
                                    href={route('campaigns')}
                                    className="w-full py-3 bg-primary-container/20 text-white border border-white/20 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-container/40 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                    Email Campaign
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-headline-md text-[18px] text-on-surface dark:text-teal-50">Upcoming Agenda</h3>
                                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">{upcomingAppointmentsData.total} EVENTS</span>
                            </div>
                            <div className="space-y-4">
                                {upcomingAppointments.map((apt) => (
                                     <ScheduleItem 
                                         key={apt.id}
                                         color={apt.type === 'surgery' ? 'bg-secondary' : 'bg-primary'} 
                                         title={`${apt.title}: '${apt.patient?.name || 'Guest'}'`} 
                                         time={`${new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} 
                                         onClick={(e) => openViewModal(e, apt)}
                                     />
                                 ))}
                                 {upcomingAppointments.length === 0 && (
                                     <p className="text-xs text-outline dark:text-slate-500 italic">No upcoming events found.</p>
                                 )}
                            </div>
                            
                            {/* Agenda Pagination */}
                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                                <button 
                                    disabled={!upcomingAppointmentsData.hasPrev}
                                    onClick={() => setAgendaPage(prev => prev - 1)}
                                    className="material-symbols-outlined text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                                >
                                    navigate_before
                                </button>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Page {agendaPage + 1}
                                </span>
                                <button 
                                    disabled={!upcomingAppointmentsData.hasNext}
                                    onClick={() => setAgendaPage(prev => prev + 1)}
                                    className="material-symbols-outlined text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                                >
                                    navigate_next
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <h3 className="font-label-md text-label-md text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Legend</h3>
                            <div className="space-y-3">
                                <LegendItem 
                                    color="bg-teal-600" 
                                    label="Campaigns" 
                                    checked={filters.campaign} 
                                    onChange={() => toggleFilter('campaign')} 
                                />
                                <LegendItem 
                                    color="bg-secondary" 
                                    label="Surgeries" 
                                    checked={filters.surgery} 
                                    onChange={() => toggleFilter('surgery')} 
                                />
                                <LegendItem 
                                    color="bg-primary-container" 
                                    label="Checkups" 
                                    checked={filters.checkup} 
                                    onChange={() => toggleFilter('checkup')} 
                                />
                                <LegendItem 
                                    color="bg-tertiary" 
                                    label="Clinic Events" 
                                    checked={filters.event} 
                                    onChange={() => toggleFilter('event')} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 pb-12">
                    <StatCard icon="event_note" iconBg="bg-teal-50 dark:bg-teal-900/20" iconColor="text-teal-600" label="Monthly Appointments" value={monthAppointments} />
                    <StatCard icon="campaign" iconBg="bg-pink-50 dark:bg-pink-900/20" iconColor="text-pink-600" label="Total Campaigns" value={totalCampaigns} />
                    <StatCard icon="group" iconBg="bg-slate-50 dark:bg-slate-800" iconColor="text-slate-600" label="Total Patients" value={totalPatients} />
                    <StatCard icon="today" iconBg="bg-primary-fixed dark:bg-teal-900/40" iconColor="text-on-primary-fixed-variant dark:text-teal-400" label="Scheduled Today" value={todayAppointments} />
                </div>
            </div>

            {/* New Appointment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-xl font-bold text-on-surface dark:text-teal-50">Schedule Appointment</h3>
                            <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">close</button>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient Name</label>
                                <select 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200"
                                    value={data.patient_id}
                                    onChange={e => setData('patient_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select a patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} ({p.owner_first_name} {p.owner_last_name})</option>
                                    ))}
                                </select>
                                {errors.patient_id && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.patient_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Appointment Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Annual Vaccination"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</label>
                                <input 
                                    type="text" 
                                    list="appointment-types"
                                    placeholder="e.g. Surgery, Birthday Email"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200 text-sm"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    required
                                />
                                <datalist id="appointment-types">
                                    {appointmentTypes.map((type, idx) => (
                                        <option key={idx} value={type} />
                                    ))}
                                </datalist>
                                {errors.type && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.type}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Start Time</label>
                                    <input 
                                        type="datetime-local" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200 text-sm"
                                        value={data.start_time}
                                        onChange={e => setData('start_time', e.target.value)}
                                        required
                                    />
                                    {errors.start_time && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.start_time}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">End Time</label>
                                    <input 
                                        type="datetime-local" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200 text-sm"
                                        value={data.end_time}
                                        onChange={e => setData('end_time', e.target.value)}
                                    />
                                    {errors.end_time && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.end_time}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description / Notes</label>
                                <textarea 
                                    placeholder="Add any specific notes or instructions here..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary dark:text-slate-200 text-sm h-24"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.description}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-900/20 disabled:opacity-50"
                                >
                                    {processing ? 'Scheduling...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Appointment Modal */}
            {isViewModalOpen && selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-teal-600 text-white">
                            <div>
                                <h3 className="text-xl font-bold">{selectedAppointment.title}</h3>
                                <p className="text-xs text-teal-100 uppercase tracking-widest font-bold">{selectedAppointment.type}</p>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="material-symbols-outlined hover:bg-white/20 rounded-full p-1 transition-colors">close</button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-teal-600">person</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Info</p>
                                    <p className="text-on-surface dark:text-teal-50 font-bold">{selectedAppointment.patient?.name || 'Unknown'}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Owner: {selectedAppointment.patient?.owner_first_name} {selectedAppointment.patient?.owner_last_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-teal-600">schedule</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Schedule</p>
                                    <p className="text-on-surface dark:text-teal-50 font-bold">
                                        {new Date(selectedAppointment.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(selectedAppointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            {selectedAppointment.description && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-teal-600">notes</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                                        <p className="text-sm text-on-surface dark:text-slate-300 leading-relaxed">{selectedAppointment.description}</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button 
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="w-full py-3 bg-slate-900 dark:bg-teal-600 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-teal-700 transition-colors shadow-lg"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function Day({ number, date, isOutside = false, isToday = false, onClick, children }) {
    return (
        <div 
            onClick={onClick}
            className={`p-3 border-r border-b border-outline-variant dark:border-slate-800 transition-all min-h-[120px] cursor-pointer group/day ${
            isOutside ? 'bg-surface-container-lowest dark:bg-slate-900 opacity-40' : 
            isToday ? 'bg-teal-50/30 dark:bg-teal-900/10 ring-2 ring-primary dark:ring-teal-500 ring-inset' : 'bg-white dark:bg-slate-900 hover:bg-teal-50/20 dark:hover:bg-slate-800'
        }`}>
            <div className="flex justify-between items-start">
                <span className={`font-body-sm text-body-sm ${isToday ? 'font-bold text-primary dark:text-teal-400' : 'font-semibold dark:text-slate-300'}`}>
                    {number} {isToday && '(Today)'}
                </span>
                <span className="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover/day:opacity-100 transition-opacity">add_circle</span>
            </div>
            <div className="mt-2 space-y-1">
                {children}
            </div>
        </div>
    );
}

function EventBadge({ type, label, onClick }) {
    const lowerType = type?.toLowerCase() || 'checkup';

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

    const styleClass = styles[lowerType] || styles.checkup;
    const iconName = icons[lowerType] || 'event';

    return (
        <div 
            onClick={onClick}
            className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 cursor-pointer hover:brightness-95 active:scale-95 transition-all ${styleClass}`}
        >
            <span className="material-symbols-outlined text-[12px]">{iconName}</span>
            <span className="truncate">{label}</span>
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

function ScheduleItem({ color, title, time, onClick }) {
    return (
        <div 
            onClick={onClick}
            className="flex gap-3 cursor-pointer group p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
            <div className={`w-1 ${color} rounded-full`}></div>
            <div>
                <p className="text-body-sm font-bold text-on-surface dark:text-slate-200 group-hover:text-primary transition-colors">{title}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400">{time}</p>
            </div>
        </div>
    );
}

function LegendItem({ color, label, checked, onChange }) {
    return (
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-teal-600/10 dark:bg-teal-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={onChange}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                />
            </div>
            <div className={`w-3 h-3 rounded-full ${color} shrink-0`}></div>
            <span className={`font-body-sm text-body-sm transition-colors ${checked ? 'text-on-surface dark:text-slate-200 font-bold' : 'text-slate-400 dark:text-slate-600'}`}>{label}</span>
        </div>
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
