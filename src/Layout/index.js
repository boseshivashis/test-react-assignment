import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./Decks/CreateDeck";
import AddCard from "./Decks/Cards/AddCard";
import Deck from "./Decks/Deck";
import EditCard from "./Decks/Cards/EditCard";
import Study from "./Decks/Study";
import EditDeck from "./Decks/EditDeck";

import Home from "./Home";
import {Routes, Route} from "react-router-dom";

function Layout() {
  

  return (
    
    <>
      <div className="container">
        {
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/decks/new" element={<CreateDeck/>}/>
            
            <Route path="/decks/:deckId" element={<Deck/>} >
                <Route path="study" element={<Study/>} />
                <Route path="edit" element={<EditDeck/>} />
                <Route path="cards/new" element={<AddCard/>} />
                <Route path="cards/:cardId/edit" element={<EditCard/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />

          </Routes>
    
    }
      </div>
    </>
  );
}

export default Layout;
