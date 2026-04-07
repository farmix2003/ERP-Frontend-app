import { useState } from "react";
import type { UserItem, UserRole, UserStatus } from "../../../data/Users";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (user: Omit<UserItem, "id">) => void;
}

const CreateUserModal = ({
  isOpen,
  onClose,
  onCreateUser,
}:CreateUserModalProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Manager");
  const [status, setStatus] = useState<UserStatus>("Active");
  const [error, setError] = useState("");

  if(!isOpen) return null;

  const resetForm = () =>{
    setName("");
    setEmail("");
    setRole("Manager");
    setStatus("Active");
    setError("");
  }

  const handleClose = () =>{
    resetForm();
    onClose();
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) =>{
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

     onCreateUser({
        name: trimmedName,
        email: trimmedEmail,
        role,
        status
     })
  handleClose();
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/25">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create User</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new user to the system</p>
            </div>
            <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-gray-200 dark:bg-gray-700 py-1 px-2.5 cursor-pointer font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            >
             ✕
            </button>
        <form onSubmit={handleSubmit} className="space-y-4" >
         <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input 
             type="text" 
             value={name} 
             onChange={(e)=>setName(e.target.value)}
             placeholder="Enter fullname..."
             className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
             />
         </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
             type="text" 
             value={email} 
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="Enter email"
             className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-400"
             />
         </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
           <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select 
                value={role} 
                onChange={e => setRole(e.target.value as UserRole)}
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
              onClick={handleClose}
              className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition"
            >
              Create User
            </button>
          </div>
        </form>
                </div>
    </div>
  )
}

export default CreateUserModal;
