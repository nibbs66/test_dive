import React from 'react';
import CategoryListing from "./CategoryListing";
import ManufacturerListing from "./ManufacturerListing";

const PageSelector = ({cat, page, handleClick, category, currentPage, setCurrentPage}) => {
    return (
        <>
            {page === 'category' && <CategoryListing cat={cat}  handleClick={handleClick} category={category}
                              currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
            {page === 'manufacturer' && <ManufacturerListing cat={cat}  handleClick={handleClick} category={category}
                                                     currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
        </>
    );
};

export default PageSelector;
