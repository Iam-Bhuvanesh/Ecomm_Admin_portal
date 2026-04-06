const express = require('express');
const router = express.Router();
const { getPosters, addPoster, deletePoster, updatePoster } = require('../controllers/posterController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getPosters)
    .post(protect, admin, upload.single('image'), addPoster);

router.route('/:id')
    .put(protect, admin, upload.single('image'), updatePoster)
    .delete(protect, admin, deletePoster);

module.exports = router;
