const {model}=require("mongoose");
const {PositionSchema}=require("../schemas/PositionSchema");
const PositionModel=new model("Position",PositionSchema);

module.exports={PositionModel};