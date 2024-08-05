import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import '../form.css';
import { Link } from 'react-router-dom';


const ProfessionalDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    occupation: '',
    institutionOrSelf: '',
    industry: '',
    otherIndustry: '',
    experience: '',
    positionsHeld: '',
    areaOfSpecialization: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const professionalDetailsSchema = yup.object({
    memberId: yup.string().required('Member ID is required'),
    occupation: yup.string().required('Occupation is required'),
    institutionOrSelf: yup.string(),
    industry: yup.string(),
    otherIndustry: yup.string().when('industry', {
      is: 'Others',
      then: yup.string().required('Please specify the other industry')
    }),
    experience: yup.number().integer().positive('Experience must be a positive integer').nullable(),
    positionsHeld: yup.string(),
    areaOfSpecialization: yup.string()
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
      await professionalDetailsSchema.validate(formData, { abortEarly: false });
      const response = await axios.post('http://localhost:5000/professional-details', formData);
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
        <h2>Professional Details Form</h2>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} />
          {errors.memberId && <span className="error">{errors.memberId}</span>}
        </div>
        <div className="form-group">
          <label>Occupation:</label>
          <select name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Employed">Employed</option>
            <option value="Business">Business</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Agriculture">Agriculture</option>
            <option value="None of the above">None of the above</option>
          </select>
          {errors.occupation && <span className="error">{errors.occupation}</span>}
        </div>
        <div className="form-group">
          <label>Institution/ Self (Mention sector if any):</label>
          <input type="text" name="institutionOrSelf" value={formData.institutionOrSelf} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Industry:</label>
          <select name="industry" value={formData.industry} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="IT">IT</option>
            <option value="Law">Law</option>
            <option value="Finance">Finance</option>
            <option value="Banking">Banking</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Media and news">Media and news</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {formData.industry === 'Others' && (
          <div className="form-group">
            <label>If others, please specify:</label>
            <input type="text" name="otherIndustry" value={formData.otherIndustry} onChange={handleChange} maxLength="50" />
            {errors.otherIndustry && <span className="error">{errors.otherIndustry}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Experience (in years):</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
          {errors.experience && <span className="error">{errors.experience}</span>}
        </div>
        <div className="form-group">
          <label>Positions Held:</label>
          <input type="text" name="positionsHeld" value={formData.positionsHeld} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Area of Specialization:</label>
          <input type="text" name="areaOfSpecialization" value={formData.areaOfSpecialization} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
        <Link to="/">Go to Home</Link> {'\t'}
      </div>
  );
};


export default ProfessionalDetailsForm;