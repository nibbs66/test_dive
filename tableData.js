

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
    { header: "Price", field: "price" },
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
    {field: "inStock", header: "inStock", sortable: true},
    {field: "new", header: "New", sortable: true},
    { header: "Action", field: "action",  sortable: false },
];
