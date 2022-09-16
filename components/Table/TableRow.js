import {useState} from 'react';
import Link from "next/link";

const TableRow = ({data}) => {

    return (

        <tr>

        {data.map((item) => (
            <th key={item} className="  align-middle font-light text-sm whitespace-nowrap px-2 py-4 ">
                {item}
            </th>
        ))}
        <th>

        </th>

    </tr>


    );
};

export default TableRow;
