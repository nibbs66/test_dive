import useSWR from "swr";
import {fetcher} from "../../../components/helper/fetcher";


export default function useRegister (){

    const {data: notifications, error, isValidating, mutate} = useSWR( `/api/messages/`, fetcher)
    const {data: orders, error: orderError, isValidating: validateOrder, mutate: mutateOrder} = useSWR( `/api/orders/`, fetcher)
    const {data: products, error: productError, isValidating: validateProduct, mutate: mutateProduct} = useSWR( `/api/products/`, fetcher)


    return{
        notifications,
        error,
        isValidating,
        mutate,
        orders,
        orderError,
        validateOrder,
        mutateOrder,
        products,
        productError,
        validateProduct,
        mutateProduct

    }
}
