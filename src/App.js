import React, { useEffect, useState } from 'react';
// import Board from './components/Board';
// import Card from './components/Card';
import getData from './services/getData';
import DragNDrop from './components/Dragndrop';
import './main.css';

function App() {
  const [dataList, setDataList] = useState([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let data = getData();
    setDataList(data);
  }, []);

  const handleItemsParams = (data) => {
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEndItems = (data) => {
    setDragging(data);
  };

  const handleEnterDrag = (data) => {
    if (data.nodeEnter !== data.nodeMove) {
      console.log('is not the same');
      setDataList((dataList) => {
        let newDataList = [...dataList];
        newDataList[data.params.grpI].items.splice(data.params.itemI, 0, dataList[data.currentItem.grpI].items.splice(data.currentItem.itemI, 1)[0]);
        data.currentItem.grpI = data.params.grpI;
        data.currentItem.itemI = data.params.itemI;
        return newDataList;
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={dataList} handleItemsParams={handleItemsParams} dragging={dragging} handleDragEndItems={handleDragEndItems} handleEnterDrag={handleEnterDrag} />
      </header>
    </div>

    //SECOND FORM
    // <div className="App">
    //   <main className="flexbox">
    //     <Board id="board-1" className="board">
    //       <Card id="card-1" className="card" draggable="true">
    //         <p>Card one</p>
    //       </Card>
    //       <Card id="card-1-1" className="card" draggable="true">
    //         <p>Card one-one</p>
    //       </Card>
    //     </Board>

    //     <Board id="board-2" className="board">
    //       <Card id="card-2" className="card" draggable="true">
    //         <p>Card two</p>
    //       </Card>
    //     </Board>
    //   </main>
    // </div>
  );
}

export default App;
