import React from 'react';
import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/20/solid'
const ErrorAlert = ({showMessage, setShowMessage, color, check, message, handleNewItems}) => {
    return (
      <>
          {showMessage && <div className={`absolute top-0 left-0 flex justify-center  w-full  h-full bg-black/50  z-50`}>

                      <div className={`  rounded-md   drop-shadow-lg p-10 mt-8 mx-5`}>
                          <div className={`flex bg-white p-10 rounded-md   drop-shadow-lg`}>

                              <div className={`ml-3`}>
                                  <p className={`text-sm font-medium text-${color}-600`}>{message}</p>
                              </div>
                              <div className={`flex space-x-2 ml-auto pl-3`}>
                                  <div className={`flex-shrink-0`}>
                                      <CheckCircleIcon  onClick={handleNewItems} className={`h-5 w-5 text-green-600`} aria-hidden="true"/>
                                  </div>
                                  <div className={`-mx-1.5 -my-1.5`}>
                                      <button
                                          onClick={()=>setShowMessage(!showMessage)}
                                          type="button"
                                          className={`inline-flex rounded-md bg-${color}-50 p-1.5 text-${color}-500 hover:bg-${color}-200 focus:outline-none`}
                                      >
                                          <span className={`sr-only`}>Dismiss</span>
                                          <XCircleIcon className={`h-5 w-5`} aria-hidden="true"/>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>



              </div>}
      </>
    );
};

export default ErrorAlert;
