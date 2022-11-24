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
    {field: "orderId", header: "Order Number", sortable: true},
    {field: "date", header: "Order Date", sortable: true},
    {field: "quantity", header: "Quantity", sortable: true},
    {field: "amount", header: "Total", sortable: true},
    {field: "icon", header: "Status", sortable: true},
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
    { header: "Order Number", field: "orderId",sortable: true },
    { header: "Type", field: "type",  sortable: true },
    { header: "Total", field: "total",  sortable: true },
    { header: "Carrier", field: "carrier",  sortable: true},
    { header: "Status", field: "status",  sortable: true },
    { header: "Action", field: "action",  sortable: false },
]
export const SalesColumns = [
    { header: "Sales Number", field: "salesId",sortable: true },
    { header: "Total", field: "total",  sortable: true },
    { header: "Date", field: "salesDate",  sortable: true },
    { header: "Source", field: "source",  sortable: true},
    { header: "Action", field: "action",  sortable: false },
]

export const userOrderColumns = [
    { header: "Product Id", field: "productId",sortable: true },
    { header: "Name", field: "name",sortable: true },
    { header: "Quantity", field: "quantity",sortable: true },
    { header: "Available", field: "available",sortable: true },
    { header: "Price", field: "price",sortable: true },

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
    { header: "Customer", field: "customer", sortable: false },
    { header: "Date", field: "date",  sortable: false },
    { header: "Type", field: "type",  sortable: false },
    { header: "Amount", field: "amount",  sortable: false },
    { header: "Status", field: "status",  sortable: false },
    { header: "View", field: "view",  sortable: false },
]

export const ScubaPackage = [
    { header: "Package", field: "package" },
    { header: "Dag", field: "dag" },
    { header: "Weekend", field: "weekend" },
    { header: "Reserve", field: "reserve" },
]

export const ScubaItem = [
    { header: "Item", field: "item" },
    { header: "1/2 Day", field: "halfDay" },
    { header: "Full Day", field: "fullDay" },
    { header: "Reserve", field: "reserve" },
]
export const ProductSubType = [
    { header: "Barcode", field: "barcode" },
    { header: "Sub Id", field: "modelId" },
    { header: "Color", field: "color" },
    { header: "Size", field: "size" },
    { header: "Stock", field: "stock" },
]
export const ProductsColumns = [
    {field: "vendor", header: "Vendor", sortable: true},
    {field: "name", header: "Name", sortable: true},
    {field: "category", header: "Category", sortable: true},
    {field: "cost", header: "Cost", sortable: true},
    {field: "price", header: "Price", sortable: true},
    {field: "stock", header: "Stock", sortable: false},
    {field: "isNew", header: "New", sortable: true},
    { header: "Action", field: "action",  sortable: false },
];
export const VendorColumns = [
    {field: "vendor", header: "Vendor", sortable: true},
    {field: "link", header: "Website", sortable: true},
    {field: "address", header: "Address", sortable: true},
    {field: "city", header: "City", sortable: true},
    {field: "contact", header: "Contact", sortable: true},
    {field: "phone", header: "Phone", sortable: false},
    {field: "email", header: "Email", sortable: true},
    { header: "Action", field: "action",  sortable: false },
];
export const VendorProductColumns = [
    {field: "id", header: "Product Id", sortable: true},
    {field: "product", header: "Name", sortable: true},
    {field: "cost", header: "Cost", sortable: true},
    {field: "price", header: "Price", sortable: true},

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
