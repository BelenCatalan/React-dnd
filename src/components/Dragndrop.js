import React, { useState, useRef, useEffect } from 'react';

function DragNDrop(props) {
  const handleDragStart = (e) => {
    let whatItem = { value: e.target.value, name: e.target.name };
    console.log(whatItem);
  };
  return (
    <div className="drag-n-drop">
      {props.data.map((grp, grpI) => {
        return (
          <div key={grp.title} className="dnd-group">
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item) => {
              return (
                <div draggable="true" onDragStart={handleDragStart} key={item} name={item} className="dnd-item">
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
