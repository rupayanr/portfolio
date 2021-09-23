import Link from 'next/link'
import Image from 'next/image'
import cryptic from '../public/cryptic 2.svg'
import aps from '../public/aps.svg'
import cryptic_mob from '../public/cryptic_mob.svg'
import passone from '../public/passone.svg'
import ikkat from '../public/ikkatHome.svg'
import ikkat_alt from '../public/ikkat.svg'
import { motion } from 'framer-motion'

export default function Projects() {

    const projects = [

        { num: '1.', title: 'cryptic', type: 'chat system', svg: cryptic_mob, link: 'https://github.com/rupayanr/Cryptic' },

        { num: '2.', title: 'passone', type: 'password manager', svg: passone, link: 'https://github.com/rupayanr/Passone' },

        { num: '3.', title: 'skillup', type: 'ed-tech portal', svg: cryptic, link: 'https://github.com/rupayanr/e-learning' },

        { num: '4.', title: 'ikkatstore', type: 'e-commerce', svg: ikkat_alt, link: 'https://ikkatstore.com/' },

        { num: '5.', title: 'associated power systems', type: 'landing page', svg: aps, link: 'https://associatedpowersystems.com/' }

    ]



    return (
        <div className='flex flex-col p-10 md:ml-16 bg-primary w-screen md:w-4/5'>
            <motion.div

                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ ease: 'easeInOut', delay: 0.8, duration: 1 }}
            >
                <h3 className='  text-3xl tracking-widest  text-primary-dark font-logotext '>
                    work
                </h3>
            </motion.div>
            {projects.map((item, key) => {

                const { title, type, svg, link, num } = item

                return (

                    <div className='flex flex-col h-auto w-full project-trigger mt-20' key={key} >

                        <button className='flex items-start'>

                            <a href={link} target="_blank" rel="noreferrer">
                                <p className='text-primary-dark font-poppins text-3xl md:text-6xl text-left'>
                                    {title}
                                </p>
                            </a>


                        </button>
                        <p className='text-gray-200 font-logotext font-thin text-xl mt-5 tracking-widest ml-2' >
                            {type}
                        </p>
                        <div className='w-76 mt-10 border-2 border-primary-dark z-10 p-4 flex flex-col justify-start'>
                            <Image src={svg} alt='' />
                        </div>

                    </div>

                )
            })}

        </div >
    )
}
