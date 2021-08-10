import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'Card #1'},
    {id: 2, order: 1, text: 'Card #2'},
    {id: 3, order: 2, text: 'Card #3'},
    {id: 4, order: 4, text: 'Card #4'},
  ])

  const [currentCard, setCurrentCard] = useState(null)

  function dragStartHandler(event, card){
    console.log('drag', card)
    setCurrentCard(card)
  }
  function dragLeaveHandler(event){}
  function dragEndHandler(event){
    event.target.style.background = 'white'
  }
  function dragOverHandler(event){
    event.preventDefault()
    event.target.style.background = 'lightgreen'
  }
  function dragDropHandler(event, card){
    event.preventDefault()
    console.log('drop', card)
    setCardList(cardList.map(c => {
      if (c.id === card.id){
        return {...c, order: currentCard.order}
      }
      if (c.id === currentCard.id){
        return {...c, order: card.order}
      }
      return c
    }))
    event.target.style.background = 'white'
  }

  const sortCards = (a, b) => {
    if(a.order > b.order){
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="App">
      {cardList.sort(sortCards).map(card => 
        <div 
        onDragStart={(event)=> dragStartHandler(event, card)}
        onDragLeave={(event)=> dragLeaveHandler(event)}
        onDragEnd={(event)=> dragEndHandler(event)}
        onDragOver={(event)=> dragOverHandler(event)}
        onDrop={(event)=> dragDropHandler(event, card)}
        draggable={true}
        className="card">
          {card.text}
        </div>
        )}
    </div>
  );
}

export default App;
