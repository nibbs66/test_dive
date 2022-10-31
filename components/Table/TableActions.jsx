import React from 'react';
import Link from "next/link";
const TableActions = ({link, editLink, handleDelete, id}) => {
    return (
        <nav className="flex  items-center h-4 pr-1 justify-center">
            <Link href={link+item._id} style={{textDecoration: "none"}} >
                <button
                    className="  bg-transparent flex justify-center hover:bg-gray-500 hover:text-white py-1 px-2 border-0 hover:rounded  text-gray-500 text-xs font-semibold uppercase tracking-wide leading-loose no-underline cursor-pointer transition duration-100 text-xs rounded-sm py-1 px-2"
                >
                    Show
                </button>
            </Link>
            <Link href={editLink+item._id} style={{textDecoration: "none"}} >
                <button

                    className=" bg-transparent text-blue-500  flex justify-center hover:bg-blue-500 hover:text-white py-1 px-2 border-0 hover:rounded  text-gray-500 text-xs font-semibold uppercase tracking-wide leading-loose no-underline cursor-pointer transition duration-100 text-xs rounded-sm py-1 px-2"
                >
                    Edit
                </button>
            </Link>

            <button onClick={()=>handleDelete(id)}
                    type="button"

                    className=" bg-transparent hover:rounded text-red-600  flex justify-center hover:bg-red-600 hover:text-white  py-1 px-2 border-0 rounded  text-gray-500 text-xs font-semibold uppercase tracking-wide leading-loose no-underline cursor-pointer transition duration-100 text-xs rounded-sm py-1 px-2"

            >
                Delete
            </button>
        </nav>
    );
};

export default TableActions;
