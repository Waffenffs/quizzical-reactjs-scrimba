import React from 'react'
import { useState } from 'react'
import '../App.css'
import '../index.css'

export default function Questions({questionDB}) {
    // hold answers
    const [answers, setAnswers] = useState([])


    // determine whether to show results
    const [showResults, setShowResults] = useState(false)
    

    // handle clickEvents
    function handleClick(e, thisId, index){
        const {value, name} = e.target
        const newAnswers = answers.filter((data) => (data.uniqueid !== thisId))

        setAnswers([
            ...newAnswers,
            {
                uniqueid: thisId,
                correctness: value,
                question: name,
                index: index,
            }
        ])

        setActive([
            ...active,
            thisId
        ])
    }


    function handleSubmit(e){
        e.preventDefault() // stop from reloading the page
        setShowResults(true)
        handleResults()
        setDisplayResults
    }


    // show how many questions the user got correct
    const resultElements = answers.filter((answer) => {
        return answer.correctness === "correct"
    })


    // gets the current answer
    function getCurrentAnswer(thisId){
        const currentAnswArray = answers.filter((answer) => {
            return answer.uniqueid === thisId
        })
        const currentAnsw = currentAnswArray.length < 1 ? 'no-answer' : currentAnswArray[0].question
        return currentAnsw
    }


    const pageElements = questionDB.map((data, index) => {
        const currentAnsw = getCurrentAnswer(data.id)

        const incorrectAnswer = data.incorrect_answers.map((incorrectAnswer) => {
            return(
                <button
                type="button"
                id={data.id}
                name={incorrectAnswer}
                value="incorrect"
                className='button'
                onClick={(e)=>handleClick(e, data.id, index)}>{incorrectAnswer}</button>
            )
        })

        const correctAnswer = (
            <button
            type="button"
            id={data.id}
            name={data.correct_answer}
            value="correct"
            className='button'
            onClick={(e)=>handleClick(e, data.id, index)}>{data.correct_answer}</button>
        )

        return(
            <div className="questionContainer">
                <h1 className='question'>{data.question}</h1>
                <div className="buttons">
                    {incorrectAnswer}
                    {correctAnswer}
                </div>
                <p>Answer: {`[${currentAnsw}]`}</p>
                <div className="divider"></div>
            </div>
        )
    })


    return(
        <div className="display">
            {!showResults && <form className="content" onSubmit={handleSubmit}>
                {pageElements}
                <div className="endSection">
                    <button className='submit--button'>Check Answers</button>
                </div>
            </form>}
            {showResults && 
            <div className="resultContainer">
                <h1 className='results'>{showResults && `You scored ${resultElements.length}/10 correct answers!`}</h1>
                <a href="" className='redirect'><button className='try--button'>Try again?</button></a>
            </div>
            }
        </div>

    )
}
