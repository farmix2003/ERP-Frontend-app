import { Pencil, Trash2 } from "lucide-react";
import type { UserItem } from "../../../data/Users";

interface UsersTableProps {
  users: UserItem[],
  onEditUser: (user:UserItem) => void;
  onDeleteUser: (userId: number) => void;
}

const UsersTable = ({ users,onEditUser, onDeleteUser }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center shadow-sm dark:shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No users found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try changing your search query.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-2xl">
      <div className="overflow-x-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 hidden lg:block font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 hidden lg:block py-4 text-gray-900 dark:text-white">{user.email}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td  className="px-6 py-4 text-center">
                  <div className="flex items-center gap-2">
                  <button onClick={() => onEditUser(user)} className="text-blue-500 hover:text-blue-400 dark:text-blue-400 hover:dark:text-blue-300 cursor-pointer transition-colors"><Pencil size={16}/></button>
                  <button onClick={() => onDeleteUser(user.id)} className="text-red-500 hover:text-red-400 dark:text-red-400 hover:dark:text-red-300 cursor-pointer transition-colors"><Trash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
