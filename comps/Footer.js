import { Smartphone, Mail, Feather } from "react-feather"

export default function Footer() {
    return (
        <div className='bg-primary p-10'>
            <div className='flex w-5/6 h-10 p-5 ml-10'>
                <div className='flex-1'>
                    <button onClick={() => { console.log('call me') }}>
                        <div className='flex items-center'>

                            <Smartphone color='#e5e5de' />
                            <p className='text-primary-dark 2xl italic font-poppins font-extrabold ml-2 tracking-widest'> (+91) - 9566211693</p>

                        </div>
                    </button>
                </div>

                <div className='flex justify-items-end'>
                    <button className='flex-1'>
                        <div className='flex items-center'>

                            <Mail color='#e5e5de' />
                            <p className='text-primary-dark 2xl italic font-poppins font-extrabold ml-2 tracking-widest'>rupayan.roy21@gmail.com</p>

                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
