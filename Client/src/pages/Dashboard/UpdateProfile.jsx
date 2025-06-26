import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName, photoURL });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(`Failed to update profile: ${err.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Display Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Picture URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
          />
          {photoURL && (
            <img src={photoURL} alt="Profile" className="w-16 h-16 rounded-full mt-2" />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        {message && <div className="mt-2 text-success">{message}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;