import { useState, useEffect} from 'react'

import InputPart from './assets/components/input-part'
import ListPart from './assets/components/todo-list'

import './App.css'

function getId() {
  return Math.floor(Math.random() * 10000);
}

function App() {
  const [selectState, setSelectState] = useState("all");
  const [todoItems, setTodoItems] = useState(() => {
    const saved = localStorage.getItem('todoItems');
    return saved ? JSON.parse(saved) : [];
  })
    
  // listen todoItems change
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  // add item
  function handleAdd(value) {
    setTodoItems(items => [{ id: getId(), content: value, isDone: false }, ...items]);
  }

  // delete itme
  function handleDelete(id) {
    setTodoItems(items => items.filter(item => item.id !== id));
  }

  // edit item
  function handleEdit(id, newContent) {
    const EditList = [...todoItems];
    const index = EditList.findIndex(item => item.id === id);

    if (index !== -1) {
      EditList[index] = {
        id: EditList[index].id,
        content: newContent,
        isDone: EditList[index].isDone
      };
    }

    setTodoItems(EditList);
  }

  // change isDone
  function changeState(id) {
    const newList = [...todoItems];
    const index = newList.findIndex(item => item.id === id);

    if (index !== -1) {
      newList[index] = {
        id: newList[index].id,
        content: newList[index].content,
        isDone: !newList[index].isDone
      };
    }

    setTodoItems(newList);

  }

  // change selectState
  function changeSelectState(newSelect) {
    setSelectState(newSelect);
  }

  const FILTERS = {
    all:       () => true,
    active:    t => !t.isDone,
    completed: t =>  t.isDone,
  };
  const filteredItems = todoItems.filter(FILTERS[selectState]);
  return (
    <>
      <div className="scale-box">
        <div className='container'>
          <h1>React TODO List</h1>
          <h2>What needs to be done?</h2>
          <InputPart onAdd={handleAdd} changeSelect={changeSelectState}/>
          <ListPart items={filteredItems} changeDone={changeState} onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
      </div>
    </>
  )
}

export default App
