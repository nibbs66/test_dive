import React from 'react';
import Client from "../components/layout/Client";
import RegisterForm from "../components/Client/credentials/RegisterForm";


const Register = () => {

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
