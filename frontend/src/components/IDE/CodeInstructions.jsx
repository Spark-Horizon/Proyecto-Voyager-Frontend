import { Loading } from '../Loading.jsx';
import '../../styles/ide/codeInstructions.css';

export const CodeInstructions = ({data}) => {
  if (!data) {
    return (
      <div className='loading-code-instructions'>
        <Loading/>
      </div>
    )
  }

  const { author, title, description, topic, difficulty, tests } = data;
  const difficultyClass = 'code-instructions-difficulty badge ' + difficulty;

  const formattedTests = tests.map((test) => (
    <tr key={test.id}>
      <td>{test.input}</td>
      <td>{test.output}</td>
    </tr>
  ));

  return (
    <div className="code-instructions">

      <div className="code-instructions-topic">
        <h2>{topic}</h2>
      </div>


      <div className="code-instructions-content">
        <div className="code-instructions-title">
          <h3>{title}</h3>
          <span className={difficultyClass}>{difficulty}</span>
        </div>
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
        <div className="code-instructions-author">Autor: {author}</div>
      </div>

    </div>
  );
};
