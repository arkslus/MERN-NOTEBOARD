import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios_api";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Fetch note from the server
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note.", error);
        toast.error("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Handle note deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete note.", error);
      toast.error("Failed to delete note.");
    }
  };

  // Handle note saving
  const handleSave = async () => {
    // Validate the note before saving
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
    } catch (error) {
      console.log("Failed to save note.", error);
    } finally {
      setSaving(false);
    }
    toast.success("Note updated successfully.");
    navigate("/"); // Navigate back to the notes list after saving
  };

  // get the loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* wrap the note and contents in a small container to center the note */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" /> Back to notes
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <TrashIcon className="size-5" /> Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                {/* Render note title here */}
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="note title"
                  value={note.title}
                  className="input input-bordered text-[#fb8500]"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              {/* Render note content here */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="note content"
                  value={note.content}
                  className="textarea textarea-bordered h-32 text-[#fb8500]"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              {/* Render the button actions here */}
              <div className="card-actions justify-end">
                <button
                  disabled={saving}
                  className="btn bg-[#fb8500] hover:bg-[#219ebc] hover:text-[#023047] px-4 py-2 rounded-md text-[#023047] font-bold"
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
