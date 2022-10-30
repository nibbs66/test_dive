import {useState, useEffect} from 'react';
import TableDisplay from "../Table/TableDisplay";
import {MessageGroupColumns} from "../../tableData";
import TableActions from "../Table/TableActions";

const MessageGroupTable = ({messages, title}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData([])
        messages.map((option, idx)=>{
            setData( (prev)=>[...prev, {
                id: option._id,


                fullName: option.fullName,
                phone: option.phone,
                email: option.email,
                regarding: option.regarding,

                action: <TableActions key={idx} link={`/admin/messages/${option.subject}/`} editLink={`/admin/users/edit/`} item={option}/>

            }])

        })


    },[messages])

    return (
        <div className={' flex p-10 '}>

            <TableDisplay   columns={MessageGroupColumns} tableTitle={true} font={'text-slate-800'} textSize={'lg:text-3xl'}
                            rows={data} setRows={setData} title={`${title}`+" "+'Message'}  PageSize={10} link={`/admin/messages/`}
            />
        </div>
    );
};

export default MessageGroupTable;
