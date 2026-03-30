import { useEffect, useMemo, useState } from "react";
import {users as initialUsers} from './../data/Users'
import type { UserItem } from "../data/Users";
import { Plus, Search } from "lucide-react";
import UsersTable from "../features/users/components/UsersTable";
import CreateUserModal from "../features/users/components/CreateUserModal";
import EditUserModal from "../features/users/components/EditUserModal";


const ITEMS_PER_PAGE = 5
const USERS_STORAGE_KEY = "users_data";

const getStoredUsers = ():UserItem[] =>{
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if(!storedUsers){
    return initialUsers;
  }
  try{
    return JSON.parse(storedUsers) as UserItem[];
  }catch(error){
    console.error("Failed to parse stored users:", error);
    return initialUsers;
  }
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserItem[]>(getStoredUsers());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  useEffect(() =>{
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  },[users])

  const filteredUsers = useMemo(() =>{
    return users.filter((user) =>{
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||        
        user.email.toLowerCase().includes(searchTerm)||
        user.role.toLowerCase().includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm)
      
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
        
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
        
      return matchesRole && matchesStatus && matchesSearch;
    })


  },[users, search,roleFilter, statusFilter])
 const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
 const paginatedUsers = useMemo(() =>{
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredUsers.slice(start, end);
 },[filteredUsers, currentPage])

 const handleSearchChange = (val:string) =>{
  setSearch(val)
  setCurrentPage(1)
 }

 const handleRoleFilterChange = (val:string) =>{
  setRoleFilter(val)
  setCurrentPage(1)
 }
 const handleStatusFilterChange = (val:string) =>{
    setStatusFilter(val)
    setCurrentPage(1)
  }

  const handleCreateUser = (user: Omit<UserItem, "id">) =>{
    const newUser: UserItem = {
      id: users.length + 1,
      ...user
    }
    setUsers((prev) => [...prev, newUser])
    setCurrentPage(1)
  }

  const handleEditUser = (user: UserItem) =>{
    setUsers(prev => prev.map(u => u.id === user.id ? user : u))
  }
  const handleDeleteUser = (userId: number) =>{
    const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (!confirmed) return
    setUsers(prev => prev.filter(u => u.id !== userId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600">Manage system users and their acces</p>
      </div>
      
      <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
          <Plus size={18} />
          Add User
      </button>
      </div>

      <div className="flex flex-col gap-4 roundend-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
           type="text"
           placeholder="Search users..."
           value={search}
            className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-blue-500"
           onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <select 
          value={roleFilter} 
          onChange={(e) => handleRoleFilterChange(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-500"
            >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Support">Support</option>
            </select>

          <select
          value={statusFilter} 
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-500"
            >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            </select>
        </div>

        <div className="text-sm text-gray-500">
          Total Users: <span className="font-semibold text-gray-900">{filteredUsers.length}</span>
        </div>
      </div>
      
          <UsersTable onDeleteUser={handleDeleteUser} onEditUser={setEditingUser} users={paginatedUsers} />
     
      <div className='flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <button
            className="rounded-md cursor-pointer disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="rounded-md cursor-pointer disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === (totalPages || 1)}
          >
            Next
          </button>
        </div>
      </div>
        <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateUser={handleCreateUser}
      />
      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUpdateUser={handleEditUser}
        isOpen={!!editingUser}
      />
    </div>
  );
};

export default UsersPage;