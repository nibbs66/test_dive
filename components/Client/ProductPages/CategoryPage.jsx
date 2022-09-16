import {useState, useMemo} from 'react';
import {useRouter} from 'next/router'
import ClientHeader from "../../ClientHeader";
import NewCard from "../../Card/NewCard";
import Paginate from "../../Paginate/Paginate";
import Image from "next/image";
const CategoryPage = ({favorites, params, category, subCat}) => {
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 12;
        const lastPageIndex = firstPageIndex + 12;
        /*if(params[0] !== 'favorites'){
            return  category.slice(firstPageIndex, lastPageIndex);
        }else{
            return  favorites.slice(firstPageIndex, lastPageIndex)
        }*/
        return  category.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    const handleClick = (data) => {

        router.push(`/shop/${params[0]}/${data}`)
    }

console.log(category)
    return (
        <div className=' w-screen pb-10 min-h-screen'>
            <div className="flex flex-col w-full  ">
                <ClientHeader lastPage={'shop'} title={'test'}/>
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

export default CategoryPage;
