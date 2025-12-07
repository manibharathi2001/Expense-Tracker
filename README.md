# Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure Signup and Login functionality with password hashing (bcrypt).
- **Dashboard**: Real-time overview of your financial status including Total Balance, Income, Expenses, and Savings.
- **Visualizations**: 
  - **Spending Chart**: Weekly spending trends using interactive line charts.
  - **Category Chart**: Expense distribution by category using pie charts.
- **Transaction Management**: 
  - Add new expenses with categories, amounts, and dates.
  - View a list of recent transactions.
  - Delete unwanted transactions.
- **Advanced Search & Filter**: Search transactions by title/description and filter by category.
- **Timeline View**: A chronological view of your expenses.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## Tech Stack

### Frontend
- **React**: UI Library
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library
- **React-Chrono**: Timeline component
- **Axios**: HTTP client
- **Lucide React**: Icons

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: NoSQL Database
- **Mongoose**: ODM for MongoDB
- **Bcrypt**: Password hashing
- **Cors**: Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed and running locally.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manibharathi2001/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Backend Setup**
   Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
   Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`.

3. **Frontend Setup**
   Open a new terminal, navigate to the client directory, and install dependencies:
   ```bash
   cd client/vite-project
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## API Endpoints

- **Auth**
  - `POST /api/v1/auth/signup`: Register a new user
  - `POST /api/v1/auth/login`: Login user

- **Expenses**
  - `POST /api/v1/expenses`: Add a new expense
  - `GET /api/v1/expenses`: Get all expenses
  - `DELETE /api/v1/expenses/:id`: Delete an expense

## Project Structure

```
Expense-Tracker/
├── client/
│   └── vite-project/   # React Frontend
├── server/             # Node.js/Express Backend
└── README.md           # Project Documentation
```
