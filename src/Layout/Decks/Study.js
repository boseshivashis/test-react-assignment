import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api";


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
  if(currentCard) {
    numberOfCards = deckData.cards.length;

  }

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
      setShowNextButton(true);
    };

    const handleNext = () => {

      setCurrentIndex((currentValue) => currentValue + 1);

      if(currentIndex <  deckData.cards.length -1) {
        //setCurrentIndex((prevIndex) => prevIndex + 1);
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


    if (numberOfCards < 3) {
      return (
        <div>

          <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">  
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>  
          <li className="breadcrumb-item active" aria-current="page">{deckData.name}</li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>

        </ol>
      </nav>

          <h2>{deckData.name}: Study</h2>
          <h3>Not Enough Cards</h3>
          <p>You need at least 3 cards to study. There are {numberOfCards} cards in this deck.</p>
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