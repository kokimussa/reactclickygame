import React, { Component } from "react";
import Cards from "./components/Cards";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Go ahead! Start clicking!";

class App extends Component {
    
   
    state = {
        cards,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        
        const cards = this.state.cards;

        
        const clickedCard = cards.filter(card => card.id === id);

        
        if (clickedCard[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Dang! You already clicked on that one! Now you have to start over!"

            for (let i = 0 ; i < cards.length ; i++){
                cards[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({cards});

       
        } else {

            clickedCard[0].clicked = true;

            correctGuesses++;
            
            clickMessage = "Great! You haven't click on that one yet! Keep going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            
            cards.sort(function(a, b){return 0.5 - Math.random()});

            
            this.setState({ cards });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        }
    };

    render() {
        console.log("Cards: ", this.state.cards);
        return (
            <Wrapper>
                <Header>To boldly click where no one has clicked before!</Header>
                {this.state.cards.map(card => (
                    <Cards
                        setClicked={this.setClicked}
                        id={card.id}
                        key={card.id}
                        image={card.image}
                    />
                ))}

                <div>
                <h2 className="scoreSummary">
                    Click on an image to earn points, but don't click on any of them more than once!
                </h2>
                
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                </h3>
                
                <h3 className="scoreSummary">
                    Best Score: {this.state.bestScore} 
                </h3>
                </div>
                
            </Wrapper>
        );
    }
}
export default App;

