

function StartScreen({ numquestions, dispatch }) {
    return (
        <div className="start">
            <h2>welcome To The React Quiz!</h2>
            <h3>{numquestions} questions To Test Your React Mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>let's Go</button>

        </div>
    )
}

export default StartScreen
