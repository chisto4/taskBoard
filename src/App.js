import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [boards, setBoards] = useState([
    {id:1, title:"What need", items:[{id:1, title:"Develpometn"},{id:2, title:'Create desigen Todo'},
                {id:3, title:'made Hello world'},{id:4, title:'Always make Zalupa test on console'}]},
    {id:2, title:"Process on work", items:[{id:1, title:'Write your cold develope'}, 
                {id:2, title:'Choice deisgen on Dribble'},{id:3, title:'react Native'}]},
    {id:3, title:'Complete', items:[{id:1, title:'Make a photo'}]}
  ])
console.log('zalupa', boards)
console.log('zalupa2', setBoards)
  //FORE ITEM
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler(event){
    event.preventDefault()
    if(event.target.className == 'item'){
      event.target.classList.toggle('boxShadow')
    }
  }

  function dragLeaveHandler(event){
    event.target.classList.remove('boxShadow')
  }

  function dragStartHandler(event, board, item){
    console.log('drag', board, item) 
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(event){
    event.target.classList.remove('boxShadow')
  }

  function dragDropHandler(event, board, item){
    event.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(brd => {
      if (brd.id === board.id){
        return board
      }
      if (brd.id === currentBoard.id){
        return currentBoard
      }
      return brd
    }))
  }

  return (
    <div className="App">
      {boards.map(board =>
        <div className="board">
          <div className="board__title">{board.title}</div>
            {board.items.map(item =>
                <div 
                onDragOver={(event)=> dragOverHandler(event)}
                onDragLeave={(event)=> dragLeaveHandler(event)}
                onDragStart={(event)=> dragStartHandler(event, item, board)}
                onDragEnd={(event)=> dragEndHandler(event)}
                onDrop={(event)=> dragDropHandler(event, item, board)}
                className="item"
                draggable={true}
                >
                  {item.title}
                </div>
              )}
        </div>
        )}
    </div>
    );
  };

export default App;
