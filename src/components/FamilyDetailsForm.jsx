import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './form.css';
import { Link } from 'react-router-dom';


const FamilyDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    maritalStatus: '',
    anniversaryDate: '',
    spouseDetails: '',
    noOfChildren: '',
    childrenDetails: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const familySchema = yup.object({
    memberId: yup.string().required('Member ID is required'),
    maritalStatus: yup.string().required('Marital Status is required'),
    anniversaryDate: yup.date(),
    spouseDetails: yup.string(),
    noOfChildren: yup.number().integer().min(0, 'Number of children cannot be negative'),
    childrenDetails: yup.string()
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
    try {
      await familySchema.validate(formData, { abortEarly: false });
      const response = await axios.post('http://localhost:5000/family-details', formData);
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
        <h2>Family Details Form</h2>
        <div className="form-group">
          <label>Member ID:</label>
          <input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
          />
          {errors.memberId && <span className="error">{errors.memberId}</span>}
        </div>
        <div className="form-group">
          <label>Marital Status:</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Consecrated Life">Consecrated Life</option>
          </select>
          {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
        </div>
        <div className="form-group">
          <label>Anniversary Date:</label>
          <input
            type="date"
            name="anniversaryDate"
            value={formData.anniversaryDate}
            onChange={handleChange}
          />
          {errors.anniversaryDate && <span className="error">{errors.anniversaryDate}</span>}
        </div>
        <div className="form-group">
          <label>Spouse Details:</label>
          <input
            type="text"
            name="spouseDetails"
            value={formData.spouseDetails}
            onChange={handleChange}
          />
          {errors.spouseDetails && <span className="error">{errors.spouseDetails}</span>}
        </div>
        <div className="form-group">
          <label>No. of Children:</label>
          <input
            type="number"
            name="noOfChildren"
            value={formData.noOfChildren}
            onChange={handleChange}
          />
          {errors.noOfChildren && <span className="error">{errors.noOfChildren}</span>}
        </div>
        <div className="form-group">
          <label>Children Details:</label>
          <input
            type="text"
            name="childrenDetails"
            value={formData.childrenDetails}
            onChange={handleChange}
          />
          {errors.childrenDetails && <span className="error">{errors.childrenDetails}</span>}
        </div>
        <button type="button">Add Child</button>
        <button type="button">Add Spouse</button>
        <button type="submit">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
      <Link to="/">Go to Home</Link> {'\t'}
      </div>

  );
};

export default FamilyDetailsForm;
