import Link from 'next/link'
import { Mail, MapPin, Smartphone } from 'react-feather'
import { motion } from 'framer-motion'



export default function Contact() {
    return (
        <div className='flex flex-col md:flex-row overflow-hidden'>

            <div className='flex flex-col bg-primary w-full md:w-2/4 '>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className='flex p-10'>


                    <p className='font-logotext text-2xl md:text-3xl text-primary-dark flex-1 tracking-widest z-10 md:ml-16 ml-2 '>
                        rupayan roy

                    </p>

                    <Link href='/'>
                        <a>
                            {/* <X className='text-primary mr-2' size={40} /> */}
                            <h3 className='font-logotext text-2xl text-primary-dark tracking-widest z-10 mr-2 md:hidden' >
                                close
                            </h3>
                        </a>
                    </Link>

                </motion.div>


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }} className='p-10 flex flex-col justify-center h-30rem '>
                    <div className='h-72 mt-10'>
                        <p className='options-dark text-4xl md:text-6xl'>
                            I'd love to listen to your ideas & collaborate
                        </p>
                    </div>
                    <div>
                        <p className='text-primary-dark font-poppins text-xl xs:mb-10 md:mb-4'>
                            You can fill the form or hit me up
                        </p>


                    </div>
                    <button>
                        <div className='flex items-center mt-4'>

                            <Mail color='#e5e5de' size={20} />
                            <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'>rupayan.roy21@gmail.com</p>

                        </div>
                    </button>
                    <button>
                        <div className='flex items-center mt-4'>

                            <Smartphone color='#e5e5de' size={20} />
                            <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'>+ 91 - 9566211693</p>

                        </div>
                    </button>
                    <button>
                        <div className='flex items-center mt-4'>

                            <MapPin color='#e5e5de' size={20} />
                            <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'>Chandigarh, India</p>

                        </div>
                    </button>



                </motion.div>
            </div>



            <div className=' xs:w-full md:w-2/4 bg-primary-dark h-screen'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className='flex justify-end p-10'>
                    <Link href='/'>
                        <a>
                            {/* <X className='text-primary mr-2' size={40} /> */}
                            <h3 className='font-logotext text-2xl text-primary tracking-widest z-10 mr-2 hidden md:block' >
                                close
                            </h3>
                        </a>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, staggerChildren: 0.5 }} className='flex flex-col p-10 bg-primary-dark h-screen'>
                    <h3 className='bg-primary-dark font-poppins font-bold text-5xl text-left h-20'>
                        Contact Me
                    </h3>

                    <div className='flex w-full justify-between h-30 flex-col md:flex-row '>
                        <div className='flex flex-col w-full '>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                FUll NAME
                            </h3>
                            <input className='h-10 mb-4 mt-4'>
                            </input>
                        </div>


                    </div>

                    <div className='flex w-full justify-between xs:h-48 md:h-30 flex-col md:flex-row'>
                        <div className='flex flex-col w-full md:w-5/12'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                EMAIL
                            </h3>
                            <input className='h-10 mb-4 mt-4'>
                            </input>
                        </div>

                        <div className='flex flex-col w-full md:w-5/12'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                PHONE NUMBER
                            </h3>
                            <input className='h-10  mb-4 mt-4'>
                            </input>
                        </div>




                    </div>
                    <div className='flex w-full justify-between h-48 flex-col md:flex-row mt-4'>
                        <div className='flex flex-col w-full'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                MESSAGE
                            </h3>
                            <input className='h-28 mt-4'>
                            </input>
                        </div>

                    </div>

                    <div className='flex w-1/5 justify-between h-20'>

                        <button>
                            <p className='font-poppins font-bold text-3xl text-primary tracking-widest'>
                                Submit
                            </p>

                        </button>

                    </div>

                </motion.div>
            </div>
        </div>

    )
}
