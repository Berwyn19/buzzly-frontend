import { PlayCircle, X } from "lucide-react"
import { useState } from 'react'

export default function VideoCard({ video }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const createdAt = video.timestamp?.seconds
        ? new Date(video.timestamp.seconds * 1000).toLocaleString()
        : "Unknown";

    return (
        <div className="rounded-lg bg-white shadow-lg px-2 py-2 text-center">
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
                <img 
                    src={video.productImage} 
                    alt="Product Image" 
                    className="w-full h-full object-cover" 
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mt-8 mb-4">{video.productName}</h2>
            <p className="text-sm text-gray-500 mb-6">
                Created at: {createdAt}
            </p>
            <div 
                className="flex flex-row px-2 py-2 rounded-lg shadow-lg bg-emerald-600 gap-2 justify-center m-2 cursor-pointer hover:bg-emerald-800"
                onClick={handleClick}
            >
                <PlayCircle className="text-white" />
                <span className="font-bold text-white">See Video</span>
            </div>

            {isClicked && (
                <div className="inset-0 fixed bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl px-8 py-8 shadow-lg max-w-sm w-full relative">
                        <button 
                            className="text-emerald-600 absolute top-3 right-3 hover:text-emerald-800"
                            onClick={handleClick}
                        >
                            <X />
                        </button>

                        {/* Conditional Rendering */}
                        {video.status === "completed" && (
                            <video src={`${video.videoUrl}?v=${video.id}`} className="w-full h-auto mt-8" controls>
                                Video cannot be previewed
                            </video>
                        )}
                        
                        {video.status === "generating" && (
                            <div className="w-full flex flex-col items-center justify-center mt-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
                                <p className="text-gray-600 font-medium">Generating video...</p>
                            </div>
                        )}

                        {video.status === "error" && (
                            <div className="w-full flex flex-col items-center justify-center mt-8">
                                <p className="text-red-600 font-semibold">❌ Error generating video.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
