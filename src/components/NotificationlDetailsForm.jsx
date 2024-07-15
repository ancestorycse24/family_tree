import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const NotificationDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    notificationText: '',
    photo: null,
    postingDateTime: '',
    expiryDateTime: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({
        ...formData,
        photo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:5000/notifications', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form Data Submitted: ', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h1>Notification details</h1>

        <label>Member ID:</label>
        <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} required />
      </div>
      <div>
        <label>Notification Text (max 100 words):</label>
        <textarea name="notificationText" value={formData.notificationText} onChange={handleChange} maxLength="600" required />
      </div>
      <div>
        <label>Photo:</label>
        <input type="file" name="photo" accept="image/jpeg, image/png" onChange={handleChange} />
      </div>
      <div>
        <label>Posting Date and Time:</label>
        <input type="datetime-local" name="postingDateTime" value={formData.postingDateTime} onChange={handleChange} required />
      </div>
      <div>
        <label>Expiry Date and Time:</label>
        <input type="datetime-local" name="expiryDateTime" value={formData.expiryDateTime} onChange={handleChange} required />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Recurring">Recurring</option>
          <option value="One Time">One Time</option>
        </select>
      </div>
      <button type="submit">Submit</button>
      <div><Link to="/">Go to Home</Link> {'\t'}
      </div>
    </form>
  );
};

export default NotificationDetailsForm;
