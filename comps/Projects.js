import Link from 'next/link'
import Image from 'next/image'
import cryptic from '../public/cryptic 2.svg'
import aps from '../public/aps.svg'
import cryptic_mob from '../public/cryptic_mob.PNG'
import passone from '../public/passone.jpeg'
import ikkat from '../public/ikkatHome.png'
import ikkat_alt from '../public/ikkat.svg'


export default function Projects() {

    const projects = [

        { title: 'cryptic', type: 'chat system', svg: cryptic, link: 'https://github.com/rupayanr/Cryptic' },

        { title: 'passone', type: 'password manager', svg: cryptic, link: 'https://github.com/rupayanr/Passone' },

        { title: 'skillup', type: 'ed-tech portal', svg: cryptic, link: 'https://github.com/rupayanr/e-learning' },

        { title: 'ikkatstore', type: 'e-commerce', svg: ikkat_alt, link: 'https://ikkatstore.com/' },

        { title: 'associated power systems', type: 'landing page', svg: aps, link: 'https://associatedpowersystems.com/' }

    ]



    return (
        <div className='flex flex-col p-10 bg-primary'>

            {projects.map((item, key) => {

                const { title, type, svg, link } = item

                return (
                    <div className='flex' key={key}>
                        <div className='flex flex-col m-5 p-10 h-96 w-30rem project-trigger' >

                            <button className='flex items-start'>

                                <a href={link} target="_blank" rel="noreferrer">
                                    <p className='text-primary-dark font-poppins text-5xl md:text-7xl text-left'>
                                        {title}
                                    </p>
                                </a>


                            </button>
                            <p className='text-primary-dark font-poppins text-xl m-5 ml-2 italic' >
                                {type}
                            </p>
                        </div>

                        <div className='flex m-5 p-10 flex-col h-96 items-center items-end justify-end project'>

                            <div className='w-full border-2 border-primary-dark z-10 p-4 flex items-end justify-end' >

                                <div className='w-full'>
                                    <Image src={svg} alt='' />
                                </div>
                            </div>

                        </div>
                    </div>



                )
            })}



        </div >
    )
}
