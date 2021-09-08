const { useEffect, useState, } = React;
const { DragDropContext, Draggable, Droppable } = ReactBeautifulDnd;

const DATA = [
  {
    id: 'af3',
    label: 'COLUMN 1',
    items: [
      {id: 'af31', label: 'Item 3.1'},
      {id: 'af32', label: 'Item 3.2 '}, 
      {id: 'af33', label: 'Item 3.3 '}, 
      {id: 'af34', label: 'Item 3.4 '}, 
    ],
    tint: 1,
  },
  {
    id: 'af1',
    label: 'COLUMN 2',
    items: [
      {id: 'af11', label: 'Item 1.1 '}, 
      {id: 'af12', label: 'Item 1.2 '}, 
    ],
    tint: 2,
  },
  {
    id: 'af2', 
    label: 'COLUMN 3', 
    items: [
      {id: 'af21', label: 'Item 2.1 '}, 
      {id: 'af22', label: 'Item 2.2 '}, 
    ],
    tint: 3,
  }, 
];

function App()
{
  return (
    <div className='layout__wrapper'>
      <div className='layout__header'>
        <div className='app-bar'>
          <div className='app-bar__title'>
            Sales Overview
          </div>
        </div>
      </div>
      <LeadsOverview />
    </div>
  );
}

function LeadsOverview() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});
  
  useEffect(() => {
    // Mock an API call.
    buildAndSave(DATA);
  }, []);
  
  function buildAndSave(items)
  {
    const groups = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }
    
    // Set the data.
    setItems(items);
    
    // Makes the groups searchable via their id.
    setGroups(groups);
  }
  
  return (
    <DragDropContext 
      onDragEnd={(result) => {
        const { destination, draggableId, source, type, } = result;

        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }
        
        if ('group' === type) {
          const sourceIndex = source.index;
          const targetIndex = destination.index;
          
          const workValue = items.slice();//создаем копию массива в переменной workValue
          const [deletedItem, ] = workValue.splice(sourceIndex, 1);/*удалит из скоированного 
          массива эдемент по индексу источника и вернет массив с удаленным элементом*/
          workValue.splice(targetIndex, 0, deletedItem);

          buildAndSave(workValue);
          
          return;
        }

        const sourceDroppableIndex = groups[source.droppableId];
        const targetDroppableIndex = groups[destination.droppableId];
        const sourceItems = items[sourceDroppableIndex].items.slice();
        const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;
        
        // Pull the item from the source.
        const [deletedItem, ] = sourceItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, deletedItem);
        
        const workValue = items.slice();
        workValue[sourceDroppableIndex] = {
          ...items[sourceDroppableIndex],
          items: sourceItems,
        };
        workValue[targetDroppableIndex] = {
          ...items[targetDroppableIndex],
          items: targetItems,
        };
        
        
        setItems(workValue);
      }}
    >
      <Droppable droppableId='ROOT' type='group'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable 
                draggableId={item.id}
                key={item.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <DroppableList
                      key={item.id}
                      {...item}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function DroppableList({ id, items, label, tint, })
{
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={`holder holder--tint-${tint}`}>
            <div className='holder__title'>
              {label}
            </div>
            <div className='holder__content'>
              <ul className='list'>
                {items.map((item, index) => (
                  <li 
                    className='list__item'
                    key={item.id}
                  >
                    <Draggable 
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className='card'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item.label}
                        </div>
                      )}
                    </Draggable>
                  </li>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));