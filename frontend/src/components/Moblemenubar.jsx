import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import menuAnim from '../images/lottieflow-menu-nav-11-1-000000-easey.json';
import SearchBar from './Searchbar';

export default function MobileMenuBar() {
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
                className={`z-[2000] w-[25px] h-[25px] p-0 bg-transparent border-none cursor-pointer transition-transform duration-500 ${isOpen ? 'rotate-[90deg]' : 'rotate-0'
                    } xl:hidden lg:hidden block`}
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
                <div className="fixed top-0 w-full h-[60%] z-[999] bg-white border border-[#38383822] shadow-lg shadow-[#dc959e42] p-8 flex flex-col gap-8 transition-all duration-300">
                    <ul className="flex flex-col space-y-4 font-medium text-black md:text-xl text-md mt-14">
                        <li className="relative inline-flex items-center transition-all duration-300 group hover:text-[#fd5168]
              after:absolute after:bottom-[-2px] after:left-1/20  after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-[80px] after:bg-[#fd5168] after:transition-all after:duration-500">
                            All News
                        </li>
                        <li className="relative inline-flex items-center gap-2 mt-1 transition-all duration-300 group hover:text-[#fd5168]
              after:absolute after:bottom-[-2px] after:left-1/20 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-[80px] after:bg-[#fd5168] after:transition-all after:duration-500">
                            Trending
                        </li>
                    </ul>

                    <SearchBar />

                    {/* Social Icons */}
                    <div className="gap-8 justify-start items-center flex gap-6 justify-start items-senter">
                        <i className="fa-brands fa-facebook-f text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                        <i className="fa-brands fa-instagram text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                        <i className="fa-brands fa-twitter text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                        <i className="fa-brands fa-linkedin-in text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
                    </div>
                </div>
            )}
        </>
    );
}
