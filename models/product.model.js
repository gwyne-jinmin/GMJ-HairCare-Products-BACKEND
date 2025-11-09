// models/product.model.js
const pool = require("../config/db.config");

// Helper function to handle database queries
const executeQuery = async (sql, params = []) => {
  try {
    // pool.execute uses a prepared statement interface which is more secure
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    // Re-throw to be handled by the controller
    throw new Error("Database operation failed.");
  }
};

class Product {
  // CREATE
  static async create({ name, description, price }) {
    const sql =
      "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
    const result = await executeQuery(sql, [name, description, price]);
    // Return the created product's ID and the data
    return { id: result.insertId, name, description, price };
  }

  // READ all
  static async findAll() {
    const sql = "SELECT id, name, description, price, created_at FROM products";
    return executeQuery(sql);
  }

  // READ one by ID
  static async findById(id) {
    const sql =
      "SELECT id, name, description, price, created_at FROM products WHERE id = ?";
    const rows = await executeQuery(sql, [id]);
    return rows[0] || null; // Return the first row or null if not found
  }

  // UPDATE
  static async update(id, { name, description, price }) {
    const sql =
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    const result = await executeQuery(sql, [name, description, price, id]);
    // Return true if exactly one row was changed
    return result.affectedRows === 1;
  }

  // DELETE
  static async delete(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    const result = await executeQuery(sql, [id]);
    // Return true if exactly one row was deleted
    return result.affectedRows === 1;
  }
}

module.exports = Product;