import {useState, useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import logo from '../../public/img/headerlogo.svg'
import { useSession, signOut } from "next-auth/react"
import Image from "next/image";
import Facebook from "../icons/Facebook";
import {ShoppingCartIcon, HeartIcon} from '@heroicons/react/24/outline'
import Youtube from "../icons/YouTube";
import Twitter from "../icons/Twitter";
import useUser from "../../pages/api/hooks/useUser";
import SearchBar from "../SearchBar";



const Navbar = () => {
    const {data: session} = useSession()
    const {cart, favorites, error, isValidating} = useUser()
    const router = useRouter()
    const [user, setUser] = useState({})
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        if(session){
            setUser(session)
        }else{
            setUser(null)
        }

    },[session])
    const handleLogin = () => {import {useState, useEffect} from 'react';
        import Link from "next/link";
        import {useRouter} from "next/router";
        import logo from '../../public/img/headerlogo.svg'
        import { useSession, signOut } from "next-auth/react"
        import Image from "next/image";

        import {ShoppingCartIcon, HeartIcon} from '@heroicons/react/24/outline'

        import useUser from "../../pages/api/hooks/useUser";
        import SearchBar from "../SearchBar";



        const Navbar = () => {
            const {data: session} = useSession()
            const {cart, favorites, error, isValidating} = useUser()
            const router = useRouter()
            const [user, setUser] = useState({})
            const [active, setActive] = useState(false)
            const [open, setOpen] = useState(false)
            const [showModal, setShowModal] = useState(false)
            useEffect(()=>{
                if(session){
                    setUser(session)
                }else{
                    setUser(null)
                }

            },[session])
            const handleLogin = () => {
                router.push('/login')
            }
            const handleClick = (data) => {
                if(active){
                    setActive(!active)
                    router.push(data)
                }else{
                    router.push(data)
                }

            }
            const handleLogOut = () => {
                signOut({ callbackUrl: '/' })
            }

            return (
                <div className={`flex h-24 sm:h-28 sticky pb-8   bg-gradient-to-b from-[#1980b5] to-[rgba(25,128,180,0.3)]  z-40`}>
                    <SearchBar open={open} setOpen={setOpen}/>
                    <div className="flex items-center  h-full w-full justify-around mt-2">
                        <div className={`flex pt-5`}>
                            <Image src={logo} alt={``} layout={`intrinsic`} objectFit={`contain`}/>

                        </div>
                        <div className="hidden lg:flex flex-col gap-2 mt-2 text-white">


                            <ul className="flex items-center gap-4 text-white ">
                                <Link href="/" passHref>
                                    <li  className="text-center cursor-pointer font-semibold">Home</li>
                                </Link>
                                <Link href="/learn" passHref>
                                    <li className="text-center cursor-pointer font-semibold">Leren Duiken</li>
                                </Link>
                                <Link href="/shop" passHref>
                                    <li className="text-center cursor-pointer font-semibold">Winkel</li>
                                </Link>
                                <Link href="/overons" passHref>
                                    <li className="text-center cursor-pointer font-semibold">Over Ons</li>
                                </Link>
                                <Link href="/faq" passHref>
                                    <li className="text-center cursor-pointer font-semibold">FAQ&apos;s</li>
                                </Link>
                                <Link href="/rental" passHref>
                                    <li className="text-center cursor-pointer font-semibold">Te Huur</li>
                                </Link>
                                <Link href="/service" passHref>
                                    <li className="text-center cursor-pointer font-semibold">Onderhoud</li>
                                </Link>
                                {!session?.user ?
                                    <li onClick={()=>handleClick('/login')} className="text-center cursor-pointer font-semibold">Inloggen/Registeren</li> :
                                    <li   onClick={handleLogOut} className="text-center cursor-pointer font-semibold">Uitloggen</li>

                                }


                            </ul>

                            <div className={!open ? "flex items-center justify-center mx-10 border border-white rounded" : `border-none`}>
                      <span onClick={()=>setOpen(true)} className={open ? 'invisible disabled' :`font-bold text-base cursor-pointer`}>
                          Search...
                      </span>

                            </div>
                        </div>
                        <div className={`hidden lg:flex md:flex-col lg:items-center lg:mt-5  lg:gap-5`}>
                            <div className="flex justify-center space-x-5 text-white">
                                {(user?.isEmployee || user?.isAdmin) && <Link href="/admin" passHref>
                                    <span className="cursor-pointer border border-white rounded py-1 px-2">Admin</span>
                                </Link>}
                                {session && <span className="py-1 px-2">👋 Hallo {session.firstName}</span>}
                            </div>
                            <div className={`flex items-center space-x-5`}>

                                <Link href={`/shop/favorites`} passHref>
                                    <div className={`flex relative cursor-pointer`}>
                                        <HeartIcon  className={`h-6 w-6 text-white`}/>
                                        <span className={`flex items-center justify-center absolute -top-3 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-sm font-bold`}>
                            {favorites?.items?.length || 0}
                         </span>
                                    </div>
                                </Link>
                                <Link href={`/cart/${cart?._id}`} passHref>
                                    <div className={`flex relative ml-1 cursor-pointer`}>
                                        <ShoppingCartIcon  className={`h-6 w-6 text-white`}/>
                                        <span className={`flex items-center justify-center absolute -top-3 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-sm font-bold`}>
                              {cart && cart?.items?.length || 0}
                          </span>
                                    </div>
                                </Link>

                            </div>


                        </div>
                        <div className='space-y-1 lg:hidden cursor-pointer z-20' onClick={()=>setActive(!active)}>
                            <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                            <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                            <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                        </div>
                        <ul className={`${!active && 'hidden'} bg-[#1980b5] bg-opacity-80 absolute left-0 top-0 w-full p-10 rounded-b space-y-5 text-white text-center uppercase font-bold`}>
                            <li  onClick={()=>handleClick("/")}>Home</li>
                            <li  onClick={()=>handleClick("/learn")}>Leren Duiken</li>
                            <li onClick={()=>handleClick("/shop")}>Winkel</li>
                            <li  onClick={()=>handleClick("/overons")}>Over Ons</li>
                            <li  onClick={()=>handleClick("/faq")}>FAQ&apos;s</li>
                            <li  onClick={()=>handleClick("/rental")}>Te Huur</li>
                            <li  onClick={()=>handleClick("/service")}>Onderhoud</li>
                            <li  onClick={()=>handleClick(`/shop/favorites`)}>{`WishList:`}{'  '}{favorites?.items?.length || 0}</li>
                            <li  onClick={()=>handleClick(`/cart/${cart?._id}`)}>{`Cart:`}{' '}{cart && cart?.items?.length || 0}</li>
                            {(user?.isEmployee || user?.isAdmin) &&
                                <li onClick={() => handleClick("/admin")}>Admin</li>
                            }
                            {!session?.user ?
                                <li onClick={() => handleClick("/login")}>Inloggen/Registeren</li> :
                                <li onClick={handleLogOut}>Uitloggen</li>
                            }


                        </ul>
                    </div>
                </div>
            );
        };

        export default Navbar;

        router.push('/login')
    }
    const handleClick = (data) => {
        if(active){
            setActive(!active)
            router.push(data)
        }else{
            router.push(data)
        }

    }
    const handleLogOut = () => {
        signOut()
    }

    return (
        <div className={`flex h-24 sm:h-36 sticky pb-8   bg-gradient-to-b from-[#1980b5] to-[rgba(25,128,180,0.3)]  z-40`}>
            <SearchBar open={open} setOpen={setOpen}/>
            <div className="flex items-center  h-full w-full justify-between mx-5">
                <div className={`flex pt-5`}>
                    <Image src={logo} alt={``} layout={`intrinsic`} objectFit={`contain`}/>

                </div>
                <div className="hidden lg:flex flex-col gap-2 mt-2 text-white">

                    <div className="flex justify-around">
                        {(user?.isEmployee || user?.isAdmin) && <Link href="/admin" passHref>
                            <span className="cursor-pointer border border-white rounded py-1 px-2">Admin</span>
                        </Link>}
                        {session && <span className="py-1 px-2">👋 Dag {session.firstName}</span>}
                    </div>
                    <ul className="flex items-center gap-4 text-white ">
                        <Link href="/" passHref>
                            <li  className="text-center cursor-pointer font-semibold">Home</li>
                        </Link>
                        <Link href="/learn" passHref>
                            <li className="text-center cursor-pointer font-semibold">Learn to Dive</li>
                        </Link>
                        <Link href="/shop" passHref>
                            <li className="text-center cursor-pointer font-semibold">Shop</li>
                        </Link>
                        <Link href="/overons" passHref>
                            <li className="text-center cursor-pointer font-semibold">Over Ons</li>
                        </Link>
                        <Link href="/faq" passHref>
                            <li className="text-center cursor-pointer font-semibold">FAQ&apos;s</li>
                        </Link>
                        <Link href="/rental" passHref>
                            <li className="text-center cursor-pointer font-semibold">Rentals</li>
                        </Link>
                        <Link href="/service" passHref>
                            <li className="text-center cursor-pointer font-semibold">Service</li>
                        </Link>
                        {!session?.user ?
                            <li onClick={()=>handleClick('/login')} className="text-center cursor-pointer font-semibold">Login/Register</li> :
                            <li   onClick={handleLogOut} className="text-center cursor-pointer font-semibold">Logout</li>

                        }


                    </ul>

                    <div className={!open ? "flex items-center justify-center mx-10 border border-white rounded" : `border-none`}>
                      <span onClick={()=>setOpen(true)} className={open ? 'invisible disabled' :`font-bold text-base cursor-pointer`}>
                          Search...
                      </span>

                    </div>
                </div>
                <div className={`hidden lg:flex md:flex-col lg:items-center lg:mt-5  lg:gap-2`}>
                    <div className={`flex items-center gap-2`}>
                        <Facebook   style={{color: "#c8f5ff"}}/>
                        <Twitter   style={{color: "#c8f5ff"}}/>
                        <Youtube    style={{color: "#c8f5ff"}}/>
                        <Link href={`/shop/favorites`} passHref>
                            <div className={`flex relative cursor-pointer`}>
                                <HeartIcon  className={`h-6 w-6 text-white`}/>
                                <span className={`flex items-center justify-center absolute -top-3 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-sm font-bold`}>
                            {favorites?.items?.length || 0}
                         </span>
                            </div>
                        </Link>
                        <Link href={`/cart/${cart?._id}`} passHref>
                            <div className={`flex relative ml-1 cursor-pointer`}>
                                <ShoppingCartIcon  className={`h-6 w-6 text-white`}/>
                                <span className={`flex items-center justify-center absolute -top-3 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-sm font-bold`}>
                              {cart && cart?.items?.length || 0}
                          </span>
                            </div>
                        </Link>

                    </div>
                    <span className={`text-white font-semibold`}>+31 (0)88 00 454 00</span>
                    <span className={`text-white font-semibold`}>info@rngdiving.nl</span>

                </div>
                <div className='space-y-1 lg:hidden cursor-pointer z-20' onClick={()=>setActive(!active)}>
                    <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                    <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                    <div className={`w-6 h-0.5 ${active ? 'bg-white' : 'bg-black'}`}></div>
                </div>
                <ul className={`${!active && 'hidden'} bg-[#1980b5] bg-opacity-80 absolute left-0 top-0 w-full p-10 rounded-b space-y-5 text-white text-center uppercase font-bold`}>
                    <li  onClick={()=>handleClick("/")}>Home</li>
                    <li  onClick={()=>handleClick("/learn")}>Learn to Dive</li>
                    <li onClick={()=>handleClick("/shop")}>Shop</li>
                    <li  onClick={()=>handleClick("/overons")}>Over Ons</li>
                    <li  onClick={()=>handleClick("/faq")}>FAQ&apos;s</li>
                    <li  onClick={()=>handleClick("/rental")}>Rentals</li>
                    <li  onClick={()=>handleClick("/service")}>Service</li>
                    <li  onClick={()=>handleClick(`/shop/favorites`)}>{`WishList:`}{'  '}{favorites?.items?.length || 0}</li>
                    <li  onClick={()=>handleClick(`/cart/${cart?._id}`)}>{`Cart:`}{' '}{cart && cart?.items?.length || 0}</li>
                    {(user?.isEmployee || user?.isAdmin) &&
                        <li onClick={() => handleClick("/admin")}>Admin</li>
                    }
                    {!session?.user ?
                        <li onClick={() => handleClick("/login")}>Login/Register</li> :
                        <li onClick={handleLogOut}>Logout</li>
                    }


                </ul>
            </div>
        </div>
    );
};

export default Navbar;
