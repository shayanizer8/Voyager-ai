import os
from openai import OpenAI
from app.graph.state import TripState
from app.database import SessionLocal
from app.models import SavedTrip

client = OpenAI(
    api_key=os.environ.get("GLM_API_KEY"),
    base_url=os.environ.get("GLM_BASE_URL")
)

async def itinerary_node(state: TripState) -> TripState:
    print("🧠 [AGENT 3] Itinerary Architect compiling timelines...")

    db = SessionLocal()
    try:
        new_trip = SavedTrip(
            user_id="sophia_reyes_demo",
            destination=state.get("destination", "Voice Trip"),
            hotel_details=state.get("selected_hotel", "Selected Hotel"),
            flight_details=state.get("selected_flight", "Selected Flight"),
            status="Confirmed"
        )
        db.add(new_trip)
        db.commit()
        print("💾 State successfully backed up to PostgreSQL 'saved_trips' table!")
    except Exception as e:
        db.rollback()
        print(f"❌ DB Write Error: {e}")
    finally:
        db.close()

    system_prompt = "You are the Voyager Architect. Summarize that their premium trip is fully booked and displayed on the timeline map."
    response = client.chat.completions.create(
        model="glm-4.7-flash",
        messages=[{"role": "system", "content": system_prompt}] + state["messages"]
    )

    updated_messages = list(state["messages"])
    updated_messages.append({"role": "assistant", "content": response.choices[0].message.content})

    return {
        **state,
        "messages": updated_messages,
        "next_node": "end"
    }