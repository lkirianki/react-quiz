function progress({ index, numquestions, points, maxpoints, answer }) {
    return (
        <header className="progress">

            <progress max={numquestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong>/{numquestions}</p>

            <p><strong>{points}</strong>/{maxpoints}</p>

        </header>
    )
}

export default progress
