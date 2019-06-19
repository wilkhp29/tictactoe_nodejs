const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    vitorias:{
        type:Number,
        default:0
    },
    derrotas:{
        type:Number,
        default:0
    },
    empates:{
        type:Number,
        default:0
    }

});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;

    next();
});


module.exports = mongoose.model('User',UserSchema);