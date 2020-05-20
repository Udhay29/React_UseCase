import React, { useState, useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const style = {
  border: '1px solid #80808047',
  padding: '2px',
  marginBottom: '45px',
  backgroundColor: 'white',
  cursor: 'move',
}
const Card = ({ id, text, moveCard, findCard, updateFn, spanUpdate, indx, ErrFlag }) => {
  const [dnClickFlag, SetDbClickFlag] = useState(false);
  const [inpVal, SetInpVal] = useState('');
  const inpRef = useRef();
  const [span1, SetSpanVal] = useState('+');
  const [span2, SetSpanVal2] = useState('+');
  useEffect(() => {
    if(dnClickFlag){
      inpRef.current.focus();
    }
  }, [dnClickFlag]);
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem()
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveCard(droppedId, originalIndex)
      }
    },
  })
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id)
        moveCard(draggedId, overIndex)
      }
    },
  })
  const dnClick = (txt) => {
    if(dnClickFlag === false){
      SetDbClickFlag(true);
      SetInpVal(txt);
    }
  }
  const onBlurFn = (e) => {
    updateFn(indx, inpVal);
    SetDbClickFlag(false);
  }
  const dropDownSelect = (e) => {
    SetSpanVal(e);
    spanUpdate(e, indx, 'left');
  }
  const dropDownSelect2 = (e) => {
    SetSpanVal2(e);
    spanUpdate(e, indx, 'right');
  }
  const opacity = isDragging ? 0 : 1
  return (
    <div className={(ErrFlag ? 'err-cond' : '')} onDoubleClick = {() => dnClick(text)} ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {!dnClickFlag && 
      <div className="list">
        {/* <span className="left-span">+</span>  */}
        
        <Dropdown className="left-span" onSelect={dropDownSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {span1}
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item eventKey="+">+</Dropdown.Item>
            <Dropdown.Item eventKey="(">(</Dropdown.Item>
            <Dropdown.Item eventKey="!">!</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <p>{text}</p>
        <Dropdown className="right-span" onSelect={dropDownSelect2}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {span2}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey=")">)</Dropdown.Item>
            <Dropdown.Item eventKey="+">+</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <span className="right-span">+ </span> */}
      </div>}
      {dnClickFlag && <input type="text" name="exptxt" ref = {inpRef} value = {inpVal} onChange={(e) => {SetInpVal(e.target.value)}} onBlur={onBlurFn}/>}
    </div>
  )
}
export default Card
