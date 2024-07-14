import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://ancestorycse24:ancestorycse@ancestorycluster.rdbpu7o.mongodb.net/ancestorydb?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schemas and models
const memberSchema = new mongoose.Schema({
  fullName: String,
  fatherSpouseId: String,
  dob: Date,
  birthOrder: Number,
  mobileNumber: String,
  email: String,
  memberId: String
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
  photo: String, // Store photo as a string (URL or path)
  selfIntroduction: String,
  memories: String
}, { collection: 'personal_details' });

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

const familyDetailsSchema = new mongoose.Schema({
  memberId: String,
  maritalStatus: String,
  anniversaryDate: Date,
  spouseDetails: String,
  noOfChildren: Number,
  childrenDetails: [String]
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
  areaOfSpecialization: String
}, { collection: 'professional_details' });

const ProfessionalDetails = mongoose.model('ProfessionalDetails', professionalDetailsSchema);

const educationalDetailsSchema = new mongoose.Schema({
  memberId: String,
  educationLevel: String,
  qualification: String,
  prefixSuffix: String
}, { collection: 'educational_details' });

const EducationalDetails = mongoose.model('EducationalDetails', educationalDetailsSchema);

const notificationDetailsSchema = new mongoose.Schema({
  memberId: String,
  notificationText: String,
  photo: String,
  postingDateTime: Date,
  expiryDateTime: Date,
  type: String
}, { collection: 'notification_details' });

const NotificationDetails = mongoose.model('NotificationDetails', notificationDetailsSchema);

// Define routes
app.post('/members', async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/personal-details', async (req, res) => {
  const { memberId, petName, gender, houseName, address, bloodGroup, contactNo, whatsappNo, alive, dateOfDemise, photo, selfIntroduction, memories } = req.body;

  try {
    const newPersonalDetails = new PersonalDetails({
      memberId, petName, gender, houseName, address, bloodGroup, contactNo, whatsappNo, alive, dateOfDemise, photo, selfIntroduction, memories
    });

    const savedPersonalDetails = await newPersonalDetails.save();
    res.status(201).json(savedPersonalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/family-details', async (req, res) => {
  const familyDetails = new FamilyDetails(req.body);
  try {
    const newFamilyDetails = await familyDetails.save();
    res.status(201).json(newFamilyDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/professional-details', async (req, res) => {
  const professionalDetails = new ProfessionalDetails(req.body);
  try {
    const newProfessionalDetails = await professionalDetails.save();
    res.status(201).json(newProfessionalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/educational-details', async (req, res) => {
  const educationalDetails = new EducationalDetails(req.body);
  try {
    const newEducationalDetails = await educationalDetails.save();
    res.status(201).json(newEducationalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/notification-details', async (req, res) => {
  const { memberId, notificationText, photo, postingDateTime, expiryDateTime, type } = req.body;

  try {
    const newNotificationDetails = new NotificationDetails({
      memberId,
      notificationText,
      photo,
      postingDateTime,
      expiryDateTime,
      type
    });

    const savedNotificationDetails = await newNotificationDetails.save();
    res.status(201).json(savedNotificationDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});