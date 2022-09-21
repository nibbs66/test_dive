import React from 'react';
import {ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
const Message = ({messages}) => {
    console.log(messages)
    return (
      <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-lg leading-6 text-slate-500 uppercase">{messages.subject}</h3>

              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Naam</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.fullName}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Email </dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.email}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Telefoon</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.phone}</dd>
                      </div>

                      {messages.regarding && <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Regarding</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.regarding}</dd>
                      </div>}
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Message</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">
                              {messages.message}
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
         <div className={`flex justify-between my-5 gap-5 text-white uppercase font-bold px-10`}>
             <Link href={`/admin/messages`}>
             <button className={`flex items-center justify-center  bg-red-500 hover:bg-red-700 px-4 py-2 uppercase rounded`}>
             <ChevronLeftIcon className={`h-4 w-4`}/>
                 Terug
             </button>
             </Link>
             <button className={`bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded uppercase`}>Reply</button>
             <button className={`bg-red-500 hover:bg-red-700 px-4 py-2 uppercase rounded`}>Delete</button>
         </div>
      </div>
    );
};

export default Message;
