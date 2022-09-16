import {useState} from 'react';
import up from '../../public/img/tableIcons/up_arrow.png'
import down from '../../public/img/tableIcons/down_arrow.png'
import reset from '../../public/img/tableIcons/default.png'
import Image from "next/image";

const TableHeader = ({columns, handleSorting, action}) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [icon, setIcon] = useState(reset)
    const handleSort = (idx) => {
        console.log(idx)
     const sortOrder =
            idx === sortField && order === "asc" ? "desc" : "asc";
        setSortField(idx);
        setOrder(sortOrder);
        if( sortOrder === 'asc'){
            setIcon(up)
        }else if(sortOrder === 'desc'){
            setIcon(down)
        }else{
            setIcon(reset)
        }

        handleSorting(idx, sortOrder);
    }

    return (
        <thead>
        <tr className='uppercase text-slate-400 font-semibold'>

            {columns.map((title, idx)=>(
                <th key={idx} onClick={title.sortable ? ()=>handleSort(idx) : null}  className="px-2 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap cursor-pointer">
                   <div className={`flex justify-center items-center gap-1`}>
                       {title.header}
                       {title.sortable && <Image src={icon} alt='' layout='intrinsic'/>}
                   </div>
                </th>
            ))}

        </tr>
        </thead>
    );
};

export default TableHeader;
