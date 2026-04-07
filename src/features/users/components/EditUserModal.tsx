import { useEffect, useState } from "react";
import type { UserItem, UserRole, UserStatus } from "../../../data/Users";


interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
  onUpdateUser: (user: UserItem) => void;
}

const EditUserModal = ({
  isOpen,
  onClose,
    user,
    onUpdateUser,
}: EditUserModalProps) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<UserItem["role"]>("Manager");
    const [status, setStatus] = useState<UserItem["status"]>("Active");
    const [error, setError] = useState("");

    useEffect(() =>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status);
            setError("");
        }
    }, [user])

    if(!isOpen || !user) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        if(!trimmedName || !trimmedEmail){
            setError("Name and email are required.")
            return;
        }
        const emailRegex = /^[^\\s@]+@[^\s@]+\\.[^\s@]+$/;
        if(!emailRegex.test(trimmedEmail)){
            setError("Please enter a valid email address.")
            return;
        }
        onUpdateUser({
            ...user,
            id: user.id,
            name: trimmedName,
            email: trimmedEmail,
            role,
            status
        })
        onClose();
    }

    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl dark:shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit User</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update user information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {error ? (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{error}</p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    )

}
export default EditUserModal;
