const express = require('express');
const { authenticate } = require('../middleware/authenticate ');
const { sendMessage, getMessages } = require('../controller/chatcontroller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management for project-specific messages
 */

/**
 * @swagger
 * /api/v1/chat/{projectId}:
 *   post:
 *     summary: Send a message to a specific project chat room
 *     tags: [Chat]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project chat room
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chatMessage:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error. Could not send message
 */
router.post('/:projectId', authenticate, sendMessage);

/**
 * @swagger
 * /api/v1/chat/{projectId}:
 *   get:
 *     summary: Get messages from a specific project chat room
 *     tags: [Chat]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project chat room
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   projectId:
 *                     type: string
 *                   sender:
 *                     type: string
 *                   message:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project chat room not found
 *       500:
 *         description: Server error. Could not retrieve messages
 */
router.get('/:projectId', authenticate, getMessages);

module.exports = router;


