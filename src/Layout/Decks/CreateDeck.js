import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../App.css";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
    const navigate = useNavigate();

    const initialFormData = {
        name: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData)

    // useEffect(() => {
    //     async function createNewDeck(formData){
    //         const createDeckResponse = await createDeck(formData);
    //         console.log("Create Deck Response ", createDeckResponse);
    //     }
    //     createNewDeck(formData);

    // }, [formData]);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Creating Deck with data: ", formData);
        const createDeckResponse = createDeck(formData);
        console.log("Create Desk Response ", createDeckResponse);

        
        // Here you would typically send formData to your API or state management
        // For example: createDeck(formData);
        navigate(`/decks/{createDeckResponse.id}`); // Navigate to home or other page after submission

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
            <Link to="/">Home</Link> / Create Deck
        </div>

        <h2>Create Deck</h2>

        <form name="createForm" onSubmit={handleSubmit}>

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
                        placeholder="Deck name"/>
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
                                    placeholder="Brief Description of the deck"
                                />
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

export default CreateDeck;