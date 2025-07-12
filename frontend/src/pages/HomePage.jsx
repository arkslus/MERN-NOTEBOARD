import { useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
// import axios from "axios";
import api from "../lib/axios_api";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  // create a state for the rate limiter
  const [isRateLimited, setRateLimited] = useState(false);
  // create a state for the notes array
  const [notes, setNotes] = useState([]);
  // create a state for the note being edited
  const [loading, setLoading] = useState(true);

  // fetch the notes from the server when the component mounts
  useEffect(() => {
    // Fetch notes from the server
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
        ``;
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchNotes function when the component mounts or when the notes state changes
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      {/* render the NavBar component */}
      <NavBar />

      {/* display the rate limited UI if the rate limit is exceeded */}
      {isRateLimited && <RateLimitedUI />}

      {/* display a loading message while fetching notes */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-[#023047] py-10">
            Loading notes...
          </div>
        )}

        {/* create a message to display when no notes are found  */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {/* display the notes */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
