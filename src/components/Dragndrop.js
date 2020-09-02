import React, { useRef } from 'react';

function DragNDrop(props) {
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    props.handleItemsParams(dragItem.current);
  };

  const handleDragEnter = (e, params) => {
    console.log('entering...', params);
    console.log(dragNode.current);
    console.log(e.target);
    props.handleEnterDrag({
      currentItem: dragItem.current, //los datos del que estoy moviendo
      params: params, //los datos donde entra
      nodeEnter: e.target, //nodo al que me muevo con el evento
      nodeMove: dragNode.current, //mi nodo
    });
  };

  const handleDragEnd = () => {
    console.log('final drag...');
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    props.handleDragEndItems(false);
  };

  //el estado lo tengo en la app, por tanto debo usar la funcion y subirla a la madre.

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
        console.log(grp.items.length);
        return (
          <div
            draggable="true"
            key={grp.title}
            name={grp}
            className="dnd-group"
            onDragEnter={
              props.dragging && !grp.items.length
                ? (e) => {
                    handleDragEnter(e, { grpI, itemI: 0 });
                  }
                : null
            }
          >
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemI) => {
              return (
                <div
                  draggable="true"
                  onDragStart={(e) => {
                    handleDragStart(e, { grpI, itemI });
                  }}
                  onDragEnter={
                    props.dragging
                      ? (e) => {
                          handleDragEnter(e, { grpI, itemI });
                        }
                      : null
                  }
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
