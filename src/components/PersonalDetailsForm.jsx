import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './form.css';
import { Link } from 'react-router-dom';


const PersonalDetailsForm = () => {
  const [personalDetails, setPersonalDetails] = useState({
    memberId: '',
    petName: '',
    gender: '',
    houseName: '',
    address: '',
    bloodGroup: '',
    contactNo: '',
    whatsappNo: '',
    alive: true,
    dateOfDemise: '',
    photo: '',
    selfIntroduction: '',
    memories: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const personalDetailsSchema = yup.object({
    memberId: yup.string().required('Member ID is required'),
    petName: yup.string(),
    gender: yup.string(),
    houseName: yup.string(),
    address: yup.string(),
    bloodGroup: yup.string(),
    contactNo: yup.string().matches(/^[0-9]+$/, 'Contact number must be digits only'),
    whatsappNo: yup.string().matches(/^[0-9]+$/, 'WhatsApp number must be digits only'),
    alive: yup.boolean(),
    dateOfDemise: yup.date().when('alive', {
      is: false,
      then: yup.date().required('Date of demise is required')
    }),
    photo: yup.mixed().test('fileType', 'Unsupported File Format', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
    selfIntroduction: yup.string(),
    memories: yup.string()
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Personal Details: ', personalDetails); // Log personal details
    try {
      await personalDetailsSchema.validate(personalDetails, { abortEarly: false });
      const response = await axios.post('http://localhost:5000/personal-details', personalDetails);
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
        <h2>Personal Details Form</h2>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={personalDetails.memberId} onChange={handleChange} />
          {errors.memberId && <span className="error">{errors.memberId}</span>}
        </div>
        <div className="form-group">
          <label>Pet Name:</label>
          <input type="text" name="petName" value={personalDetails.petName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={personalDetails.gender} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>House Name:</label>
          <input type="text" name="houseName" value={personalDetails.houseName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" value={personalDetails.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <input type="text" name="bloodGroup" value={personalDetails.bloodGroup} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact No:</label>
          <input type="tel" name="contactNo" value={personalDetails.contactNo} onChange={handleChange} />
          {errors.contactNo && <span className="error">{errors.contactNo}</span>}
        </div>
        <div className="form-group">
          <label>WhatsApp No:</label>
          <input type="tel" name="whatsappNo" value={personalDetails.whatsappNo} onChange={handleChange} />
          {errors.whatsappNo && <span className="error">{errors.whatsappNo}</span>}
        </div>
        <div className="form-group">
          <label>Alive:</label>
          <input type="checkbox" name="alive" checked={personalDetails.alive} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Demise:</label>
          <input type="date" name="dateOfDemise" value={personalDetails.dateOfDemise} onChange={handleChange} disabled={personalDetails.alive} />
          {errors.dateOfDemise && <span className="error">{errors.dateOfDemise}</span>}
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleChange} />
          {errors.photo && <span className="error">{errors.photo}</span>}
        </div>
        <div className="form-group">
          <label>Self-introduction:</label>
          <textarea name="selfIntroduction" value={personalDetails.selfIntroduction} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Memories (about the departed member):</label>
          <textarea name="memories" value={personalDetails.memories} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
        <Link to="/">Go to Home</Link> {'\t'}
        </div>
  );
};


export default PersonalDetailsForm;