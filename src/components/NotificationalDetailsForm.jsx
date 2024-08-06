
import React, { useState } from 'react';
import axios from 'axios';
import '../form.css';
import { Link } from 'react-router-dom';


const NotificationDetailsForm = () => {
  const initialFormData = {
    memberId: '',
    notificationText: '',
    photo: null,
    postingDateTime: '',
    expiryDateTime: '',
    type: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState(''); 

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
    
    /* for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    } */
    try {
      const response = await axios.post('http://localhost:5000/notification-details', formData/* , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } */);
      console.log('Form Data Submitted: ', response.data);
      setSuccessMessage('Form submitted successfully!');

      setTimeout(() => setSuccessMessage(''), 3000); 
      setFormData(initialFormData); 
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Notification Details</h1>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Notification Text (max 100 words):</label>
          <textarea name="notificationText" value={formData.notificationText} onChange={handleChange} maxLength="600" required />
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <input type="file" name="photo" accept="image/jpeg, image/png" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Posting Date and Time:</label>
          <input type="datetime-local" name="postingDateTime" value={formData.postingDateTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Expiry Date and Time:</label>
          <input type="datetime-local" name="expiryDateTime" value={formData.expiryDateTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Recurring">Recurring</option>
            <option value="One Time">One Time</option>
          </select>
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit">Submit</button>
        <Link to="/">Go to Home</Link>
      </form>
    </div>
  );
};

export default NotificationDetailsForm;