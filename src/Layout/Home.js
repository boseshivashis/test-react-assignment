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
            <button onClick={() => HandleCreateDeck()}>Create Deck</button>
            <div >
            {
              
              deckList.map((existingDeck) => (
                <div key={existingDeck.id}>
                <div><b>{existingDeck.name}</b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{existingDeck.cards.length} cards
                
                
                </div>
                <div >{existingDeck.description}</div>

                <button to={`/decks/${existingDeck.id}/edit`}>View</button>
                &nbsp;&nbsp;&nbsp;&nbsp;


                {/* Additional options: view and delete */}
                <button to={`/decks/${existingDeck.id}/edit`}>Study</button>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <button onClick={() => handleDelete(existingDeck.id)}>Delete</button>
                &nbsp;&nbsp;&nbsp;&nbsp;

                </div>
        ) )
            }
            </div>
        </>
    )

}

export default Home;
