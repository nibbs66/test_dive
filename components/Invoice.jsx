import React from 'react';

import Image from 'next/image'
import {format, startOfToday} from "date-fns";
import useEmployee from '../pages/api/hooks/useEmployee'
import logo from '../public/img/headerlogo.svg'
const Invoice = ({children, sale, naam, empFirst, empLast}) => {
    const today = startOfToday()
    console.log(today)
    const {user} = useEmployee()
    console.log(empFirst)
    return (
        <div className={`m-auto drop-shadow-lg bg-white h-a4 w-a4 p-8`}>
            <div className={`grid grid-cols-3 gap-4`}>
                <div className={`flex flex-col gap-5 text-slate-400`}>
                    <Image src={logo} layout={`intrinsic`}/>
                    <span className={`text-sm`}>Naam: {naam}</span>
                    <span className={`text-sm`}>Email: {sale.email}</span>
                    <span className={`text-sm`}>Telefoon: {sale.phone}</span>
                </div>
                <div className={`relative flex flex-col items-center justify-center uppercase font-bold text-2xl text-slate-500`}>
                    <span className={`relative`}>Factuur</span>
                    {sale?.amountPaid - sale?.total === 0 && <span className={`absolute text-green-500 opacity-50 -rotate-45 text-6xl`}>Paid</span>}
                </div>

                <div className={`flex flex-col text-sm gap-2 text-slate-400`}>
                    <div className={`flex flex-col`}>
                        <span>RnG Diving</span>
                        <span>Teteringsedijk 275</span>
                        <span>4817 ME Breda</span>
                    </div>
                    <div className={`flex flex-col`}>
                        <span>086-0045400</span>
                        <span>info@rngdiving.nl</span>

                    </div>
                    <div className={`flex flex-col`}>
                        <span>BTW: NL001672291B71</span>
                        <span>KvK: 20111357</span>

                    </div>
                    <div className={`flex flex-col`}>
                        <span>Bank: NL77RABO0188920137</span>
                    </div>
                </div>
            </div>
            <div className={`flex justify-around my-5 py-2 border-t border-t-slate-400 border-b border-b-slate-400`}>
                <div className={`grid grid-cols-2  text-slate-400 text-sm`}>
                    <span>Factuur nr:</span>
                    <span className={`pl-5`}>822</span>
                    <span>Datum:</span>
                    <span  className={`pl-5`}>{format(today, 'd MMM yyyy')}</span>
                </div>
                <div className={` text-slate-400 text-sm`}>
                    <span>Medewerker: {empFirst+' '+empLast}</span>
                </div>
            </div>

            {children}
            <div className={`text-slate-400`}>
                <div className={`ml-5 my-8`}>Betaald per pin:</div>
                <p className={`mx-5`}>
                    Alle door RnG Diving Services geleverde zaken blijven eigendom van RnG Diving Services tot op het moment dat koper
                    bolledig heeft voldaan aan al zijn betalingsverplichtingn jegens RnG Diving Services uit hoofde van enige met RnG Diving
                    Services gesloten overeenkomst tot het leveren van zaken of het verrichten van werkzaamheden of diensten, vorderingen
                    terzake van het tekortschieten in de nakoming van een dergelijke overeenkomst daaronder begepen.
                </p>
            </div>
            <footer className={`mt-2 border-t border-t-slate-400  mx-5 px-10 text-slate-400`}>
                <div  className={`flex justify-between items-bottom mt-2`}>
                    <span >+31 (0)88 00 454 00</span>
                    <span>www.rngdiving.nl</span>
                </div>
            </footer>
        </div>
    );
};

export default Invoice;

