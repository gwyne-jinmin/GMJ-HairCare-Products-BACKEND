const Product = require("../models/product.model");

// Utility function for consistent error handling
const handleError = (res, message, status = 500, detail = null) => {
  console.error(message, detail || "");
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && detail ? { detail } : {}),
  });
};

// --------------------
// CREATE Product
// --------------------
exports.create = async (req, res) => {
  const { name, description, price, quantity } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      error: "Name and price are required fields.",
    });
  }

  const priceValue = parseFloat(price);
  if (isNaN(priceValue) || priceValue <= 0) {
    return res.status(400).json({
      error: "Price must be a valid positive number.",
    });
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price: priceValue,
      quantity,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    handleError(res, "Could not create product.", 500, err.message);
  }
};

// --------------------
// FIND ALL Products
// --------------------
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products || []);
  } catch (err) {
    handleError(res, "Could not retrieve products.", 500, err.message);
  }
};

// --------------------
// FIND ONE Product
// --------------------
exports.findOne = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: `Product with id ${id} not found.` });
    }

    res.status(200).json(product);
  } catch (err) {
    handleError(res, `Error retrieving product with id ${id}.`, 500, err.message);
  }
};

// --------------------
// UPDATE Product
// --------------------
exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, quantity } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: `Product with id ${id} not found.` });
    }

    const updatedProduct = await Product.update(id, {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      quantity: quantity !== undefined ? quantity : existingProduct.quantity,
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    handleError(res, `Error updating product with id ${id}.`, 500, err.message);
  }
};

// --------------------
// DELETE Product
// --------------------
exports.delete = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: `Product with id ${id} not found.` });
    }

    await Product.delete(id);
    res.status(200).json({ message: `Product with id ${id} deleted successfully.` });
  } catch (err) {
    handleError(res, `Error deleting product with id ${id}.`, 500, err.message);
  }
};
