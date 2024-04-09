const Place = require('../models/Place');
const Tour = require('../models/Tour');

class TourService {
    async getToursByRegion(region) {
        try {
            const places = await Place.find({ region: region });
            const placeIds = places.map((place) => place._id);
            const tours = await Tour.find({ placeData: { $in: placeIds } }).populate('placeData');
            return { region: region, tours: tours };
        } catch (error) {
            console.error(`Error retrieving tours for ${region}:`, error);
            throw error;
        }
    }
    async getLatestToursByRegion(region, limit) {
        try {
            const places = await Place.find({ region: region });
            const placeIds = places.map((place) => place._id);
            const tours = await Tour.find({ placeData: { $in: placeIds } })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('placeData');
            return tours;
        } catch (error) {
            console.error(`Error retrieving tours for ${region}:`, error);
            throw error;
        }
    }
}

module.exports = TourService;
