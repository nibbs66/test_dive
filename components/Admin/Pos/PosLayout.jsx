import React from 'react';
import CategoryDisplay from "./CategoryDisplay";
import ProductDisplay from "./ProductDisplay";
import ProductPage from "../../Client/ProductPages/ProductPage";
import CursusDisplay from "./CursusDisplay";

const PosLayout = ({product, handleClick, search, dataIndex, active, getProduct, setShowPosModal}) => {

    return (
        <div className="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4">
            {active === 'catMenu' &&
                dataIndex === 1 ? <CategoryDisplay search={search} handleClick={handleClick}/>
               :  <ProductDisplay  search={search} setShowPosModal={setShowPosModal} getProduct={getProduct}/>
            }
            {active === 'cursusDecription' &&
            dataIndex === 1 ? <CursusDisplay search={search} handleClick={handleClick}/>
                :  null
            }


        </div>
    );
};

export default PosLayout;
