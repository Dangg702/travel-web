const Place = require('../models/Place');

class PlaceController {
    // POST api/place/add-place
    addPlace(req, res, next) {
        Place.findOne({ name: req.body.name })
            .then((place) => {
                if (place) {
                    res.json({ message: 'Place already exists' });
                } else {
                    const place = new Place(req.body);
                    place
                        .save()
                        .then((place) => res.json({ message: 'Place created successfully', data: place }))
                        .catch(next);
                }
            })
            .catch(next);
    }

    // PUT api/place/edit-place/:id
    editPlace(req, res, next) {
        const placeId = req.params.id;
        const updateData = req.body;
        Place.findByIdAndUpdate(placeId, updateData, { new: true })
            .then((place) => {
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Edit place successfully', data: place });
                }
            })
            .catch(next);
    }
    // DELETE api/place/delete-place/:id
    deletePlace(req, res, next) {
        const placeId = req.params.id;
        Place.findByIdAndDelete(placeId)
            .then((place) => {
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Delete place successfully' });
                }
            })
            .catch(next);
    }
    // GET api/place/search-place/:name
    searchPlace(req, res, next) {
        const placeName = req.params.name;
        Place.find({ name: placeName })
            .then((places) => {
                if (places.length < 0) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Success', data: places });
                }
            })
            .catch(next);
    }
}

module.exports = new PlaceController();
