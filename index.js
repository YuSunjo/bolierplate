const express= require('express');
const  app =express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require('./models/User');


app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:147asdfg@cluster0.caluy.mongodb.net/Cluster0?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('mongodb connected'))
  .catch(err => console.log(err))


app.get('/', (req,res) => {
    res.send('hello hi');
})

app.post('/register', (req, res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면 그것을 데이터베이스에 넣어줌
    
    const user = new User(req.body)

    user.save((err,userInfo) => {
        if(err) return res.json({success: false,err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port , () => console.log(`example app${port}`))