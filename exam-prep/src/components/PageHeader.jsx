import React from 'react'
import { logo } from '@/helper/image';
import { useNavigate } from 'react-router-dom';



function PageHeader() {
    const style = {
        backgroundColor: "#eeeeee",
    };
    let navigate = useNavigate();

    return (
        <>
            {/* Header for small screens */}
            <header
                style={style}
                className="md:hidden fixed l-2 flex w-screen h-20 items-center text-black bg-gray-100"
            >
                <img src={logo} className="w-[50px] h-[50px] m-[15px]" alt="Logo" />
                <div className='ml-auto'>
                    <button className="mx-1" onClick={() => navigate('/')}>H |</button>
                    <button className="mx-1" onClick={() => navigate('/blanko')}>B |</button>
                    <button className="mx-1" onClick={() => navigate('/slido')}>S |</button>
                    <button className="mx-1" onClick={() => navigate('/tetro')}>T |</button>
                </div>
            </header>

            {/* Header for medium and larger screens */}
            <header
                style={style}
                className="hidden md:flex fixed w-screen h-20 items-center text-black bg-gray-100"
            >
                <img src={logo} className="w-[50px] h-[50px] m-[15px]" alt="Logo" />
                <div className='ml-auto'>
                    <button className="mx-2" onClick={() => navigate('/')}>Home</button>
                    <button className="mx-2" onClick={() => navigate('/blanko')}>Blanko</button>
                    <button className="mx-2" onClick={() => navigate('/slido')}>Slido</button>
                    <button className="mx-2" onClick={() => navigate('/tetro')}>Tetro</button>
                </div>

            </header>
        </>
    );
}


export default PageHeader