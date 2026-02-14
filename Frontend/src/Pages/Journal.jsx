import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Trash2,
  Menu,
  X,
  BarChart2,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [entries, setEntries] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState(null);
  const navigate = useNavigate();

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😌", label: "Calm" },
    { emoji: "🤯", label: "Overwhelmed" },
  ];

  const sentimentConfig = {
    positive: { emoji: "😊", color: "bg-green-600 text-green-100" },
    neutral: { emoji: "😐", color: "bg-yellow-600 text-yellow-100" },
    negative: { emoji: "😔", color: "bg-red-600 text-red-100" },
  };

  const API = "http://localhost:3000/journal"; // Backend endpoint

  /* -------------------- FETCH ENTRIES -------------------- */
  const fetchEntries = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      setEntries(res.data.entries);
    } catch (err) {
      console.error("Failed to fetch journal entries:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  /* -------------------- HANDLERS -------------------- */
  const handleSave = async () => {
    if (!title.trim() || !entry.trim()) return;
    try {
      const res = await axios.post(
        API,
        { title, text: entry, mood: selectedMood },
        { withCredentials: true }
      );
      setEntries([res.data.entry, ...entries]);
      setTitle("");
      setEntry("");
      setSelectedMood(null);
      setSelectedEntry(null);
    } catch (err) {
      console.error("Failed to save entry:", err);
    }
  };

  const handleClear = () => {
    setTitle("");
    setEntry("");
    setSelectedMood(null);
  };

  const handleDelete = async (entryToDelete) => {
    try {
      await axios.delete(`${API}/${entryToDelete._id}`, { withCredentials: true });
      setEntries(entries.filter((e) => e._id !== entryToDelete._id));
      setSelectedEntry(null);
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  /* -------------------- FILTERING -------------------- */
  const filteredEntries = entries.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = moodFilter ? e.mood?.label === moodFilter : true;
    return matchesSearch && matchesMood;
  });

  const groupEntriesByDate = (entries) =>
    entries.reduce((groups, entry) => {
      const dateKey = new Date(entry.date).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
      return groups;
    }, {});

  const groupedEntries = groupEntriesByDate(filteredEntries);

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c092c] via-[#2e1a47] to-[#120420] text-white p-6 flex relative">

      {/* Sidebar Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-purple-700 hover:bg-purple-600"
          size="sm"
        >
          {showSidebar ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Home Button */}
      <div className="absolute top-4 right-50 z-20">
        <Button
          onClick={() => navigate("/")}
          className="bg-purple-700 hover:bg-purple-600"
          size="sm"
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>

      {/* Mood Analytics */}
      <div className="absolute top-4 right-6 z-20">
        <Button
          onClick={() => navigate("/mood-analytics", { state: { entries } })}
          className="bg-green-800 hover:bg-green-700"
          size="sm"
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Mood Analytics
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 pr-4 hidden lg:flex flex-col"
          >
            <h2 className="text-xl font-semibold text-purple-300 mt-8 mb-4">
              Your Entries
            </h2>

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="mb-3 px-3 py-2 bg-transparent border border-purple-500 rounded-md"
            />

            <div className="flex flex-wrap gap-2 mb-3">
              {moods.map((m, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setMoodFilter(m.label === moodFilter ? null : m.label)
                  }
                  className={`px-2 py-1 rounded-full text-sm border ${
                    moodFilter === m.label
                      ? "bg-purple-700 border-purple-500"
                      : "border-purple-400 text-purple-300"
                  }`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>

            <div className="space-y-4 pr-2 overflow-y-auto max-h-[530px] custom-scrollbar">
              {Object.entries(groupedEntries).map(([date, dayEntries]) => (
                <div key={date}>
                  <h4 className="text-sm text-purple-400 mb-2 mt-4">{date}</h4>
                  {dayEntries.map((e) => (
                    <Card
                      key={e._id}
                      onClick={() => setSelectedEntry(e)}
                      className="p-4 bg-white/5 border border-white/10 cursor-pointer mb-3"
                    >
                      <CardContent>
                        <h3 className="font-bold text-purple-300">{e.title}</h3>
                        <p className="line-clamp-2 mt-1">{e.text}</p>
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <div className="flex gap-2 items-center">
                            {e.mood && <span>{e.mood.emoji}</span>}
                            {e.sentiment && (
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  sentimentConfig[e.sentiment.label].color
                                }`}
                              >
                                {sentimentConfig[e.sentiment.label].emoji} AI
                              </span>
                            )}
                          </div>
                          <span className="text-purple-400">
                            {new Date(e.date).toLocaleTimeString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <motion.div className="flex-1 lg:ml-4 mt-10">
        <Card className="p-6 bg-white/10 border border-white/10 rounded-2xl">
          {!selectedEntry ? (
            <>
              <h2 className="text-2xl font-bold text-purple-300 mb-4">
                New Journal Entry
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title..."
                className="w-full mb-4 p-2 bg-transparent border border-purple-400 rounded"
              />

              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full min-h-[180px] p-3 bg-transparent border border-purple-400 rounded resize-none"
              />

              <div className="flex gap-2 mt-4 flex-wrap">
                {moods.map((m, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedMood(m)}
                    className={`px-3 py-1 border rounded-full cursor-pointer ${
                      selectedMood?.label === m.label
                        ? "bg-purple-600"
                        : "border-purple-400"
                    }`}
                  >
                    {m.emoji} {m.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={handleSave} className="bg-purple-600">
                  <PlusCircle className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button onClick={handleClear} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-purple-300 mb-2">
                {selectedEntry.title}
              </h2>
              <p className="mb-4">{selectedEntry.text}</p>
              {selectedEntry.mood && (
                <p className="text-purple-400 mb-2">
                  Mood: {selectedEntry.mood.emoji} {selectedEntry.mood.label}
                </p>
              )}
              {selectedEntry.sentiment && (
                <p className="text-sm mb-2">
                  AI Sentiment:{" "}
                  <span
                    className={`px-2 py-1 rounded-full ml-2 ${
                      sentimentConfig[selectedEntry.sentiment.label].color
                    }`}
                  >
                    {sentimentConfig[selectedEntry.sentiment.label].emoji}{" "}
                    {selectedEntry.sentiment.label} (
                    {Math.round(selectedEntry.sentiment.confidence * 100)}%)
                  </span>
                </p>
              )}
              <span className="text-sm text-purple-500">
                {new Date(selectedEntry.date).toLocaleString()}
              </span>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => {
                    setSelectedEntry(null);
                    setTitle("");
                    setEntry("");
                    setSelectedMood(null);
                  }}
                  className="bg-indigo-600"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> New Entry
                </Button>
                <Button
                  onClick={() => handleDelete(selectedEntry)}
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Entry
                </Button>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
