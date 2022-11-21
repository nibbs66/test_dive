import React from 'react';
import CategoryListing from "./CategoryListing";
import ManufacturerListing from "./ManufacturerListing";

const PageSelector = ({cat, page, handleClick, category, test, currentPage, setCurrentPage}) => {
    return (
        <>
            {page === 'category' && <CategoryListing cat={cat}  handleClick={handleClick} test={test} page={page} category={category}
                                                     currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
            {page === 'vendor' && <ManufacturerListing cat={cat} page={page}  handleClick={handleClick} test={test} category={category}
                                                       currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
        </>
    );
};

export default PageSelector;
