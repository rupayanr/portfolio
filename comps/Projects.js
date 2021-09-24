import Link from 'next/link'
import Image from 'next/image'
import cryptic from '../public/cryptic 2.svg'
import aps from '../public/aps.svg'
import cryptic_mob from '../public/cryptic_mob.svg'
import passone from '../public/passone.svg'
import ikkat from '../public/ikkatHome.svg'
import ikkat_alt from '../public/ikkat.svg'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Projects() {

    const projects = [

        { num: '1.', title: 'cryptic', type: 'chat system', svg: cryptic, link: 'https://github.com/rupayanr/Cryptic' },

        { num: '2.', title: 'passone', type: 'password manager', svg: passone, link: 'https://github.com/rupayanr/Passone' },

        { num: '3.', title: 'skillup', type: 'ed-tech portal', svg: cryptic, link: 'https://github.com/rupayanr/e-learning' },

        { num: '4.', title: 'ikkatstore', type: 'e-commerce', svg: ikkat_alt, link: 'https://ikkatstore.com/' },

        { num: '5.', title: 'associated power systems', type: 'landing page', svg: aps, link: 'https://associatedpowersystems.com/' }

    ]

    const [show, setShow] = useState(false)

    const [lastYPos, setLastYPos] = useState(20)

    useEffect(() => {

        const handleScroll = () => {
            const yPos = window.scrollY;
            const isScrollingDown = yPos > lastYPos


            if (yPos < 200) {
                setShow(false)
            }
            else {
                setShow(true)
            }
            setLastYPos(yPos)
        }

        window.addEventListener('scroll', handleScroll, false)

        return () => {
            window.addEventListener('scroll', handleScroll, false)
        }

    }, [lastYPos])


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='flex flex-col p-10 md:ml-16 bg-primary w-screen md:w-4/5'>
            <motion.div

                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ ease: 'easeInOut', delay: 0.8, duration: 1 }}
            >
                <h3 className='text-4xl tracking-widest  text-primary-dark font-logotext '>
                    work
                </h3>
            </motion.div>
            {projects.map((item, key) => {

                const { title, type, svg, link, num } = item

                return (

                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={{ x: show ? 0 : '-100vw' }}
                        transition={{ ease: 'easeInOut', duration: 0.7, staggerChildren: 0.5 }}

                        className='flex flex-col h-auto w-full project-trigger mt-20' key={key} >

                        <button className='flex items-start'>

                            <a href={link} target="_blank" rel="noreferrer">
                                <p className='text-primary-dark font-poppins text-4xl md:text-6xl text-left'>
                                    {title}
                                </p>
                            </a>


                        </button>
                        <p className='text-gray-200 font-logotext font-thin text-xl mt-5 tracking-widest ml-2 mb-10' >
                            {type}
                        </p>
                        {/* <div className='w-auto mt-10 border-2 border-primary-dark z-10 p-4 flex flex-col justify-start'> */}
                        <Image src={svg} alt='' />
                        {/* </div> */}

                    </motion.div>

                )
            })}

        </motion.div >
    )
}
