const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Role = require('../models/Role');
const Statistic = require('../models/Statistic');
const router = Router();
const validateToken = require('../middleware/auth.middleware');

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некорректный email.').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов.').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации.' 
                });
            }

            const {login, email, password, lastName, firstName, patronymic} = req.body;

            const candidateLogin = await User.findOne({login});
            if (candidateLogin) {
                return res.status(400).json({ message: 'Пользователь с таким логином уже существует.' });
            }

            const candidateEmail = await User.findOne({email});
            if (candidateEmail) {
                return res.status(400).json({ message: 'Пользователь с такой электронной почтой уже существует.' });
            }

            const hashedPeassword = await bcrypt.hash(password, 12);
            const userRole = await Role.findOne({value: 'user'})
            const user = new User ({login, email, password: hashedPeassword, lastName, firstName, patronymic, roles: [userRole.value]});

            await user.save();

            const userLogin = await User.findOne({login});
            console.log(userLogin)
            const userId = userLogin._id.toString();
            console.log(userId)

            const statistic = new Statistic ({
                all: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                right: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                statistic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                user: userId,
                login: userLogin.login
            });

            await statistic.save();

            res.status(201).json({ message: 'Пользователь создан.' });
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка.' });
        }
    }
)

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Введите корректный email.').normalizeEmail().isEmail(),
        check('password', 'Введите пароль.').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему.' 
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({email}).populate({
                path: 'assignments',
                populate: {
                    path: 'variant',
                    populate: {
                        path: 'tasks'
                    }
                }
            })
            const statisticInfo = await Statistic.findOne({user: user._id});

            if (!user){
                return res.status(400).json({ message: 'Неверный логин или пароль.' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Неверный логин или пароль.' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                /*{ expiresIn: '5h' }*/
            )

            res.json({ 
                token, 
                user: { userId: user.id, login: user.login, email: user.email, lastName: user.lastName, firstName: user.firstName, patronymic: user.patronymic, 
                    roles: user.roles, group: user.group, assignments: user.assignments }, 
                statistic: { all: statisticInfo.all, right: statisticInfo.right, statistic: statisticInfo.statistic }
            });
        } catch (e) {
            res.status(500).json({ message: 'Ошибка.' });
        }
    }
)

// /api/auth/auth
router.get(
    '/auth', 
    validateToken,
    async (req, res) => {
        try {
            const user = await User.findOne({userId: req.user.id});
            /*const statisticInfo = await Statistic.findOne({user: req.user.id});*/
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                /*{ expiresIn: '5h' }*/
            )
            res.json({ 
                token, 
                user: { userId: user.id, login: user.login }, 
                /*statistic: { all: statisticInfo.all, right: statisticInfo.right, statistic: statisticInfo.statistic}*/
            });
            console.log(res)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка.' });
        }
    }
)

// /api/auth/updateStat
router.post(
    '/updateStat', 
    async (req, res) => {
        try {
            const {login, statistic} = req.body;
            console.log(login, statistic.all)
            await Statistic.updateOne({login: login}, 
                {$set: {all: statistic.all, right: statistic.right, statistic: statistic.statistic}})

            res.status(201).json({ message: 'bbbbb' });
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка.' });
        }
    }
)

// /api/auth/users
router.get(
    '/users',
    async (req, res) => {
        try {
            const allUsers = await User.find({roles: 'user'})
            res.json(allUsers);
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка.' });
        }
    }
)

/*// api/auth/user
router.get(
    '/user/:id',
    validateToken,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            console.log(req.params.id)
            res.json(user);
        }
        catch (e) {
            
        }
})*/

/*router.delete(
    '/user/:id',
    async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            console.log(req.params.id)
            res.json(user);
        }
        catch (e) {
            
        }
})*/

module.exports = router;