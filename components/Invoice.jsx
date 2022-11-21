import React from 'react';
import logo from '../public/img/headerlogo.svg'
import Image from 'next/image'
const Invoice = () => {
    return (
        <div id='pdf' className='h-full flex flex-col  md:w-4/5 mt-5 pt-20 px-20'>


            <div className='flex flex-col md:flex-row items-center  justify-between  md:w-full  mt-8 text-black rounded-md bg-white md:bg-gradient-to-b from-red-300    p-5'>
                <div className='flex  items-center gap-3'>
                    <Image className='hidden'  src={logo} alt="" layout='intrinsic' height={50} objectFit='contain'/>
                </div>
                <div className='flex flex-col font-semibold text-xs lg:text-base text-gray-600'>
                    <span>monkeByte Web Development</span>
                    <span>Prinses van Lotharingenstraat 13</span>
                    <span>4854 EW Bavel</span>
                    <span>06-83151916</span>
                    <span></span>
                    <span>BTW: NL004261831B13</span>
                    <span>KVK: 86507648</span>
                </div>
            </div>
            <h1 className='font-bold md:text-3xl mt-8 text-center  text-gray-500'>FACTUUR</h1>
            <div className='flex flex-col gap-3 md:flex-row items-center md:items-start justify-between w-full px-20 mt-8 '>
                <div className='flex flex-col text-xs  md:text-base text-gray-500'>
                    <span>Customer: de Mobiele Slager</span>
                    <span>Customer Id: </span>
                    <span>Addres: Bredaseweg 43</span>
                    <span>Stad: 4861 AJ Chaam</span>
                    <span>Telefoon: 06-41280374</span>
                    <span>Email: mobiele@gmail.com</span>
                </div>
                <div className='flex flex-col  text-xs  md:text-base text-gray-500'>
                    <span>Factuur nr: 101</span>
                    <span>Medewerker:  Chris McNabb</span>
                </div>
            </div>
            <div className="flex overflow-x-auto relative  mt-8 items-center justify-items-center">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="py-3 px-6">
                            St.
                        </th>

                        <th scope="col" className="py-3 px-6">
                            Artikel Omschrijving
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Prijs per stuk
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Korting
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Prijs
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b-4 dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>

                        <td className="py-4 px-6">
                            Web App & Admin Site
                        </td>
                        <td className="py-4 px-6">
                            €250.00
                        </td>
                        <td className="py-4 px-6">
                            €0.00
                        </td>
                        <td className="py-4 px-6">
                            €250.00
                        </td>
                    </tr>
                    <tr className="bg-white border-b-4 dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>

                        <td className="py-4 px-6">
                            Service 1 jaar
                        </td>
                        <td className="py-4 px-6">
                            €0.00
                        </td>
                        <td className="py-4 px-6">
                            €0.00
                        </td>
                        <td className="py-4 px-6">
                            €0.00
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div className='flex flex-col gap-2 justify-end  mt-2 text-gray-500'>
                <div className='flex items-center gap-3 justify-end'>
                    <span  className='font-bold'>Subtotaal ex BTW:</span>
                    <span>€{(250/1.21).toFixed(2)}</span>
                </div>
                <div className='flex items-center gap-3 justify-end'>
                    <span  className='font-bold'>21% BTW:</span>
                    <span>€43.39</span>
                </div>
                <div className='flex items-center gap-3 justify-end'>
                    <span  className='font-bold'>Totaal incl. BTW:</span>
                    <span>€250.00</span>
                </div>

            </div>
            <div className='flex flex-col gap-2 my-6 mx-8 text-gray-500'>
                <span className='flex text-xl font-semibold'>Factuur en betalingsvoorwaarden.</span>
                <p className='flex text-sm'>
                    Alle Vergoedingen voor Gekochte Diensten zijn verschuldigd en
                    betaalbaar voorafgaand aan de Abonnementsperiode of andere aanvang van de Diensten, of anderszins
                    in overeenstemming met de betalingsvoorwaarden uiteengezet in de respectieve Bestelling. Voor betalingen aan
                    MonkeByte Web Development per creditcard, ideal of PayPal zal het Bedrijf nauwkeurige betaalkaartinformatie
                    verstrekken, en het Bedrijf machtigt MonkeByte Web Development hierbij om een ​​dergelijke creditcard,
                    ideal of PayPal in rekening te brengen voor alle Vergoedingen die verschuldigd zijn onder de respectieve
                    Bestelling, inclusief de initiële Abonnementstermijn en elke verlenging daarvan. Als het Bedrijf een
                    niet-automatische betalingsmethode kiest, zal het Bedrijf alle Vergoedingen betalen via ideal, creditcard
                    of PayPal op de manier die is gespecificeerd in de toepasselijke Bestelling binnen dertig (30) dagen na de
                    datum van de toepasselijke factuur voor de Gekochte Diensten of binnen dergelijke periode zoals anders
                    gespecificeerd in de toepasselijke Order. Het bedrijf wordt geadviseerd om facturen zorgvuldig te controleren
                    en monnikeByte Web Development onmiddellijk op de hoogte te stellen van eventuele factuurverschillen.                       </p>
            </div>
            <footer className='flex items-center justify-between w-full border-t-2 py-5 text-gray-400'>
                <span >+31 06 8315 1916</span>
                <span>www.rngdiving.nl</span>

            </footer>


        </div>

    );
};

export default Invoice;
