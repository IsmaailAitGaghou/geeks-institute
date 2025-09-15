from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
from openai import OpenAI
import os
import json
import logging
from dotenv import load_dotenv
import re

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
MODEL = os.getenv("MODEL")


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


client = OpenAI(api_key=API_KEY, base_url=BASE_URL)


shortlists = {}

# --------------------------------------------------------------
# Data Models for Prompt Chaining
# --------------------------------------------------------------


class IntentAnalysis(BaseModel):
    """First step: Analyze user intent"""

    intent: str = Field(
        description="One of: search_candidates, save_shortlist, draft_email, show_analytics, edit_email"
    )
    confidence_score: float = Field(description="Confidence score between 0 and 1")
    extracted_info: str = Field(description="Key information extracted from the query")


class QueryParsing(BaseModel):
    """Second step: Parse search query"""

    role: Optional[str] = Field(description="Job role/title being searched for")
    skills: List[str] = Field(description="List of required skills")
    location: Optional[str] = Field(description="Location requirement")
    min_experience: Optional[int] = Field(description="Minimum years of experience")
    max_experience: Optional[int] = Field(description="Maximum years of experience")
    availability_window_days: Optional[int] = Field(
        description="Availability window in days from now"
    )


class CandidateMatch(BaseModel):
    """Individual candidate match result"""

    candidate_id: int = Field(description="Index of the candidate")
    candidate_name: str = Field(description="Full name of the candidate")
    score: int = Field(description="Matching score")
    reason: str = Field(description="One-line reason for the score")


class SearchResults(BaseModel):
    """Search results with top candidates"""

    matches: List[CandidateMatch] = Field(description="List of top matching candidates")
    total_found: int = Field(description="Total number of candidates found")


class EmailContent(BaseModel):
    """Email content generation"""

    subject: str = Field(description="Email subject line")
    text_content: str = Field(description="Plain text email content")
    tone: str = Field(description="Tone of the email")


class EmailTemplate(BaseModel):
    """HTML email template"""

    html_content: str = Field(
        description="Complete HTML email template with inline CSS"
    )
    template_style: str = Field(description="Description of the template style")


class ShortlistAction(BaseModel):
    """Shortlist save action"""

    shortlist_name: str = Field(description="Name for the shortlist")
    candidate_indices: List[int] = Field(
        description="List of candidate indices to save"
    )
    success: bool = Field(description="Whether the action was successful")


class AnalyticsSummary(BaseModel):
    """Analytics summary"""

    count_by_stage: Dict[str, int] = Field(description="Count of candidates by stage")
    top_skills: List[tuple] = Field(description="Top 3 skills with their counts")
    total_candidates: int = Field(description="Total number of candidates")


# --------------------------------------------------------------
# Data Loading Functions
# --------------------------------------------------------------


