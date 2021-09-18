import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'react-feather'

export default function Navbar() {



    return (
        <nav>
            <div className='flex bg-primary p-10'>

                <>
                    <p className='font-logotext text-2xl text-primary-dark flex-1 tracking-widest z-10'>
                        rupayan roy
                        <br></br>
                        devfolio

                    </p>
                    <Link href='/menu'>
                        <a>
                            {/* <h3 className='cursor-pointer font-poppins-thin text-4xl text-primary-dark tracking-widest z-10'>
                                menu
                            </h3> */}
                            <Menu className='text-primary-dark' size={30} />
                        </a>
                    </Link>
                </>


            </div>
        </nav>
    )
}
