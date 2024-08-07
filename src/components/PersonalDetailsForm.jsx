import React, { useState } from 'react';
import axios from 'axios';
import '../form.css';
import { Link } from 'react-router-dom';


const PersonalDetailsForm = () => {
  const initialFormData = {
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
  };

  const [personalDetails, setPersonalDetails] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState(''); 

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
      const response = await axios.post('http://localhost:5000/personal-details', personalDetails);
      console.log('Personal Details Submitted: ', response.data);
      setSuccessMessage('Form submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); 
      setPersonalDetails(initialFormData);  
    } catch (error) {
      console.error('There was an error submitting the personal details!', error);
    }
  };
 
 
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-content">
        <h1>Personal Details</h1>
        <div className="form-group">
          <label>Member ID:</label>
          <input type="text" name="memberId" value={personalDetails.memberId} onChange={handleChange} required />
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
        </div>
        <div className="form-group">
          <label>WhatsApp No:</label>
          <input type="tel" name="whatsappNo" value={personalDetails.whatsappNo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Alive:</label>
          <input type="checkbox" name="alive" checked={personalDetails.alive} onChange={(e) => setPersonalDetails({ ...personalDetails, alive: e.target.checked })} />
        </div>
        <div className="form-group">
          <label>Date of Demise:</label>
          <input type="date" name="dateOfDemise" value={personalDetails.dateOfDemise} onChange={handleChange} disabled={personalDetails.alive} />
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Self-introduction:</label>
          <textarea name="selfIntroduction" value={personalDetails.selfIntroduction} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Memories (about the departed member):</label>
          <textarea name="memories" value={personalDetails.memories} onChange={handleChange} />
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit">Submit</button>
        <Link to="/">Go to Home</Link>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;