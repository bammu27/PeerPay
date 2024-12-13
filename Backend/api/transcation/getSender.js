
const Transaction = require('../../models/transcationSchema.js');
const User = require('../../models/userSchema.js');
const Notification = require('../../models/notificationSchema.js');

// Query Pending transactions by senderId
async function getPendingTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'PENDING' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pending transactions' });
    }
}

// Query Approved transactions by senderId
async function getApprovedTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'APPROVED' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching approved transactions' });
    }
}

// Query Rejected Sender transactions by senderId
async function getRejectedSenderTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'REJECTED_SENDER' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rejected sender transactions' });
    }
}

// Query Rejected Receiver transactions by senderId
async function getRejectedReceiverTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'REJECTED_RECIVIER' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rejected receiver transactions' });
    }
}

// Query Completed transactions by senderId
async function getCompletedTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'COMPLETED' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching completed transactions' });
    }
}

// Query Defaulted transactions by senderId
async function getDefaultedTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'DEFAULTED' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching defaulted transactions' });
    }
}

// Query Returned transactions by senderId
async function getReturnedTransactions(req, res) {
    const senderId = req.params.senderId;
    try {
        const transactions = await Transaction.find({ sender_id: senderId, transaction_state: 'RETURNED' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching returned transactions' });
    }
}

module.exports = {
    getPendingTransactions,
    getApprovedTransactions,
    getRejectedSenderTransactions,
    getRejectedReceiverTransactions,
    getCompletedTransactions,
    getDefaultedTransactions,
    getReturnedTransactions,
};
