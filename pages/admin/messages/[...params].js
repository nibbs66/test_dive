import React from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {useRouter} from "next/router";
import MessageGroupTable from "../../../components/Messages/MessageGroupTable";
import Message from "../../../components/Messages/Message";

const MessageGroup = ({messages}) => {
    const router = useRouter()
    const {query}  = router
    console.log(query)
    return (
    <div>
        {query.params.length < 2 ?
            <MessageGroupTable messages={messages} title={query.params[0]}/>
        :
            <Message messages={messages}/>
        }
    </div>
    );
    };

    export default MessageGroup;
    MessageGroup.getLayout = function getLayout(page){
        return(
            <Admin>
                {page}
            </Admin>
        )
    }
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    if(ctx.params.params.length >= 2){
        const res = await axios.get(`https://`+host+`/api/messages/${ctx.params.params[1]}`);

        return{
            props: {
                messages: res.data
            }
        }
    }else{
        const res = await axios.get(`https://`+host+`/api/messages?messageGroup=${ctx.params.params[0]}`);

        return{
            props: {
                messages: res.data
            }
        }
    }



};
