import {useState} from 'react';
import Admin from "../../../components/layout/Admin";
import SiteLayout from "../../../components/Site/SiteLayout";
import Pages from "../../../components/Site/Pages"
import axios from "axios";
const Index = ({user}) => {
    const [active, setActive] = useState('Pages')
    const [search, setSearch] = useState('')
    const [view, setView] = useState(null)
    const getData = (data) => {
        setView(data)
    }
    console.log(user)
    return (
        <div className={`container flex flex-col`}>
          <SiteLayout active={active} setActive={setActive} getData={getData} user={user}>
          <div className=" mt-10">
              {view}
          </div>
          </SiteLayout>

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
    const res = await axios.get(`https://`+host+`/api/users?group=employee`);

    return{
        props: {
            user: res.data
        }
    }


};
