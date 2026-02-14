import { useAppStore } from "@/Storage/store";
import PublicCard from "./PublicCard";
import { useState } from "react";
import axios from "axios";
import { MAKE_POST } from "@/API/apicalls";
import { motion, AnimatePresence } from "framer-motion";

const PublicContent = () => {
  const [view, setView] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [tags, settags] = useState("");
  const user = useAppStore((status) => status.user);
  const [ventId] = useState(user.ventId);

  const [refresh, setRefresh] = useState(false); // ✅ added

  const makePost = async () => {
    try {
      const res = await axios.post(
        `${MAKE_POST}`,
        { title, description, tag: tags, ventId },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("Post added successfully 🎉");
        setView(false);
        setRefresh((prev) => !prev); // ✅ trigger refresh
      }
    } catch (error) {
      alert(error.response?.data.message || "Error adding post");
    }
  };

  return (
    <div className="py-16 relative min-h-screen">
      {/* Add Your Thoughts Button */}
      <div className="absolute top-8 right-6">
        <button
          className="relative px-6 py-3 mt-5 font-semibold text-white rounded-xl
                     bg-gradient-to-r
                     shadow-lg shadow-purple-400/40
                     hover:scale-105 transition-all duration-300 bg-purple-700/70 hover:bg-purple-700 
                    animate-pop cursor-pointer"
          onClick={() => setView(true)}
        >
          Add Your Thoughts
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {view && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-zinc-900/90 via-black/90 to-purple-950/90
                         border border-purple-700/40 shadow-2xl rounded-2xl p-8 space-y-5"
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
                onClick={() => setView(false)}
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-center">
                Share Your Thoughts
              </h2>

              <div>
                <label className="block text-gray-300 font-medium">Title:</label>
                <input
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-800/80 border border-purple-700/40 
                             text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">VentId:</label>
                <input
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-800/80 border border-purple-700/40 text-gray-400"
                  readOnly
                  value={ventId}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Description:</label>
                <textarea
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-800/80 border border-purple-700/40 
                             text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                  rows={4}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium">Tags:</label>
                <select
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-800/80 border border-purple-700/40 text-white"
                  onChange={(e) => settags(e.target.value)}
                >
                  <option value="">Select a tag</option>
                  <option value="Mental Wellness">Mental Wellness</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Food">Food</option>
                  <option value="Music">Music</option>
                  <option value="Movies">Movies</option>
                  <option value="Art">Art</option>
                  <option value="Nature">Nature</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>

              <button
                className="w-full py-3 font-semibold rounded-xl
                           bg-gradient-to-r bg-purple-700/70 hover:bg-purple-600 animate-pop cursor-pointer
                           hover:scale-[1.02] transition-all duration-300 text-white shadow-lg shadow-purple-900/40"
                onClick={makePost}
              >
                Post Your Thought
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  PublicCard */}
      {!view && <PublicCard refresh={refresh} />}
    </div>
  );
};

export default PublicContent;
