import Image from 'next/image'
import arrow from '../public/down.svg'
import Navbar from './Navbar'
import Footer from './Footer'
import Projects from './Projects'
import { motion } from 'framer-motion'

export default function Hero() {



    const handleRedirect = (link) => {
        window.open(link)
    }

    return (<>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            <Navbar />
            <div className='md:flex w-100% bg-primary h-auto xs:flex-col items-center mt-10'>
                <div className=' h-96 md:h-30rem p-10 md:ml-16 flex flex-col xs:w-full  md:w-2/3 justify-around md:items-start xs:items-center '>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}

                        className='flex items-start justify-start  xs:h-26 md:h-30' >
                        <p className='font-poppins text-primary-dark h-30 text-6xl md:text-mid '>
                            Designer.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}

                        className='flex items-start justify-start  xs:h-26 md:h-30' >
                        <p className='font-poppins text-primary-dark h-30 text-6xl md:text-mid '>
                            Developer.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}

                        className='flex items-start justify-start  xs:h-26 md:h-30' >
                        <p className='font-poppins text-primary-dark h-30 text-6xl md:text-mid '>
                            Content Writer.
                        </p>
                    </motion.div>


                </div>

            </div>


        </motion.div>
        <Projects />
        <Footer />
    </>
    )
}
