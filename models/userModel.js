const db = require("../config/database");

class User {
  // Get all users
  static async findAll() {
    try {
      const [rows] = await db.query("SELECT * FROM users ORDER BY id DESC");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  static async findById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    try {
      const { name, email, phone } = userData;
      const [result] = await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [name, email, phone]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async update(id, userData) {
    try {
      const { name, email, phone } = userData;
      const [result] = await db.query(
        "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
        [name, email, phone, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
