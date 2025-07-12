import { ArrowRight, Target, Globe, CheckSquare } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PromotionCard from '../components/PromotionCard'

export default function HomePage () {
    return(
        <div className="bg-teal-50 min-h-screen flex items-center flex-col">
            <div className="space-y-2 text-center mt-20">
                <h1 className="text-black text-5xl font-bold">Generate Professional</h1>
                <h1 className="text-emerald-600 text-5xl font-bold">UGC Videos</h1>
                <h1 className="text-black text-5xl font-bold">with AI</h1>
            </div>
            <div className="mt-10 font-bold text-xl text-center max-w-2xl mx-auto">
                <h3 className="text-slate-700">Transform your product descriptions into compelling user-generated content videos that drive conversions and engage your audience.</h3>
            </div>
            <div className="mt-10 flex justify-center gap-5">
                <NavLink 
                    to="/form" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition duration-200"
                >
                    <span>Start Creating</span>
                    <ArrowRight size={20} />
                </NavLink>
                <NavLink 
                    to="/" 
                    className="bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-100 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition duration-200"
                >
                    <span>See Demo</span>
                    <ArrowRight size={20} />
                </NavLink>
            </div>
            <div className="flex flex-col items-center gap-6 mt-16 mb-20">
                <PromotionCard
                    Icon={Target}
                    title="Targeted Content"
                    desc="AI-powered content generation tailored to your specific audience and product positioning."
                />
                <PromotionCard
                    Icon={Globe}
                    title="Multi-Language"
                    desc="Generate videos in multiple languages to reach global audiences with localized content."
                />
                <PromotionCard
                    Icon={CheckSquare}
                    title="Ready to Use"
                    desc="Professional-quality videos ready for immediate use across all your marketing channels."
                />
            </div>

        </div>
    )
}