const express= require('express');
const  app =express()
const port = 5000



const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:147asdfg@cluster0.caluy.mongodb.net/Cluster0?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('mongodb connected'))
  .catch(err => console.log(err))


app.get('/', (req,res) => {
    res.send('hello');
})


app.listen(port , () => console.log(`example app${port}`))