def load_candidates():
    """Load candidates from JSON file"""
    try:
        with open("data/candidates.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("candidates.json not found. Creating sample data.")
        return create_sample_candidates()


def load_jobs():
    """Load jobs from JSON file"""
    try:
        with open("data/jobs.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("jobs.json not found. Creating sample data.")
        return create_sample_jobs()


def create_sample_candidates():
    """Create sample candidates data"""
    candidates = [
        {
            "firstName": "Amina",
            "lastName": "El Idrissi",
            "email": "amina@example.com",
            "location": "Casablanca",
            "experienceYears": 1,
            "skills": ["React", "JavaScript", "HTML", "CSS"],
            "availabilityDate": "2025-10-01",
            "stage": "SOURCED",
            "notes": "Strong portfolio with React projects",
        },
        {
            "firstName": "Youssef",
            "lastName": "Bennani",
            "email": "youssef@example.com",
            "location": "Rabat",
            "experienceYears": 2,
            "skills": ["Python", "Django", "SQL", "Git"],
            "availabilityDate": "2025-09-15",
            "stage": "SCREEN",
            "notes": "Backend developer with Django experience",
        },
        {
            "firstName": "Sara",
            "lastName": "Alami",
            "email": "sara@example.com",
            "location": "Casablanca",
            "experienceYears": 0,
            "skills": ["React", "JavaScript", "Git", "HTML"],
            "availabilityDate": "2025-10-15",
            "stage": "SOURCED",
            "notes": "Recent graduate, eager to learn",
        },
        {
            "firstName": "Ahmed",
            "lastName": "Fahmi",
            "email": "ahmed@example.com",
            "location": "Marrakech",
            "experienceYears": 3,
            "skills": ["Python", "React", "SQL", "Docker"],
            "availabilityDate": "2025-11-01",
            "stage": "INTERVIEW",
            "notes": "Full-stack developer with strong background",
        },
        {
            "firstName": "Fatima",
            "lastName": "Zahra",
            "email": "fatima@example.com",
            "location": "Casablanca",
            "experienceYears": 1,
            "skills": ["JavaScript", "Vue.js", "CSS", "Git"],
            "availabilityDate": "2025-09-20",
            "stage": "SOURCED",
            "notes": "Frontend developer with Vue.js expertise",
        },
        {
            "firstName": "Omar",
            "lastName": "Benali",
            "email": "omar@example.com",
            "location": "Fes",
            "experienceYears": 2,
            "skills": ["Java", "Spring", "SQL", "Git"],
            "availabilityDate": "2025-10-10",
            "stage": "SCREEN",
            "notes": "Java developer with Spring framework",
        },
        {
            "firstName": "Aicha",
            "lastName": "Marouane",
            "email": "aicha@example.com",
            "location": "Casablanca",
            "experienceYears": 0,
            "skills": ["React", "JavaScript", "HTML", "CSS", "Git"],
            "availabilityDate": "2025-09-25",
            "stage": "SOURCED",
            "notes": "Bootcamp graduate with strong React skills",
        },
        {
            "firstName": "Karim",
            "lastName": "Hajji",
            "email": "karim@example.com",
            "location": "Tangier",
            "experienceYears": 4,
            "skills": ["Python", "Flask", "PostgreSQL", "Docker"],
            "availabilityDate": "2025-12-01",
            "stage": "INTERVIEW",
            "notes": "Senior backend developer",
        },
        {
            "firstName": "Nadia",
            "lastName": "Fassi",
            "email": "nadia@example.com",
            "location": "Rabat",
            "experienceYears": 1,
            "skills": ["React", "TypeScript", "Node.js", "Git"],
            "availabilityDate": "2025-09-30",
            "stage": "SOURCED",
            "notes": "Full-stack developer with TypeScript",
        },
        {
            "firstName": "Mehdi",
            "lastName": "Ouali",
            "email": "mehdi@example.com",
            "location": "Casablanca",
            "experienceYears": 2,
            "skills": ["React", "JavaScript", "Redux", "Git"],
            "availabilityDate": "2025-10-05",
            "stage": "SCREEN",
            "notes": "React specialist with Redux experience",
        },
        {
            "firstName": "Zineb",
            "lastName": "Tazi",
            "email": "zineb@example.com",
            "location": "Casablanca",
            "experienceYears": 0,
            "skills": ["Python", "Django", "HTML", "CSS"],
            "availabilityDate": "2025-09-18",
            "stage": "SOURCED",
            "notes": "Junior developer with Django knowledge",
        },
        {
            "firstName": "Hamza",
            "lastName": "Berrada",
            "email": "hamza@example.com",
            "location": "Agadir",
            "experienceYears": 3,
            "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
            "availabilityDate": "2025-11-15",
            "stage": "INTERVIEW",
            "notes": "MERN stack developer",
        },
    ]


    os.makedirs("data", exist_ok=True)

    with open("data/candidates.json", "w", encoding="utf-8") as f:
        json.dump(candidates, f, indent=2, ensure_ascii=False)

    return candidates


def create_sample_jobs():
    """Create sample jobs data"""
    jobs = [
        {
            "title": "Frontend Intern",
            "location": "Casablanca",
            "skillsRequired": ["React", "JavaScript", "Git"],
            "jdSnippet": "We build modern UI with React and follow Git workflows. Perfect for junior developers.",
        },
        {
            "title": "Backend Developer",
            "location": "Rabat",
            "skillsRequired": ["Python", "Django", "SQL"],
            "jdSnippet": "Backend development with Python and Django. Experience with databases required.",
        },
        {
            "title": "Full Stack Intern",
            "location": "Casablanca",
            "skillsRequired": ["React", "Node.js", "JavaScript"],
            "jdSnippet": "Full-stack development opportunity using React and Node.js for modern web applications.",
        },
    ]


    os.makedirs("data", exist_ok=True)

    with open("data/jobs.json", "w", encoding="utf-8") as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)

    return jobs


# --------------------------------------------------------------
# Core Chain Functions
# --------------------------------------------------------------


def analyze_intent(user_input: str) -> IntentAnalysis:
    """First step: Analyze user intent"""
    logger.info("Analyzing user intent")

    completion = client.beta.chat.completions.parse(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Analyze the user input and determine their intent. Possible intents are:
                - search_candidates: Looking for candidates (e.g., "find React developers", "search for interns")
                - save_shortlist: Saving candidates to a shortlist (e.g., "save #1 #3", "create shortlist")
                - draft_email: Wanting to draft an email (e.g., "draft email", "send message to")
                - show_analytics: Requesting analytics (e.g., "show analytics", "statistics")
                - edit_email: Editing previous email (e.g., "change subject", "modify email")
                
                Extract key information from the query that will be useful for the next steps.""",
            },
            {"role": "user", "content": user_input},
        ],
        response_format=IntentAnalysis,
    )

    result = completion.choices[0].message.parsed
    logger.info(
        f"Intent analysis - Intent: {result.intent}, Confidence: {result.confidence_score:.2f}"
    )
    return result


def parse_search_query(user_input: str) -> QueryParsing:
    """Second step: Parse search parameters"""
    logger.info("Parsing search query")

    completion = client.beta.chat.completions.parse(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Parse the user input to extract search criteria for candidates:
                - role: job title or role (e.g., "intern", "developer", "frontend")
                - skills: list of technical skills mentioned
                - location: city or location mentioned
                - min_experience/max_experience: years of experience range
                - availability_window_days: if they mention "this month" = 30, "available now" = 7, etc.
                
                Be flexible with the parsing and extract what's available.""",
            },
            {"role": "user", "content": user_input},
        ],
        response_format=QueryParsing,
    )

    result = completion.choices[0].message.parsed
    logger.info(
        f"Query parsed - Role: {result.role}, Skills: {result.skills}, Location: {result.location}"
    )
    return result


