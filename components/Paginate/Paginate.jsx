import React, {useEffect, useState} from 'react';

import { usePagination, DOTS} from './usePagination';

const Paginate = (props) => {

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;



    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onNext = () => {
        if(currentPage === lastPage){

        }else{
            onPageChange(currentPage + 1);
        }

    };

    const onPrevious = () => {
        if(currentPage === 1){

        }else{
            onPageChange(currentPage - 1);
        }

    };
    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="flex items-center justify-end pt-5 pr-16 space-x-1 text-sm ">
            <li
                onClick={onPrevious}
                className="flex items-center px-2 py-1 text-gray-500 bg-gray-300 rounded-md  hover:bg-blue-400 hover:text-white" >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
                </svg>
            </li>
            {paginationRange.map((pageNumber)=>{
                if(pageNumber === DOTS){
                    return  <li className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">&#8230;</li>
                }
                return (
                    <li
                        onClick={()=> onPageChange(pageNumber)}
                        className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                        {pageNumber}
                    </li>
                )
            })}
            <li
                onClick={onNext}
                className="px-2 py-1 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
            </li>
        </ul>
    );
};

export default Paginate;
