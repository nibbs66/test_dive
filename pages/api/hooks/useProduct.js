import useSWR from "swr";
import {fetcher} from "../../../components/helper/fetcher";


export default function useProduct (){


    const {data: productData, error: productError, isValidating: validateProduct, mutate: mutateProduct} = useSWR( `/api/products/`, fetcher)
    const {data: colorData, error: colorError, isValidating: validateColor, mutate: mutateColor} = useSWR( `/api/color/`, fetcher)
    const {data: sizeData, error: sizeError, isValidating: validateSize, mutate: mutateSize} = useSWR( `/api/size/`, fetcher)
    const {data: categoryData, error: categoryError, isValidating: validateCategory, mutate: mutateCategory} = useSWR( `/api/catMenu`, fetcher)


    return{
        productData,
        validateProduct,
        mutateProduct,
        sizeData,
        colorData,
        categoryData,
        validateCategory

    }
}
