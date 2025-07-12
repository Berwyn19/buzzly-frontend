import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocsFromServer
} from 'firebase/firestore';
import Submitted from '../components/Submitted';
import VideoCard from '../components/VideoCard';

export default function Library() {
  const location = useLocation();
  const justSubmitted = location.state?.justSubmitted;
  const [open, setOpen] = useState(justSubmitted ?? false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('timestamp', 'desc'));
  
    const fetchInitial = async () => {
      try {
        const serverSnapshot = await getDocsFromServer(q);
        const vids = serverSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(vids);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching from server:", err);
      }
    };
  
    fetchInitial(); // First, get fresh server-side data
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vids = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(vids); // Realtime updates
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <div className="p-4 text-center">
      {open && <Submitted setOpen={setOpen} />}

      <h1 className="text-4xl font-bold mb-4 text-gray-800 mb-16 mt-8">Your Video Library</h1>

      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video) => {
            console.log('🎥 Displaying Video URL:', video.videoUrl);

            return (
                <VideoCard video={video} key={video.id}/>
            );
          })}
        </div>
      )}
    </div>
  );
}
