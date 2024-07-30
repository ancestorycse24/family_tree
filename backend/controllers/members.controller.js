const express =require('express');
const modelobj=require('../models/members.model.js');
const sendMail = require('../mailer.js'); // Adjust the path as needed


const members = async (req, res) => {
  console.log("submitted")
  const member = new modelobj.Member(req.body);
  try {
    const newMember = await member.save();

      // Send email with the password and username (email)
      const email = req.body.email;
      const password = req.body.password;
      const subject = 'Your Registration Details';
      const text = `Hello ${req.body.fullName},\n\nYour registration is successful. Here are your login credentials:\n\nUsername: ${email}\nPassword: ${password}\n\nPlease keep this information secure.\n\nBest regards,\nAncestory`;
  
      sendMail(email, subject, text);

    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const personalDetails = async (req, res) => {
  
  const { memberId, petName, gender, houseName, address, bloodGroup, contactNo, whatsappNo, alive, dateOfDemise, photo, selfIntroduction, memories } = req.body;

  try {
    const newPersonalDetails = new modelobj.PersonalDetails({
      memberId, petName, gender, houseName, address, bloodGroup, contactNo, whatsappNo, alive, dateOfDemise, photo, selfIntroduction, memories
    });

    const savedPersonalDetails = await newPersonalDetails.save();
    res.status(201).json(savedPersonalDetails);
    console.log("sab changa");
  } catch (err) {
    console.log("no yaar")
    res.status(400).json({ message: err.message });
  }
};

const familyDetails = async (req, res) => {
  const familyDetails = new modelobj.FamilyDetails(req.body);
  try {
    const newFamilyDetails = await familyDetails.save();
    res.status(201).json(newFamilyDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const professionalDetails = async (req, res) => {
  const professionalDetails = new modelobj.ProfessionalDetails(req.body);
  try {
    const newProfessionalDetails = await professionalDetails.save();
    res.status(201).json(newProfessionalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const educationalDetails = async (req, res) => {
  const educationalDetails = new modelobj.EducationalDetails(req.body);
  try {
    const newEducationalDetails = await educationalDetails.save();
    res.status(201).json(newEducationalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const notificationDetails = async (req, res) => {
  const notificationDetails = new modelobj.NotificationDetails(req.body);
  console.log("hogya");
  try {
    const savedNotificationDetails = await notificationDetails.save();
    res.status(201).json(savedNotificationDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports= { members, personalDetails, familyDetails, professionalDetails, educationalDetails, notificationDetails };
