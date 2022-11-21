import React from 'react';
import Invoice from "../../../components/Invoice";

const betaal = () => {
    const handlePDF = async (e) => {
        e.preventDefault()
        try{
            const res =  await axios.post(`/api/invoice?id=${query.id}`,{userId: 555})
            console.log(res)
            //res.status === 200 && await router.push(`/api/pdf`)
        }catch(err){
            console.log(err)
        }

    }
    return (
        <>
            <div className="print:hidden">
                <button   className={`absolute top-32 left-16 text-white rounded py-1 px-2 bg-blue-500`}>Download PDF</button>
            </div>
            <Invoice>
                <div className="flex overflow-x-auto relative  mt-8 items-center justify-items-center">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-slate-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <div className='flex flex-col gap-2 justify-end  mt-2 text-gray-500 text-sm'>
                    <div className='flex items-center gap-3 justify-end '>
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
            </Invoice>
        </>
    );
};

export default betaal;
