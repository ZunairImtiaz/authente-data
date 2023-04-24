const { Router } = require('express');
const router = new Router();
const Item = require('../models/item');
const auth = require('../middlewares/auth');
const { authDtoValidator, createItemDto, updateItemDto } = require('../middlewares/validator');

router.post('/create', auth, authDtoValidator(createItemDto), async (req,res) => {
    const item = new Item({ ...req.body, owner: req.user._id });
    try {
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.get('/', auth, async (req,res) => {
    let searchBy = [];
    if (req.query.searchby) {
        const searchValue = req.query.searchby;
        searchBy = [
            { name: { $regex: searchValue, $options: 'i' }},
            { description: { $regex: searchValue, $options: 'i' }}
        ];
        if (Number(searchValue)) {
            searchBy = [ ...searchBy, { price: searchValue },{ quantity: searchValue }];
        };
    };

    const sort = {};
    if (req.query.sortby) {
        const [ field , sortType ] = req.query.sortby.split(':');
        sort[field] = sortType;
    };

    try {
        await req.user.populate({
            path: 'items',
            match: { $or: searchBy },
            options: {
                sort,
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        });
        res.send(req.user.items);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.put('/edit/:id', auth, authDtoValidator(updateItemDto), async (req,res) => {
    const updates = Object.keys(req.body);
    try {
        const item = await Item.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id }, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!item) {
            return res.status(404).send({ message: 'No item found! ' });
        };
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.delete('/delete/:id', auth, async (req,res) => {
    try {
        const response = await Item.deleteOne({ 
            _id: req.params.id, 
            owner: req.user._id 
        });
        if (response.deletedCount === 0) {
            return res.status(404).send({ message: 'No item found! ' });
        };
        res.send(response);
    } catch (error) {
        res.status(400).send(error);
    };
});

module.exports = router;