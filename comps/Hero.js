import Image from 'next/image'
import arrow from '../public/down.svg'
import Navbar from './Navbar'
import Footer from './Footer'
import Projects from './Projects'


export default function Hero() {



    const handleRedirect = (link) => {
        window.open(link)
    }

    return (
        <>
            <Navbar />
            <div className='md:flex w-100% bg-primary md:h-big xs:flex-col '>
                <div className=' p-10 md:ml-16 flex flex-col xs:w-full  md:w-2/3 justify-center md:items-start items-start'>

                    <p className='font-poppins text-primary-dark h-40 text-6xl md:text-mid lg:text-big'>
                        software
                    </p>

                    <p className='font-poppins text-primary-dark h-40 text-6xl md:text-mid lg:text-big'>
                        developer
                    </p>


                </div>

                <div className='flex xs:w-full  justify-center items-center'>
                    <Image className='animate-bounce ' src={arrow} alt='arrow image' />
                </div>



            </div>

            <Projects />
            <Footer />
        </>
    )
}
