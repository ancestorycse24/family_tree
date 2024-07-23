import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:5000/professional-details', formData);
      console.log('Form Data Submitted: ', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h1>Professional details</h1>

        <label>Member ID:</label>
        <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} required />
      </div>
      <div>
        <label>Occupation:</label>
        <select name="occupation" value={formData.occupation} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Employed">Employed</option>
          <option value="Business">Business</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Agriculture">Agriculture</option>
          <option value="None of the above">None of the above</option>
        </select>
      </div>
      <div>
        <label>Institution/ Self (Mention sector if any):</label>
        <input type="text" name="institutionOrSelf" value={formData.institutionOrSelf} onChange={handleChange} />
      </div>
      <div>
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
        <div>
          <label>If others, please specify:</label>
          <input type="text" name="otherIndustry" value={formData.otherIndustry} onChange={handleChange} maxLength="50" />
        </div>
      )}
      <div>
        <label>Experience (in years):</label>
        <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
      </div>
      <div>
        <label>Positions Held:</label>
        <input type="text" name="positionsHeld" value={formData.positionsHeld} onChange={handleChange} />
      </div>
      <div>
        <label>Area of Specialization:</label>
        <input type="text" name="areaOfSpecialization" value={formData.areaOfSpecialization} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
      <div></div><Link to="/">Go to Home</Link> {'\t'}

    </form>
  );
};

export default ProfessionalDetailsForm;
