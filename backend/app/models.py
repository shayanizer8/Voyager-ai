from sqlalchemy import Column, String, Integer, Float, JSON, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # e.g. "sophia_reyes_demo"
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    tier = Column(String, default="Premium") # Premium Member badge alignment
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    trips = relationship("SavedTrip", back_populates="owner", cascade="all, delete-orphan")


class SavedTrip(Base):
    __tablename__ = "saved_trips"

    id = Column(String, primary_key=True, index=True) # Thread/Session ID
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    destination = Column(String, nullable=False)
    dates_meta = Column(String, nullable=True) # e.g. "Jul 12 – Jul 22, 2026"
    status_msg = Column(String, default="Planning now...") # Sidebar subtext layout alignment
    thumbnail_url = Column(String, nullable=True)
    
    # Store the final approved itinerary array & constraints persistently
    budget = Column(Float, default=0.0)
    selected_logistics = Column(JSON, nullable=True) # Saved flights & hotels data dict
    final_itinerary = Column(JSON, nullable=True)     # Saved structured day-by-day blocks
    
    is_active_planning = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="trips")