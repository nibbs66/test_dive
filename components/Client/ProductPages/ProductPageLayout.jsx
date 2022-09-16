import React from 'react';
import ProductPage from "./ProductPage";
import {useSession} from "next-auth/react";
import useUser from "../../../pages/api/hooks/useUser";
import CategoryPage from "./CategoryPage";



const ProductPageLayout = ({product, params, category, subCat}) => {
    const {cartId, cart, mutate, favorites, mutateCart, mutateFavorite} = useUser()
    return (
        <>
            <CategoryPage favorites={favorites} params={params} category={category} subCat={subCat}/>
            {/*<ProductPage product={product}/>*/}
        </>
    );
};

export default ProductPageLayout;
