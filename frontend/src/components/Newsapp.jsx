import React, { useEffect, useState } from "react";
import Card from "./Card";
import Menubar from "./Menubar";
import SearchBar from "./Searchbar";
import ScrollTopButton from "./ScrollTopButton";
import MobileMenuBar from "./Moblemenubar";

export default function NewsApp() {
  const [search, setSearch] = useState("pakistan");
  const [newsData, setNewsData] = useState([]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/news`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const data = await res.json();
        setNewsData(data.articles || []);
        console.log("Fetched:", data.articles);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err.message);
          setNewsData([]);
        }
      }
    };

    fetchNews();

    return () => controller.abort();
  }, []);

  const handleSearchClick = () => {
    setNewsData([]); // Optional: clear before re-fetch
    fetch(`${apiBaseUrl}/news`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setNewsData(data.articles || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setNewsData([]);
      });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white px-6 sm:px-[5%] md:px-[10%] py-4 flex flex-row justify-between items-center gap-6 md:gap-0">
        <div className="gap-10 justify-start items-center xl:flex lg:flex xl:block lg:block hidden">
          <Menubar />
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearchClick={handleSearchClick}
          />
        </div>

        <div className="text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 tracking-tight">
            Trending <span className="text-[#fd5168]">News</span>
          </h1>
        </div>

        <div className="gap-8 justify-end items-center xl:flex lg:flex xl:block lg:block hidden">
          <i className="fa-brands fa-facebook-f text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
          <i className="fa-brands fa-instagram text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
          <i className="fa-brands fa-twitter text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
          <i className="fa-brands fa-linkedin-in text-black text-xl sm:text-2xl hover:text-[#fd5168] transition-all" />
        </div>

        <MobileMenuBar />
      </nav>

      <hr className="w-full h-[1px] border-none bg-[#ddd]" />

      {/* Category Buttons */}
      <div className="CategoriesBtn flex flex-wrap gap-4 sm:gap-5 my-6 justify-center px-7">
        {[
          "Sports",
          "Politics",
          "Entertainment",
          "Health",
          "Arts",
          "Culture",
          "Technology",
          "Education",
          "Business",
        ].map((category, index) => (
          <button
            key={index}
            className="px-5 py-2 text-base sm:text-lg text-[#303134] font-semibold border border-[#ddd] rounded-md bg-white shadow-sm hover:text-[#fd5168] hover:border-[#fd5168] hover:shadow-md transition-all transform hover:-translate-y-1"
            onClick={() => {
              setSearch(category);
              handleSearchClick();
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <hr className="w-full h-[1px] border-none bg-[#ddd]" />

      {/* News Cards */}
      <div className="pb-20">
        <Card data={newsData} />
      </div>

      <ScrollTopButton />
    </>
  );
}