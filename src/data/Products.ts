export interface ProductItem{
    id:number;
    name:string;
    category:"Electronics" | "Accessories" | "Office" | "Software";
    price:number;
    stock:number;
    status:"In Stock" | "Low Stock" | "Out of Stock";
    sku:string;
}

export const products:ProductItem[] = [
    {
        id:1,
        name:"Wireless Mouse",
        category:"Electronics",
        price:29.99,
        stock:150,
        status:"In Stock",
        sku:"WM-001"
    },
    {
        id:2,
        name:"Mechanical Keyboard",
        category:"Electronics",
        price:89.99,
        stock:80,
        status:"In Stock",
        sku:"MK-002"
    },
    {
        id:3,
        name:"USB-C Hub",
        category:"Accessories",
        price:49.99,
        stock:200,
        status:"In Stock",
        sku:"UCH-003"
    },
    {
        id:4,
        name:"Noise-Cancelling Headphones",
        category:"Electronics",
        price:199.99,
        stock:30,
        status:"Low Stock",
        sku:"NCH-004"
    },
    {
        id:5,
        name:"Ergonomic Office Chair",
        category:"Office",
        price:299.99,
        stock:20,
        status:"Low Stock",
        sku:"EOC-005"
    },
    {
        id:6,
        name:"4K Monitor",
        category:"Electronics",
        price:399.99,
        stock:10,
        status:"Low Stock",
        sku:"4KM-006"
    },
    {
        id:7,
        name:"External Hard Drive",
        category:"Electronics",
        price:79.99,
        stock:0,
        status:"Out of Stock",
        sku:"EHD-007"
    },
    {
        id:8,
        name:"Wireless Charger",
        category:"Accessories",
        price:39.99,
        stock:120,
        status:"In Stock",
        sku:"WC-008"
    },
    {
        id:9,
        name:"Office Desk Lamp",    
        category:"Office",
        price:59.99,
        stock:50,
        status:"In Stock",
        sku:"ODL-009"
    },
    {
        id:10,
        name:"Project Management Software",
        category:"Software",
        price:99.99,
        stock:500,
        status:"In Stock",
        sku:"PMS-010"
    },
     {
    id: 11,
    name: "Cloud Storage Subscription",
    category: "Software",
    price: 15,
    stock: 999,
    status: "In Stock",
    sku: "CLS-011",
  },
    {
    id: 12,
    name: "Project Management License",
    category: "Software",
    price: 120,
    stock: 999,
    status: "In Stock",
    sku: "PML-012",
  },
]