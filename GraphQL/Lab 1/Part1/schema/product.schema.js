const Joi = require("joi");

const ProductSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required().description("name of the product"),
  price: Joi.number().integer().required().description("price of the product"),
  categoryId: Joi.string().optional(),
});

module.exports = ProductSchema;
