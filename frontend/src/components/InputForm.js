import { useState } from 'react';
import { Upload, ImagePlus, Loader2 } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function InputForm() {
    const [formData, setFormData] = useState({
        productName: '',
        language: '',
        productDescription: '',
        price: '',
        promotion: '',
        audience: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            if (imageFile) {
                const imageRef = ref(storage, `productImages/${uuidv4()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const docRef = await addDoc(collection(db, 'videos'), {
                ...formData,
                productImage: imageUrl,
                status: 'generating',
                timestamp: new Date(),
            });

            navigate('../library', { state: { justSubmitted: true } });
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong while uploading. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="w-3/5 w-full mx-auto mt-10 space-y-6 bg-white rounded-xl px-12 py-12 shadow-md">
            {/* Product Name */}
            <div className="flex flex-col">
                <label htmlFor="productName" className="mb-1 font-medium">Product Name</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter your product name"
                    className="px-4 py-2 border rounded-md"
                />
            </div>

            {/* Language */}
            <div className="flex flex-col">
                <label htmlFor="language" className="mb-1 font-medium">Language</label>
                <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="Enter your preferred language"
                    className="px-4 py-2 border rounded-md"
                />
            </div>

            {/* Product Description */}
            <div className="flex flex-col">
                <label htmlFor="productDescription" className="mb-1 font-medium">Product Description</label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder="Describe your product features, benefits, and key selling points"
                    className="px-4 py-2 border rounded-md h-24 resize-none"
                />
            </div>

            {/* Price */}
            <div className="flex flex-col">
                <label htmlFor="price" className="mb-1 font-medium">Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., $29.99, IDR 45,000, etc"
                    className="px-4 py-2 border rounded-md"
                />
            </div>

            {/* Promotion Details */}
            <div className="flex flex-col">
                <label htmlFor="promotion" className="mb-1 font-medium">Promotion Details</label>
                <textarea
                    id="promotion"
                    name="promotion"
                    value={formData.promotion}
                    onChange={handleChange}
                    placeholder="Special offers, discounts, limited time deals"
                    className="px-4 py-2 border rounded-md h-24 resize-none"
                />
            </div>

            {/* Audience */}
            <div className="flex flex-col">
                <label htmlFor="audience" className="mb-1 font-medium">Audience</label>
                <input
                    type="text"
                    id="audience"
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    placeholder="e.g., Young professionals, Fitness enthusiast, Tech-savvy consumers"
                    className="px-4 py-2 border rounded-md"
                />
            </div>

            {/* Product Image */}
            <div className="flex flex-col">
                <label htmlFor="productImage" className="mb-1 font-medium">Product Image</label>
                <div className="relative w-fit">
                    <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white text-gray-700 text-sm cursor-pointer relative z-0 transition-colors duration-200 peer-hover:bg-emerald-100 peer-hover:border-emerald-500">
                        <ImagePlus className="w-4 h-4 text-emerald-600" />
                        <span>Choose an image file</span>
                    </div>
                </div>

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 max-h-48 rounded-md object-contain border"
                    />
                )}
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className={`flex flex-row items-center justify-center gap-2 px-4 py-4 rounded-lg shadow-lg w-full ${
                    loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin text-white" />
                        <span className="text-white font-medium">Generating...</span>
                    </>
                ) : (
                    <>
                        <Upload className="text-white" />
                        <span className="text-white font-medium">Generate Video</span>
                    </>
                )}
            </button>
        </form>
    );
}
