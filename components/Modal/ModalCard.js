import Modal from "./Modal"


const ModalCard = ({ setShowModal, showModal, children }) => {
  return (
   <>

       <Modal showModal={showModal}>

         <div className=" flex flex-col  max-w-fit bg-white rounded-md px-10 py-5 mt-8 relative">
           <div className="relative w-full"><span className={`absolute h-8 w-8  flex justify-center rounded-full border-2 border-white  -right-10 -top-14 font-bold cursor-pointer text-lg`}
                                                        onClick={() => setShowModal(false)}
           >
        <span className='text-white'>X</span>
       </span>
           </div>
            <div className='flex w-full h-full'>
                {children}
            </div>
         </div>
       </Modal>

   </>
  )
}

export default ModalCard
