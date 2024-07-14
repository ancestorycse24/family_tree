import React, { useState } from 'react';
import axios from 'axios';

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  
    

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSubmit = new FormData();
  //   for (const key in formData) {
  //     formDataToSubmit.append(key, formData[key]);
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/notification-details', formDataToSubmit, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log('Form Data Submitted: ', response.data);
  //   } catch (error) {
  //     console.error('There was an error submitting the form!', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Notification Details: ', formData); // Log notification details
  
    try {
      const response = await axios.post('http://localhost:5000/notification-details', formData);
      console.log('Notification Details Submitted: ', response.data);
    } catch (error) {
      console.error('There was an error submitting the notification details!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
    </form>
  );
};

export default NotificationDetailsForm;
