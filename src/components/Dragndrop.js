import React, { useState, useRef, useEffect } from 'react';

function DragNDrop(props) {
  console.log(props);
  const dragItem = useRef();
  const handleDragStart = (e, params) => {
    dragItem.current = params;
    console.log(dragItem.current);
    props.handleItemsParams(dragItem.current);
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
      return 'current dnd-item';
    }
    return 'dnd-item';
  };
  return (
    <div className="drag-n-drop">
      {props.data.map((grp, grpI) => {
        return (
          <div key={grp.title} name={grp} className="dnd-group">
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemI) => {
              return (
                <div
                  draggable="true"
                  onDragStart={(e) => {
                    handleDragStart(e, { grpI, itemI });
                  }}
                  key={item}
                  name={item}
                  className={props.dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DragNDrop;
//con cada map, puedo obtener map(el item, el índice, el array)
