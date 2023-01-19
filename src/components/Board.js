import { useState } from "react";

function Board() {

    const [DotList, setDotList] = useState([]);
    const [width, SetWidth] = useState(10);
    const [dotColor, setDotColor] = useState('#000')
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
        setHistory([])
    }

    const redo = () => {
        console.log('redo')
        setHistory((prev) => {
            const newHistory = [...prev].slice(0, - 1)
            console.log({ dotList: newHistory })
            return newHistory
        })
        if(history.length !== 0){
            setDotList((prev) => {
                const newDotList = [...prev, history[history.length - 1]]
                console.log({ history: history })
                return newDotList;
            })
        }
    }

    const undo = () => {
        console.log('undo')
        setHistory((prev) => {
            const newHistory = [...prev, DotList[DotList.length - 1]]
            console.log({ dotList: newHistory })
            return newHistory;
        })
        console.log({ history: history })
        console.log(DotList[DotList.length - 1])
        setDotList((prev) => {
            const newDotList = [...prev].slice(0, - 1)
            console.log({ dotList: newDotList })
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
                    <div className="draw-save">
                        <button onClick={window.print}>Save</button>
                    </div>
                    <div className="dot-controller">
                        <input type={'range'} onChange={range} min={10} value={width} />
                        <input type={'color'} onChange={color} />
                    </div>
                    <div className="version-controller">
                        <button onClick={undo}>{'<< Undo'}</button>
                        <button onClick={redo}>{'Redo >>'}</button>
                    </div>
                </div>
            </header>
            <div className='quadro' onClick={createDot}>
                {DotList.map((item, key) => {
                    return (
                        <div key={key} className='dot' style={{ backgroundColor: item.color, width: item.width, height: item.width, top: item.top, left: item.left }} />
                    )
                })}
            </div>
            <div>
                <h5>Source Code: <a>lalala</a></h5>
            </div>
        </div>
    )
}

export default Board;