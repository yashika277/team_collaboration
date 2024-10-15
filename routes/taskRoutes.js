const express = require('express');
const { authenticate } = require('../middleware/authenticate ');
const { createTask, updateTask, deleteTask, getAllTasks, filterTasks } = require('../controller/taskController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /api/v1/task/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *               - assignedTo
 *               - dueDate
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 task:
 *                   type: object
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */

router.post('/add', authenticate, createTask);


/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getAllTasks);
/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

router.put('/:id', authenticate, updateTask);


/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, deleteTask);

/**
 * @swagger
 * /api/v1/task/filter:
 *   get:
 *     summary: Filter tasks by criteria
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: assignedTo
 *         required: false
 *         description: ID of the user the task is assigned to
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Status of the task
 *         schema:
 *           type: string
 *           enum: [Pending, In Progress, Completed]
 *       - in: query
 *         name: dueDate
 *         required: false
 *         description: Filter tasks due on or after this date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully filtered tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */

router.get('/filter',authenticate, filterTasks);

module.exports = router;
