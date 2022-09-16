import React, {useState} from 'react';
import PageView from './Page/PageLayout'
const NewPage = ({title}) => {
    const [pageView, setPageView] = useState(title)
    return (
        <div className={`w-full`}>
            {pageView}
        </div>
    );
};

export default NewPage;
