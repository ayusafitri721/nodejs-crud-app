const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Halaman utama - tampilkan semua users
router.get("/", userController.showUsers);

// Form tambah user
router.get("/add", userController.showAddForm);
router.post("/add", userController.createUser);

// Form edit user
router.get("/edit/:id", userController.showEditForm);
router.post("/edit/:id", userController.updateUser);

// Delete user
router.post("/delete/:id", userController.deleteUser);

module.exports = router;
