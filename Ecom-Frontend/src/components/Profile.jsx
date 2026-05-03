import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // ADDED useDispatch
import api from '../api/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // INITIALIZED dispatch
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Using your existing api instance which automatically attaches the token
      const response = await api.put('/auth/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newAvatarUrl = response.data.avatarUrl;

      // 1. Update Redux State immediately
      dispatch({ type: "UPDATE_AVATAR", payload: newAvatarUrl });

      // 2. Update LocalStorage so it survives a page refresh
      const storedAuth = JSON.parse(localStorage.getItem("auth"));
      if (storedAuth) {
          storedAuth.avatarUrl = newAvatarUrl;
          localStorage.setItem("auth", JSON.stringify(storedAuth));
      }

      toast.success("Profile picture updated successfully!");
      // The reload has been removed since Redux handles the instant update now!
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-[calc(100vh-70px)]">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">My Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center max-w-md mx-auto">
        {/* Display Avatar */}
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-slate-200" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4 text-5xl font-bold uppercase shadow-sm">
            {user?.username?.charAt(0) || 'U'}
          </div>
        )}

        <h3 className="text-xl font-semibold mb-1 text-slate-800">{user?.username}</h3>
        <p className="text-gray-600 mb-8">{user?.email}</p>

        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
          <button 
            onClick={handleUpload} 
            disabled={uploading || !selectedFile}
            className="w-full bg-custom-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload New Picture'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;