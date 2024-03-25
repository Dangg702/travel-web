const Place = require('../models/Place');

class PlaceController {
    // POST api/place/add-place
    async addPlace(req, res, next) {
        try {
            // Tạo mới đối tượng Place từ dữ liệu được gửi từ biểu mẫu
            const placeData = {
                name: req.body.name,
                desc: req.body.desc,
                img: req.body.img || '', // Sử dụng đường dẫn đến ảnh từ request body (nếu có)
                isFamous: req.body.isFamous || false,
                region: req.body.region || '',
            };

            // Tìm địa điểm có cùng tên trong cơ sở dữ liệu
            const existingPlace = await Place.findOne({ name: placeData.name });

            if (existingPlace) {
                console.log(existingPlace);
                return res.status(200).json({ message: 'Place with this name already exists', isupload: true });
            }

            // Tạo mới đối tượng Place từ dữ liệu được cung cấp
            const place = new Place(placeData);

            // Lưu đối tượng Place vào MongoDB
            const savedPlace = await place.save();

            // Trả về thông báo và đối tượng Place đã lưu thành công
            res.json({ message: 'Place created successfully', data: savedPlace });
        } catch (error) {
            // Xử lý lỗi nếu có
            next(error);
        }
    }

    createForm(req, res, next) {
        res.render('create-form', { layout: 'layouts/dashboard-layout' });
    }
    // GET api/place/edit-place/:id
    editForm(req, res, next) {
        const placeId = req.params.id;
        Place.findById(placeId)
            .then((place) => {
                console.log(place);
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.render('edit-form', { layout: 'layouts/dashboard-layout', place });
                }
            })
            .catch(next);
    }
    // PUT api/place/edit-place/:id
    editPlace(req, res, next) {
        const placeId = req.params.id;
        const updateData = req.body;
        Place.findByIdAndUpdate(placeId, updateData)
            .then((place) => {
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Edit place successfully', data: place });
                }
            })
            .catch(next);
    }
    async editForm(req, res, next) {
        const places = await Place.find();
        res.render('edit-form', { layout: 'layouts/dashboard-layout',places: places  });
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
                    // alert('Delete place successfully');
                }
            })
            .catch(next);
    }
    async deleteForm(req, res, next) {
        const places = await Place.find();
        res.render('delete-form', { layout: 'layouts/dashboard-layout',places: places  });
    }

    // GET api/place/search-place
    async searchForm(req, res, next) {
        const places = await Place.find();
        res.render('search-form', { layout: 'layouts/dashboard-layout',places: places  });
    }

    // GET api/place/search-place/:name
    searchPlace(req, res, next) {
        const placeName = req.params.name;
        Place.find({ name: placeName })
            .then((places) => {
                if (places.length < 0) {
                    return res.status(404).json({ message: 'Place not found' });
                    // return res.status(404).json({ data: places });
                } else {
                    res.status(200).json({ message: 'Success', data: places });
                }
            })
            .catch(next);
    }

    // GET api/place/all-places
    getAllPlace(req, res, next) {
        // const { limit, page, sort } = req.query;
        const { sort, filter } = req.query;
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;

        if (filter) {
            const objectFilter = {};
            objectFilter[filter[0]] = filter[1];
            Place.find({ [filter[0]]: { $regex: filter[1] } })
                .limit(limit)
                .skip((page - 1) * limit)
                .then((places) => {
                    if (places.length === 0) {
                        return res.status(404).json({ message: 'Empty' });
                    } else {
                        Place.countDocuments().then((totalPlaces) => {
                            res.status(200).json({
                                message: 'Success',
                                data: places,
                                currentPage: page,
                                totalPlaces: totalPlaces,
                                totalPages: Math.ceil(totalPlaces / limit),
                            });
                        });
                    }
                })
                .catch(next);
        }

        if (sort) {
            const objectSort = {};
            objectSort[sort[1]] = sort[0];
            Place.find()
                .limit(limit)
                .skip((page - 1) * limit)
                .sort(objectSort)
                .then((places) => {
                    if (places.length === 0) {
                        return res.status(404).json({ message: 'Empty' });
                    } else {
                        Place.countDocuments().then((totalPlaces) => {
                            res.status(200).json({
                                message: 'Success',
                                data: places,
                                currentPage: page,
                                totalPlaces: totalPlaces,
                                totalPages: Math.ceil(totalPlaces / limit),
                            });
                        });
                    }
                })
                .catch(next);
        }
    }

    // GET api/place/place-data
    placeTable(req, res, next) {
        Place.find()
            .then((places) => {
                console.log('places', places);
                if (places.length === 0) {
                    return res.status(404).json({ message: 'Empty' });
                } else {
                    res.render('table-data', {
                        places,
                        layout: 'layouts/dashboard-layout',
                    });
                }
            })
            .catch(next);
    }
}

module.exports = new PlaceController();
