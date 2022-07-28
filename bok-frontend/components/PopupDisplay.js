import {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';

function PopupDisplay({ data,  }) {

  return (
    <Popup
    trigger={<button onClick={() => console.log("test")} className="button"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
            Test
            
        </div>
        <div className="actions">
        </div>
      </div>
    )}
  </Popup>
  )
}

export default PopupDisplay