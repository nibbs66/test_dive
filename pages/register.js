import React from 'react';
import Client from "../components/layout/Client";
import RegisterForm from "../components/credentials/RegisterForm";


const Register = () => {
    //flex items-center justify-center
    return (
     <RegisterForm/>
    );
};

export default Register;
Register.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
