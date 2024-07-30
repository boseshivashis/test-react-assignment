import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import Header from "../../Header";
import { readCard, readDeck, createCard } from "../../../utils/api";

const AddCard = () => {

    // Call readDeck Function
    const {deckId} = useParams();
    const navigate = useNavigate();

    const [deckData, setDeckData] = useState({});
    useEffect(() => {
        async function fetchDeckData() {
            const deckDataResponse = await readDeck(deckId);
            setDeckData(deckDataResponse);
        }
        fetchDeckData();

    },[deckId]);

    const initialFormData = {
        deckId: '',
        front: '',
        back: ''
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const [createCardData, setCreateCardData] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await createCard(deckId, formData);
            setCreateCardData(response);

            // Clear the form field
            setFormData(initialFormData);
            // Optionally navigate to a different page
            //navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    }

    return (
        <div>
        <Header/>
        <div className="App-link">
       <nav aria-label="breadcrumb"> 
            <ol className="breadcrumb"> 
                <li className="breadcrumb-item"><Link to="/">Home</Link> </li>  
                <li className="breadcrumb-item active" aria-current="page">{deckData.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>

        </div>

        <form name="AddCardForm" onSubmit={handleSubmit}>
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
                                    placeholder="Front side of card"
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
                                    placeholder="Back side of card"
                                    value={formData.back}
                                    onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td><input type="hidden" name="deckId" id="deckId" value={deckData.id}/></td>
                    </tr>
                    <tr>
                        <td><button onClick={handleDone}>Done</button> &nbsp;<button>Save</button> &nbsp;</td>
                    </tr>
                </tbody>
            </table>
            
        </form>
        </div>
    );
}

export default AddCard;