import React, { useState } from 'react';
import axios from 'axios';

const EducationalDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    educationLevel: '',
    qualification: '',
    prefixSuffix: ''
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
      const response = await axios.post('http://localhost:5000/educational-qualification', formData);
      console.log('Form Data Submitted: ', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Member ID:</label>
        <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} required />
      </div>
      <div>
        <label>Education Level:</label>
        <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Doctorate">Doctorate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Graduate">Graduate</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div>
        <label>Qualification:</label>
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
      </div>
      <div>
        <label>Prefix/Suffix based on qualification or profession:</label>
        <input type="text" name="prefixSuffix" value={formData.prefixSuffix} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EducationalDetailsForm;
