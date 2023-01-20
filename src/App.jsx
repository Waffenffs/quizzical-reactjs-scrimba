import React from "react"
import {useState, useEffect} from 'react'
import Start from './components/Start'
import Questions from './components/Questions'
import './App.css'
import './index.css'
import { nanoid } from "nanoid"

export default function App() {
  // setup states
  const [questionDB, setQuestionDB] = useState(null )
  const [start, setStart] = useState(true)
  const [show, setShow] = useState(false)

  // fetch API during initialization
  useEffect(()=> {
    const fetchData = async () => {
      await (await fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=hard&type=multiple'))
      .json().then(data => {
        const resultingArray = data.results.map((data) => {
          return {
            id: nanoid(),
            question: data.question,
            correct_answer: data.correct_answer,
            incorrect_answers: data.incorrect_answers.map((answer) => (answer))
          }
        })
        setQuestionDB(resultingArray)
      })
    }
    fetchData()
  }, [])

  // handle conditional rendering
  function handleStart() {
    setStart(false)
    setShow(true)
  }

  return(
    <main>
      {start && 
      <div className="startSection">
        <Start handleStart={handleStart}/>
      </div>}
      {show && <Questions questionDB={questionDB} />}
    </main>
  )
}