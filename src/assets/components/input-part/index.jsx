import { useState } from "react";

import hatIcon from '../hat.svg'; 

function InputPart({ onAdd, changeSelect}) {
  const [value, setValue] = useState('');

  // get input value
  const onValueChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <>
      <div className="input-part">
        <div className="input-wrapper">
          <input className="input-bar" value={value} onChange={onValueChange} placeholder='Input todo item ' />
          <img className="hat-icon" src={hatIcon} alt="hat"/>
        </div>
        <button className="add-button" onClick={() => { onAdd(value); setValue('');} }>Add</button>
        <div className="option-part">
          <button className="option-button" onClick={() => changeSelect('all')}>All</button>
          <button className="option-button" onClick={() => changeSelect('active')}>Active</button>
          <button className="option-button" onClick={() => changeSelect('completed')}>Completed</button>
        </div>
      </div>
    </>
    )
}

export default InputPart