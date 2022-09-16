import React from 'react';
import Client from "../../components/layout/Client";

const Register = () => {
    return (
        <div>
            Register for class
        </div>
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
