export interface OrderItem {
  id: number;
  customer: string;
  email: string;
  amount: number;
  status: "Pending" | "Completed" | "Cancelled";
  date: string;
}

export const orders: OrderItem[] = [
  {
    id: 1001,
    customer: "John Carter",
    email: "john@example.com",
    amount: 240,
    status: "Completed",
    date: "2026-03-21",
  },
  {
    id: 1002,
    customer: "Sarah Smith",
    email: "sarah@example.com",
    amount: 180,
    status: "Pending",
    date: "2026-03-22",
  },
  {
    id: 1003,
    customer: "Michael Lee",
    email: "michael@example.com",
    amount: 320,
    status: "Cancelled",
    date: "2026-03-22",
  },
  {
    id: 1004,
    customer: "Emma Wilson",
    email: "emma@example.com",
    amount: 150,
    status: "Completed",
    date: "2026-03-23",
  },
  {
    id: 1005,
    customer: "David Brown",
    email: "david@example.com",
    amount: 410,
    status: "Pending",
    date: "2026-03-23",
  },
  {
    id: 1006,
    customer: "Olivia Taylor",
    email: "olivia@example.com",
    amount: 290,
    status: "Completed",
    date: "2026-03-24",
  },
  {
    id: 1007,
    customer: "James Anderson",
    email: "james@example.com",
    amount: 120,
    status: "Pending",
    date: "2026-03-24",
  },
  {
    id: 1008,
    customer: "Sophia Thomas",
    email: "sophia@example.com",
    amount: 560,
    status: "Completed",
    date: "2026-03-25",
  },
  {
    id: 1009,
    customer: "Daniel Martinez",
    email: "daniel@example.com",
    amount: 90,
    status: "Cancelled",
    date: "2026-03-25",
  },
  {
    id: 1010,
    customer: "Mia Jackson",
    email: "mia@example.com",
    amount: 270,
    status: "Completed",
    date: "2026-03-26",
  },
  {
    id: 1011,
    customer: "Ethan White",
    email: "ethan@example.com",
    amount: 330,
    status: "Pending",
    date: "2026-03-26",
  },
  {
    id: 1012,
    customer: "Charlotte Harris",
    email: "charlotte@example.com",
    amount: 205,
    status: "Completed",
    date: "2026-03-27",
  },
];