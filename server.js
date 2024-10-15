const express = require("express");
const http = require('http');
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const { Server } = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const chatRoutes = require("./routes/chatroutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/chat", chatRoutes);

// Create HTTP server and initialize socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log('New connection established');

  // Join project-specific room
  socket.on('joinRoom', (roomId) => {
      socket.join(roomId);  // Users join the project-specific room
      console.log(`User joined project room: ${roomId}`);
  });

  // Listen for chat messages and broadcast them to the room
  socket.on('chatMessage', (msg) => {
      io.to(msg.projectId).emit('message', {
          projectId: msg.projectId,
          sender: msg.sender,  // e.g., the user's name or ID
          message: msg.message,
          timestamp: new Date().toISOString()
      });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

// swagger Ui
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Team_Collaboration_Management  API',
        version: '1.0.0',
        description: 'API for managing Team_Collaboration_Management',
    },
    servers: [
        {
            url: 'http://localhost:5000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/userRoutes.js', './routes/taskRoutes.js','./routes/chatroutes.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send(
      "<center><h1>Team collaboration Application</h1><br>Get Api <a href=https://github.com/yashika277/team_collaboration.git target=_blank>Repository :Team collaboration Application</a></center>"
    );
  });

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
