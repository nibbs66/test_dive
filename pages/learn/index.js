import React from 'react';
import Client from "../../components/layout/Client";
import Image from "next/image";
import Link from "next/link";
import introImg from '../../public/img/Education_Home_hero.jpeg'
import NewCard from "../../components/Admin/Card/NewCard";
import axios from "axios";

const Index = ({cursus}) => {
    const numAscending = [...cursus].sort((a,b)=>a.sortOrder - b.sortOrder)
    console.log(numAscending)
    return (
        <div className='flex w-full min-h-fit m-auto  pt-1'>
            <div className=' flex flex-col '>
                <div className={'relative flex  h-auto md:h-1/4 overflow-hidden'}>
                    <Image className=' flex' src={introImg} alt='' layout='intrinsic' objectFit={'cover'}/>
                    <div className={'flex absolute  left-16 top-16 sm:top-64 text-white sm:font-thin  text-xl font-bold sm:text-5xl'}>
                        PADI COURSES
                    </div>
                </div>
                <div>
                    <p className={'my-5 sm:mx-20 mx-5 text-lg text-slate-400'}>
                        Interested in learning to scuba dive? You’ve come to the right place.
                        Millions of underwater explorers started right here.</p>

                    <p  className={'my-5 sm:mx-20 mx-5 text-lg text-slate-400'}>  Scuba lessons unlock the door to new adventures and amazing animal encounters. By the end of your
                        scuba certification course, you’ll see our ocean planet through new eyes.
                    </p>
                </div>
                <div  className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 px-2 pb-5 overflow-y-auto h-auto">
                    {numAscending.map((course)=>(
                        <div  key={course._id}>
                            <NewCard>
                                <Link  href={`/learn/${course._id}`} passHref>
                                    <div className={'flex flex-col items-center py-5 gap-1 sm:gap-5 px-3'}>
                                        <Image className={ `flex`} src={course.img[0]} alt='' height={300} width={600} objectFit={'contain'}/>
                                        <span className={'uppercase text-slate-400 text-lg xl:text-xl lg:whitespace-normal sm:text-center font-semibold'}>{course.cursus}</span>
                                        <span className={'uppercase text-slate-400 text-base xl:text-lg font-semibold'} >Learn More</span>

                                    </div>

                                </Link>
                            </NewCard>
                        </div>
                    ))}


                </div>


            </div>

        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/cursusDescription`);
    return {
        props: {
            cursus: res.data,


        },
    }
}
