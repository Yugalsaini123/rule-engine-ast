// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ruleString, setRuleString] = useState('');
  const [data, setData] = useState('');
  const [ruleId, setRuleId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateRule = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/rules/create', { ruleString });
      setRuleId(response.data.id);
      alert('Rule successfully created!');
    } catch (error) {
      setError('Error creating rule: ' + error.response?.data?.error || error.message);
    }
  };

  const handleEvaluateRule = async () => {
    try {
      setError(null);
      const parsedData = JSON.parse(data); // This assumes valid JSON input
      const response = await axios.post('http://localhost:5000/api/rules/evaluate', {
        ruleId,
        data: parsedData,
      });
      setResult(response.data.result);
    } catch (error) {
      setError('Error evaluating rule: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine</h1>

      <div>
        <h2>Create Rule</h2>
        <textarea
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule string"
        />
        <button onClick={handleCreateRule}>Create Rule</button>
      </div>

      <div>
        <h2>Evaluate Rule</h2>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter JSON data"
        />
        <button onClick={handleEvaluateRule}>Evaluate Rule</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {result !== null && (
        <div>
          <h2>Result</h2>
          <p>{result ? 'Rule satisfied' : 'Rule not satisfied'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
