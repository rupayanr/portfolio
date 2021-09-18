
import Link from "next/link"
import { X } from "react-feather";

export default function Menu() {
    return (

        <div className="w-screen h-screen bg-primary-dark flex-col overflow-hidden">

            <div className='p-10 flex'>
                <p className='font-logotext text-2xl text-primary flex-1 tracking-widest z-10'>
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

            <div className='flex flex-col w-5/6 items-start ml-10'>
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

        </div>

    )
}
