import {useState, useEffect} from 'react';
import TableActions from "../Table/TableActions";
import TableDisplay from "../Table/TableDisplay";
import {MessageColumns} from "../../tableData";

const MessageMainTable = ({messages}) => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        setData([])
        messages.map((option, idx)=>{
            setData( (prev)=>[...prev, {
                id: option._id,
                items: [

                    option.fullName,
                    option.phone,
                    option.email,
                    option.subject,

                    <TableActions key={idx} link={`/admin/messages/${option.subject}/`} editLink={`/admin/users/edit/`} id={option._id}/>
                ]
            }])

        })


    },[messages])

    return (
        <div className={' flex p-10 '}>

            <TableDisplay   columns={MessageColumns} tableTitle={true} font={'text-slate-800'} textSize={'lg:text-3xl'}
                            rows={data} setRows={setData} title={'Message'}  PageSize={10} link={`/admin/messages/`}
            />
        </div>
    );
};

export default MessageMainTable;
