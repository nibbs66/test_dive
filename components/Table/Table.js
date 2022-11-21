import {useState, useMemo} from "react";
import Paginate from '../Paginate/Paginate';
import TableHeader from "./TableHeader";
import Link from "next/link";
import TableRow from "./TableRow";
import{NPageSize} from '../../tableData';

import Filters from "../Admin/Filters";

const Table = ({ setRows, title, columns, tableTitle, filterColumns, activeFilter, setActiveFilter,
                   handleReset, checked, handleFilter, rows, PageSize, showButton, showFilter, action, font, textSize, link, filterData}) => {
    const [currentPage, setCurrentPage] = useState(1);



    const currentTableData = useMemo(() => {

        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = (firstPageIndex + PageSize);
        return rows.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, rows, PageSize]);

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...rows].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
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
                    {showFilter && <Filters columns={columns} handleReset={handleReset} activeFilter={activeFilter}
                                            setActiveFilter={setActiveFilter} data={rows} filterData={filterData}
                                            filterColumns={filterColumns} checked={checked} handleFilter={handleFilter}/>}
                    <div className="w-full">
                        <table className=" w-full border-collapse">
                            <TableHeader columns={columns} action={action} handleSorting={handleSorting}/>
                            <tbody>
                            <TableRow  showButton={showButton} title={title} columns={columns} data={currentTableData} link={link}/>
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
