const Names = ({persons}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <li key={person.id}>{person.name} {person.number} <button>delete</button></li>)}
            </ul>
        </>
    )
}

export default Names