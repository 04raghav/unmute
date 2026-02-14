const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  ventId: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  mood: { type: Object},
  sentiment: {
    label: String,       // positive / negative
    confidence: Number   // AI confidence
  },
  date: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;
