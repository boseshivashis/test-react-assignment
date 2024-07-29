import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "../../App.css";
import { readDeck, updateDeck } from "../../utils/api";

const EditDeck = () => {
    const navigate = useNavigate();
    const {deckId} = useParams();

    console.log("Deck is ", deckId);

    const [initialdeckData, setInitialDeckData] = useState[{}];

    useEffect(() => {
        async function getCardData() {
            const existCardRec = await readDeck(deckId);
            setInitialDeckData(existCardRec);
        };
        getCardData();


    }, [deckId]);

   

    const [formData, setFormData] = useState(initialdeckData)

  

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Updating Deck with data: ", formData);
        const createDeckResponse = await updateDeck(formData);
        console.log("Updating Desk Response ", createDeckResponse);

        
        // Here you would typically send formData to your API or state management
        // For example: createDeck(formData);
        //navigate(`/decks/{createDeckResponse.id}`); // Navigate to home or other page after submission

      };

    const handleCancel = () => {

        console.log("Cancelling Deck")
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    return (
    <div>
        <div className="App-link">
            <Link to="/">Home</Link> / Edit Deck
        </div>

        <h2>Edit Deck</h2>

        <form name="updateEditDeck" onSubmit={handleSubmit}>

            <table>
            <thead></thead>
            <tbody>

                <tr>
                    <td>
                    <label htmlFor="name"><b>Name</b>
                    </label>

                    </td>
                </tr>

                <tr>

                    <td>
                    <input type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        size={60}
                        onChange={handleChange}
                        placeholder={formData.name}/>
                    </td>
                </tr>
                <tr>

                    <td>
                    <label htmlFor="description"><b>Description</b>
                    </label>
                    </td>
                </tr>
                <tr>

                    <td>
                    <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    rows={6}
                                    cols={60}
                                    onChange={handleChange}
                                    placeholder={formData.description}
                                />
                    <input type="hidden" name="id" value={formData.id} />
                    </td>
                </tr>
                <tr>

                    <td>
                        
                    </td>
                </tr>
                <tr>

                    <td>
                        <button onClick={handleCancel}>Cancel</button>
                        &nbsp;
                        <button type="submit">Submit</button>
                    </td>
            
                </tr>


                </tbody>
            </table>

        </form>

    </div>
    );
}

export default EditDeck;