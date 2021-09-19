
import Link from "next/link"
import { X } from "react-feather";
import { ArrowDown, GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

export default function Menu() {

    const socials = [
        { name: 'Github', link: 'https://github.com/rupayanr' },
        { name: 'Linkedin', link: 'https://www.linkedin.com/in/rupayan-roy/' },

    ]

    const handleRedirect = (link) => {
        window.open(link)
    }

    return (

        <div className="w-screen h-screen bg-primary-dark flex-col overflow-hidden">

            <div className='p-10 flex'>
                <p className='font-logotext text-2xl text-primary flex-1 tracking-widest z-10 ml-12'>
                    rupayan roy
                    <br></br>
                    devfolio

                </p>
                <Link href='/'>
                    <a>
                        <X className='text-primary mr-2' size={40} />
                    </a>
                </Link>

            </div>
            <div className='flex' >

                <div className='flex flex-col w-4/6 items-start ml-12'>
                    <Link href='/'>
                        <a>
                            <p className='bigtext'>
                                work
                            </p>
                        </a>
                    </Link>

                    <Link href='/about'>
                        <a>
                            <p className='bigtext'>
                                about
                            </p>
                        </a>
                    </Link>

                    <Link href='/contact'>
                        <a>
                            <p className='bigtext'>
                                contact
                            </p>
                        </a>
                    </Link>


                </div>

                <div className='flex justify-around items-end w-60'>
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
