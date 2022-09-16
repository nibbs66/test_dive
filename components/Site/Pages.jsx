import React from 'react';
import SiteCard from "./SiteCard";

const Pages = ({getData}) => {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-5 mt-5 overflow-y-auto ">
                <SiteCard getData={getData}
                    name={'Cursus'}

                />
                <SiteCard
                    name={'Cursus'}

                />
                <SiteCard
                    name={'Cursus'}

                /> <SiteCard
                name={'Cursus'}

            /> <SiteCard
                name={'Cursus'}

            /> <SiteCard
                name={'Cursus'}

            /> <SiteCard
                name={'Cursus'}

            /> <SiteCard
                name={'Cursus'}

            />
                <SiteCard
                    name={'Cursus'}

                />
                <SiteCard
                    name={'Cursus'}

                />





            </div>


        </>
    );
};

export default Pages;
