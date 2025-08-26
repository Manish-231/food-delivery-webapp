
const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.food_items,global.food_category]);
    }
    catch(err){
        console.err(err.message);
        res.send("Server Error");
    }
})

module.exports = router;