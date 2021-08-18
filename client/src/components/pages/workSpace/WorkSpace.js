import React, {useState} from 'react';
import './workSpaceStyled.css';

import deleteButton  from '../../../icon/delete.png';
import closeButton  from '../../../icon/close.png';

import Main from '../../main/Main';


interface IWorkSpace {
}

const WorkSpace: React.FC<IWorkSpace> = () => {
  const [columns, setColumns] = useState([
    {id:1, title:"What need", items:[{id:1, title:"Develpometn"},{id:2, title:'Create desigen Todo'},
                {id:3, title:'made Hello world made Hello world '},{id:4, title:'Always make Zalupa test on console'}]},
    {id:2, title:"Process on work", items:[{id:1, title:'Write your cold develope'}, 
                {id:2, title:'Choice deisgen on Dribble'},{id:3, title:'react Native'}]},
    {id:3, title:'Complete', items:[{id:1, title:'Make a photo'}]}
  ])

  //FORE ITEM
  const [currentColumn, setCurrentColumn] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler(event){
    event.preventDefault()
    if(event.target.className === 'item'){
      event.target.classList.toggle('boxShadow')
    }
  }

  function dragLeaveHandler(event){
    event.target.classList.remove('boxShadow')
  }

  function dragStartHandler(event, column, item){
    // debugger
    console.log('Start column', column) 
    console.log('Start item', item) 
    setCurrentColumn(column)
    setCurrentItem(item)
  }

  function dragEndHandler(event){
    event.target.classList.remove('boxShadow')
  }

  function dragDropHandler(event, column, item){
    event.preventDefault()
    const currentIndex = currentColumn.items.indexOf(currentItem)
    currentColumn.items.splice(currentIndex, 1)
    const dropIndex = column.items.indexOf(item)
    column.items.splice(dropIndex + 1, 0, currentItem)
    setColumns(columns.map(brd => {
      if (brd.id === column.id){
        return column
      }
      if (brd.id === currentColumn.id){
        return currentColumn
      }
      return brd
    }))
  }

  function dropeZeroStickHandler(event, column, item) {
    const currentIndex = currentColumn.items.indexOf(currentItem)
      if (!currentIndex.includes(currentItem.id)) {
      column.items.push(currentItem)
             const currentIndex = currentColumn.items.indexOf(currentItem)
             currentColumn.items.splice(currentIndex, 1)
             setColumns(columns.map(b => {
                if (b.id === column.id) {
                   return column
                }
                if (b.id === currentColumn.id) {
                   return currentColumn
                }
                return b
             }))
          }
  }

  function columnStartHandler(event, column, item){
    // debugger
    console.log('Start column', column) 
    console.log('Start item', item) 
    setCurrentColumn(column)
    setCurrentItem(item)
  }

  return (
    <Main>
    <div className="workSpace">
      {columns.map(column =>
        <div className="column"
        onDragOver={(event)=> dragOverHandler(event)}
        // onDrop={(event)=> dropeZeroStickHandler(event, column, {item: column.item})}
        >
          <div className="column__title">{column.title}
          </div>
            {column.items.map(item =>
                <div 
                onDragOver={(event)=> dragOverHandler(event)}
                onDragLeave={(event)=> dragLeaveHandler(event)}
                onDragStart={(event)=> dragStartHandler(event, column, item)}
                onDragEnd={(event)=> dragEndHandler(event)}
                onDrop={(event)=> dragDropHandler(event, column, item)}
                className="item"
                draggable={true}
                >
                  {item.title}
                </div>
                
              )}
        </div>
        )}
    </div>
    </Main>
    );
  };

export default WorkSpace;