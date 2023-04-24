import { useGetCodeTask } from '../../hooks/useGetCodeTask.js'

export const CodeInstructions = ({ problem_id }) => {
    const { data } = useGetCodeTask(problem_id);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const { id, author, title, description, topic, difficulty, driver, tests } = data;
    const formattedTests = tests.map((test) => `${test.input} => ${test.output}`).join(", ");
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Author: {author}</p>
            <p>Topic: {topic}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Driver: {driver}</p>
            <p>Tests: {formattedTests}</p>
        </div>
    );
}