def calculate_candidate_score(candidate: Dict, filters: QueryParsing) -> tuple:
    """Calculate matching score for a candidate"""
    score = 0
    reasons = []


    if filters.skills:
        candidate_skills = [skill.lower() for skill in candidate.get("skills", [])]
        matched_skills = []
        for required_skill in filters.skills:
            for candidate_skill in candidate_skills:
                if (
                    required_skill.lower() in candidate_skill
                    or candidate_skill in required_skill.lower()
                ):
                    matched_skills.append(required_skill)
                    score += 2
                    break

        if matched_skills:
            reasons.append(
                f"{'+'.join(matched_skills)} match (+{len(matched_skills)*2})"
            )


    if filters.location and candidate.get("location"):
        if filters.location.lower() in candidate["location"].lower():
            score += 1
            reasons.append(f"{candidate['location']} (+1)")


    candidate_exp = candidate.get("experienceYears", 0)
    if filters.min_experience is not None or filters.max_experience is not None:
        min_exp = filters.min_experience or 0
        max_exp = filters.max_experience or 100


        if (min_exp - 1) <= candidate_exp <= (max_exp + 1):
            score += 1
            reasons.append(f"{candidate_exp}y fits (±1)")


    if filters.availability_window_days and candidate.get("availabilityDate"):
        try:
            avail_date = datetime.strptime(candidate["availabilityDate"], "%Y-%m-%d")
            days_until_available = (avail_date - datetime.now()).days

            if 0 <= days_until_available <= filters.availability_window_days:
                score += 1
                reasons.append("available soon (+1)")
        except ValueError:
            pass

    reason = ", ".join(reasons) + f" → score {score}" if reasons else f"score {score}"
    return score, reason


