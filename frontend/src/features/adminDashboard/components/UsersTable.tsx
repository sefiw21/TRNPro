import { Users } from "lucide-react";
import { useUsers } from "../hooks/useUsers.ts";
import UserTableRow from "./UserTableRow.tsx";

const UsersTable = () => {
  const usersList = useUsers();

  // Safe check to ensure we have an array to work with
  const hasUsers = usersList && usersList.length > 0;

  return (
    <div className="w-full flex flex-col">

      {/* Table Wrapper with Glassmorphism & Smooth Scrolling */}
      <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#020617]/40 shadow-2xl custom-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10 bg-white/2">
              {["Full Name", "Email", "Role", "Created At", "Updated At"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {hasUsers ? (
              usersList.map((user) => (
                // FIX: Added the mandatory 'key' prop! 
                // (Assuming your user object has an 'id' or '_id' field)
                <UserTableRow key={user.id || user.id} user={user} />
              ))
            ) : (
              // PRO UPGRADE: The Empty / Loading State
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Users className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm">No users found or data is loading.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UsersTable;