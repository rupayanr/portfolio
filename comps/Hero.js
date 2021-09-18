
import arrow from '../public/Arrow.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Projects from './Projects'
import { ArrowDown, GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

export default function Hero() {

    const socials = [
        { icon: <GitHub color='#e5e5de' />, link: 'https://github.com/rupayanr' },
        { icon: <Linkedin color='#e5e5de' />, link: 'https://www.linkedin.com/in/rupayan-roy/' },
        // { icon: <Twitter color='#e5e5de' />, link: '' },
        // { icon: <Instagram color='#e5e5de' /> },
    ]

    const handleRedirect = (link) => {
        window.open(link)
    }

    return (
        <>
            <Navbar />
            <div className='flex w-screen bg-primary'>
                <div className='ml-10 flex flex-col w-2/3 '>

                    <p className='font-poppins text-primary-dark text-big h-21'>
                        software
                    </p>

                    <p className='font-poppins text-primary-dark text-big h-25'>
                        developer
                    </p>

                </div>

                <div className='flex flex-col justify-center items-center w-1/3'>
                    <div className='flex flex-col justify-around items-center h-2/4 '>
                        {socials.map((item, key) => {
                            const { icon, link } = item

                            return (<>
                                <button onClick={() => handleRedirect(link)}>
                                    {icon}
                                </button>
                            </>
                            )
                        })}
                        <ArrowDown className='animate-bounce' color='#e5e5de' size={30} />
                    </div>


                </div>

            </div>

            <Projects />
            <Footer />
        </>
    )
}
