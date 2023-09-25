
import { Disclosure, Menu, Transition } from '@headlessui/react'
import avatar from "../assets/icons/avatar.png";
import { Fragment } from 'react';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <>
       <Disclosure as="nav" 
       className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white fixed top-0 z-20 w-full">
         <div className='mx-auto  px-2 sm:px-6 lg:px-8'>
          
            <div className="relative flex items-center justify-between ">
              <a className='pr-2 text-2xl font-semibold' href='#'>React Movie App</a>
              <div className="absolute inset-y-0 right-0 flex items-center ">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800">
                    <span className='absolute -inset-1.5'/>
                    <span className='sr-only'>Open user menu</span>
                    <img className='h-8 w-8 rounded-full' src={avatar} alt='user'/>
              
                  </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100 "
                enterFrom="transfrom opacity-0 scale-95"
                enterTo= "transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom=" transform opacity-100 scale-100"
                leaveTo = "opacity-0 transform scale-95"
                >
                  <Menu.Items
                  className="origin-top-right absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white
                  ring-1 ring-black ring-opacity-5  focus:outline-none"
                  >
                    <Menu.Item>
                     {({active})=>(
                      <a
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100': '',
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      >
                        Register
                      </a>
                     ) }
                    </Menu.Item>
                    <Menu.Item>
                     {({active})=>(
                      <a
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100': '',
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      >
                        Login
                      </a>
                     ) }
                    </Menu.Item>
                    <Menu.Item>
                     {({active})=>(
                      <a
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100': '',
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      >
                        Logout
                      </a>
                     ) }
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
          </div>
          </div>
         </div>
           
        </Disclosure>
        <div className='h-[55px]'>

        </div>
        </>
  )
}
