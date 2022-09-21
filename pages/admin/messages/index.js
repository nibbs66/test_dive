
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import MessageMainTable from "../../../components/Messages/MessageMainTable";

const Index = ({messages}) => {

    return (
       <div>
           <MessageMainTable messages={messages}/>
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
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/messages`);

    return{
        props: {
            messages: res.data
        }
    }


};
