const { z } = require("zod");

const insertMenuItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Must be a valid URL"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

module.exports = { insertMenuItemSchema };
