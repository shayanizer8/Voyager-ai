import json
import os
from dotenv import load_dotenv
from openai import OpenAI
from app.graph.state import TripState

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("GLM_API_KEY"),
    base_url=os.environ.get("GLM_BASE_URL")
)

async def concierge_node(state: TripState) -> TripState:
    print("🧠 [AGENT 1] Concierge analyzing voice transcript...")
    
    system_prompt = """You are the Voyager Lead Concierge. Analyze the conversation history.
    Extract the 'destination' and 'budget' if mentioned. 
    If both are present in the history, set 'next_node' to 'sourcing'. Otherwise, keep it as 'concierge'.
    Respond ONLY with this raw JSON object:
    {"assistant_response": "Spoken reply here", "destination": "string or null", "budget": float or null, "next_node": "concierge" or "sourcing"}"""


    
    # here the code starts to talk to the LLM.
    response = client.chat.completions.create(
        model="glm-4.7-flash",
        messages=[{"role": "system", "content": system_prompt}] + state["messages"],
        response_format={"type": "json_object"}
    )
    
    data = json.loads(response.choices[0].message.content) # converts llm response to a python dict
    
    updated_messages = list(state["messages"]) # this is the copy of past history excluding the llm's last response
    updated_messages.append({"role": "assistant", "content": data["assistant_response"]}) # this appends that llm response at the end of the history
    
    return {
        **state, # python dict unpacking, this copies all the previous state values into the new state
        "messages": updated_messages,
        "destination": data.get("destination") or state.get("destination"),
        "budget": data.get("budget") or state.get("budget") or 0.0,
        "next_node": data.get("next_node", "concierge")
    }