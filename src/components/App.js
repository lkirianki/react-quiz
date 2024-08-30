import { useEffect } from 'react';
import { useReducer } from 'react';

import Header from './Header';
import Main from './main';
import Loader from './Loader';
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress.js';
import FinishedScreen from './FinishedScreen.js';
import Footer from './Footer.js';
import Timer from './Timer.js';



const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'laoding', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {

    case 'dataRecieved': return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed': return { ...state, status: 'error' };
    case 'start': return { ...state, status: 'active', secondsRemaining: state.questions.length * SEC_PER_QUESTION }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? (state.points + question.points) : state.points,
      }
    case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
    case 'finished': return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }
    case 're-start': return { ...state, questions: state.questions, status: 'ready' }
    case 'tick': return {
      ...state, secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 0 ? 'finished' : state.status
    }

    default:
      throw new Error("uknown action");

  }
}

export default function App() {

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);


  const numquestions = questions.length
  const maxpoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])
  return (
    <div className="app">
      <Header />

      <Main>

        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numquestions={numquestions} dispatch={dispatch} />}
        {status === 'active' && <>
          <Progress index={index} numquestions={numquestions} points={points} maxpoints={maxpoints} answer={answer} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextQuestion dispatch={dispatch} answer={answer} index={index} numquestions={numquestions} />
          </Footer>
        </>
        }
        {status === 'finished' && <FinishedScreen points={points} maxpoints={maxpoints} highscore={highscore} dispatch={dispatch} />}



      </Main>
    </div>
  )
}