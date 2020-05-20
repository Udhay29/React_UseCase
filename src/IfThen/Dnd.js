import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useDrop } from 'react-dnd'
import Card from './Card'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'
const style = {
  width: 400,
}
const DnD = () => {
  const [list, SetListData] = useState([]);
  const [cards, setCards] = useState(list);
  const [errArr, SetErrArr] = useState([]);
  const [errArr1, SetErrArr1] = useState([]);
  const [gate, SetGate] = useState([]);
  const [listFlag, SetListFlag] = useState(false);
  useEffect(() => {
    setCards([...list]);
    if(listFlag) {
      gateCheck();
    }
    SetListFlag(false);
  }, [list]);
  useEffect(() => {
    SetErrArr1([...errArr]);
  }, [errArr]);

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id)
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      }),
    )
  }
  const findCard = (id) => {
    const card = cards.filter((c) => `${c.id}` === id)[0]
    return {
      card,
      index: cards.indexOf(card),
    }
  }
  
  const addNewCon = () => {
    SetListData(listVal => [...listVal, {
      id: listVal.length+1, text: `${listVal.length+1}`, left: '', right: ''
    }]);
    SetListFlag(true);
  }

  const updateVal = (inx, inpVal) => {
    const lst = [...list];
    lst.splice(inx, 1, {id: inx+1, text: inpVal});
    SetListData([...lst]);
  }

  const spanVal = (val, inx, span) => {
    const lst = [...list];
    lst[inx][span] = val;
    SetListData([...lst]);
    updateGroup();
  }

  const gateCheck = () => {
    if(list.length > 1) {
      // if(gate.length >= list.length) {
      //   const a = [...gate];
      //   a.pop();
      //   SetGate([...a]);
      //   // console.log(a);
      // } else {
        const a = [...gate];
      a.push({id: a.length+1, gate: 'and'});
      SetGate([...a]);
      // }
    }
    
  }
  const updateGroup = () => {
    const lst = [...list];
    let a = [], b = [], a1 = [], b1 = [], comArr = [];
    lst.forEach((data, index) => {
      if(data.left === '('){
        a.push(index)
      }
      if(data.right === ')'){
        b.push(index)
      }
    });
    a1 = a.filter(val => !b.includes(val));
    b1 = b.filter(val => !a.includes(val));
    a1.forEach((data, index) => {
      if(data > b1[index] || typeof b1[index] === 'undefined') {
        comArr.push(data);
      }
    });
    b1.forEach((data, index) => {
      if(data < a1[index] || typeof a1[index] === 'undefined'){
        comArr.push(data);
      }
    })
    SetErrArr([...comArr])
  }
  const toggleGate = (inx) => {
    const a = [...gate];
    const b = a[inx]['gate'] === 'and' ? 'or' : 'and';
    a[inx]['gate'] = b;
    SetGate([...a]);
  }
  const [, drop] = useDrop({ accept: ItemTypes.CARD })

  return (
    <> 
       {list.length === 0 && 
          <div className="no-data">
              <div>
                  <h6>No Conditions</h6>
                  <p onClick={addNewCon}>+ New Condition</p>
              </div>
          </div>
      }
      {list.length > 0 && 
      <div>
      <div className="condition">
          <p onClick={addNewCon}>+ New Condition</p>
      </div>
      </div>}
      <div className="content-wrapper">
        <div ref={drop} className="card-list">
          {cards.map((card, inx) => (
            <Card
              key={card.id}
              id={`${card.id}`}
              text={card.text}
              moveCard={moveCard}
              findCard={findCard}
              updateFn = {updateVal}
              spanUpdate = {spanVal}
              indx = {inx}
              ErrFlag = {errArr1.indexOf(inx) >= 0}
            />
          ))}
        </div>
        {gate.length > 0 && <div className="gate">
          {gate.map((data, index) => {
            return <div key={data.id}><span onClick={() => toggleGate(index)}>{data.gate}</span></div>
          })}
          </div>}
      </div>
      
    </>
  )
}
export default DnD
