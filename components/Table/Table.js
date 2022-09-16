import {useState, useMemo} from "react";
import Paginate from '../Paginate/Paginate';
import TableHeader from "./TableHeader";
import Link from "next/link";
import TableRow from "./TableRow";
import{NPageSize} from '../../tableData';


const Table = ({data, setRows, title, columns, tableTitle, rows, PageSize, showButton, action, font, textSize, link}) => {
    const [currentPage, setCurrentPage] = useState(1);



    const currentTableData = useMemo(() => {

        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = (firstPageIndex + PageSize);
        return rows.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, rows, PageSize]);

    const handleSorting = (sortField, sortOrder) => {

      if (sortField) {
            const sorted = [...rows].sort((a, b) => {
                if (a.items[sortField] === null) return 1;
                if (b.items[sortField] === null) return -1;
                if (a.items[sortField] === null && b.items[sortField] === null) return 0;
                return (
                    a.items[sortField].toString().localeCompare(b.items[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setRows(sorted);
        }

    };

  return (
   <div className={'container '}>
       <div className=' relative bg-white flex justify-center  w-full mx-auto p-5 mt-5 rounded-xl  my-auto '>
           {tableTitle && <div
               className=' absolute  rounded-lg shadow-xl flex items-center bg-green-500/30 w-5/6 h-16 mx-20 rounded-lg -top-8'>
               <h1 className={`uppercase ${font} p-10 text-xl ${textSize} font-thin tracking-widest`}>{title}s</h1>
           </div>}
           <div className='flex flex-col w-full justify-center p-4 mt-12 '>
               <div className="w-full">
                   <table className=" w-full border-collapse">
                       <TableHeader columns={columns} action={action} handleSorting={handleSorting}/>
                       <tbody>
                       {currentTableData.map((field)=>(
                           <TableRow key={field.id} id={field.id} data={field.items} showButton={showButton} title={title} link={link}/>
                       ))}
                       </tbody>
                   </table>
               </div>
               <Paginate
                   currentPage={currentPage}
                   totalCount={rows.length}
                   pageSize={PageSize}
                   onPageChange={page => setCurrentPage(page)}
               />
           </div>

       </div>

   </div>
  )
}

export default Table
