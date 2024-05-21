const Anecdote  = ({ anecdote, numVotes}) => {
    return (
        <>
            <div>{anecdote}</div>
            <div>{`has ${numVotes} votes`}</div>
        </>
    )
};

export default Anecdote