import React from "react"

export default function Start({handleStart}) {
    return(
        <div className="start">
            <h1 className="title">Quizzical</h1>
            <p className="para">Test your wits!</p>
            <button onClick={handleStart} className="start-button">Start quiz</button>
        </div>
    )
}