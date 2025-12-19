# Ứng Dụng Quản Lý Người Dùng - Fullstack

Ứng dụng web Fullstack quản lý người dùng với đầy đủ chức năng CRUD, tìm kiếm, phân trang và giao diện responsive.

## 🛠️ Công Nghệ Sử Dụng

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React (CDN), HTML, CSS
- **Kỹ năng**: REST API, State Management, Pagination, Search

## 📋 Yêu Cầu Hệ Thống

- Node.js (v14 trở lên)
- MongoDB (đã cài đặt và đang chạy)
- Trình duyệt web hiện đại

## 🚀 Hướng Dẫn Cài Đặt và Chạy

### Bước 1: Cài đặt Dependencies

```bash
npm install
```

### Bước 2: Cấu hình MongoDB

Đảm bảo MongoDB đang chạy trên máy của bạn. Nếu sử dụng MongoDB local:
- MongoDB sẽ chạy mặc định tại `mongodb://localhost:27017`
- Database sẽ tự động được tạo khi ứng dụng chạy

Nếu muốn thay đổi cấu hình, tạo file `.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/user-management
```

### Bước 3: Khởi động Backend Server

```bash
npm start
```

Hoặc sử dụng nodemon để tự động reload:
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3001`

### Bước 4: Mở Frontend

Mở file `index.html` trong trình duyệt web, hoặc sử dụng Live Server extension trong VS Code.

## 📡 API Endpoints

### GET /api/users
Lấy danh sách users với phân trang và tìm kiếm
- Query params: `page`, `limit`, `search`
- Ví dụ: `GET /api/users?page=1&limit=5&search=nguyen`

### POST /api/users
Tạo user mới
- Body: `{ name, age, email, address }`

### PUT /api/users/:id
Cập nhật user
- Body: `{ name, age, email, address }`

### DELETE /api/users/:id
Xóa user

## ✨ Tính Năng

- ✅ CRUD đầy đủ (Create, Read, Update, Delete)
- ✅ Tìm kiếm theo tên, email, địa chỉ
- ✅ Phân trang với tùy chọn số dòng/trang
- ✅ Validation dữ liệu (Frontend & Backend)
- ✅ Responsive design
- ✅ Giao diện hiện đại, dễ sử dụng

## 📝 Cấu Trúc Dữ Liệu User

```javascript
{
  name: String (required, min 2 ký tự),
  age: Number (required, >= 0),
  email: String (required, format email),
  address: String (optional)
}
```

## 🧪 Test với Postman

1. **GET** - Lấy danh sách: `http://localhost:3001/api/users?page=1&limit=5`
2. **POST** - Tạo mới: `http://localhost:3001/api/users`
3. **PUT** - Cập nhật: `http://localhost:3001/api/users/:id`
4. **DELETE** - Xóa: `http://localhost:3001/api/users/:id`

## 📌 Lưu Ý

- Đảm bảo MongoDB đang chạy trước khi khởi động server
- Port mặc định là 3001, có thể thay đổi trong file `.env`
- Frontend sử dụng React từ CDN, cần kết nối internet để load


