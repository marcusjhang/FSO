import Statistic from './Statistic'

const Statistics = ({ good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = total/3;
    const positive = (good - bad) / total;

    return (
        <>
            <h1>statistics</h1>
            { total ? (
                <table>
                    <tbody>
                        <Statistic text='good' value={good} />
                        <Statistic text='neutral' value={neutral} />
                        <Statistic text='bad' value={bad} />
                        <Statistic text='Average' value={average} />
                        <Statistic text='Positive' value={`${positive} %`} />
                    </tbody>
                </table> 
            ) : (
                'No feedback given'
            )
            }
        </>
    )
}

export default Statistics