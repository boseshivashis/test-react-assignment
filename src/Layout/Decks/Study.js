import React, {useState, useEffect} from "react";
import {Link, navigate, useNavigate, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api";

/*
A button at the bottom of each card "flips" it to the other side.
After flipping the card, the screen shows a Next button (see the Next button section below) to continue to the next card.
After the final card in the deck has been shown, a message (see the Restart prompt section below) is shown offering the user the opportunity to restart the deck.
If the user does not restart the deck, they should return to the home screen.
Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.
*/
function Study() {

  const navigate = useNavigate();
  const {deckId} = useParams();

  console.log("Deck is ", deckId);

  const [deckData, setDeckData] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);




  useEffect(() => {
      async function getDeckData() {
          const deckRecords = await readDeck(deckId);
          setDeckData(deckRecords);

      };
      getDeckData();


  }, [deckId]);

  console.log("After useEffect() deckData is ", deckData);


    //const firstCard = deckData.cards.length > 3 ? deckData.cards[0] : 'No items available';
    console.log("Card Lenth ", deckData.cards);
    let cardElement = {};
    if (deckData  && deckData.cards && deckData.cards.length >= 3) {
      cardElement = deckData.cards[0];
    }

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
      setShowNextButton(true);
    };

    return (
        <div>
        <Link to="/">Home</Link> / {deckData.name} / Study
        <h2>Study: {deckData.name}</h2>

        <table>
          <tbody>
          <tr>
             <td>
  <h3>{deckData.cards && deckData.cards.length >= 3
    ? `Card 1 of ${deckData.cards.length}`
    : 'Not Enough Cards'}</h3>
</td>
           </tr>
            <tr>
              <td>
                {isFlipped ? cardElement.back : cardElement.front}

              </td>
            </tr>
            <tr>
              
                {showNextButton ? <td>
                <button         onClick={handleFlip}>Flip</button>
                &nbsp;&nbsp;&nbsp;<button onClick={handleNext} >Next</button> </td> : <td><button  onClick={handleFlip}>Flip</button>
                &nbsp;&nbsp;&nbsp;</td>
 }
            </tr>
             
           
          </tbody>
        </table>
        </div>
    );
  }

export default Study;