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

        # Construct the prompt
        prompt1 = f"""
        Create a professional cover letter for the position of {position} in the {industry} industry.
        The job description is as follows: {job_description}.
        Here is the candidate's resume: {resume}.
        The company website is {company_website}.
        Please format the cover letter in a concise and formal tone.
        """
        #print(f"Generated prompt: {prompt1}")  # Log the generated prompt

        # Call the OpenAI API using chat_completions for chat models
        response = openai.completions.create(
            model = "gpt-3.5-turbo-instruct",
            prompt = prompt1,
            max_tokens = 1400,
            temperature = 0.7,
        )
        print(f"API response: {response}")  # Log the response from OpenAI

        # Extract and return the cover letter
        cover_letter = response.choices[0].text.strip()  # Correct way to get message content
        print(f"Generated cover letter: {cover_letter}")  # Log the final cover letter
        return jsonify({'cover_letter': cover_letter})

    except Exception as e:
        # Log any errors that occur
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while generating the cover letter.'}), 500

if __name__ == '__main__':
    app.run(debug=True)