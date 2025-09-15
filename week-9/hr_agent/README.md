# HR Agent

A chat-only HR assistant that helps recruiters search for candidates, save shortlists, draft outreach emails with HTML preview, and view analytics.

## Features

- **Candidate Search**: Search candidates by skills, location, experience, and availability
- **Shortlist Management**: Save selected candidates to named shortlists
- **Email Drafting**: Generate professional outreach emails with HTML preview
- **Analytics**: View candidate pipeline statistics and top skills

## Setup

1. Install dependencies:
```bash
pip install openai python-dotenv pydantic pymongo
```

2. Create a `.env` file with your OpenAI configuration:
```
API_KEY=your_openai_api_key
BASE_URL=https://api.openai.com/v1
MODEL=gpt-4o-mini
```

3. Run the application:
```bash
python hr_agent.py
```

## Example Usage

### 1. Search Candidates
```
Find top 5 React interns in Casablanca, 0–2 years, available this month
```

### 2. Save Shortlist
```
Save #1 #3 as "FE-Intern-A"
```

### 3. Draft Email
```
Draft an outreach email for "FE-Intern-A" using job "Frontend Intern" in friendly tone
```

### 4. Show Analytics
```
Show analytics
```

## Data Structure

The application uses JSON files in the `data/` folder:
- `candidates.json`: Candidate information with skills, experience, location, etc.
- `jobs.json`: Available job positions with requirements

## Scoring Algorithm

Candidates are scored based on:
- +2 points per required skill match
- +1 point for exact location match
- +1 point if experience within range (±1 year flexibility)
- +1 point if available within specified timeframe

## Features Implemented

✅ Candidate search with intelligent matching  
✅ Shortlist management (in-memory storage)  
✅ Email drafting with HTML preview  
✅ Analytics dashboard with pipeline and skills data  
✅ Prompt chaining for intent analysis and query parsing  
✅ Professional HTML email templates with inline CSS  

## Architecture

The application follows a prompt chaining architecture:
1. **Intent Analysis**: Determine user's intent from input
2. **Query Parsing**: Extract search parameters or action details
3. **Function Execution**: Route to appropriate handler
4. **Response Generation**: Format and present results

Each feature uses structured outputs with Pydantic models for reliable parsing and validation.