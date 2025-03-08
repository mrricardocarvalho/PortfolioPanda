const Watchlist = require('../models/watchlist'); // Assuming a Watchlist model exists

module.exports = {
    getAll: async (req, res) => {
        try {
            const watchlistItems = await Watchlist.find({ user: req.user.id }); // Filter by user
            res.json(watchlistItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const watchlist = await Watchlist.findById(req.params.id);
            if (!watchlist) {
                return res.status(404).json({ message: 'Watchlist item not found' });
            }
            res.json(watchlist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const watchlist = new Watchlist(req.body);
            await watchlist.save();
            res.status(201).json(watchlist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const watchlist = await Watchlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!watchlist) {
                return res.status(404).json({ message: 'Watchlist item not found' });
            }
            res.json(watchlist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const watchlist = await Watchlist.findByIdAndDelete(req.params.id);
            if (!watchlist) {
                return res.status(404).json({ message: 'Watchlist item not found' });
            }
            res.json({ message: 'Watchlist item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};