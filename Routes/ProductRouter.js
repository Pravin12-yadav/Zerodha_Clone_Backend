const ensureAuthentaction=require("../Middlewares/Auth");
const router = require("express").Router();

router.get("/",ensureAuthentaction,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"Tv",
            price:30000
        },
    ])
});

module.exports = router;