def search_candidates(filters: QueryParsing, limit: int = 5) -> SearchResults:
    """Search and rank candidates"""
    logger.info("Searching candidates")

    candidates = load_candidates()
    scored_candidates = []

    for i, candidate in enumerate(candidates):
        score, reason = calculate_candidate_score(candidate, filters)

        if score > 0:  # Only include candidates with some match
            scored_candidates.append(
                {"index": i, "candidate": candidate, "score": score, "reason": reason}
            )


    scored_candidates.sort(key=lambda x: x["score"], reverse=True)


    matches = []
    for item in scored_candidates[:limit]:
        candidate = item["candidate"]
        matches.append(
            CandidateMatch(
                candidate_id=item["index"],
                candidate_name=f"{candidate['firstName']} {candidate['lastName']}",
                score=item["score"],
                reason=item["reason"],
            )
        )

    return SearchResults(matches=matches, total_found=len(scored_candidates))


def save_shortlist(
    shortlist_name: str, candidate_indices: List[int]
) -> ShortlistAction:
    """Save candidates to a shortlist"""
    logger.info(f"Saving shortlist: {shortlist_name}")

    candidates = load_candidates()


    valid_indices = [i for i in candidate_indices if 0 <= i < len(candidates)]

    if valid_indices:
        shortlists[shortlist_name] = valid_indices
        logger.info(
            f"Shortlist '{shortlist_name}' saved with {len(valid_indices)} candidates"
        )

        return ShortlistAction(
            shortlist_name=shortlist_name, candidate_indices=valid_indices, success=True
        )
    else:
        return ShortlistAction(
            shortlist_name=shortlist_name, candidate_indices=[], success=False
        )


def draft_email_content(
    recipients: str, job_title: str, tone: str = "friendly"
) -> EmailContent:
    """Generate email content"""
    logger.info("Drafting email content")

    completion = client.beta.chat.completions.parse(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": f"""Generate a professional recruitment email with a {tone} tone.
                The email should be engaging and personal, mentioning the specific job opportunity.
                Keep it concise but warm, and include a clear call to action.""",
            },
            {
                "role": "user",
                "content": f"Draft an outreach email for {recipients} regarding the {job_title} position. Use a {tone} tone.",
            },
        ],
        response_format=EmailContent,
    )

    result = completion.choices[0].message.parsed
    logger.info("Email content generated")
    return result


def create_html_email_template(email_content: EmailContent) -> EmailTemplate:
    """Create HTML email template"""
    logger.info("Creating HTML email template")

    completion = client.beta.chat.completions.parse(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Create a professional HTML email template with inline CSS.
                Use a clean, modern design with:
                - Professional color scheme (blues/grays)
                - Good typography and spacing
                - Mobile-friendly responsive design
                - Clear call-to-action button
                Keep the HTML simple but visually appealing.""",
            },
            {
                "role": "user",
                "content": f"Create HTML template for:\nSubject: {email_content.subject}\nContent: {email_content.text_content}",
            },
        ],
        response_format=EmailTemplate,
    )

    result = completion.choices[0].message.parsed
    logger.info("HTML template created")
    return result


