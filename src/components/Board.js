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
        if(DotList.length !== 0){
            setHistory((prev) => {
                const newHistory = [...prev, DotList[DotList.length - 1]]
                console.log({ history: history })
                return newHistory;
            })
            
            setDotList((prev) => {
                const newDotList = [...prev].slice(0, - 1)
                console.log({ dotList: newDotList })
                return newDotList
            })
        }
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
            <div className="social">
                <a href="https://www.github.com/LpxsBr" target={"_blank"} rel={"noreferrer"}>
                    <img src="https://img.shields.io/badge/-Anselmo%20LpxsBr-blue?style=flat-square&logo=Github&logoColor=white&link=https://github.com/LpxsBr" alt="badge perfil github"/>
                </a>
                <a href="https://www.github.com/LpxsBr/dotdraw" target={"_blank"} rel={"noreferrer"}>
                    <img src="https://img.shields.io/github/watchers/LpxsBr/dotdraw?style=social&label=Resposit%C3%B3rio" alt="badge respositorio github"/>
                </a>
                <img src="https://img.shields.io/github/watchers/LpxsBr/dotdraw?style=social" alt="badge start watcher github"/>
            </div>
        </div>
    )
}

export default Board;