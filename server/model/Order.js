const mongoose = require("mongoose");
console.log("i am here also")
const OrderSchema = mongoose.Schema(
  {
    order_id: { type: String },
    user_id: {type: mongoose.Schema.Types.ObjectId,ref: "Userins"},
    details: {type:String},
    total_quantity: { type: Number },
    total_price: { type: Number },
    status: {
      type: String,
      
      default: "Ready to Pick Up",
    
    },
    address: { type: String },
  },

);

const order = mongoose.model("order", OrderSchema);
module.exports = order;
