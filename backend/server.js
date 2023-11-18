require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require('mongoose');
const { auth } = require('./routes/middleware');
const databaseConnection = require('./helpers/databaseConnection')

const app = express();
const PORT = process.env.PORT || 8080;

// mongoose.connect(process.env.MONGO_URI);

// mongoose.connection.on("error", err => {
//   console.log("Error: ", err)
// })
// mongoose.connection.on("connected", (err, res) => {
//   console.log("Mongoose is connected")
// })

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const passRoutes = require('./routes/passRoutes');
app.use(passRoutes);

const placeRoutes = require('./routes/placeRoutes');
app.use(placeRoutes);

// app.use((req, res) => res.status(404).send('Route not found'));

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Rest API",
//       version: "1.0.0",
//       description: "This is a simple CRUD API application made with Express and documented with Swagger",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       }
//     ],
//   },
//   apis: ["./routes/*.js", "./controllers/*.js"],
// };

// const specs = swaggerJsdoc(options);
// app.use(
//   "/api-docs",
//   swaggerUI.serve,
//   swaggerUI.setup(specs, { explorer: true })
// );

databaseConnection('devlopment')
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`server starts on port => ${PORT}`);
    });
  });

module.exports = { app, mongoose };
