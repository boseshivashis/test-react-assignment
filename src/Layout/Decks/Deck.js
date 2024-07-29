import React, { useState, useEffect} from "react";
import { deleteCard, readDeck } from "../../utils/api";
import {Link, useNavigate, useParams, Outlet, useLocation} from "react-router-dom";
import Header from "../Header";
import Layout from "../../Layout";


const Deck = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    

    const [deckData, setDeckData] = useState({});
     const [cardListForDeck, setCardListForDeck] = useState([]);

     useEffect(() => {
         async function getDeckData() {
            const deckDataResponse = await readDeck(deckId);
            setDeckData(deckDataResponse);
            setCardListForDeck(deckDataResponse.cards);
        };
        getDeckData();

    }, [deckId]);

    

  
   
    const handleEditCard = (cardId, deckId) => {
        console.log("Edit Card for deck Id ",deckId);
        console.log("Edit Card for card Id ",cardId);

        //navigate(`/decks/${deckId}/cards/${cardId}/edit`);
        navigate(`cards/${cardId}/edit`);

    }

    const handleCardDelete = async (cardId, deckId) => {

        const confirmed = window.confirm("Delete this card? You will not be able to recover it");
        if(confirmed) {
            console.log("Call Delete Card");
            
                    const deletedCardRecord = await deleteCard(cardId);
                    const updatedCardList = cardListForDeck.filter(card => card.id !== cardId);
                    setCardListForDeck(updatedCardList);
        
                }            
         else {
            console.log("Do not delete");
        }

    
    }

    const handleDeckEdit = (deckId) => {
        console.log("Editeding Deck ", deckId);
        navigate(`/decks/${deckId}/edit`);
    }

    return (
        <div >
                    <Header></Header>

        <Link to="/">Home</Link> / {deckData.name}

    <table>
    
        <tbody>
           
            <tr>
                <td>
                    <h2>{deckData.name}</h2>
                </td>
            </tr>
            
            <tr>
            <td >
                    {deckData.description}
                </td>
            </tr>

            <tr>
                <td>
                    <button onClick={() => handleDeckEdit(deckData.id)}>Edit</button>
                    &nbsp;&nbsp;
                    <button>Study</button>
                    &nbsp;&nbsp;
                    <button>Add Cards</button>
                    &nbsp;&nbsp;
                    <button>Delete</button>

                </td>
            </tr>

        </tbody>
    </table>

    <br/>

    <table style={{border: "1"}}>
        <tbody>
            { cardListForDeck.length > 0 ? <tr><td><h2>Cards</h2></td></tr> : <tr><td></td></tr>}
            
        
            {cardListForDeck.map((cardRecord) => 
            < >
            <tr key={cardRecord.id}>
                <td style={{ width: "30%", verticalAlign: "top" }}>                    
                    {cardRecord.front}
              </td>
              <td style={{ width: "30%", verticalAlign: "top" }}>
                {cardRecord.back}
              </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button  onClick={() => handleEditCard(cardRecord.id, cardRecord.deckId)}>Edit</button>
                    &nbsp;&nbsp;
                    <button  onClick={() => handleCardDelete(cardRecord.id, cardRecord.deckId)}>Delete</button>
                </td>
            </tr>
            </>
        
        )
}
            
        </tbody>
    </table>

    </div>

    );
}

export default Deck;