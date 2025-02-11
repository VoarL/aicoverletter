import React, { useState } from 'react';

function CoverLetterGenerator() {
  // State variables for each input field
  const [resume, setResume] = useState("");
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [previousCoverLetter, setPreviousCoverLetter] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  // Function to handle form submission
  const generateCoverLetter = async () => {
    const response = await fetch("http://localhost:5000/generate-cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        resume,
        industry,
        position,
        job_description: jobDescription,
        company_website: companyWebsite,
        previous_cover_letter: previousCoverLetter
      })
    });

    const data = await response.json();
    // Ensure the response is a string and set the cover letter state
    if (typeof data.cover_letter === 'string') {
      setCoverLetter(data.cover_letter);
    } else {
      console.error('Cover letter is not a string:', data.cover_letter);
    }
  };

  return (
    <div>
      <h2>Generate Your Cover Letter</h2>
      <form onSubmit={(e) => { e.preventDefault(); generateCoverLetter(); }}>
        <div>
          <label>Resume Text:</label>
          <textarea 
            value={resume} 
            onChange={(e) => setResume(e.target.value)} 
            rows="4" 
            cols="50" 
            placeholder="Enter your resume details"
          />
        </div>
        <div>
          <label>Industry:</label>
          <input 
            type="text" 
            value={industry} 
            onChange={(e) => setIndustry(e.target.value)} 
            placeholder="Enter the industry"
          />
        </div>
        <div>
          <label>Position:</label>
          <input 
            type="text" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            placeholder="Enter the position you're applying for"
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea 
            value={jobDescription} 
            onChange={(e) => setJobDescription(e.target.value)} 
            rows="4" 
            cols="50" 
            placeholder="Enter the job description"
          />
        </div>
        <div>
          <label>Company Website:</label>
          <input 
            type="url" 
            value={companyWebsite} 
            onChange={(e) => setCompanyWebsite(e.target.value)} 
            placeholder="Enter the company website URL"
          />
        </div>
        <div>
          <label>Previous Cover Letter:</label>
          <textarea 
            value={previousCoverLetter} 
            onChange={(e) => setPreviousCoverLetter(e.target.value)} 
            rows="4" 
            cols="50" 
            placeholder="Enter previous cover letter"
          />
        </div>
        <button type="submit">Generate Cover Letter</button>
      </form>

      <h3>Generated Cover Letter:</h3>
      <div 
        className="cover-letter-container"
        dangerouslySetInnerHTML={{ __html: coverLetter }} 
      />
    </div>
  );
}

export default CoverLetterGenerator;