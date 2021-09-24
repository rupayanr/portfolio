import Link from 'next/link'

export default function about() {
    const options = [
        { name: 'Hire Me', link: 'https://www.linkedin.com/in/rupayan-roy/' },
        { name: 'Contact Me', link: '/contact' },

    ]

    const handleRedirect = (link) => {
        window.open(link)
    }


    return (
        <div className="w-screen h-4/5 bg-primary flex-col md:overflow-hidden">
            <div className='p-10 flex'>
                <p className='font-logotext text-2xl text-primary-dark flex-1 tracking-widest z-10 md:ml-16 ml-2'>
                    rupayan roy
                    <br></br>


                </p>
                <Link href='/'>
                    <a>
                        {/* <X className='text-primary mr-2' size={40} /> */}
                        <h3 className='font-logotext text-2xl text-primary-dark tracking-widest z-10 mr-2' >
                            close
                        </h3>
                    </a>
                </Link>

            </div>

            <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col items-start justify-evenly h-40rem p-10 md:ml-12 -mt-12 w:full md:w-2/5'>
                    <Link href='/'>
                        <a>
                            <p className='options-dark '>
                                about
                            </p>
                        </a>
                    </Link>

                    <div className='w-80 md:w-96 h-96 border-2 border-primary-dark z-10 p-4 flex items-end justify-end' >

                    </div>
                </div>

                <div className='flex flex-col  items-start xs:justify-start md:justify-center p-10 xs:w-full md:w-2/4'>
                    <div className='h-1/3'>
                        <p className='content'>
                            Hi netizen, I am <b>Rupayan Roy</b> a software developer from <b>India</b>. Services I provide:

                        </p>
                    </div>
                    <div className='h-48 ml-5 flex flex-col justify-around'>
                        <p className='content-italic'>

                            <ul className='list-disc'>
                                <li>Landing page</li>
                                <li>Application design & development</li>
                                <li>Online store</li>
                                <li>Technical content writing</li>
                            </ul>

                        </p>
                    </div>
                    <div className='flex justify-around items-start w-80 -ml-5'>
                        {options.map((item, key) => {
                            const { name, link } = item

                            return (
                                <>
                                    <button key={key}>
                                        <a href={link} className='text-2xl underline text-primary-dark'>{name}</a>
                                    </button>
                                </>
                            )
                        })}
                    </div>

                </div>


            </div>


            <div className='flex items-center justify-center w-full h-20 border-t-2 border-primary-dark' >
                <div className='flex'>
                    <h3 className='text-primary-dark font-logotext tracking-widest'>
                        Copyright 2021 - Rupayan Roy
                    </h3>
                </div>

            </div>
        </div>
    )
}
