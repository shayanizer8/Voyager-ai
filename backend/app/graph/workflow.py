from langgraph.graph import StateGraph, END
from app.graph.state import TripState
from app.agents.concierge import concierge_node
from app.agents.sourcing import sourcing_node
from app.agents.itinerary import itinerary_node

# 1. Initialize the StateGraph with our custom TripState structure
workflow = StateGraph(TripState)

# 2. Add our modular voice agents as graph nodes
workflow.add_node("concierge", concierge_node)
workflow.add_node("sourcing", sourcing_node)
workflow.add_node("itinerary", itinerary_node)

# 3. Set the entry point (the microphone loop always starts at the Concierge intake)
workflow.set_entry_point("concierge")

# 4. Create a router function to dynamically check 'next_node'
def route_next_agent(state: TripState) -> str:
    target = state.get("next_node", "concierge")
    if target == "end":
        return END
    return target

# 5. Connect the nodes with conditional logic driven by the router
workflow.add_conditional_edges(
    "concierge",
    route_next_agent,
    {"concierge": "concierge", "sourcing": "sourcing"}
)

workflow.add_conditional_edges(
    "sourcing",
    route_next_agent,
    {"sourcing": "sourcing", "itinerary": "itinerary"}
)

workflow.add_conditional_edges(
    "itinerary",
    route_next_agent,
    {"itinerary": "itinerary", END: END}
)

# 6. Compile our executable multi-agent engine
app_graph = workflow.compile()
print("🕸️ LangGraph Voice-Routing Workflow successfully compiled!")