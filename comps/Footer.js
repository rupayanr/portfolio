import { Smartphone, Mail, Feather } from "react-feather"

export default function Footer() {
    return (
        <div className='flex justify-center items-center bg-primary'>
            <div className='flex w-4/6 h-10'>
                <div className='flex-1'>
                    <button onClick={() => { console.log('call me') }}>
                        <div className='flex items-center'>

                            <Smartphone color='#e5e5de' size={20} />
                            <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'> (+91) - 9566211693</p>

                        </div>
                    </button>
                </div>

                <div className='flex justify-items-end'>
                    <button className='flex-1'>
                        <div className='flex items-center'>

                            <Mail color='#e5e5de' size={20} />
                            <p className='text-primary-dark text-xs italic font-poppins font-extrabold ml-2 tracking-widest'>rupayan.roy21@gmail.com</p>

                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
