import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
        <h1>home</h1>
      <div><Link to="/form">Go to Registration Details Form</Link></div>
      <div><Link to="/personal-details">Go to Personal Details Form</Link></div>
      <div><Link to="/family-details">Go to Family Details Form</Link></div>
      <div><Link to="/professional-details">Go to Professional Details Form</Link></div>
      <div><Link to="/educational-details">Go to Educational Details Form</Link></div>
      <div><Link to="/notification-details">Go to Notification Details Form</Link></div>
    </div>
  );
};

export default Landing;
