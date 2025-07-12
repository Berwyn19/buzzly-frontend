import InputForm from '../components/InputForm';

export default function ProductForm() {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            {/* Centered container with consistent horizontal padding */}
            <div className="max-w-8xl mx-auto px-8 flex flex-col">
                {/* Heading and Form share the same left edge */}
                <h2 className="text-2xl font-bold text-black mb-2 text-center">Create New Video</h2>
                <h3 className="text-xl text-slate-700 mb-6 text-center">
                    Fill in the details below to generate your UGC video
                </h3>
                <InputForm />
            </div>
        </div>
    );
}
