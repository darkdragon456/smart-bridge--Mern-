🛒 Grocery MERN App
A full-stack grocery shopping application built with MongoDB, Express.js, React.js, and Node.js.
This app allows users to browse grocery products, add them to the cart, place orders, and make payments securely via Stripe.

🚀 Features
User Authentication (JWT-based login & signup)

Product Management (Admin can add, edit, delete products)

Shopping Cart (Add, remove, update items)

Order Placement (Cash on Delivery / Stripe Payment)

Responsive UI using Bootstrap

Real-time Stock Updates 

 1️⃣ Clone the repository

git clone https://github.com/your-username/grocery-mern-app.git
cd grocery-mern-app

2️⃣ Install dependencies
Backend
cd backend
npm install<img width="1920" height="1080" alt="Screenshot 2025-08-09 185701" src="https://github.com/user-attachments/assets/71c08083-177c-4d92-9090-924da1aac99b" />

Frontend
cd frontend
npm install

3️⃣ Set up environment variables
Create a .env file inside backend folder:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
FRONTEND_URL=http://localhost:3000

4️⃣ Start the development servers
Backend
cd backend
npm run dev

Frontend
cd frontend
npm start
