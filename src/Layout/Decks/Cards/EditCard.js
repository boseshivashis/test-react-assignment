import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Header from "../../Header";
import { readCard, readDeck, updateCard } from "../../../utils/api";

const EditCard = () => {

    // Call readDeck Function
    const {deckId, cardId} = useParams();

    const [deckIdForCard, setDeckIdForCard] = useState(deckId);
    const [cardIdForAdd, setCardIdForAdd] = useState(cardId);
    const [cardData, setCardData] = useState({});


    const navigate = useNavigate();

    const [deckData, setDeckData] = useState({});
    useEffect(() => {
        async function fetchDeckData() {
            const deckDataResponse = await readDeck(deckIdForCard);
            setDeckData(deckDataResponse);
        }
        fetchDeckData();

    },[deckId]);

    useEffect(() => {
        async function fetchCardData() {
            const cardDataResponse = await readCard(cardIdForAdd);
            setCardData(cardDataResponse);
            setFormData(cardDataResponse);
        }
        fetchCardData();

    },[cardIdForAdd]);

    const initialFormData = {
        deckId: '',
        front: '',
        back: '',
        id: ''
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updateResponse = await updateCard(formData);
            setCardData(updateResponse);
            // Clear the form field
            //setFormData(initialFormData);
            // Optionally navigate to a different page
            //navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error creating card:", error);
        } finally {
            navigate(`/decks/${deckId}`);
        }
    };

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    }

    return (
        <div>
        <Header/>
        <nav aria-label="breadcrumb"> <ol className="breadcrumb">  <li className="breadcrumb-item"><Link to="/">Home</Link> </li>  
            <li className="breadcrumb-item active" aria-current="page">{deckData.name}</li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>


  </ol></nav>


        <form name="EditCardForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="front">

</label><b>Front</b></td>
                    </tr>
                    <tr>
                        <td>
                        <textarea id="front" 
                                    name="front"
                                    value={formData.front}
                                    cols={60}
                                    rows={5}
                                    onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="back">

</label><b>Back</b></td>
                    </tr>
                    <tr>
                        <td>
                        <textarea id="back" 
                                    name="back"
                                    cols={60}
                                    rows={5}
                                    value={formData.back}
                                    onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td><input type="hidden" name="deckId" id="deckId" value={formData.deckId}/></td>
                        <td><input type="hidden" name="cardId" id="cardId" value={formData.id}/></td>
                    </tr>
                    <tr>
                        <td><button onClick={handleDone}>Done</button> &nbsp;
                            <button type="submit">Save</button> &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </form>
        </div>
    );
}

export default EditCard;