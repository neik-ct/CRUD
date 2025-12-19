const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://20225349:20225349@cluster0.z2qsxba.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Đã kết nối MongoDB thành công');
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err);
  });

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên không được để trống'],
    minlength: [2, 'Tên phải có ít nhất 2 ký tự']
  },
  age: {
    type: Number,
    required: [true, 'Tuổi không được để trống'],
    min: [0, 'Tuổi phải >= 0']
  },
  email: {
    type: String,
    required: [true, 'Email không được để trống'],
    match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
  },
  address: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);



// GET - Lấy danh sách users (có phân trang + tìm kiếm)
app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';

    // Tạo query tìm kiếm
    let query = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // không phân biệt hoa thường
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { address: searchRegex }
        ]
      };
    }

    // Tính toán skip
    const skip = (page - 1) * limit;

    // Lấy dữ liệu và tổng số
    const [data, total] = await Promise.all([
      User.find(query).skip(skip).limit(limit),
      User.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Tạo user mới
app.post('/api/users', async (req, res) => {
  try {
    const { name, age, email, address } = req.body;

    const newUser = new User({
      name,
      age,
      email,
      address
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'Tạo người dùng thành công',
      data: savedUser
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: `Validation failed: ${errors.join(', ')}` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT - Cập nhật user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({
      message: 'Cập nhật người dùng thành công',
      data: updatedUser
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: `Validation failed: ${errors.join(', ')}` });
    } else if (error.name === 'CastError') {
      res.status(404).json({ error: 'Không tìm thấy người dùng' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE - Xóa user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({
      message: 'Xóa người dùng thành công'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ error: 'Không tìm thấy người dùng' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});


