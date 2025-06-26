import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update Firebase profile
      await updateProfile(user, { displayName, photoURL });
      
      toast.success('Profile updated successfully!', {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile. Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 bg-base-100">
      <h2 className="text-3xl font-bold mb-8 text-base-content">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-base-content">Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200 border-0 rounded-lg h-12"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-base-content">Profile Picture</label>
          <input
            type="url"
            className="input input-bordered w-full bg-base-200 border-0 rounded-lg h-12"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
            disabled={loading}
            placeholder="Enter profile picture URL"
          />
          {photoURL && (
            <img src={photoURL} alt="Profile" className="w-16 h-16 rounded-full mt-3 object-cover border-2 border-base-300" />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-base-content">Bio</label>
          <textarea
            className="textarea textarea-bordered w-full bg-base-200 border-0 rounded-lg min-h-24"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            disabled={loading}
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className={`btn bg-black text-white hover:bg-gray-800 border-0 px-8 rounded-lg ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;