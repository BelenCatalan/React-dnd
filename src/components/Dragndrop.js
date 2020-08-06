import React, { useState, useRef, useEffect } from 'react';

function DragNDrop(props) {
  return (
    <div className="drag-n-drop">
      {props.data.map((grp) => {
        return (
          <div key={grp.title} className="dnd-group">
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item) => {
              return (
                <div draggable="true" key={item} className="dnd-item">
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
