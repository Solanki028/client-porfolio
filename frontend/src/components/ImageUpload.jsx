"use client";
import { useState } from 'react';
import { FaCloudUploadAlt, FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import api from '@/utils/api';

export default function ImageUpload({ onUpload, currentImage, label = "Upload Image" }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || '');
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size too large (max 5MB)');
            return;
        }

        setError('');
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPreview(res.data.url);
            onUpload(res.data.url);
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onUpload('');
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-brand-text mb-2">{label}</label>

            {preview ? (
                <div className="relative w-full aspect-video bg-brand-dark rounded-lg overflow-hidden border border-gray-700 group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={handleRemove}
                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                            title="Remove Image"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full text-xs">
                        <FaCheck />
                    </div>
                </div>
            ) : (
                <div className="relative border-2 border-dashed border-gray-600 bg-brand-dark rounded-lg p-6 hover:border-brand-red transition-colors text-center cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                    <div className="flex flex-col items-center justify-center text-brand-muted">
                        {uploading ? (
                            <>
                                <FaSpinner className="animate-spin text-3xl mb-2 text-brand-red" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <FaCloudUploadAlt className="text-4xl mb-2" />
                                <span className="text-sm font-medium">Click to upload or drag and drop</span>
                                <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                            </>
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
    );
}
