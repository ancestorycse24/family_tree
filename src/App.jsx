import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/form';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import ProfessionalDetailsForm from './components/ProfessionalDetailsForm';
import EducationalQualificationForm from './components/EducationalDetailsForm.jsx';
import NotificationDetailsForm from './components/NotificationlDetailsForm.jsx';
import Landing from './components/Landing.jsx'


import FamilyDetailsForm from './components/FamilyDetailsForm'; // Import FamilyDetailsForm

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/form" element={<Form/>} />
        <Route path="/personal-details" element={<PersonalDetailsForm />} />
        <Route path="/family-details" element={<FamilyDetailsForm />} />
        <Route path="/professional-details" element={<ProfessionalDetailsForm />} />
        <Route path="/educational-details" element={<EducationalQualificationForm />} />
        <Route path="/notification-details" element={<NotificationDetailsForm />} />



      </Routes>
    </Router>
  );
};

export default App;
