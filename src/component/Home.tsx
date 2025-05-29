import CardSk from './Skeleton/CardSk';
import Card from './Card';
import React, { useEffect, useState } from 'react';
import { searchAnimeQuery, PopularAnimeQuery, TrendingAnimeQuery } from "../hooks/searchQueryStrings";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [animeResults, setAnimeResults] = useState([]); // Store the fetched anime data
  const [blurredIndex, setBlurredIndex] = useState(null); // Track which item is blurred
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const PER_PAGE = 15; // Define items per page

  // Fetch trending anime
  const fetchTrendingAnime = async (page) => {
    setLoaded(false);
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: TrendingAnimeQuery,
          variables: {
            page: page,
            perPage: PER_PAGE,
          },
        }),
      });

      const result = await response.json();
      if (result.data && result.data.Page && result.data.Page.media) {
        setAnimeResults(prevResults => page === 1 ? result.data.Page.media : [...prevResults, ...result.data.Page.media]);
        setHasNextPage(result.data.Page.pageInfo.hasNextPage);
        setCurrentPage(result.data.Page.pageInfo.currentPage);
      } else {
        console.error("Error fetching trending anime: Unexpected data structure", result);
        setHasNextPage(false); // Reset on error
      }
    } catch (error) {
      console.error("Error fetching trending anime:", error);
      setHasNextPage(false); // Reset on error
    }
    setLoaded(true);
  };

  // Initial fetch for trending anime
  useEffect(() => {
    fetchTrendingAnime(1);
  }, []); // Empty dependency array means this runs once when the component mounts

  const ClickCard = (index) => {
    console.log("hello");
    // Update state with the index of the clicked item
  };

  const handleSearch = async (e, page = 1) => {
    if (e) e.preventDefault(); // Prevent form from submitting normally if event is present

    if (!searchQuery && page === 1) { // Only block if it's a new search without query
        // If search query is empty and it's the first page, do nothing or fetch trending.
        // For now, let's just return to prevent empty search.
        // Or, one could call fetchTrendingAnime(1) here.
        if (page === 1) {
            setAnimeResults([]);
            setCurrentPage(1);
            setHasNextPage(false);
            fetchTrendingAnime(1); // Fetch trending if search is cleared
        }
        return;
    }


    setLoaded(false);
    if (page === 1) {
      setAnimeResults([]); // Clear previous results for a new search
      setCurrentPage(1); // Reset page number for new search
    }

    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: searchAnimeQuery,
          variables: {
            search: searchQuery,
            page: page,
            perPage: PER_PAGE,
          },
        }),
      });
      const result = await response.json();
      if (result.data && result.data.Page && result.data.Page.media) {
        setAnimeResults(prevResults => page === 1 ? result.data.Page.media :[...prevResults, ...result.data.Page.media]);
        setHasNextPage(result.data.Page.pageInfo.hasNextPage);
        setCurrentPage(result.data.Page.pageInfo.currentPage);
      } else {
         console.error("Error fetching search results: Unexpected data structure", result);
         setHasNextPage(false); // Reset on error
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasNextPage(false); // Reset on error
    }
    setLoaded(true);
  };
  const CardSkl = <CardSk />

  const loadMoreItems = () => {
    if (!hasNextPage) return;

    if (searchQuery) {
      handleSearch(null, currentPage + 1); // Pass null as event, and next page
    } else {
      fetchTrendingAnime(currentPage + 1); // Fetch next page of trending
    }
  };

  return (
    <>
      <div className="HomeLayout w-full bg-dark-bg">
        <div className="flex justify-center w-full">
          <form className="max-w-full mx-auto" onSubmit={(e) => handleSearch(e, 1)}> {/* Ensure new search starts at page 1 */}
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="shadow-sm-light block w-full  mt-3 p-3 ps-9 text-lg text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search For Anime..."
                value={searchQuery} // Bind input value to searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
                required
              />
              <button
                type="submit"
                className="shadow-sm-light text-white absolute end-1 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="result">
          {searchQuery ? (
            <p className="truncate srf text-xl mt-5 ml-4 mb-2 text-gray-300 font-extrabold font-mono">
              Search Result :<strong className="title text-md underline decoration-dotted font-semibold font-normal text-blue-300">{searchQuery}</strong>
            </p>
          ) : (<p className="truncate srf text-xl mt-5 ml-4 mb-2 text-gray-300 font-extrabold font-mono">
            Trending Anime Result<strong className="title text-sm underline decoration-dotted font-semibold font-normal text-blue-300"></strong>
          </p>)}
        </div>
        <div className="grid  grid-cols-3  sm:grid-cols-5 gap-2 mt-3 ml-2 mr-2 ">
          {animeResults.map((anime, index) => (
            loaded ?
              <Card
                FStyle={mystyle}
                key={anime.id} // Unique key for each anime item
                onClick={() => ClickCard(index)} // Pass the index to handle click
                imgStyle={"hover:blur-2a"} // Apply blur based on the clicked item
                PlayBtnState={" hidden hover:visible"}
                imgUrl={anime.coverImage.large} // Use the anime's image URL from AniList
                title={anime.title.english !== null
                  ? anime.title.english
                  : anime.title.userPreferred} // Use the anime's romaji title from AniList
              /> : CardSkl
          ))}
        </div>
        {loaded && hasNextPage && (
          <div className="flex justify-center mt-4 mb-4">
            <button
              onClick={loadMoreItems}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!loaded} // Disable button while loading more to prevent multiple clicks
            >
              Load More
            </button>
          </div>
        )}
        {loaded && animeResults.length === 0 && !hasNextPage && <h2 className="text-white m-10 text-sm font-extrabold p-3 underline content-center space-x-1 place-items-center text-center h-full align-middle">No Results Found..!?</h2>}
        {!loaded && animeResults.length === 0 && <h2 className="text-white m-10 text-sm font-extrabold p-3 underline content-center space-x-1 place-items-center text-center h-full align-middle">Loading...</h2>} {/* Loading indicator for initial load or when loading more */}
      </div>
    </>
  );
};

const mystyle = {
  height: "23",
}
export default Home;