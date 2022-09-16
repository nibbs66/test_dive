import Card from "./Card";

const CardDisplay = ({title, bg, children}) => {
  return (
    <div className='flex mt-16 px-5 flex-wrap justify-evenly'>
        <div className=' relative flex flex-col  rounded-xl drop-shadow-2xl   bg-white py-5'>
            <div
                className={`hidden absolute sm:flex items-center justify-center sm:p-2 md:p-5  lg:p-6  shadow-xl rounded-md text-white left-5 -top-8`}
                style={{backgroundColor: `${bg}`}}
            >
                <span className='uppercase font-bold text-slate-500'>{title}</span>
            </div>
            {children}
            {/*<Card title={title} data={data} bg={bg} box={box}/>*/}
        </div>
    </div>
  )
}

export default CardDisplay
