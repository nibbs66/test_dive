

const Modal = ({children, showModal}) => {

  return (


      <>
        {showModal && <div className="flex  items-center justify-center h-screen w-screen top-0 left-0 right-0 fixed bg-black/50 z-50">
            {children}
        </div>}
      </>


  )
}

export default Modal
