// import the link from react router
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-mono tracking-tight text-orange-500">
            NoteBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="font-bold btn text-orange-500 hover:text-orange-200 rounded-full"
            >
              <PlusIcon className="size-5" /> <span>Add Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
