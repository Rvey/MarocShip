import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

interface UpdateManagerProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void
  manager: string
}

const UpdateManager: React.FC<UpdateManagerProps> = ({ isOpen , setIsOpen , manager}) => {
    
    return (
      <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto bg-gray-700 bg-opacity-50" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-4 text-center ">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                  <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
              </span>
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-700">

                    
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Update Manager {manager}
                      </Dialog.Title>

                      {/* modal body */}
                      <div className="mt-2">
                          <p className="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
                      </div>

                      <div className="mt-4 space-x-2">
                          <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 dark:bg-green-300"
                              onClick={() => setIsOpen(false)}
                          >
                              update
                          </button>
                          <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-red-300"
                              onClick={() => setIsOpen(false)}
                          >
                              delete
                          </button>
                      </div>







                  </div>
              </Transition.Child>
          </div>
      </Dialog>
  </Transition>
    );
}

export default UpdateManager;