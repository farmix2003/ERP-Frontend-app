import { useEffect, useMemo, useState } from "react";
import type { UserItem } from "../data/Users";
import { Plus, Search } from "lucide-react";
import UsersTable from "../features/users/components/UsersTable";
import CreateUserModal from "../features/users/components/CreateUserModal";
import EditUserModal from "../features/users/components/EditUserModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, editUser, fetchUsers } from "../services/Users";

const ITEMS_PER_PAGE = 5


const UsersPage = () => {
const queryClient = useQueryClient()
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const {data: users = [], isLoading, isError} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const createMutation = useMutation({
    mutationFn: createUser,

    onMutate: async (newUser) =>{
      await queryClient.cancelQueries({queryKey: ['users']})
      const previousUsers = queryClient.getQueryData<UserItem[]>(["users"]) || []
      const tempId = Math.max(0, ...previousUsers.map((u) => u.id)) + 1
      const optimisticUser = {...newUser, id: tempId}
      queryClient.setQueryData<UserItem[]>(["users"], [...previousUsers, optimisticUser])
      return {previousUsers}
    },

    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ["users"]})
      setIsCreateModalOpen(false)
    },
    
    onError: (_error, _newUser, context) =>{
      if(context?.previousUsers){
        queryClient.setQueryData(["users"], context.previousUsers)
      }

      setIsCreateModalOpen(false)
    },
      onSettled: () =>{
        queryClient.invalidateQueries({queryKey: ["users"]})
      }
    
  })

  const updateMutation = useMutation({
    mutationFn: editUser,

    onMutate: async (updatedUser) =>{
      await queryClient.cancelQueries({queryKey: ['users']})

      const previousUsers = queryClient.getQueryData<UserItem[]>(["users"]) || []
      queryClient.setQueryData<UserItem[]>(["users"], previousUsers.map((user) => user.id === updatedUser.id ? updatedUser : user))
      return {previousUsers}
    },

    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ["users"]})
      setEditingUser(null)
    },
    onError: (_error, _updatedUser, context) =>{
      if(context?.previousUsers){
        queryClient.setQueryData(["users"], context.previousUsers)
      }
      setEditingUser(null)
    },
      onSettled: () =>{
        queryClient.invalidateQueries({queryKey: ["users"]})
      }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onMutate: async (userId) =>{
      await queryClient.cancelQueries({queryKey: ["users"]})

      const previousUsers = queryClient.getQueryData<UserItem[]>(["users"]) || []
      queryClient.setQueryData<UserItem[]>(["users"], previousUsers.filter((user) => user.id !== userId))
      return {previousUsers}
    },

    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ["users"]})
    },
    onError: (_error, _userId, context) =>{
      if(context?.previousUsers){
        queryClient.setQueryData(["users"], context.previousUsers)
      }
    },
    onSettled: () =>{
      queryClient.invalidateQueries({queryKey: ["users"]})
    }
  })

  const handleCreateUser = (user: Omit<UserItem, "id">) =>{
    createMutation.mutate(user)
  }
  const handleEditUser = (user: UserItem) =>{
    updateMutation.mutate(user)
  }
  const handleDeleteUser = (userId: number) =>{
    deleteMutation.mutate(userId)
  }

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

  if(isLoading){
    return <div className="text-center text-gray-500 dark:text-gray-200 ">Loading users...</div>
  }
  if(isError){
    return <div className="text-center text-red-500">Failed to load users. Please try again later.</div>
  }
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage system users and their acces</p>
      </div>
      
      <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
          <Plus size={18} />
          Add User
      </button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
           type="text"
           placeholder="Search users..."
           value={search}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500"
           onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <select 
          value={roleFilter} 
          onChange={(e) => handleRoleFilterChange(e.target.value)}
          className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-gray-500 dark:focus:border-gray-400"
            >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Support">Support</option>
            </select>

          <select
          value={statusFilter} 
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-gray-500 dark:focus:border-gray-400"
            >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            </select>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Users: <span className="font-semibold text-gray-900 dark:text-white">{filteredUsers.length}</span>
        </div>
      </div>
      
          <UsersTable onDeleteUser={handleDeleteUser} onEditUser={setEditingUser} users={paginatedUsers} />
     
      <div className='flex items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-2xl'>
        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900 dark:text-gray-200">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-200">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <button
            className="rounded-md cursor-pointer disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="rounded-md cursor-pointer disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
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