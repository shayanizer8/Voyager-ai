import json
import os
from openai import OpenAI
from app.graph.state import TripState

client = OpenAI(
    api_key=os.environ.get("GLM_API_KEY"),
    base_url=os.environ.get("GLM_BASE_URL")
)

async def sourcing_node(state: TripState) -> TripState:
    print("🧠 [AGENT 2] Sourcing Specialist matching luxury cards...")
    
    mock_flights = [{"id": "JL-06", "carrier": "Japan Airlines", "price": 4200}]
    mock_hotels = [{"id": "AMN-1", "name": "Aman Tokyo", "price": 1200}]

    system_prompt = f"""You are the Voyager Sourcing Agent. Present the following options to the user:
    Flights: {mock_flights}, Hotels: {mock_hotels}.
    If the user picks or says they approve an option, extract 'selected_flight' and 'selected_hotel', and set 'next_node' to 'itinerary'.
    Respond ONLY with this JSON structure:
    {"assistant_response": "Spoken reply", "selected_flight": "id or null", "selected_hotel": "id or null", "next_node": "sourcing" or "itinerary"}"""

    response = client.chat.completions.create(
        model="glm-4.7-flash",
        messages=[{"role": "system", "content": system_prompt}] + state["messages"],
        response_format={"type": "json_object"}
    )
    
    data = json.loads(response.choices[0].message.content)
    updated_messages = list(state["messages"])
    updated_messages.append({"role": "assistant", "content": data["assistant_response"]})

    return {
        **state,
        "messages": updated_messages,
        "available_flights": mock_flights,
        "available_hotels": mock_hotels,
        "selected_flight": data.get("selected_flight") or state.get("selected_flight"),
        "selected_hotel": data.get("selected_hotel") or state.get("selected_hotel"),
        "next_node": data.get("next_node", "sourcing")
    }