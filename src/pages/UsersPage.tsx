import { useMemo, useState } from "react";
import {users as MockUsers} from './../data/Users'
import { Search } from "lucide-react";
import UsersTable from "../features/users/components/UsersTable";
const ITEMS_PER_PAGE = 5
const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() =>{
    return MockUsers.filter((user) =>{
      const searchTerm = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchTerm) ||        
        user.email.toLowerCase().includes(searchTerm)||
        user.role.toLowerCase().includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm)
      );
    })
  },[search])
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

  return (
    <div className="space-y-6">
      <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600">Manage system users and their acces</p>
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
        <div className="text-sm text-gray-500">
          Total Users: <span className="font-semibold text-gray-900">{filteredUsers.length}</span>
        </div>
      </div>
      
          <UsersTable users={paginatedUsers} />
     
      <div className='flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <button
            className="rounded-md cursor-pointer bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="rounded-md cursor-pointer bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === (totalPages || 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;