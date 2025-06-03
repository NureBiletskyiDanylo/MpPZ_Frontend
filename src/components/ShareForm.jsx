import back from '/classic-back.png'
import { isEmail } from '../AuthContext';
import '../assets/TemplateForm.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ShareForm({ onClose, albumId, user }) {
  const [email, setEmail] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error('Please enter a valid email.')
      return;
    }

    try {
      console.log(email);
      const response = await fetch(`${API_URL}/api/Album/${albumId}/invite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: email }),
      });

      console.log(response);
      if (!response.ok) {
        if (response.status == 400) {
          toast.error("Invitation already sent.")
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send invitation');
      }

      toast.success('Invitation sent!');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="form-container">
        <button className="back-button" onClick={onClose}>
          <img src={back} alt="Back" />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="field-wrapper">
            <input
              className="input-field"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label-text">Email</label>
          </div>
          <button type="submit" className="save-button" style={{ marginTop: '10px' }}>
            Share Album
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShareForm;
