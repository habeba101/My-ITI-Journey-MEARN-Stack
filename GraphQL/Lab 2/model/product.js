const { number, required, string } = require("joi");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "name is required"],
  },
  categoryId: {
    type: Number,
    required: [true, "category Id is required"],
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
});

if (mongoose.models.product) {
  delete mongoose.models.product;
}

const product = mongoose.model("product", productSchema);

module.exports = product;
