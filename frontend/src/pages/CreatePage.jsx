import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
// import axios from "axios";
import api from "../lib/axios_api";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent form submission
    e.preventDefault();
    // validate the title and content before submitting the form
    if (title.trim() === "" || content.trim() === "") {
      toast.error("Title and content cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Too many requests, please try again later", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fb8500]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to={"/"}
            className="btn btn-ghost mb-6 bg-[#023047] hover:bg-[#219ebc] hover:text-[#023047]"
          >
            <ArrowLeftIcon className="size-5" /> Back to notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="text-2lg card-title  mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered text-[#fb8500]"
                    placeholder="Enter your note title here"
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    id="title"
                    name="title"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered h-32 text-[#fb8500]"
                    placeholder="Enter your note content here"
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn bg-[#fb8500] hover:bg-[#219ebc] hover:text-[#023047] px-4 py-2 rounded-md text-[#023047] font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Creating...." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
