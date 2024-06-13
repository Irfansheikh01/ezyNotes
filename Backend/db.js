const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://irfansheikh41297:Anat09passformongoatlas@mern01.7qscckg.mongodb.net/?retryWrites=true&w=majority&appName=mern01'
// const mongoURI = "mongodb://localhost:27017/ezynotes"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo Successfully!")
    })
}

module.exports = connectToMongo;