const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth")

module.exports = {
    async register(req,res){
        const { email } = req.body;

        try {
            if(await User.findOne({email})){
                return res.status(400).send({error: 'User already exists'});
            }
            
            const user = await User.create(req.body);

            user.password = undefined;


            const token = jwt.sign({
            id:user.id
        }, config.secret,{expiresIn:86400});

        res.send({user,token});
        } catch (error) {
            return res.status(400).send({erro:'Registration failed'});
        }
    },
    async login(req,res){
        const {email,password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user)
            return res.status(400).send({error:'User not found'});

        if(!await bcrypt.compare(password,user.password))
            return res.status(400).send({error:"Invalid password"});
        
        user.password = undefined;
        
        const token = jwt.sign({
            id:user.id
        }, config.secret,{expiresIn:86400});

        res.send({user,token});
    }
}