import { useUsers } from "../hooks/useUsers.ts";
import UserTableRow from "./UserTableRow.tsx";

const UsersTable = () => {
  const usersList = useUsers();
  console.log("Users list in UsersTable:", usersList);
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-900 shadow-sm">
      <table className="min-w-full divide-y divide-gray-900 hover:divide-gray-500 text-sm mx-1 rounded-full">
        <thead className="bg-gray-800">
          <tr>
            {["Full Name", "Email", "Role", "Created At", "Updated At"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-semibold text-gray-300"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {usersList?.map((user) => (
            <UserTableRow user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
