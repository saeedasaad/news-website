import React from "react";

export default function Card({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-600 mt-8">No news articles found.</p>;
  }

  const limitedData = data.slice(0, 15);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 w-[90%] mx-auto mt-14">
      {limitedData.map((curitem, index) => {
        if (!curitem.urlToImage) return null;

        return (
          <div
            key={index}
            className="relative p-4 bg-white border border-[#38383822] hover:shadow-lg shadow-[#dc959e42]"
          >
            <div className="relative overflow-hidden group item-wrapper">
              <div className="shine-effect">
                <img
                  src={curitem.urlToImage || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt={curitem.title}
                  className="w-full h-[350px] object-cover"
                />
              </div>

              <a href={curitem.url} target="_blank" rel="noopener noreferrer">
                <h2 className="absolute bottom-0 left-0 w-full bg-white text-gray-800 font-extrabold text-lg md:text-xl px-4 py-2 backdrop-blur-sm transition-all duration-300 group-hover:bg-white">
                  {curitem.title}
                </h2>
              </a>
            </div>

            <hr className="bg-[#fd5168] w-[100px] h-[2px] my-8 border-none" />

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed">
              {curitem.description || "No description available."}
            </p>

            <a
              href={curitem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 mt-4 text-[#fd5168] font-medium transition-all duration-300 group hover:text-[#fd5168]
              after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#fd5168] after:transition-all after:duration-500"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Read More
              </span>
              <i className="fa-solid fa-arrow-right transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        );
      })}
    </div>
  );
}