from typing import TypedDict, List, Dict, Any

class TripState(TypedDict):
    messages: List[Dict[str, str]]  
    destination: str                
    budget: float                   
    preferences: Dict[str, Any]     
    available_flights: List[Dict]   
    available_hotels: List[Dict]    
    selected_flight: str            
    selected_hotel: str             
    next_node: str                  # Core routing pointer ('concierge' | 'sourcing' | 'itinerary' | 'end')