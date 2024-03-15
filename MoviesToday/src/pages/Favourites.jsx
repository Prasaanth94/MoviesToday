import React, { useEffect, useState } from "react";
import FavouritesDisplay from "./FavouritesDisplay";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const airtable_apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  const fetchFavourites = async (signal) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appWunuVeHtLUeYu4/Table%201?maxRecords=3&view=Grid%20view",
        {
          signal,

          method: "GET",

          headers: {
            Authorization: `Bearer ${airtable_apiKey}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setFavourites(data.records);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const unfavourite = async (recordId) => {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/appWunuVeHtLUeYu4/Table%201/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${airtable_apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        // Update favourites state by removing the deleted record
        setFavourites((prevFavourites) =>
          prevFavourites.filter((record) => record.id !== recordId)
        );
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchFavourites();

    return () => {
      controller.abort();
    };
  }, []);

  console.log(favourites);

  return (
    <div>
      <FavouritesDisplay
        favourites={favourites}
        unfavourite={unfavourite}
      ></FavouritesDisplay>
    </div>
  );
};

export default Favourites;
