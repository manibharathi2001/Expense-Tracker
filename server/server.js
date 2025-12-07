const app=require('./app.js');
const connectDB = require('./config/mongo.js');
require('dotenv').config()
const port=process.env.PORT ||5000;

//db connection

connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