def get_analytics() -> AnalyticsSummary:
    """Generate analytics summary"""
    logger.info("Generating analytics")

    candidates = load_candidates()


    stage_counts = {}
    skill_counts = {}

    for candidate in candidates:
        
        stage = candidate.get("stage", "UNKNOWN")
        stage_counts[stage] = stage_counts.get(stage, 0) + 1


        for skill in candidate.get("skills", []):
            skill_counts[skill] = skill_counts.get(skill, 0) + 1


    top_skills = sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)[:3]

    return AnalyticsSummary(
        count_by_stage=stage_counts,
        top_skills=top_skills,
        total_candidates=len(candidates),
    )


def extract_shortlist_info(user_input: str) -> tuple:
    """Extract shortlist name and indices from user input"""


    completion = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Extract the shortlist name and candidate indices from the user input.
                Look for patterns like:
                - "save #1 #3 as 'FE-Intern-A'"
                - "save 1,3,4 as Frontend"
                - "create shortlist 'React-Devs' with #2 #5"
                
                Return the information in this exact format:
                shortlist_name: [name]
                indices: [comma-separated numbers]
                
                If no name is provided, suggest one based on context.""",
            },
            {"role": "user", "content": user_input},
        ],
    )

    response = completion.choices[0].message.content


    shortlist_name = "Unnamed-Shortlist"
    indices = []

    lines = response.split("\n")
    for line in lines:
        if "shortlist_name:" in line:
            shortlist_name = line.split("shortlist_name:")[1].strip()
        elif "indices:" in line:
            indices_str = line.split("indices:")[1].strip()
            indices = [
                int(x.strip()) for x in indices_str.split(",") if x.strip().isdigit()
            ]

    return shortlist_name, indices


# --------------------------------------------------------------
# Tool Functions
# --------------------------------------------------------------


def handle_candidate_search(user_input: str):
    """Handle candidate search request"""
    logger.info("Handling candidate search")


    filters = parse_search_query(user_input)


    results = search_candidates(filters)

    return {
        "success": True,
        "filters": filters.dict(),
        "results": {
            "matches": [match.dict() for match in results.matches],
            "total_found": results.total_found,
        },
    }


def handle_shortlist_save(user_input: str):
    """Handle shortlist save request"""
    logger.info("Handling shortlist save")

    shortlist_name, indices = extract_shortlist_info(user_input)
    result = save_shortlist(shortlist_name, indices)

    return {
        "success": result.success,
        "shortlist_name": result.shortlist_name,
        "candidate_indices": result.candidate_indices,
        "message": (
            f"Shortlist '{shortlist_name}' saved with {len(result.candidate_indices)} candidates"
            if result.success
            else "Failed to save shortlist"
        ),
    }


def handle_email_draft(user_input: str):
    """Handle email drafting request"""
    logger.info("Handling email draft")


    completion = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Extract the following from the email request:
                1. Recipients (shortlist name or specific candidates)
                2. Job title/position
                3. Tone (if specified, otherwise default to 'friendly')
                
                Return in format:
                recipients: [info]
                job_title: [title]
                tone: [tone]""",
            },
            {"role": "user", "content": user_input},
        ],
    )

    response = completion.choices[0].message.content


    recipients = "candidates"
    job_title = "position"
    tone = "friendly"

    lines = response.split("\n")
    for line in lines:
        if "recipients:" in line:
            recipients = line.split("recipients:")[1].strip()
        elif "job_title:" in line:
            job_title = line.split("job_title:")[1].strip()
        elif "tone:" in line:
            tone = line.split("tone:")[1].strip()


    email_content = draft_email_content(recipients, job_title, tone)


    html_template = create_html_email_template(email_content)

    return {
        "success": True,
        "email_content": email_content.dict(),
        "html_template": html_template.html_content,
        "recipients": recipients,
        "job_title": job_title,
    }


def handle_analytics():
    """Handle analytics request"""
    logger.info("Handling analytics request")

    analytics = get_analytics()

    return {"success": True, "analytics": analytics.dict()}


def call_function(name: str, args: dict):
    """Execute function calls"""
    if name == "search_candidates":
        return handle_candidate_search(args["query"])
    elif name == "save_shortlist":
        return handle_shortlist_save(args["query"])
    elif name == "draft_email":
        return handle_email_draft(args["query"])
    elif name == "show_analytics":
        return handle_analytics()
    else:
        raise ValueError(f"Unknown function: {name}")


