import React from "react";
import Header from "./Header";

import {listDecks, deleteDeck} from "../utils/api/index";
import {Link, useNavigate} from "react-router-dom";
import {useState,  useEffect} from "react";



const Home = () => {
  const [deckList, setDeckList] = useState([]);

    const navigate = useNavigate();

    // Handler function to navigate to Create Deck screen
    const HandleCreateDeck = () => {
    navigate("/decks/new"); 
  };
    const handleDelete = async (id) => {
      console.log("Clicked Delete for id ", id);
      const confirm = window.confirm("Delete this deck? You will not be able to recover it.")

      if(confirm) {
        await deleteDeck(id); 
        setDeckList((prevDeckList) => prevDeckList.filter(deck => deck.id !== id))
      }
    }

   const  handleDeckView = (deckId) => {
      navigate(`/decks/${deckId}`); 

    }

    const handleStudy = (existDeckId) => {
      navigate(`/decks/${existDeckId}/study`);
    }

    useEffect(() => {
      // Define the async function for fetching data
      const getListOfDecks = async function getListOfDecks() {
        try {
          // TODO Fix the abort controller signal call for listDecks call
          const decksResponse = await listDecks();
          setDeckList(decksResponse);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborting");
          } else {
            throw error;
          }
        }
       
      }
      getListOfDecks();
      
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

                <button onClick={() => handleDeckView(existingDeck.id)} >View</button>
                &nbsp;&nbsp;&nbsp;&nbsp;


                {/* Additional options: view and delete */}
                <button onClick={() => handleStudy(existingDeck.id)}>Study</button>
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
