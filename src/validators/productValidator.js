const Joi = require("joi")
 const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least 2 characters long",
      "any.required": "Product name is required"
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("")
    .messages({
      "string.max": "Description cannot exceed 500 characters"
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a valid number",
      "number.min": "Price must be a positive number",
      "any.required": "Price is required"
    }),

  count: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.min": "Count cannot be negative"
    }),

  category: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Category must be a string"
    }),

  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          "string.uri": "Image URL must be a valid link",
          "any.required": "Image URL is required"
        }),
        alt: Joi.string().trim().allow("").messages({
          "string.base": "Alt text must be a string"
        })
      })
    )
    .default([]),

  isActive: Joi.boolean().default(true)
});

module.exports=productSchema