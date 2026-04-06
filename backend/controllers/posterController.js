const Poster = require('../models/Poster');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');

// @desc    Get all posters
// @route   GET /api/posters
// @access  Public
const getPosters = async (req, res) => {
    try {
        const posters = await Poster.find({});
        res.json(posters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new poster
// @route   POST /api/posters
// @access  Private/Admin
const addPoster = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const imageUrl = await uploadToCloudinary(req.file.path, 'posters');

        const poster = new Poster({
            imageUrl,
            title: req.body.title || '',
            isActive: req.body.isActive === 'true' || true,
        });

        const createdPoster = await poster.save();
        res.status(201).json(createdPoster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a poster
// @route   DELETE /api/posters/:id
// @access  Private/Admin
const deletePoster = async (req, res) => {
    try {
        const poster = await Poster.findById(req.params.id);

        if (poster) {
            await poster.deleteOne();
            res.json({ message: 'Poster removed' });
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a poster
// @route   PUT /api/posters/:id
// @access  Private/Admin
const updatePoster = async (req, res) => {
    try {
        const poster = await Poster.findById(req.params.id);

        if (poster) {
            poster.title = req.body.title || poster.title;
            poster.isActive = req.body.isActive !== undefined ? req.body.isActive : poster.isActive;

            if (req.file) {
                poster.imageUrl = await uploadToCloudinary(req.file.path, 'posters');
            }

            const updatedPoster = await poster.save();
            res.json(updatedPoster);
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosters, addPoster, deletePoster, updatePoster };
