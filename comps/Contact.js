import Link from 'next/link'
import { Mail } from 'react-feather'
export default function Contact() {
    return (
        <div className='flex overflow-hidden'>
            <div className='w-2/4 bg-primary h-screen p-10'>
                <div>
                    <p className='font-logotext text-2xl text-primary-dark flex-1 tracking-widest z-10 ml-12'>
                        rupayan roy
                        <br></br>


                    </p>
                </div>

                <div className='p-10 flex flex-col justify-center'>
                    <div className='h-96'>
                        <p className='options-dark'>
                            I'd love to listen to your ideas & collaborate
                        </p>
                    </div>
                    <div>
                        <p className='text-primary-dark font-poppins text-xl '>
                            Please fill the contact form or drop a mail.
                        </p>
                        <button>
                            <div className='flex items-center mt-4'>

                                <Mail color='#e5e5de' size={20} />
                                <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'>rupayan.roy21@gmail.com</p>

                            </div>
                        </button>
                    </div>

                </div>

            </div>



            <div className='w-2/4 bg-primary-dark h-screen'>
                <div className='flex justify-end p-10'>
                    <Link href='/'>
                        <a>
                            {/* <X className='text-primary mr-2' size={40} /> */}
                            <h3 className='font-poppins-thin text-2xl text-primary tracking-widest z-10 mr-2' >
                                close
                            </h3>
                        </a>
                    </Link>
                </div>

                <div className='flex flex-col p-10'>
                    <h3 className='bg-primary-dark font-poppins font-bold text-4xl text-left h-20'>
                        Contact Me
                    </h3>

                    <div className='flex w-full justify-between h-28'>
                        <div className='flex flex-col w-5/12'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                FIRST NAME
                            </h3>
                            <input className='h-10 mt-4'>
                            </input>
                        </div>

                        <div className='flex flex-col w-5/12'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                LAST NAME
                            </h3>
                            <input className='h-10 mt-4'>
                            </input>
                        </div>
                    </div>

                    <div className='flex w-full justify-between h-28'>
                        <div className='flex flex-col w-5/12'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                EMAIL
                            </h3>
                            <input className='h-10 mt-4'>
                            </input>
                        </div>

                        <div className='flex flex-col w-5/12 '>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                PHONE NUMBER
                            </h3>
                            <input className='h-10 mt-4'>
                            </input>
                        </div>




                    </div>
                    <div className='flex w-full justify-between h-32'>
                        <div className='flex flex-col w-full'>
                            <h3 className='font-poppins font-bold text-md tracking-widest'>
                                Message
                            </h3>
                            <input className='h-28 mt-4'>
                            </input>
                        </div>

                    </div>

                    <div className='flex w-1/5 justify-between h-28'>

                        <button>
                            <p className='font-poppins-thin text-2xl text-primary tracking-widest'>
                                Submit
                            </p>

                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
