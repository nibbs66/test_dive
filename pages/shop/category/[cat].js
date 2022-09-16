import {useState, useMemo} from 'react';
import Client from "../../../components/layout/Client";
import {useRouter} from "next/router";
import axios from "axios";
import ClientHeader from "../../../components/ClientHeader";
import NewCard from "../../../components/Card/NewCard";
import Image from "next/image";
import Paginate from "../../../components/Paginate/Paginate";
const Category = ({category, subCat}) => {
    const router = useRouter()
    const {cat} = router.query
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 12;
        const lastPageIndex = firstPageIndex + 12;
        return category.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    const handleClick = (data) => {
        const category = cat.toLowerCase()
        router.push(`/shop/${category}/${data}`)
    }


    return (
        <div className=' w-screen pb-10 min-h-screen'>
            <div className="flex flex-col w-full  ">
                <ClientHeader lastPage={'shop'} title={cat}/>
                <div className="grid  lg:grid-cols-4 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                    {currentTableData.map((item)=>(
                        <div onClick={()=>handleClick(item._id)}  key={item._id}>
                            <NewCard>
                                <div className=' flex justify-center'>
                             <Image src={`/img/${item.img[0]}`} alt="" width={100} height={100} objectFit="contain"/>
                                </div>

                                   <div className='flex pt-5 pr-2 justify-center lg:justify-end'>
                                       <span className='uppercase font-bold text-slate-400'>{item.manufacturer}</span>
                                   </div>
                                   <div className='flex lg:pt-5 pt-1 pb-5 pr-2 justify-center lg:justify-end text-center'>
                                       <span className='uppercase font-bold text-slate-400 text-xs md:text-sm'>{item.name}</span>
                                   </div>


                            </NewCard>
                        </div>
                    ))}
                </div>
                <div className='pr-16 pb-10'>
                    <Paginate
                        currentPage={currentPage}
                        totalCount={category.length}
                        pageSize={12}
                        onPageChange={page => setCurrentPage(page)}

                    />
                </div>
            </div>

        </div>
    );
};

    export default Category;
    Category.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
export const getServerSideProps = async (ctx) =>{

    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/products?category=${ctx.params.cat}`);
    const cat = await axios.get(`https://`+host+`/api/catMenu?category=${ctx.params.cat}`);


    return{
        props:{
            category: res.data,
            subCat: cat.data,

        }
    }
};
