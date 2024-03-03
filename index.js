const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("userData", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres"
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

// Initializing the app
const app = express();
app.use(express.json());

// schema
const User = sequelize.define("User", {
  sno: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with database");
  })
  .catch((err) => {
    console.error("Unable to sync models with database:", err);
  });

// Example usage
(async () => {
  try {
    // Create a new user
    const newUser = await User.create({
      sno: "18BCAN0273",
      name: "Beetlejuice",
      age: "25",
      year: "1988",
      number: "8564758355",
      location: "Hyderabad",
      createdAt: "January 10"
    });
    console.log("New user created:", newUser.toJSON());

    // Find all users
    const users = await User.findAll();
    console.log(
      "All users:",
      users.map((user) => user.toJSON())
    );
  } catch (error) {
    console.error("Error:", error);
  }
})();

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

// API for getting all data from a
