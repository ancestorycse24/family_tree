import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import '../form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherSpouseId: '',
    dob: '',
    birthOrder: '',
    mobileNumber: '',
    email: '',
    memberId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const memberSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    fatherSpouseId: yup.string().required('Father/Spouse ID is required'),
    dob: yup.date().required('Date of birth is required'),
    birthOrder: yup.number().positive().integer().required('Birth order is required'),
    mobileNumber: yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    memberId: yup.string().required('Member ID is required'),
    // password: yup.string().required('Password is required')
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateRandomPassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await memberSchema.validate(formData, { abortEarly: false });
      const randomPassword = generateRandomPassword(12);
      
      console.log('Generated Password:', randomPassword);

      const finalFormData = { ...formData, password: randomPassword };

      // Form is valid, submit data to the server
      console.log("yes")
      const response = await axios.post('http://localhost:5000/members', finalFormData);
      console.log('Form Data Submitted: ', response.data);
      setSuccessMessage('Form submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); 
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-content">
        <h2> MemberRegistration Form</h2>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label>Father’s / Spouse’s ID:</label>
          <input type="text" name="fatherSpouseId" value={formData.fatherSpouseId} onChange={handleChange} />
          {errors.fatherSpouseId && <span className="error">{errors.fatherSpouseId}</span>}
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Birth Order:</label>
          <input type="number" name="birthOrder" value={formData.birthOrder} onChange={handleChange} />
          {errors.birthOrder && <span className="error">{errors.birthOrder}</span>}
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
        </div>
        <div className="form-group">
          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} />
          {errors.memberId && <span className="error">{errors.memberId}</span>}
        </div>
        <button type="submit">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>

        <Link to="/">Go to Home</Link> {'\t'}
      </div>

  );
};

export default Form;