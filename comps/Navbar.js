import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'react-feather'

export default function Navbar() {

    const socials = [
        { name: "Github", link: 'https://github.com/rupayanr' },
        { name: "Linkedin", link: 'https://www.linkedin.com/in/rupayan-roy/' },

    ]

    return (
        <nav className='h-28 bg-primary'>
            <div className='flex p-10'>


                <p className='font-logotext text-2xl md:text-3xl text-primary-dark flex-1 tracking-widest z-10 md:ml-16 ml-2 '>
                    rupayan roy

                </p>
                <Link href='/menu'>
                    <a>
                        <h3 className=' font-logotext text-2xl md:text-3xl text-primary-dark tracking-widest z-10  md:mr-2' >
                            menu
                        </h3>
                        {/* <Menu className='text-primary-dark' size={30} /> */}
                    </a>
                </Link>



            </div>
        </nav>
    )
}
