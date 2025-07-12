import { CircleCheck, X } from 'lucide-react';

export default function Submitted({ setOpen }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-xl px-8 py-8 shadow-lg text-center max-w-sm w-full relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <CircleCheck className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Submitted</h2>
        <p className="text-gray-600 text-sm">
          Your video will be accessible on the library page once finished generating.
        </p>
      </div>
    </div>
  );
}
