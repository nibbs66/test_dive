import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Client from "../components/layout/Client";
import axios from "axios";
import Slider from "../components/Slider";
import VendorLogos from "../components/VendorLogos";
import Announcement from "../components/Announcement";
import { setCookie} from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';



export default function Home({images}) {

  return (

    <div className={`truncate min-h-fit relative`}>


        {/*<Announcement/>*/}
        <Slider images={images} as={'image'}/>
        <VendorLogos images={images} as={'logo'}/>


    </div>
  )
}
export async function getServerSideProps ({req, res}){

    const {host} = req.headers;
    console.log(host)
    const pic = await axios.get(`http://`+host+`/api/images`);
    setCookie('visitor', `guest${uuidv4()}`, { req, res, maxAge: 60 * 6 * 24 });

    return{
        props:{
            images: pic.data,


        }
    }
}

Home.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