# --------------------------------------------------------------
# Main Chat Interface
# --------------------------------------------------------------


def main():
    print("🤖 Welcome to the HR Agent!")
    print("I can help you with:")
    print("  🔍 Search for candidates")
    print("  📋 Save shortlists")
    print("  📧 Draft outreach emails with HTML preview")
    print("  📊 Show recruitment analytics")
    print("Type 'q' to quit.\n")


    load_candidates()
    load_jobs()


    tools = [
        {
            "type": "function",
            "function": {
                "name": "search_candidates",
                "description": "Search for candidates based on criteria like skills, location, experience, and availability.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "User's search query",
                        }
                    },
                    "required": ["query"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        },
        {
            "type": "function",
            "function": {
                "name": "save_shortlist",
                "description": "Save selected candidates to a named shortlist.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "User's shortlist save request",
                        }
                    },
                    "required": ["query"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        },
        {
            "type": "function",
            "function": {
                "name": "draft_email",
                "description": "Draft an outreach email for candidates with HTML preview.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "User's email draft request",
                        }
                    },
                    "required": ["query"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        },
        {
            "type": "function",
            "function": {
                "name": "show_analytics",
                "description": "Show recruitment analytics including candidate stages and top skills.",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False,
                },
                "strict": True,
            },
        },
    ]

    conversation_history = []

    while True:
        print("\n" + "=" * 60)
        user_input = input("🤔 How can I help you? ")
        print()

        if user_input.lower() == "q":
            print("👋 Thanks for using the HR Agent!")
            break

        conversation_history.append({"role": "user", "content": user_input})

        messages = (
            [
                {
                    "role": "system",
                    "content": """You are a helpful HR recruitment assistant that can:
1. Search for candidates based on skills, location, experience, and availability
2. Save candidate selections to named shortlists
3. Draft professional outreach emails with HTML previews
4. Provide recruitment analytics and statistics

IMPORTANT GUIDELINES:
- For candidate searches, use the search_candidates function
- For saving shortlists (e.g., "save #1 #3 as 'name'"), use the save_shortlist function
- For email drafting, use the draft_email function and always show HTML preview
- For analytics requests, use the show_analytics function
- Be helpful and guide users through the recruitment process
- Always provide clear, actionable responses with specific candidate information""",
                }
            ]
            + conversation_history
        )

        try:
            print("🤖 Processing your request...")


            intent_analysis = analyze_intent(user_input)


            if intent_analysis.confidence_score < 0.7:
                print(
                    "🤖 I'm not sure what you're asking for. Please try rephrasing your request."
                )
                continue


            response = client.chat.completions.create(
                model=MODEL, messages=messages, tools=tools, tool_choice="auto"
            )

            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls

            if tool_calls:
                print("🔧 Using specialized tools...")

                messages.append(response_message)

                for tool_call in tool_calls:
                    print(f"🛠️ Executing: {tool_call.function.name}")
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)

                    result = call_function(function_name, function_args)

                    messages.append(
                        {
                            "tool_call_id": tool_call.id,
                            "role": "tool",
                            "name": function_name,
                            "content": json.dumps(result),
                        }
                    )

                    print("✅ Tool executed successfully")


                final_response = client.chat.completions.create(
                    model=MODEL, messages=messages, tools=tools
                )

                ai_response = final_response.choices[0].message.content

                if ai_response is None:
                    ai_response = "I've processed your request successfully! Let me know if you need anything else."

                print(f"\n🤖 Assistant: {ai_response}")

            else:
                ai_response = response_message.content
                print(f"🤖 Assistant: {ai_response}")

            conversation_history.append({"role": "assistant", "content": ai_response})

        except Exception as e:
            print(f"❌ Error: {str(e)}")
            print("Please try again with a different request.")


if __name__ == "__main__":
    main()
