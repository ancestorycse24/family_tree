import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import '../form.css';
import { Link } from 'react-router-dom';

const EducationalDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    educationLevel: '',
    qualification: '',
    prefixSuffix: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const educationalSchema = yup.object({
    memberId: yup.string().required('Member ID is required'),
    educationLevel: yup.string().required('Education level is required'),
    qualification: yup.string().required('Qualification is required'),
    prefixSuffix: yup.string()
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
      await educationalSchema.validate(formData, { abortEarly: false });
      const response = await axios.post('http://localhost:5000/educational-details', formData);
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
        <h2>Educational Details Form</h2>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} />
          {errors.memberId && <span className="error">{errors.memberId}</span>}
        </div>
        <div className="form-group">
          <label>Education Level:</label>
          <select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Others">Others</option>
          </select>
          {errors.educationLevel && <span className="error">{errors.educationLevel}</span>}
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
          {errors.qualification && <span className="error">{errors.qualification}</span>}
        </div>
        <div className="form-group">
          <label>Prefix/Suffix based on qualification or profession:</label>
          <input type="text" name="prefixSuffix" value={formData.prefixSuffix} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      <Link to="/">Go to Home</Link> {'\t'}
      </div>
  );
};
export default EducationalDetailsForm;
