export const TestCases = ({ tests }) => {
  return (
    <div className="test-cases">
      <h1>Testcases</h1>
      {tests && tests.map((test, index) => {
        const passed = test.passed ? 'Passed' : 'Failed';
        const statusClass = test.passed ? 'test-passed' : 'test-failed';

        return (
          <div key={`testcase-${index}`} className={`test-case ${statusClass}`}>
            <h2>Testcase {index + 1}: {passed}</h2>
            <div className="test-case-details">
              <p><strong>Input:</strong> {test.input}</p>
              <p><strong>Expected Output:</strong> {test.expectedOutput}</p>
              <p><strong>Actual Output:</strong> {test.actualOutput}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

