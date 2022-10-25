import {useMemo} from 'react';
import ClientHeader from "../ClientHeader";
import NewCard from "../Card/NewCard";
import NoPic from "../icons/NoPic";
import Paginate from "../Paginate/Paginate";
import Image from "next/image";

const CategoryListing = ({handleClick, cat, currentPage, setCurrentPage, category}) => {
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 12;
        const lastPageIndex = firstPageIndex + 12;
        return category.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <div className=' w-screen pb-10 min-h-screen'>
            <div className="flex flex-col w-full  ">
                <ClientHeader lastPage={'shop'} title={cat}/>
                <div className="grid  lg:grid-cols-4 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                    {currentTableData.map((item)=>(
                        <div onClick={()=>handleClick(item._id)}  key={item._id}>
                            <NewCard>
                                <div className=' flex justify-center'>
                                    {item.img.length > 0 ?
                                        <Image src={`${item.img[0]}`} alt="" width={100} height={100} objectFit="contain"/>  :
                                        <NoPic height={`h-24`} width={`h-24`}/>  }
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

export default CategoryListing;
