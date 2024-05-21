import Total from './Total'

const Course = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
            </ul>
            <Total
                total={[...course.parts].reduce((prevValue, currValue) => prevValue + currValue.exercises,0)}
            />
        </>
    )
}

export default Course