import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherSpouseId: '',
    dob: '',
    birthOrder: '',
    mobileNumber: '',
    email: '',
    memberId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data: ', formData); // Log form data
    try {
      const response = await axios.post('http://localhost:5000/members', formData);
      console.log('Form Data Submitted: ', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Father’s / Spouse’s ID:</label>
          <input type="text" name="fatherSpouseId" value={formData.fatherSpouseId} onChange={handleChange} required />
        </div>
        <div>
          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Birth Order:</label>
          <input type="number" name="birthOrder" value={formData.birthOrder} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Member ID:</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/personal-details">Go to Personal Details Form</Link> {'\t'}
      <Link to="/family-details">Go to Family Details Form</Link>{'\t'}
      <Link to="/professional-details">Go to Professional Details Form</Link>{'\t'}
      <Link to="/educational-details">Go to Educational Details Form</Link>{'\t'}
      <Link to="/notification-details">Go to Notification Details Form</Link>{'\t'}





    </>
  );
};

export default form;
