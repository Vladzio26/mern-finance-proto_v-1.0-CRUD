const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    namecategory: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true, trim:false },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;