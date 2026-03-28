export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Support";
  status: "Active" | "Inactive";
}

export const users: UserItem[] = [
  { id: 1, name: "John Carter", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Manager", status: "Active" },
  { id: 3, name: "Michael Lee", email: "michael@example.com", role: "Support", status: "Inactive" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "Manager", status: "Active" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "Support", status: "Active" },
  { id: 6, name: "Olivia Taylor", email: "olivia@example.com", role: "Admin", status: "Inactive" },
  { id: 7, name: "James Anderson", email: "james@example.com", role: "Manager", status: "Active" },
  { id: 8, name: "Sophia Thomas", email: "sophia@example.com", role: "Support", status: "Active" },
  { id: 9, name: "Daniel Martinez", email: "daniel@example.com", role: "Admin", status: "Inactive" },
  { id: 10, name: "Mia Jackson", email: "mia@example.com", role: "Manager", status: "Active" },
  { id: 11, name: "Ethan White", email: "ethan@example.com", role: "Support", status: "Active" },
  { id: 12, name: "Charlotte Harris", email: "charlotte@example.com", role: "Admin", status: "Active" },
  { id: 13, name: "Alexander Clark", email: "alexander@example.com", role: "Manager", status: "Inactive" },
  { id: 14, name: "Amelia Lewis", email: "amelia.l@example.com", role: "Support", status: "Active" },
  { id: 15, name: "Benjamin Walker", email: "BenW@example.com", role: "Admin", status: "Active" },
];