const bcrypt = require('bcrypt');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');

async function encryptPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
}

module.exports = {
    getUsers: async (req, res) => {
        const users = await userSchema.find();
        res.send({ users });
        console.log(users);
    },

    getUser: async (req, res) => {
        const user = await userSchema.findOne({ _id: req.params.id });
        res.send({ user });
        console.log('User found: ', user);
    },

    login: async (req, res) => {
        console.log('Login requested');

        const username = req.body.username
        const plainPassword = req.body.password;

        const user = await userSchema.findOne({ username: username });
        if (!user) {
            console.log('User not found!')
            return res.send({ message: 'User not found!' });
        }

        const comparePassword = await bcrypt.compare(plainPassword, user.password)

        res.send({
            message: comparePassword ? `Congrats, you're logged in!` : 'Password is wrong',
            user: comparePassword ? user : null
        })
    },

    register: async (req, res) => {
        
        const username = req.body.username
        const plainPassword = req.body.password;
        const name = req.body.name;

        if (username === '' || plainPassword === '' || name === ''){
            return res.send({ error: `Username or password is missing!` })
        }

        const userExists = await userSchema.findOne({ username: username });

        if (userExists) {
            return res.send({ error: `User ${username} already exists!` })
        };

        const hashedPassword = await encryptPassword(plainPassword)
        const user = new userSchema({
            username: username,
            name: name,
            password: hashedPassword,
            image: 'https://cdn-icons-png.flaticon.com/512/6386/6386976.png'
        })

        const result = await user.save();
        console.log('result: ', result);

        res.send({ message: `User ${username} registered!`, user: result });
    },

    updateUser: async (req, res) => {
        console.log('Hello, user will be updated')
        console.log(req.body);

        if (!req.params.id) {
            return res.send({ error: 'User ID is expected' })
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.send({ error: 'User ID format ID is broken' })
        }

        const user = await userSchema.findById(req.params.id);
        if (!user) {
            return res.send({ error: 'User not found!' })
        }

        Object.keys(req.body).forEach(key => {
            console.log(`Key: ${key}, previous value: ${user[key]}, new value: ${req.body[key]}`)

            if (key === 'favorites') {
                user[key] = JSON.parse(req.body[key]);
            } else {
                user[key] = req.body[key];
            }
        })
            
        const result = await user.save();


        res.send({ result })
    }
}