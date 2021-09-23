
import Link from "next/link"
import { X } from "react-feather";
import { ArrowDown, GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

export default function Menu() {

    const socials = [
        { name: 'Github', link: 'https://github.com/rupayanr' },
        { name: 'Linkedin', link: 'https://www.linkedin.com/in/rupayan-roy/' },
        { name: 'Twitter', link: 'https://github.com/rupayanr' }

    ]

    const handleRedirect = (link) => {
        window.open(link)
    }

    return (

        <div className="w-screen h-screen bg-primary-dark flex-col overflow-hidden">

            <div className='p-10 h-28 flex'>
                <p className='font-logotext text-2xl text-primary flex-1 tracking-widest z-10 ml-12'>
                    rupayan roy


                </p>
                <Link href='/'>
                    <a>
                        {/* <X className='text-primary mr-2' size={40} /> */}
                        <h3 className='font-logotext text-2xl text-primary tracking-widest z-10 mr-6' >
                            close
                        </h3>
                    </a>
                </Link>

            </div>
            <div className='flex' >

                <div className='flex flex-col w-4/6 items-start ml-12 p-10'>
                    <div className='flex items-center justify-center h-40'>
                        <Link href='/'>
                            <a>
                                <p className='bigtext'>
                                    work
                                </p>
                            </a>
                        </Link>
                    </div>
                    <div className='flex items-center justify-center h-40'>
                        <Link href='/about'>
                            <a>
                                <p className='bigtext'>
                                    about
                                </p>
                            </a>
                        </Link>
                    </div>
                    <div className='flex items-center justify-center h-40'>
                        <Link href='/contact'>
                            <a>
                                <p className='bigtext'>
                                    contact
                                </p>
                            </a>
                        </Link>
                    </div>

                </div>

                <div className='flex justify-around items-end w-96 p-10'>
                    {socials.map((item, key) => {
                        const { name, link } = item

                        return (
                            <>
                                <button onClick={() => handleRedirect(link)}>
                                    <a className='text-2xl underline'>{name}</a>
                                </button>
                            </>
                        )
                    })}
                </div>



            </div>




        </div>

    )
}
