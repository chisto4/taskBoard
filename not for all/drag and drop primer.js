// const { useEffect, useState, } = React;
// const { DragDropContext, Draggable, Droppable } = ReactBeautifulDnd;

// const DATA = [
//   {
//     id: 'af3',
//     label: 'COLUMN 1',
//     items: [
//       {id: 'af31', label: 'Item 3.1'},
//       {id: 'af32', label: 'Item 3.2 '}, 
//       {id: 'af33', label: 'Item 3.3 '}, 
//       {id: 'af34', label: 'Item 3.4 '}, 
//     ],
//     tint: 1,
//   },
//   {
//     id: 'af1',
//     label: 'COLUMN 2',
//     items: [
//       {id: 'af11', label: 'Item 1.1 '}, 
//       {id: 'af12', label: 'Item 1.2 '}, 
//     ],
//     tint: 2,
//   },
//   {
//     id: 'af2', 
//     label: 'COLUMN 3', 
//     items: [
//       {id: 'af21', label: 'Item 2.1 '}, 
//       {id: 'af22', label: 'Item 2.2 '}, 
//     ],
//     tint: 3,
//   }, 
// ];

// function App()
// {
//   return (
//     <div className='layout__wrapper'>
//       <div className='layout__header'>
//         <div className='app-bar'>
//           <div className='app-bar__title'>
//             Sales Overview
//           </div>
//         </div>
//       </div>
//       <LeadsOverview />
//     </div>
//   );
// }

// function LeadsOverview() {
//   const [items, setItems] = useState([]);
//   const [groups, setGroups] = useState({});
  
//   useEffect(() => {
//     // Mock an API call.
//     buildAndSave(DATA);
//   }, []);
  
//   function buildAndSave(items)
//   {
//     const groups = {};
//     for (let i = 0; i < Object.keys(items).length; ++i) {
//       const currentGroup = items[i];
//       groups[currentGroup.id] = i;
//     }
    
//     // Set the data.
//     setItems(items);
    
//     // Makes the groups searchable via their id.
//     setGroups(groups);
//   }
  
//   return (
//     <DragDropContext 
//       onDragEnd={(result) => {
//         const { destination, draggableId, source, type, } = result;

//         if (!destination) {
//           return;
//         }

//         if (destination.droppableId === source.droppableId && destination.index === source.index) {
//           return;
//         }
        
//         if ('group' === type) {
//           const sourceIndex = source.index;
//           const targetIndex = destination.index;
          
//           const workValue = items.slice();//создаем копию массива в переменной workValue
//           const [deletedItem, ] = workValue.splice(sourceIndex, 1);/*удалит из скоированного 
//           массива эдемент по индексу источника и вернет массив с удаленным элементом*/
//           workValue.splice(targetIndex, 0, deletedItem);

//           buildAndSave(workValue);
          
//           return;
//         }

//         const sourceDroppableIndex = groups[source.droppableId];
//         const targetDroppableIndex = groups[destination.droppableId];
//         const sourceItems = items[sourceDroppableIndex].items.slice();
//         const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;
        
//         // Pull the item from the source.
//         const [deletedItem, ] = sourceItems.splice(source.index, 1);
//         targetItems.splice(destination.index, 0, deletedItem);
        
//         const workValue = items.slice();
//         workValue[sourceDroppableIndex] = {
//           ...items[sourceDroppableIndex],
//           items: sourceItems,
//         };
//         workValue[targetDroppableIndex] = {
//           ...items[targetDroppableIndex],
//           items: targetItems,
//         };
        
        
//         setItems(workValue);
//       }}
//     >
//       <Droppable droppableId='ROOT' type='group'>
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {items.map((item, index) => (
//               <Draggable 
//                 draggableId={item.id}
//                 key={item.id}
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     ref={provided.innerRef}
//                   >
//                     <DroppableList
//                       key={item.id}
//                       {...item}
//                     />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// function DroppableList({ id, items, label, tint, })
// {
//   return (
//     <Droppable droppableId={id}>
//       {(provided) => (
//         <div
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//         >
//           <div className={`holder holder--tint-${tint}`}>
//             <div className='holder__title'>
//               {label}
//             </div>
//             <div className='holder__content'>
//               <ul className='list'>
//                 {items.map((item, index) => (
//                   <li 
//                     className='list__item'
//                     key={item.id}
//                   >
//                     <Draggable 
//                       draggableId={item.id}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           className='card'
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                         >
//                           {item.label}
//                         </div>
//                       )}
//                     </Draggable>
//                   </li>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </Droppable>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('root'));


import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
