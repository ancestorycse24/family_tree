import React, { useState } from 'react';
import axios from 'axios';

const FamilyDetailsForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    maritalStatus: '',
    anniversaryDate: '',
    spouseDetails: '',
    noOfChildren: '',
    childrenDetails: ''
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
      const response = await axios.post('http://localhost:5000/family-details', formData);
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
        <label>Marital Status:</label>
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Married">Married</option>
          <option value="Unmarried">Unmarried</option>
          <option value="Consecrated Life">Consecrated Life</option>
        </select>
      </div>
      <div>
        <label>Anniversary Date:</label>
        <input type="date" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleChange} />
      </div>
      <div>
        <label>Spouse Details:</label>
        <input type="text" name="spouseDetails" value={formData.spouseDetails} onChange={handleChange} />
      </div>
      <div>
        <label>No. of Children:</label>
        <input type="number" name="noOfChildren" value={formData.noOfChildren} onChange={handleChange} />
      </div>
      <div>
        <label>Children Details:</label>
        <input type="text" name="childrenDetails" value={formData.childrenDetails} onChange={handleChange} />
      </div>
      <button type="button">Add Child</button>
      <button type="button">Add Spouse</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FamilyDetailsForm;
