import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import menuAnim from '../images/lottieflow-menu-nav-11-1-000000-easey.json';

export default function Menubar() {
    const [isOpen, setIsOpen] = useState(false);
    const lottieRef = useRef();

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.goToAndStop(isOpen ? 26 : 0, true);
        }
    }, [isOpen]);

    return (
        <>
            {/* Lottie Menu Icon */}
            <button
                onClick={handleToggle}
                className={`z-[1000] w-[30px] h-[30px]  p-0 bg-transparent border-none cursor-pointer transition-transform duration-500 ${isOpen ? 'rotate-[90deg]' : 'rotate-0'}`}
            >
                <Lottie
                    lottieRef={lottieRef}
                    animationData={menuAnim}
                    loop={false}
                    autoplay={false}
                    className="w-full h-full"
                />
            </button>


            {/* Slide Menu */}
            {isOpen && (
                <div className="fixed top-3 xl:left-34 md:left-28  h-[230px] w-[200px] z-[999] bg-white border-1 border-solid border-[#38383822] shadow-lg shadow-[#dc959e42] p-5 flex flex-col gap-6 transition-all duration-300">
                    <ul className="flex flex-col space-y-6 font-medium text-black text-xl mt-14">
                        <li className="relative inline-flex items-center transition-all duration-300 group hover:text-[#fd5168]
              after:absolute after:bottom-[-1px] after:left-1/4 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-[80px] after:bg-[#fd5168] after:transition-all after:duration-500">All News</li>
                        <li className="relative inline-flex items-center gap-2 mt-1  transition-all duration-300 group hover:text-[#fd5168]
              after:absolute after:bottom-[-1px] after:left-1/4 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-[80px] after:bg-[#fd5168] after:transition-all after:duration-500">Trending</li>
                    </ul>
                </div>
            )}
        </>
    );
}