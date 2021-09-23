import { Smartphone, Mail, Feather } from "react-feather"

export default function Footer() {
    return (
        <div className='flex justify-between items-center bg-primary p-10 m-14'>

            <div className>
                <button onClick={() => { console.log('call me') }}>
                    <div className='flex items-center'>

                        <Smartphone color='#e5e5de' size={20} />
                        <p className='text-primary-dark text-2xs italic font-poppins font-extrabold ml-2 tracking-widest'> (+91) - 9566211693</p>

                    </div>
                </button>
            </div>

            <div className='flex items-center w-2/4  justify-center'>
                <button>
                    <div className='flex items-center'>

                        <Mail color='#e5e5de' size={20} />
                        <p className='text-primary-dark text-2xs italic font-poppins font-extrabold ml-2 tracking-widest'>rupayan.roy21@gmail.com</p>

                    </div>
                </button>
            </div>

        </div>
    )
}
