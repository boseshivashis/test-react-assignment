import React, { useState, useEffect} from "react";
import { deleteCard, readDeck } from "../../utils/api";
import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../Header";


const Deck = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    

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
        navigate(`cards/${cardId}/edit`);
    }

    const handleAddCard = () => {
        navigate(`/decks/${deckId}/cards/new`);
    }

    const handleCardDelete = async (cardId, deckId) => {
        const confirmed = window.confirm("Delete this card? You will not be able to recover it");
        if(confirmed) {            
                    await deleteCard(cardId);
                    const updatedCardList = cardListForDeck.filter(card => card.id !== cardId);
                    setCardListForDeck(updatedCardList);
        
                }            
         else {
            console.log("Do not delete");
        }

    
    }

    const handleDeckEdit = (deckId) => {
        navigate(`/decks/${deckId}/edit`);
    }

    const handleDeckStudy = (deckId) => {
        navigate(`/decks/${deckId}/study`);
    }
    return (
        <div >
            <Header></Header>

            <nav aria-label="breadcrumb"> 
                <ol className="breadcrumb">  
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>  
                    <li className="breadcrumb-item active" aria-current="page">{deckData.name}</li>
                </ol>
            </nav>

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
                    <button onClick = {() => handleDeckStudy(deckData.id)}>Study</button>
                    &nbsp;&nbsp;
                    <button onClick={() => handleAddCard()}>Add Cards</button>
                    &nbsp;&nbsp;
                    <button>Delete</button>

                </td>
            </tr>

        </tbody>
    </table>

    <br/>

    <table >
        <tbody>
            { cardListForDeck.length > 0 ? <tr><td><h2>Cards</h2></td></tr> : <tr><td></td></tr>}
            
        
            {cardListForDeck.map((cardRecord, index) => 
            < >
            <tr key={index}>
                <td key={index} style={{ width: "30%", verticalAlign: "top" }}>                    
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