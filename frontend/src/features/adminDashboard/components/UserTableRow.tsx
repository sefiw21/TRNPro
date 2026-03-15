import type { User } from "../../../types/index.ts";

interface UserTableRowProps {
  user: User;
}
const UserTableRow = ({ user }: UserTableRowProps) => {
  return (
    // Inside UserTableRow
    <tr className="hover:bg-gray-800 bg-gray-900 transition-colors">
      <td
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-200"
        key={user.id}
      >
        {user.fullName}
      </td>
      <td className="whitespace-nowrap px-6 py-4  text-gray-200" key={user.id}>
        {user.email}
      </td>
      <td className="whitespace-nowrap px-6 py-4  text-gray-200" key={user.id}>
        <span className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-200 ring-1 ring-inset ring-blue-700/10">
          {user.role}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4  text-gray-200" key={user.id}>
        {user.createdAt}
      </td>
      <td className="whitespace-nowrap px-6 py-4  text-gray-200" key={user.id}>
        {user.updatedAt}
      </td>
    </tr>
  );
};

export default UserTableRow;
