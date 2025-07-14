# 🏕️ Wanderlust Backend (Major Project)

A complete Node.js & Express.js backend project for a travel stay booking app (similar to Airbnb), built with MongoDB, Passport.js authentication, and EJS templating engine.

---

## ✨ Features

- User registration & login (Passport.js with sessions)
- Listing creation, editing, deletion
- Review system for listings
- MongoDB with Mongoose ODM
- Flash messages & form validation
- Secure environment variable management
- Modular and clean codebase
- EJS templates and static assets support

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/) account (for image uploads, optional)

---

### 📦 Installation

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd "Major Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup your `.env` file**

   Create a `.env` file in the root directory with the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/wanderlust
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   SESSION_SECRET=your_session_secret
   ```

4. **Start the app**

   ```bash
   npm start
   ```

   Server will run at `http://localhost:5000/`

---

## 📁 Project Structure

```plaintext
Major Project/
├── app.js                  # Main Express app
├── routes/
│   ├── listing.js          # Listings API
│   ├── review.js           # Review API
│   └── user.js             # Auth routes
├── models/
│   ├── user.js             # User schema
│   ├── listing.js          # Listing schema
│   └── review.js           # Review schema
├── views/                  # EJS templates
├── public/                 # Static files (CSS, images, etc.)
├── middleware.js           # Auth/validation middleware
├── cloudConfig.js          # Cloudinary setup
├── utils/                  # Error handling utilities
├── init/                   # Data seeding
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## 🌐 API Overview

| Method | Route              | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/listings`       | Show all listings              |
| POST   | `/listings`       | Create a new listing           |
| GET    | `/listings/:id`   | Show details of a listing      |
| PUT    | `/listings/:id`   | Update a listing               |
| DELETE | `/listings/:id`   | Delete a listing               |
| POST   | `/reviews/:id`    | Add a review to listing        |
| DELETE | `/reviews/:id`    | Delete a review                |
| GET    | `/register`       | Registration form              |
| POST   | `/register`       | Register user                  |
| GET    | `/login`          | Login form                     |
| POST   | `/login`          | Login                          |
| GET    | `/logout`         | Logout                         |

---

## 🔐 Authentication

- Implemented with `passport-local` strategy
- Sessions stored using cookies
- Flash messages provide user feedback

---

## 🖼️ Image Upload (Optional)

If integrated with **Cloudinary**, listings can include image uploads via the `cloudConfig.js` setup.

---

## 🧪 Testing

You can use tools like [Postman](https://www.postman.com/) to test API routes, especially for CRUD operations and authentication flows.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Avinash Jha**  
Backend Developer | MERN Stack Enthusiast
