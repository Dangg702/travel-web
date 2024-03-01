const Place = require('../models/Place');
class SearchController {
    // index(req, res) {
    //     res.render('component/search');
    // }

    async getPlace(req, res, next) {
        try {
            const placeName = req.params.name;
            const place = await Place.findOne({ name: placeName });

            if (!place) {
                return res.status(404).render('error', { message: 'Place not found' });
            }

            // Truyền dữ liệu địa điểm vào view
            res.render('component/item', { places: place }); // Chú ý sử dụng places: place
        } catch (error) {
            next(error);
        }
    }

    async searchPlace(req, res, next) {
        try {
            const placeName = req.query.name;

            // biểu thức chính quy trong MongoDB để tìm kiếm các đối tượng có name chứa một phần của placeName. Biểu thức i được sử dụng để tìm kiếm không phân biệt chữ hoa chữ thường.
            const place = await Place.find({ name: { $regex: placeName, $options: 'i' } });
            if (place.length === 0) {
                return res.status(404).render('error', { message: 'No places found' });
            }
            // Truyền dữ liệu địa điểm vào view
            res.render('component/search', { places: place });
            //res.status(200).json({ message: 'Success', data: place });
        } catch (error) {
            next(error);
        }
    }

    searchPlace1(req, res, next) {
        const placeName = req.params.name;
        Place.find({ name: placeName })
            .then((places) => {
                if (!places) {
                    return res.status(404).render('error', { message: 'Place not found' });
                }

                // Truyền dữ liệu địa điểm vào view
                res.render('component/search', { places }); // Chú ý sử dụng places: place
            })
            .catch(next);
    }
}

module.exports = new SearchController();
