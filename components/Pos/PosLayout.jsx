import React from 'react';
import CategoryDisplay from "./CategoryDisplay";
import ProductDisplay from "./ProductDisplay";
import ProductPage from "../Client/ProductPages/ProductPage";

const PosLayout = ({product, handleClick, search, dataIndex}) => {
    return (
        <div className="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4">
            {dataIndex === 1 && <CategoryDisplay search={search} handleClick={handleClick}/>}
            {dataIndex === 2 && <ProductDisplay  search={search} handleClick={handleClick}/>}
            {dataIndex === 3 && <ProductPage product={product}/>}

        </div>
    );
};

export default PosLayout;
