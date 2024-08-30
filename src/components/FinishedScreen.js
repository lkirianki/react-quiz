

function FinishedScreen({ points, maxpoints, highscore, dispatch }) {
    const percentage = (points / maxpoints) * 100

    return (
        <>
            <p className="result">
                You Scored <strong>{points}</strong> out of {maxpoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="highscore"> High Score:<strong>{highscore}</strong></p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 're-start' })}>Re-start quiz</button>
        </>
    )
}

export default FinishedScreen
