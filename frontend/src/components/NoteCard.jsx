import { Trash2Icon, PenSquareIcon } from "lucide-react";
import { Link } from "react-router";
import formatDate from "../lib/utils";
import api from "../lib/axios_api";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  // function to delete note
  const handleDeleteNote = async (e, id) => {
    // prevent default behavior
    e.preventDefault();
    // check if the user is confirmed to delete the note
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    // send a DELETE request to the server to delete the note with the given ID
    try {
      await api.delete(`/notes/${id}`);
      // remove the deleted note from the notes array using filter() method
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#219ebc]"
    >
      <div className="card-body">
        <h3 className="text-xl font-bold text-[#fb8500]">{note.title}</h3>
        <p className="line-clamp-3 text-[#fb8500]">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-[#219ebc]">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap=1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-xs text-error btn-ghost"
              onClick={(e) => handleDeleteNote(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
