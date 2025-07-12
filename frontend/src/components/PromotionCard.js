export default function PromotionCard({ Icon, title, desc }) {
    return (
        <div className="flex flex-col items-start gap-4 p-6 rounded-xl bg-white w-full max-w-3xl shadow-sm border border-teal-100">
            <div className="bg-emerald-100 p-3 rounded-md">
                <Icon className="text-emerald-600" size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl">{title}</h3>
            <p className="text-slate-600 text-base mt-1">{desc}</p>
        </div>
    );
}
