const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controller/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/registeruser:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (validation errors)
 *       500:
 *         description: Server error
 */
router.post("/registeruser", signup);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Server error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # If using JWT or any other authentication
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized (user not logged in)
 *       500:
 *         description: Server error
 */
router.post("/logout", logout);

module.exports = router;


module.exports = router;
