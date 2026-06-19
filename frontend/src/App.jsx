import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import BookingCards from './components/BookingCards';
import ItineraryTimeline from './components/ItineraryTimeline';

export default function App() {
  // 1 = Chat, 2 = Sourcing/Approval, 3 = Itinerary
  const [currentScreen, setCurrentScreen] = useState(1);

  return (
    <div className="relative min-h-screen bg-white select-none">
      
      {/* SCREEN ROUTER */}
      <div className="w-full h-full pb-16">
        {currentScreen === 1 && <ChatInterface />}
        {currentScreen === 2 && <BookingCards />}
        {currentScreen === 3 && <ItineraryTimeline />}
      </div>

      {/* INTERNSHIP DEMO NAV CONTROLLER */}
      {/* This is a temporary floating widget to easily show off your 3 screens */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0F172A] text-white px-4 py-2.5 rounded-2xl shadow-xl z-[9999] flex items-center gap-2 border border-[#334155]">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mr-2 px-2 border-r border-slate-700">
          Demo Control
        </span>
        <button 
          onClick={() => setCurrentScreen(1)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            currentScreen === 1 ? 'bg-[#10B981] text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          1. Chat Hub
        </button>
        <button 
          onClick={() => setCurrentScreen(2)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            currentScreen === 2 ? 'bg-[#10B981] text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          2. Approval Gate
        </button>
        <button 
          onClick={() => setCurrentScreen(3)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            currentScreen === 3 ? 'bg-[#10B981] text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          3. Final Itinerary
        </button>
      </div>

    </div>
  );
}