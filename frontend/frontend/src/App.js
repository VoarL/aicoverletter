import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState('');
  const [industry, setIndustry] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate-cover-letter', {
        resume,
        industry,
        position,
        job_description: jobDescription,
        company_website: companyWebsite
      });

      setCoverLetter(response.data.cover_letter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }
  };

  return (
    <div className="App">
      <h1>Cover Letter Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your resume..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows="6"
        />
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows="6"
        />
        <input
          type="text"
          placeholder="Company Website"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
        <button type="submit">Generate Cover Letter</button>
      </form>

      {coverLetter && (
        <div>
          <h2>Generated Cover Letter:</h2>
          <pre>{coverLetter}</pre>
        </div>
      )}
    </div>
  );
}

export default App;