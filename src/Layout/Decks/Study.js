import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
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


  const [deckData, setDeckData] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [numberOfCards, setNumberOfCards] = useState(0);
  let numberOfCards = 0;




  useEffect(() => {
      async function getDeckData() {
          const deckRecords = await readDeck(deckId);
          setDeckData(deckRecords);
          setCurrentIndex((prevIndex) => prevIndex = 0);
      };
      getDeckData();


  }, [deckId]);

  const currentCard = deckData.cards ? deckData.cards[currentIndex] : null;

  console.log("After useEffect() deckData is ", deckData);


    //const firstCard = deckData.cards.length > 3 ? deckData.cards[0] : 'No items available';
    console.log("Card Lenth ", deckData.cards);
    let cardElement = {};
    if (deckData  && deckData.cards && deckData.cards.length >= 3) {
      cardElement = deckData.cards[0];
      numberOfCards = deckData.cards.length;
    }

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
      setShowNextButton(true);
    };

    const handleNext = () => {
      console.log("Next Clicked");

      setCurrentIndex((currentValue) => currentValue + 1);

      if(currentIndex <  deckData.cards.length -1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsFlipped(false);
        setShowNextButton(false);
        
      } else {
        const confirm = window.confirm("Restart Cards? Click 'cancel' to return to the home page");
        if (confirm) {
          setCurrentIndex(0);
          setIsFlipped(false);
        } else {
          navigate("/");
        }
      }
    };

    console.log("Current idex ", currentIndex)

    if (numberOfCards < 3) {
      return (
        <div>
          <Link to="/">Home</Link> / {deckData.name} / Study
          <h2>Study: {deckData.name}</h2>
          <h3>Not Enough Cards</h3>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </div>
      );
    }



    return (
    <div>
      <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">  
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>  
          <li className="breadcrumb-item active" aria-current="page">{deckData.name}</li>
        </ol>
      </nav>
      <h2>Study: {deckData.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Card {currentIndex + 1} of {numberOfCards}</h3>
            </td>
          </tr>
          <tr>
            <td>
              {currentCard ? (isFlipped ? currentCard.back : currentCard.front) : null}
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleFlip}>Flip</button>
              {showNextButton && (
                <>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={handleNext}>Next</button>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Study;