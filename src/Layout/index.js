import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import AddCard from "./AddCard";
import Deck from "./Deck";
import EditCard from "./EditCard";
import Study from "./Study";
import EditDeck from "./EditDeck";

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
            
            <Route path="/decks/:deckId" component={Deck} >
                <Route path="study" component={Study} />
                <Route path="edit" component={EditDeck} />
                <Route path="cards/new" component={AddCard} />
                <Route path="cards/:cardId/edit" component={EditCard} />
          </Route>

          </Routes>
    
    }
      </div>
    </>
  );
}

export default Layout;
