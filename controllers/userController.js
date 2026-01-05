const User = require("../models/userModel");

// Tampilkan semua users
exports.showUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("users", {
      users: users,
      message: req.query.message || null,
      error: req.query.error || null,
    });
  } catch (error) {
    res.render("users", {
      users: [],
      message: null,
      error: "Gagal memuat data: " + error.message,
    });
  }
};

// Tampilkan form tambah user
exports.showAddForm = (req, res) => {
  res.render("form", {
    title: "Tambah User Baru",
    user: null,
    error: null,
  });
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.render("form", {
        title: "Tambah User Baru",
        user: req.body,
        error: "Nama dan email wajib diisi!",
      });
    }

    await User.create({ name, email, phone });
    res.redirect("/?message=User berhasil ditambahkan");
  } catch (error) {
    res.render("form", {
      title: "Tambah User Baru",
      user: req.body,
      error: "Gagal menambahkan user: " + error.message,
    });
  }
};

// Tampilkan form edit user
exports.showEditForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.redirect("/?error=User tidak ditemukan");
    }

    res.render("form", {
      title: "Edit User",
      user: user,
      error: null,
    });
  } catch (error) {
    res.redirect("/?error=Gagal memuat data user");
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.params.id;

    if (!name || !email) {
      const user = await User.findById(userId);
      return res.render("form", {
        title: "Edit User",
        user: { id: userId, name, email, phone },
        error: "Nama dan email wajib diisi!",
      });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.redirect("/?error=User tidak ditemukan");
    }

    await User.update(userId, { name, email, phone });
    res.redirect("/?message=User berhasil diupdate");
  } catch (error) {
    res.redirect("/?error=Gagal mengupdate user");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.redirect("/?error=User tidak ditemukan");
    }

    await User.delete(userId);
    res.redirect("/?message=User berhasil dihapus");
  } catch (error) {
    res.redirect("/?error=Gagal menghapus user");
  }
};
