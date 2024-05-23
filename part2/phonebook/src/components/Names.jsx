const Names = ({persons, handleDelete}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></li>)}
            </ul>
        </>
    )
}

export default Names