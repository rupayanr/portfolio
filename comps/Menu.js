
import Link from "next/link"
import { X } from "react-feather";
import { ArrowDown, GitHub, Instagram, Linkedin, Twitter } from 'react-feather'
import { motion } from "framer-motion";
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

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}

            className="w-screen h-screen bg-primary-dark flex-col overflow-hidden">

            <div

                className='p-10 h-28 flex'>
                <p className='font-logotext text-2xl text-primary flex-1 tracking-widest z-10 ml-2 md:ml-16'>
                    rupayan roy


                </p>
                <Link href='/'>
                    <a>
                        {/* <X className='text-primary mr-2' size={40} /> */}
                        <h3 className='font-logotext text-2xl md:text-3xl text-primary tracking-widest z-10 md:mr-2' >
                            close
                        </h3>
                    </a>
                </Link>

            </div>
            <div

                className='flex flex-col ml-2 md:flex-row md:ml-16' >

                <div className='flex flex-col xs:w-full md:w-4/6 justify-around items-start p-10'>
                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className='flex items-center justify-center h-28 md:h-40'>
                        <Link href='/'>
                            <a>
                                <p className='bigtext'>
                                    blog
                                </p>
                            </a>
                        </Link>
                    </motion.div>

                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className='flex items-center justify-center h-28 md:h-40'>
                        <Link href='/about'>
                            <a>
                                <p className='bigtext'>
                                    about
                                </p>
                            </a>
                        </Link>
                    </motion.div>
                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className='flex items-center justify-center h-28 md:h-40'>
                        <Link href='/contact'>
                            <a>
                                <p className='bigtext'>
                                    contact
                                </p>
                            </a>
                        </Link>
                    </motion.div>

                </div>

                <motion.div

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className='flex justify-around items-end w-96 p-10 h-44 -ml-4'>
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
                </motion.div>



            </div>



            <div className='flex items-center justify-center w-full h-14 border-t-2 border-primary'>
                <div className='flex'>
                    <h3 className='text-primary font-logotext tracking-widest'>
                        Copyright 2021 - Rupayan Roy
                    </h3>
                </div>

            </div>
        </motion.div>

    )
}
