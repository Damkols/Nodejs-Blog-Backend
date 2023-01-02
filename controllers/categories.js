import Category from "../models/category.js";

// Create Category
export const createCategory = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Categories
export const getAllCategory = async (req, res) => {
  try {
    const cat = await Category.find();
    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json(error);
  }
};
