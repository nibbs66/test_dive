import remco from "./public/img/staff/remco.jpeg";

import marcel from './public/img/staff/Marcel_mi.jpeg'
import dennis from './public/img/staff/Dennis.jpeg'
import pascal from './public/img/staff/pascal.jpeg'
import patrick from './public/img/staff/Patrick_(2).jpeg'
import ronald from './public/img/staff/Ronald.jpeg'

export const userColumns = [
    { header: "Avatar", field: "avatar" , sortable: false },
    { header: "Name", field: "name",  sortable: true },
    { header: "Email", field: "email",  sortable: true },
    { header: "Phone", field: "phone",  sortable: true },
    { header: "Action", field: "action",  sortable: false },
];

export const orderColumns = [
    {field: "id", header: "Order Number", sortable: true},
    {field: "date", header: "Order Date", sortable: true},
    {field: "quantity", header: "Quantity", sortable: true},
    {field: "amount", header: "Total", sortable: true},
    { header: "Action", field: "action", sortable: false },
];

export const certificationColumns = [
    {field: "number", header: "Dive Number",  sortable: true},
    {field: "agency", header: "Agency", sortable: true},
    {field: "date", header: " Certification Date", sortable: true},
    {field: "instructor", header: "Instructor", sortable: true},
    {field: "level", header: "Level", sortable: true},
]

export const OrdersColumns = [
    { header: "Order Number", field: "id",sortable: true },
    { header: "Type", field: "type",  sortable: true },
    { header: "Total", field: "total",  sortable: true },
    { header: "Carrier", field: "carrier,  sortable: true" },
    { header: "Status", field: "status",  sortable: true },
    { header: "Action", field: "action",  sortable: false },
]

export const userOrderColumns = [
    { header: "Product Id", field: "id",sortable: true },
    { header: "Name", field: "name",sortable: true },
    { header: "Quantity", field: "quantity",sortable: true },
    { header: "Available", field: "available",sortable: true },
    { header: "Price", field: "price",sortable: true },
    { header: "View", field: "view",sortable: false },
]

export const Cursus =[
    {field: "date", header: "Start Date", sortable: false},
    {field: "course", header: "Cursus", sortable: false},
    {field: "price", header: "Price", sortable: false},
    {field: "register", header: "Register", sortable: false},
]

export const DashboardUsers = [
    { header: "Name", field: "name", sortable: false },
    { header: "Email", field: "email",  sortable: false},
    { header: "View", field: "view",  sortable: false },
]

export const DashboardOrders = [
    { header: "Customer", field: "Customer", sortable: false },
    { header: "Date", field: "date",  sortable: false },
    { header: "Type", field: "type",  sortable: false },
    { header: "Amount", field: "amount",  sortable: false },
    { header: "Status", field: "status",  sortable: false },
    { header: "View", field: "view",  sortable: false },
]

export const ScubaPackage = [
    { header: "Package", field: "package" },
    { header: "Dag", field: "dag" },
    { header: "Weekend", field: "Weekend" },
    { header: "Reserve", field: "reserve" },
]

export const ScubaItem = [
    { header: "Item", field: "item" },
    { header: "1/2 Day", field: "1/2 day" },
    { header: "Full Day", field: "full day" },
    { header: "Reserve", field: "reserve" },
]
export const ProductsColumns = [
    {field: "manufacturer", header: "Manufacturer", sortable: true},
    {field: "name", header: "Name", sortable: true},
    {field: "category", header: "Category", sortable: true},
    {field: "cost", header: "Cost", sortable: true},
    {field: "price", header: "Price", sortable: true},
    {field: "stock", header: "Stock", sortable: true},
    {field: "new", header: "New", sortable: true},
    { header: "Action", field: "action",  sortable: false },
];
export const RentalTableColumns = [

    {field: "name", header: "Name", sortable: true},
    {field: "category", header: "Category", sortable: true},
    {field: "halfDayPrice", header: "1/2 Dag Prijs", sortable: true},
    {field: "fullDayPrice", header: "Dag Prijs", sortable: true},
    {field: "stock", header: "Stock", sortable: true},
    { header: "Action", field: "action",  sortable: false },
];
export const MessageColumns = [

    {field: "fullName", header: "Naam", sortable: true},
    {field: "phone", header: "Telefoon", sortable: true},
    {field: "email", header: "Email", sortable: true},
    {field: "subject", header: "Subject", sortable: true},

    { header: "Action", field: "action",  sortable: false },
];
export const MessageGroupColumns = [

    {field: "fullName", header: "Naam", sortable: true},
    {field: "phone", header: "Telefoon", sortable: true},
    {field: "email", header: "Email", sortable: true},
    {field: "regarding", header: "Regarding", sortable: true},

    { header: "Action", field: "action",  sortable: false },
];
export const people = [
    {
        name: 'Remco Van \'t Hooft',
        role: 'Course Director',
        imageUrl:  remco,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Patrick Van Merode',
        role: 'Staff Instructor',
        imageUrl:  patrick,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Ronald Van Gils',
        role: 'Instructor',
        imageUrl:  ronald,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Dennis De Jongh',
        role: 'Instructor',
        imageUrl:  dennis,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Marcel Middeldorp',
        role: 'Instructor',
        imageUrl:  marcel,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Pascal Van \'t Hooft',
        role: 'Shop Staff',
        imageUrl:  pascal,
        twitterUrl: '#',
        linkedinUrl: '#',
    },
]
