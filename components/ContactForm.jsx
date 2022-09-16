import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
const ContactForm = () => {
    return (
        <div className={`px-5 `}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-500 sm:text-3xl mb-3">Contact Formulier</h2>
            <div className={`  grid grid-cols-5  gap-6`}>
                <div className="bg-white lg:col-span-2">
                    <div className="">
                        <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="full-name" className="sr-only">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    name="full-name"
                                    id="full-name"
                                    autoComplete="name"
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Naam"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="E-mailadres"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Telefoonnummer"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Bericht"
                                    defaultValue={''}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex uppercase justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Verstuur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={`flex text-slate-400`}>
                    <ClockIcon  className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true"/>
                    <dl className="ml-3">
                        <dd className="r">Maandag: Op afspraak</dd>
                        <dd className="r">Dinsdag: 18:00 - 20:00</dd>
                        <dd className="r">Woensdag: Op afspraak</dd>
                        <dd className="r">Donderdag: 18:00 - 20:00</dd>
                        <dd className="r">Vrijdag: 12:00 - 20:00</dd>
                        <dd className="r">Zaterdag: 10:00 - 17:00</dd>
                        <dd className="r">Zondag : Op afspraak</dd>
                    </dl>

                </div>
                <div className={`flex gap-4 text-slate-500`}>
                    <dl>
                        <div>
                            <dt className="sr-only">Postal address</dt>
                            <dd  className="flex text-slate-400">
                                <MapPinIcon  className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true" />
                                <div  className="ml-3">
                                    <p className={`font-bold`}>RnG Diving</p>
                                    <p>Teteringsedijk 275
                                    </p>
                                    <p>4817 ME Breda
                                    </p>
                                </div>
                            </dd>
                        </div>
                        <div className="mt-6">
                            <dt className="sr-only">Phone number</dt>
                            <dd  className="flex text-slate-400">
                                <PhoneIcon className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true" />
                                <span className="ml-3">+31 (0)88 00 454 00</span>
                            </dd>
                        </div>
                        <div className="mt-3">
                            <dt className="sr-only">Email</dt>
                            <dd  className="flex text-slate-400">
                                <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true" />
                                <span className="ml-3">info@rngdiving.nl</span>
                            </dd>
                        </div>
                    </dl>
                </div>

                <dl>
                    <div>
                        <dt className="sr-only">Postal address</dt>
                        <dd  className="flex text-slate-400">
                            <MapPinIcon  className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true" />
                            <div  className="ml-3">
                                <p className={`font-bold`}>Zwembad de Wisselaar</p>
                                <p>Terheijdenseweg 494

                                </p>
                                <p> 4826 AB Breda
                                </p>
                            </div>
                        </dd>
                    </div>
                    <div className="mt-6">
                        <dt className="sr-only">Phone number</dt>
                        <dd className="flex text-slate-400">
                            <PhoneIcon className="h-6 w-6 flex-shrink-0 text-slate-400" aria-hidden="true" />
                            <span className="ml-3">+31 (0) 117 311</span>
                        </dd>
                    </div>
                </dl>

            </div>

        </div>
    );
};

export default ContactForm;
