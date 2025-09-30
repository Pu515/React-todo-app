import { useState } from "react"

import yesIcon from '../yes.svg'; 
import noIcon from '../no.svg'; 

import './index.css'

function ListPart({ items, changeDone, onDelete, onEdit }) {
  const [draft, setDraft] = useState();
  const [editId, setEditId] = useState(null);

  // click Edit
  function startEdit(item) {
    setEditId(item.id);
  };

  // click Cancel
  function cancelEdit() {
    setEditId(null);
    setDraft('');
  };

  // click Save
  function saveEdit() {
    onEdit(editId, draft)
    cancelEdit();
  }

  function onItemChange(e) {
    setDraft(e.target.value);
  }

  return (
    <div className='list-part'>
      <p className="list-head">{items.length} tasks remaining</p>
      {
        items.map(item => {
          const isEditing = editId === item.id;
          // const isEditing = true;

          // edit page
          if (isEditing) {
            return (
              <div key={item.id} className="list-content">
                <p>New name for {item.content}</p>
                <input className="input-bar" onChange={onItemChange} placeholder='Input the new one'/>
                <button className="cancel-button" onClick={cancelEdit}>Cancle</button>
                <button className="save-button" onClick={saveEdit}>Save</button>
              </div>
            )
          }

          // main page
          return (
            <div key={item.id} className="list-content">
              <button
                className={item.isDone ? "select-button on" : "select-button"}
                onClick={() => changeDone(item.id)}
              >
                <div className={item.isDone ? "block move-right" : "block move-left"}>
                  <img
                    src={item.isDone ? yesIcon : noIcon}
                    alt={item.isDone ? "done" : "not done"}
                    className="icon"
                  />
                </div>
              </button>
              <div className="todo-item">{item.content}</div>
              <button className="edit-button" onClick={() => startEdit(item)}>Edit</button>
              <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default ListPart