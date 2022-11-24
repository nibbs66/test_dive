import React from 'react';
import VendorDisplay from "./VendorDisplay";
import EditVendorDisplay from "./EditVendorDisplay";
import NewVendor from "./NewVendor";

const VendorSelector = ({page, vendor}) => {
    console.log(vendor)
    return (
        <>
            {(page.length === 1 && page[0] !== 'new') && <VendorDisplay vendor={vendor}/>}
            {(page.length === 1 && page[0] === 'new') &&  <NewVendor/>}
            {(page.length > 1 ) &&  <EditVendorDisplay vendor={vendor}/>}


        </>
    );
};

export default VendorSelector;
