const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds =10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    
    },
    email: {
        type: String,
        trim : true,           //space 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength : 5,
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default :0
    },
    image :String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){

    var user=this;
    //처음에 postman으로 보내서 mongodb에서 암호화된것을 확인가능
    //비밀번호 암호화 시킨다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err)
                user.password= hash
                next();
            })
        })

    }else{
        next()
    }
})


userSchema.methods.comparePassword =function(plainPassword, cb) {
    //plainPassword 123456  암호화된 비밀번호가 같은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken =function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 token 생성하기
    var token=jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id+'secretToken'=token 
    // token 을 해석할때 'secretToken'을 넣으면 -> user._id가 나옴
    user.token= token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}


const User= mongoose.model('User',userSchema)
module.exports = {User}