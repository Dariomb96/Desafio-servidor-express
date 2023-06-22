import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: Date,
    amount: Number,
    code: String,
    name: String,
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    created_at: Date,
    updated_at: Date,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export { ticketModel };
