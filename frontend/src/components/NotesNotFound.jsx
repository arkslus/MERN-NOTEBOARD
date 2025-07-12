import { NotebookIcon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-[#fb8500] rounded-full p-8">
        <NotebookIcon className="size-10 text-[#023047]" />
      </div>

      <p className="text-center font-mono font-extrabold text-[#023047] py-10">
        No notes found. Create a new note using the "Add Note" button above.
      </p>
    </div>
  );
};
export default NotesNotFound;
