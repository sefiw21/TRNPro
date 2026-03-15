import { Bell } from "lucide-react";
import Button, { BackButton, TaskbarButton } from "../../components/ui/Button.tsx";
import Logo from "../../components/ui/Logo.tsx";
import Profile from "../../components/ui/Profile.tsx";
import UsersTable from "./components/UsersTable.tsx";

const AdminDashboard = () => {

  return (
    <div className="flex flex-col items-cente justify-center">
      <div className="flex flex-row justify-between m-3 p-2 sticky top-0 z-50 backdrop-blur-lg border-none bg-transparent">
        <div className="flex flex-row ">
          <BackButton />
          <Logo />
        </div>

        <div className="flex flex-row gap-2 " >
          <Button size="icon" variant="ghost" aria-label="Notifications" className="hover:bg-transparent hover:text-gray-500 cursor-pointer">
            <Bell />
          </Button>
          <TaskbarButton />
          <Profile />
        </div>


      </div>



      <div className="flex items-center flex-col mt-4">
        <h1 className=" pt-1.5 text-2xl font-bold mb-4">Admin {" "}
          <span className="bg-linear-to-tr from-blue-900 to-blue-900/80 text-transparent bg-clip-text">
            Dashboard
          </span>
        </h1>
        <p className="mb-6">Manage users and their roles below:</p>
      </div>
      <UsersTable />
    </div>
  );
};

export default AdminDashboard;
