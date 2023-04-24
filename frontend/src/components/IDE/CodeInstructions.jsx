import { useGetCodeTask } from '../../hooks/useGetCodeTask.js';
import '../../styles/codeInstructions.css';

export const CodeInstructions = ({ problem_id }) => {
  const { data } = useGetCodeTask(problem_id);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { author, title, description, topic, difficulty, tests } = data;

  const formattedTests = tests.map((test) => (
    <tr key={test.id}>
      <td>{test.input}</td>
      <td>{test.output}</td>
    </tr>
  ));

  return (
    <div className="code-instructions">
      <div className="code-instructions-info">
        <p className="code-instructions-topic">Tema: {topic}</p>
        <p className="code-instructions-difficulty">Dificultad: {difficulty}</p>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <table className="code-instructions-tests">
        <thead>
          <tr>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>{formattedTests}</tbody>
      </table>
      <p className="code-instructions-author">Autor: {author}</p>
    </div>
  );
};
