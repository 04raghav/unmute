const Journal = require("../Model/Journal"); // your journal model
const analyzeSentiment = require("../utils/aiSentiment");

const createJournal = async (req, res) => {
  try {
    const { title, text, mood } = req.body;
    const ventId = req.ventId || "VENT_8580";

    // 🔥 AI SENTIMENT ANALYSIS
    const sentiment = await analyzeSentiment(text);

    const journal = new Journal({
      ventId,
      title,
      text,
      mood,        // user-selected
      sentiment,   // AI-generated
      date: new Date(),
    });

    await journal.save();

    res.status(201).json({ entry: journal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating journal" });
  }
};


// Get all journals for this user
const getJournals = async (req, res) => {
  try {
    const ventId = req.ventId || "VENT_8580";
    const journals = await Journal.find({ ventId }).sort({ date: -1 });

    // Send as 'entries' (frontend expects this)
    res.status(200).json({ entries: journals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching journals" });
  }
};

// Delete a journal entry
const deleteJournal = async (req, res) => {
  try {
    const ventId = req.ventId || "VENT_8580";
    const { id } = req.params;

    const result = await Journal.deleteOne({ _id: id, ventId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({ message: "Journal deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting journal" });
  }
};

module.exports = { createJournal, getJournals, deleteJournal };
