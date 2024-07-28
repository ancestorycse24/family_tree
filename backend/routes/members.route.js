const express =require('express');
const  Controller =require('../controllers/members.controller.js'); // Import everything as Controller

const router = express.Router();

router.post('/members', Controller.members);
router.post('/personal-details', Controller.personalDetails);
router.post('/family-details', Controller.familyDetails);
router.post('/professional-details', Controller.professionalDetails);
router.post('/educational-details', Controller.educationalDetails);
router.post('/notification-details', Controller.notificationDetails);


module.exports=router;