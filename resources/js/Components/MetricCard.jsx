export default function MetricCard({ title, value, icon, trend, trendColor, iconBg, iconColor }) {
    return (
        <div className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <span className={`material-symbols-outlined p-2 ${iconBg} ${iconColor} rounded-lg`}>{icon}</span>
                <span className={`text-xs font-semibold ${trendColor} px-2 py-1 rounded`}>{trend}</span>
            </div>
            <div>
                <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{title}</p>
                <h3 className="font-display-xl text-headline-lg text-primary dark:text-teal-400">{value}</h3>
            </div>
        </div>
    );
}
