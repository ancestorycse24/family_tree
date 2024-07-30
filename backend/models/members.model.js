/* import mongoose from 'mongoose'; */
const mongoose = require("mongoose");

// Define schemas and models
const memberSchema = new mongoose.Schema({
  fullName: String,
  fatherSpouseId: String,
  dob: Date,
  birthOrder: Number,
  mobileNumber: String,
  email: String,
  memberId: String,
  password: String,
}, { collection: 'registrations' });
const Member = mongoose.model('Member', memberSchema);

const personalDetailsSchema = new mongoose.Schema({
  memberId: String,
  petName: String,
  gender: String,
  houseName: String,
  address: String,
  bloodGroup: String,
  contactNo: String,
  whatsappNo: String,
  alive: Boolean,
  dateOfDemise: Date,
  photo: String,
  selfIntroduction: String,
  memories: String,
}, { collection: 'personal_details' });
const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

const familyDetailsSchema = new mongoose.Schema({
  memberId: String,
  maritalStatus: String,
  anniversaryDate: Date,
  spouseDetails: String,
  noOfChildren: Number,
  childrenDetails: [String],
}, { collection: 'family_details' });
const FamilyDetails = mongoose.model('FamilyDetails', familyDetailsSchema);

const professionalDetailsSchema = new mongoose.Schema({
  memberId: String,
  occupation: String,
  institution: String,
  industry: String,
  otherIndustry: String,
  experienceYears: Number,
  positionsHeld: String,
  areaOfSpecialization: String,
}, { collection: 'professional_details' });
const ProfessionalDetails = mongoose.model('ProfessionalDetails', professionalDetailsSchema);

const educationalDetailsSchema = new mongoose.Schema({
  memberId: String,
  educationLevel: String,
  qualification: String,
  prefixSuffix: String,
}, { collection: 'educational_details' });
const EducationalDetails = mongoose.model('EducationalDetails', educationalDetailsSchema);

const notificationDetailsSchema = new mongoose.Schema({
  memberId: String,
  notificationText: String,
  photo: String,
  postingDateTime: Date,
  expiryDateTime: Date,
  type: String,
}, { collection: 'notification_details' });
const NotificationDetails = mongoose.model('NotificationDetails', notificationDetailsSchema);

module.exports= { Member, PersonalDetails, FamilyDetails, ProfessionalDetails, EducationalDetails, NotificationDetails };
