const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/', registerUser); // Allow registration for initial setup

module.exports = router;
