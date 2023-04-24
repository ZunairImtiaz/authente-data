const { Router } = require('express');
const router = new Router();
const User = require('../models/auth');
const auth = require('../middlewares/auth');
const { authDtoValidator, signupDto, editUserDto, editPasswordDto } = require('../middlewares/validator');

router.post('/signup', authDtoValidator(signupDto), async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    };
});

router.post('/signin', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error, message: 'Authentication Fail!'});
    };
});

router.get('/me', auth, async (req,res) => res.status(200).send(req.user));

router.patch('/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token !== req.token);
        await req.user.save();
        res.send({ message: 'logout successfully' });
    } catch (error) {
        res.status(400).send({ error, message: 'some thing went wrong!' });
    };
});

router.patch('/logoutall', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({ message: 'logout successfully from all devices' });
    } catch (error) {
        res.status(500).send(error)
    };
});

router.put('/edit', auth, authDtoValidator(editUserDto), async (req,res) => {
    try {
        const updates = Object.keys(req.body);
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(201).send(req.user);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.patch('/editpassword', auth, authDtoValidator(editPasswordDto), async (req,res) => {
    try {
        await User.findByCredentials(req.user.email, req.body.currentPassword);
        req.user.password = req.body.newPassword;
        await req.user.save();
        res.status(201).send({ message: 'Password changed successfully!'});
    } catch (error) {
        res.status(400).send({error, message: 'Authenticaton Failed!'});
    };
});

router.delete('/delete', auth, async (req,res) => {
    try {
        await req.user.remove();
        res.status(200).send({ message: 'Account is deleted successfully!' });
    } catch (error) {
        res.status(400).send(error);
    };
});

module.exports = router;