import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ search, setSearch, handleSearchClick }) {
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(prev => !prev);

  return (
    <div className="flex items-center justify-start w-[250px] max-w-md overflow-hidden">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={`flex items-center bg-white border border-gray-300 shadow-md rounded-full px-4 py-2 ${
          open ? 'w-[250px]' : 'w-[50px] , h-[50px] , overflow-hidden '
        }`}
      >
        <button
          onClick={toggle}
          className="text-gray-600 text-xl focus:outline-none"
        >
          <FaSearch />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="input-group"
              className="flex items-center ml-3 gap-3 flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search news..."
                className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 w-full"
              />
              <button
                onClick={handleSearchClick}
                className="bg-[#fd5168] hover:bg-[#e13b55] text-white px-3 py-2 rounded-md text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform cursor-pointer"
              >
                Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}