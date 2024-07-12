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

// Define a schema and model
const memberSchema = new mongoose.Schema({
    fullName: String,
    fatherSpouseId: String,
    dob: Date,
    birthOrder: Number,
    mobileNumber: String,
    email: String,
    memberId: String
  }, { collection: 'registrations' }); // explicitly set collection name
  
const Member = mongoose.model('Member', memberSchema);

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
