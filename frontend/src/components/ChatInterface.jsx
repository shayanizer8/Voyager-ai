import React, { useState } from 'react';
import { Plus, Map, SlidersHorizontal, Send, MapPin, Settings } from 'lucide-react';

export default function ChatInterface() {
  // Mock Data for Recent Trips Sidebar
  const recentTrips = [
    { id: 1, destination: 'Bangkok & Islands', status: 'Planning now...', current: true, img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=80&auto=format&fit=crop&q=60' },
    { id: 2, destination: 'Tokyo, Japan', date: 'Mar 2024', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&auto=format&fit=crop&q=60' },
    { id: 3, destination: 'Amalfi Coast, Italy', date: 'Aug 2023', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=80&auto=format&fit=crop&q=60' },
    { id: 4, destination: 'Kyoto, Japan', date: 'Apr 2023', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&auto=format&fit=crop&q=60' },
    { id: 5, destination: 'Lisbon, Portugal', date: 'Dec 2022', img: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=80&auto=format&fit=crop&q=60' },
  ];

  // Chat conversation state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your personal travel concierge. Tell me about your dream trip — destination, travel style, budget — and I'll craft a perfect itinerary for you.", time: '2:11 PM' },
    { id: 2, sender: 'user', text: "I'm thinking of a 10-day trip to Bangkok and the Thai islands in July for two people.", time: '2:12 PM' },
    { id: 3, sender: 'ai', text: "Wonderful choice! Thailand in July is vibrant and lush. I'll look into the best island combos — Koh Lanta, Koh Tao, or the Similan Islands. What's your budget per person, and do you prefer boutique stays or luxury resorts?", time: '2:13 PM' },
    { id: 4, sender: 'user', text: "Luxury resorts. Budget around $3,000 per person.", time: '2:14 PM' },
  ]);

  const [input, setInput] = useState('');
  const quickReplies = ['Beach Getaway', 'City Break', 'Adventure Trek', 'Cultural Immersion'];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFFFFF] text-[#0F172A] font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR (35%) */}
      <aside className="w-[35%] bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#10B981] p-1.5 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 transform rotate-45">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Voyager AI</span>
          </div>

          {/* New Trip Button */}
          <button className="w-full bg-[#10B981] hover:bg-[#0fa673] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm mb-8">
            <Plus className="w-5 h-5" />
            <span>New Trip</span>
          </button>

          {/* Recent Trips Section */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-[#334155] uppercase mb-4 opacity-60">Recent Trips</h3>
            <div className="space-y-2">
              {recentTrips.map((trip) => (
                <div 
                  key={trip.id} 
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    trip.current ? 'bg-[#E2E8F0]/50 shadow-sm' : 'hover:bg-[#E2E8F0]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={trip.img} alt={trip.destination} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A]">{trip.destination}</h4>
                      <p className={`text-xs ${trip.current ? 'text-[#10B981] font-medium' : 'text-[#334155]/60'}`}>
                        {trip.status || trip.date}
                      </p>
                    </div>
                  </div>
                  {trip.current && <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Footer Account profile */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
              alt="Sophia Reyes" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold text-[#0F172A]">Sophia Reyes</h4>
              <p className="text-xs text-[#334155]/60">Premium Member</p>
            </div>
          </div>
          <button className="text-[#334155]/60 hover:text-[#0F172A] p-2 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN PANEL (65%) */}
      <main className="w-[65%] flex flex-col justify-between relative bg-white">
        
        {/* Top Header Controls Bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#E2E8F0]">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 bg-[#F1F5F9] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs font-medium text-[#334155]">Concierge is listening...</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition-all text-[#334155]">
              <Map className="w-3.5 h-3.5" /> View Map
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition-all text-[#334155]">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Preferences
            </button>
          </div>
        </header>

        {/* Chat Conversation Thread */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin">
          
          {/* Researching Sub-status Banner */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-full text-xs font-medium text-[#334155]/80 shadow-xs">
              <span className="text-[#10B981]">🌐</span>
              <span>AI is researching Bangkok & Thai Islands for July 2024</span>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-start gap-2.5 max-w-[75%]">
                {msg.sender === 'ai' && (
                  <div className="bg-[#10B981] text-white p-1.5 rounded-lg text-xs mt-1">
                     ✨
                  </div>
                )}
                <div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#10B981] text-white rounded-tr-sm' 
                      : 'bg-[#F1F5F9] text-[#0F172A] rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#334155]/40 mt-1 block px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator (Agent active simulation) */}
          <div className="flex items-start gap-2.5">
            <div className="bg-[#10B981] text-white p-1.5 rounded-lg text-xs mt-1">✨</div>
            <div className="bg-[#F1F5F9] p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#334155]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-[#334155]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-[#334155]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>

        {/* Floating Input Area Footer */}
        <footer className="p-6 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Main Interactive Input Bar */}
            <div className="relative flex items-center bg-white border border-[#E2E8F0] shadow-xs rounded-2xl px-4 py-3 focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/10 transition-all">
              <MapPin className="w-5 h-5 text-[#334155]/40 mr-3" />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Where do you want to go?" 
                className="w-full bg-transparent outline-none border-none text-sm text-[#0F172A] placeholder-[#334155]/40"
              />
              <button 
                onClick={() => handleSend()}
                className="bg-[#10B981] hover:bg-[#0fa673] text-white p-2 rounded-xl transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Quick-Reply Suggestion Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#334155] px-4 py-2 rounded-xl transition-all whitespace-nowrap shadow-3xs"
                >
                  {reply}
                </button>
              ))}
            </div>

          </div>
        </footer>

      </main>
    </div>
  );
}