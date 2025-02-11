from flask import Flask, request, jsonify
import openai
from flask_cors import CORS  # For handling CORS requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Create the Flask app instance
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/generate-cover-letter', methods=['POST'])
def generate_cover_letter():
    try:
        # Get the JSON data from the request
        data = request.json
        print(f"Received data: {data}")  # Log the incoming data

        # Extract values from the data
        resume = data.get('resume')
        industry = data.get('industry')
        position = data.get('position')
        job_description = data.get('job_description')
        company_website = data.get('company_website')
        previous_cover_letter = data.get('previous_cover_letter')

        # Construct the prompt
        prompt1 = f"""
        Create a professional cover letter for the position of {position} in the {industry} industry.
        The job description is as follows: {job_description}.
        Here is the candidate's resume: {resume}.
        The company website is {company_website}.
        Use Previous Cover Letter for ideas about me: {previous_cover_letter}
        Please format the cover letter in a concise and formal tone.
        Use the following template for ideas for each paragraphs: 
            I would then do a paragraph about why I am interested in the company and position (why I want to work here and why I am applying) connecting back to how my interests/values/work culture align with that of the job

            I would then go into another paragraph touching on how my technical skills would make me excel at the job (look at the job description and see how your skills and past experiences fit into that).

            I would then end with a quick outro of I'm excited about the position and I look forward to talking with your further about the job opportunity.
        """
        #print(f"Generated prompt: {prompt1}")  # Log the generated prompt

        # Call the OpenAI API using chat_completions for chat models
        response = openai.completions.create(
            model = "gpt-3.5-turbo-instruct",
            prompt = prompt1,
            max_tokens = 1400,
            temperature = 0.7,
        )
        #print(f"API response: {response}")  # Log the response from OpenAI

        # Extract and return the cover letter
        cover_letter = response.choices[0].text.strip()  # Correct way to get message content

        # Replace double newlines with <p> tags for paragraphs
        cover_letter_html = cover_letter.replace('\n\n', '</p><p>').strip()

        # Wrap the entire content in <p> tags if not already wrapped
        cover_letter_html = f"<p>{cover_letter_html}</p>"

        # Replace single newlines with <br /> for line breaks within paragraphs
        cover_letter_html = cover_letter_html.replace('\n', '<br />')
        
        #print(f"Generated cover letter: {cover_letter}")  # Log the final cover letter
        return jsonify({'cover_letter': cover_letter_html})

    except Exception as e:
        # Log any errors that occur
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while generating the cover letter.'}), 500

if __name__ == '__main__':
    app.run(debug=True)