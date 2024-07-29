import React from "react";
import Header from "./Header";

import {listDecks} from "../utils/api/index";
import {Link, useNavigate} from "react-router-dom";
import {useState,  useEffect} from "react";



const Home = () => {
  const [deckList, setDeckList] = useState([]);

    const navigate = useNavigate();

    // Handler function to navigate to Create Deck screen
    const HandleCreateDeck = () => {
    console.log("Clicked Create Deck Button");
    navigate("/decks/new"); 
  };
    const handleDelete = (id) => {
      console.log("Clicked Delete for id ", id);
    }

    useEffect(() => {
      const deckListAbortController = new AbortController();
      const { signal } = deckListAbortController;
      // Define the async function for fetching data
      const getListOfDecks = async function getListOfDecks() {
        try {
          // TODO Fix the abort controller signal call for listDecks call
          const decksResponse = await listDecks();
          console.log(decksResponse);
          setDeckList(decksResponse);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborting");
          } else {
            throw error;
          }
        }
       
      } ;
      getListOfDecks();

      return () => {
        deckListAbortController.abort(); // Cleanup the abort controller on unmount
    };
      
      }, []);

    return (
        <>
            <Header />
            <button onClick={() => HandleCreateDeck}>Create Deck</button>
            <div>
            {
              
              deckList.map((existingDeck) => (
                <div key={existingDeck.id}>
                <div>{existingDeck.name}</div>
                <div>{existingDeck.description}</div>

                <button >Study</button> &nbsp;
                <button to={`/decks/${existingDeck.id}/edit`}>View</button>
                {/* Additional options: view and delete */}
                <button to={`/decks/${existingDeck.id}/edit`}>Study</button>
                <button onClick={() => handleDelete(existingDeck.id)}>Delete</button>
                </div>
        ) )
            }
            </div>
        </>
    )

}

export default Home;
