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
            <div className='md:flex w-100% bg-primary  md:h-30rem xs:flex-col items-center mt-10'>
                <div className='h-96 p-10 md:ml-16 flex flex-col xs:w-full  md:w-2/3 justify-around md:items-start xs:items-center '>
                    <div className='flex items-start justify-start xs:h-304 md:h-40'>
                        <p className='font-poppins text-primary-dark text-6xl md:text-mid font-bold'>
                            Freelance
                        </p>
                    </div>

                    <div className='flex items-start justify-start  xs:h-26 md:h-40'>
                        <p className='font-poppins text-primary-dark h-30 text-6xl md:text-mid font-bold'>
                            Designer &
                        </p>
                    </div>
                    <div className='flex items-start justify-start  xs:h-24 md:h-40'>
                        <p className='font-poppins text-primary-dark h-30 text-6xl md:text-mid font-bold'>
                            Developer
                        </p>
                    </div>


                </div>

            </div>

            <Projects />
            {/* <Footer /> */}
        </>
    )
}
