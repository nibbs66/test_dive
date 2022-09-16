import React from 'react';

import NewProductPage from "../../../../components/Products/NewProductPage";
import Admin from "../../../../components/layout/Admin";
import axios from "axios";

const Index = ({category, colors, sizes}) => {

    return (
        <div>
            <NewProductPage category={category} productColors={colors} productSizes={sizes}/>
        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async() => {



    const cat = await axios.get(`http://localhost:3000/api/catMenu`);
    const color = await axios.get(`http://localhost:3000/api/color`);
    const size = await axios.get(`http://localhost:3000/api/size`);


    return{
        props:{
            category: cat.data,
            colors: color.data,
            sizes: size.data,

        }
    }
}
