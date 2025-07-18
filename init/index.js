const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//connecting mongodb
main().then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    //adding owner
    initData.data = initData.data.map((obj)=>({
      ...obj,
      owner:"68721688dff1afa30fe9a74c"
    }));
    await Listing.insertMany(initData.data);
    console.log("data intialized");
};
initDB();