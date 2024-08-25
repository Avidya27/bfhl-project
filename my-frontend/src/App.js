import React, { useState } from 'react';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('YOUR_BACKEND_API_URL/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      setResponse(result);
      setError('');
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const filteredResponse = () => {
    if (!response) return null;

    let filteredData = {};
    selectedOptions.forEach(option => {
      filteredData[option.value] = response[option.value];
    });

    return filteredData;
  };

  return (
    <div>
      <h1>API Input</h1>
      <textarea value={jsonInput} onChange={handleInputChange} rows="4" cols="50"></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <>
          <h2>Multi Filter</h2>
          <Select
            isMulti
            options={[
              { value: 'numbers', label: 'Numbers' },
              { value: 'alphabets', label: 'Alphabets' },
              { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
            ]}
            onChange={handleSelectChange}
          />
          <h3>Filtered Response</h3>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;

