import { type UserItem, users as initialUsers } from "../data/Users";


const USERS_STORAGE_KEY = "users_data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const getStoredUsers = ():UserItem[] =>{
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
export const fetchUsers = async (): Promise<UserItem[]> =>{
    await delay(800);
    return getStoredUsers();
}

const saveUsers = (users: UserItem[]) =>{
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export const createUser = async (user: Omit<UserItem, "id">):Promise<UserItem> =>{
    await delay(500);
    const users = getStoredUsers();

    const newUsers: UserItem = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...user 
    }
    const updatedUsers = [...users, newUsers];
    saveUsers(updatedUsers);
    return newUsers;
  }

 export const editUser = async (user: UserItem):Promise<UserItem> =>{
     await delay(300);

     const users = getStoredUsers();
     const updatedUsers = users.map(u => u.id === user.id ? user : u);
     saveUsers(updatedUsers);
     return user;

  }
  export const deleteUser = async(userId: number):Promise<number> =>{

    await delay(300);

    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return -1;


    const users = getStoredUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    saveUsers(updatedUsers);
    return userId;
  }