const bcrypt = require('bcrypt');
const userSchema = require('../schemas/userSchema');

async function encryptPassword(plainPassword){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
}

module.exports = {
    getUsers: async (req, res) => {
        const users = await userSchema.find();
        res.send({users});
        console.log(users);
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
        console.log('User found:', user);

        const comparePassword = await bcrypt.compare(plainPassword, user.password)
        console.log('comparison result: ', comparePassword);

        res.send({
            message: comparePassword ? `Congrats, you're logged in!` : 'Password is wrong',
            user: comparePassword ? user : null
        })
    },

    register: async (req, res) => {
        
        const username = req.body.username
        const plainPassword = req.body.password;

        const userExists = await userSchema.findOne({username: username});

        if (userExists) {
            return res.send({ message: `User ${username} already exists!` })
        };

        const hashedPassword = await encryptPassword(plainPassword)
        const user = new userSchema({
            username: username,
            password: hashedPassword, 
            image: 'https://cdn-icons-png.flaticon.com/512/6386/6386976.png'
        })

        const result = await user.save();
        console.log('result: ', result);

        res.send({ message: `User ${username} registered!`, user: result });
    }
}