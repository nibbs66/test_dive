import React from 'react';
import Admin from "../../../../components/layout/Admin";
import NewProductPage from "../../../../components/Admin/Rentals/NewProductPage";
import axios from "axios";

const Index = ({category}) => {
    return (
        <div>
            <NewProductPage category={category}/>
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


    return{
        props:{
            category: cat.data,

        }
    }
}

