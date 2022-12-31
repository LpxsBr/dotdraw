import './App.css';
import { useState } from 'react';

function App() {

  const [DotList, setDotList] = useState([]);
  const [width, SetWidth] = useState(10);
  const [dotColor,setDotColor] = useState('#000')
  const [history, setHistory] = useState([])

  const range = (event) => SetWidth(event.target.valueAsNumber)
  const color = (event) => setDotColor(event.target.value)

  const createDot = (event) => {
    const theDot = {
      top: event.clientY,
      left: event.clientX,
      width: width,
      color: dotColor
    }
    setDotList((prev) => [...prev, theDot])
  }

  const redo = () => {
    console.log('redo')
  }
  const undo = () => {
    console.log('undo')
    setDotList((prev) => {
      // setHistory(() => [...DotList[DotList.length - 1]])
      console.log(history)
      const newDotList = [...prev].slice(0, - 1)
      return newDotList
    })
  }

  return (
    <div className="App">
      <header>
        <div className='welcome'>
          <h3>Welcome to React DotDraw</h3>
        </div>
        <div className='draw-options'>
          <button onClick={window.print}>Save</button>
          <input type={'range'} onChange={range} min={10} value={width} />
          <input type={'color'} onChange={color} />
          <button onClick={undo}>{'<< Undo'}</button>
          <button onClick={redo}>{'Redo >>'}</button>
        </div>
      </header>
      <div className='quadro' onMouseMove={createDot}>
        {DotList.map((item, key) => {
          return (
            <div key={key} className='dot' style={{backgroundColor: item.color,width: item.width, height: item.width, top: item.top, left: item.left}}/>
              )
        })}
      </div>
      <div>
        <h5>Source Code: <a>lalala</a></h5>
      </div>
    </div>
  );
}

export default App;
