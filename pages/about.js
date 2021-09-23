import Link from 'next/link'

export default function about() {
    const options = [
        { name: 'Hire Me', link: 'https://github.com/rupayanr' },
        { name: 'Contact Me', link: 'https://www.linkedin.com/in/rupayan-roy/' },

    ]

    const handleRedirect = (link) => {
        window.open(link)
    }


    return (
        <div className="w-screen h-screen bg-primary flex-col overflow-hidden">
            <div className='p-10 flex'>
                <p className='font-logotext text-2xl text-primary-dark flex-1 tracking-widest z-10 ml-12'>
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

            <div className='flex '>
                <div className='flex flex-col items-start justify-evenly h-40rem p-10 ml-12 -mt-12 w-2/5'>
                    <Link href='/'>
                        <a>
                            <p className='options-dark '>
                                about
                            </p>
                        </a>
                    </Link>

                    <div className='w-96 h-96 border-2 border-primary-dark z-10 p-4 flex items-end justify-end' >

                    </div>
                </div>

                <div className='flex flex-col h-40rem items-start justify-center p-10 w-2/4'>
                    <div className='h-1/5'>
                        <p className='content'>
                            Hi netizen, I am <b>Rupayan Roy</b> a software developer from <b>India</b>. Services I provide:

                        </p>
                    </div>
                    <div className='h-2/6 ml-5'>
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
                                    <button onClick={() => handleRedirect(link)}>
                                        <a className='text-xl underline text-primary-dark'>{name}</a>
                                    </button>
                                </>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}
