const ChatMessage = require('../models/chatModel');

// Send a chat message (save to DB)
exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const chatMessage = new ChatMessage({
            sender: req.user._id,   // Assuming the user is authenticated
            projectId: req.params.projectId,
            message
        });
        await chatMessage.save();
        res.status(201).json({ message: 'Message sent successfully', chatMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Could not send message', error: error.message });
    }
};

// Get all messages for a project
exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find({ projectId: req.params.projectId }).populate('sender', 'name email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error. Could not fetch messages', error: error.message });
    }
};
