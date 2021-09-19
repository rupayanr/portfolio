import Link from 'next/link'
import Image from 'next/image'
import cryptic from '../public/cryptic 2.svg'
import aps from '../public/aps.svg'

export default function Projects() {

    const projects = [

        { title: 'cryptic', type: 'chat system', svg: cryptic, link: 'https://github.com/rupayanr/Cryptic' },

        { title: 'passone', type: 'password manager', svg: cryptic, link: 'https://github.com/rupayanr/Passone' },

        { title: 'skillup', type: 'ed-tech portal', svg: cryptic, link: 'https://github.com/rupayanr/e-learning' },

        { title: 'ikkatstore', type: 'e-commerce', svg: cryptic, link: 'https://ikkatstore.com/' },

        { title: 'associated power systems', type: 'landing page', svg: aps, link: 'https://associatedpowersystems.com/' }

    ]



    return (
        <div className='flex flex-col  p-10 bg-primary'>

            {projects.map((item, key) => {

                const { title, type, svg, link } = item

                return (
                    <div className='flex flex-col m-5' key={key}>
                        <button className='flex items-start'>

                            <a href={link} target="_blank" rel="noreferrer">
                                <p className='text-primary-dark font-poppins text-5xl md:text-8xl'>
                                    {title}
                                </p>
                            </a>


                        </button>
                        <p className='text-primary-dark font-poppins text-xl m-5 ml-2 italic' >
                            {type}
                        </p>
                        <div className='flex relative'>
                            <div className='w-3/6 h-96 border-2 border-primary-dark z-10 p-2'>

                            </div>
                            <div className='w-3/6 h-96 border-2 border-primary-dark z-10 absolute left-2 top-2 flex p-4 items-center justify-center' >
                                <Image src={svg} alt="" />
                            </div>

                        </div>

                    </div >
                )
            })}



        </div >
    )
}
