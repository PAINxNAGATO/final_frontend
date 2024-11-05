import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../store/api";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      const response = await api.get(`/search/${activeTab}/${searchTerm}`);
      setResults(response.content);
    } catch (error) {
      if (error.status === 404) {
        toast.error("Nothing found, make sure you are searching under the right category");
      } else {
        toast.error(error.message || "An error occurred, please try again later");
      }
      console.error("Error fetching search results:", error);
    }
  };

  const tabButtons = [
    { id: "movie", label: "Movies" },
    { id: "tv", label: "TV Shows" },
    { id: "person", label: "Person" }
  ];

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        {/* Tab Buttons */}
        <div className='flex justify-center gap-3 mb-4'>
          {tabButtons.map(({ id, label }) => (
            <button
              key={id}
              className={`py-2 px-4 rounded ${
                activeTab === id ? "bg-red-600" : "bg-gray-800"
              } hover:bg-red-700 transition-colors`}
              onClick={() => handleTabClick(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form 
          className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' 
          onSubmit={handleSearch}
        >
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
          <button 
            className='bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors'
            type="submit"
          >
            <Search className='size-6' />
          </button>
        </form>

        {/* Results Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            if (activeTab === "person") {
              return (
                <div key={result.id} className='bg-gray-800 p-4 rounded hover:bg-gray-700 transition-colors'>
                  <div className='flex flex-col items-center'>
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className='max-h-96 rounded mx-auto'
                      loading="lazy"
                    />
                    <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                  </div>
                </div>
              );
            }

            return (
              <div key={result.id} className='bg-gray-800 p-4 rounded hover:bg-gray-700 transition-colors'>
                <Link
                  to={`/watch/${result.id}`}
                  onClick={() => setContentType(activeTab)}
                >
                  <img
                    src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                    alt={result.title || result.name}
                    className='w-full h-auto rounded'
                    loading="lazy"
                  />
                  <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;