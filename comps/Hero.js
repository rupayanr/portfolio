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
            <div className='md:flex w-100% bg-primary md:h-30rem xs:flex-col items-center'>
                <div className='h-96 p-10 md:ml-16 flex flex-col xs:w-full  md:w-2/3 justify-evenly md:items-start xs:items-center md:items-start'>
                    <div className='flex items-start justify-start h-40'>
                        <p className='font-poppins text-primary-dark h-30 text-5xl md:text-mid font-bold'>
                            App
                        </p>
                    </div>

                    <div className='flex items-start justify-start h-40'>
                        <p className='font-poppins text-primary-dark h-30 text-5xl md:text-mid font-bold'>
                            Design &
                        </p>
                    </div>
                    <div className='flex items-start justify-start h-40'>
                        <p className='font-poppins text-primary-dark h-30 text-5xl md:text-mid font-bold'>
                            Development
                        </p>
                    </div>


                </div>

            </div>

            <Projects />
            {/* <Footer /> */}
        </>
    )
}
