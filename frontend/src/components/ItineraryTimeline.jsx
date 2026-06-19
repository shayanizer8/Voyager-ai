import React, { useState } from 'react';
import { Download, CreditCard, ChevronRight, MapPin, Clock, Calendar, Users, DollarSign } from 'lucide-react';

export default function ItineraryTimeline() {
  const [selectedDay, setSelectedDay] = useState(2); // Day 2 (Jul 13) selected by default

  // Mock Itinerary Data
  const itinerary = [
    {
      day: 1,
      date: 'Sun, Jul 12',
      activities: [
        { id: 'a1', type: 'flight', name: 'Depart JFK — Singapore Airlines 432', time: '09:15', icon: '✈️' },
        { id: 'a2', type: 'arrival', name: 'Arrive Suvarnabhumi Airport', time: '12:10', icon: '🛬' }
      ]
    },
    {
      day: 2,
      date: 'Sun, Jul 13',
      activities: [
        { id: 'a3', type: 'hotel', name: 'Check-in — Capella Bangkok', time: '14:00', icon: '🏨' },
        { id: 'a4', type: 'food', name: 'Chao Phraya River cruise', time: '18:30', icon: '🚢' },
        { id: 'a5', type: 'food', name: 'Dinner at Nahm Restaurant', time: '20:00', icon: '🍽️' }
      ]
    },
    {
      day: 3,
      date: 'Mon, Jul 14',
      activities: [
        { id: 'a6', type: 'tour', name: 'Grand Palace & Wat Phra Kaew', time: '09:00', icon: '⛩️' },
        { id: 'a7', type: 'transport', name: 'Tuk-tuk street food tour', time: '13:00', icon: '🛺' },
        { id: 'a8', type: 'tour', name: 'Jim Thompson House Museum', time: '16:00', icon: '🎨' }
      ]
    },
    {
      day: 4,
      date: 'Tue, Jul 15',
      activities: [
        { id: 'a9', type: 'flight', name: 'Flight to Koh Lanta', time: '10:00', icon: '✈️' },
        { id: 'a10', type: 'hotel', name: 'Klong Dao beach afternoon', time: '15:00', icon: '🏝️' },
        { id: 'a11', type: 'food', name: 'Dinner at Viewpoint Grill', time: '19:30', icon: '🌅' }
      ]
    }
  ];

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden font-sans">
      
      {/* LEFT PANEL (35%) — VERTICAL TIMELINE */}
      <aside className="w-[35%] border-r border-[#E2E8F0] bg-[#F8FAFC] flex flex-col">
        {/* Sidebar Header */}
        <div className="p-8 border-b border-[#E2E8F0] bg-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#10B981] p-1.5 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 transform rotate-45">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Voyager AI</span>
            <span className="mx-2 text-[#E2E8F0]">|</span>
            <span className="text-sm font-medium text-[#334155]/60">Bangkok & Thai Islands</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Your Itinerary</h2>
        </div>

        {/* Timeline Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Vertical connector line */}
          <div className="absolute left-[45px] top-10 bottom-10 w-[1.5px] bg-[#10B981]/20"></div>

          <div className="space-y-10 relative">
            {itinerary.map((day) => {
              const isActive = selectedDay === day.day;
              return (
                <div key={day.day} className="flex gap-6 cursor-pointer group" onClick={() => setSelectedDay(day.day)}>
                  {/* Day Node Marker */}
                  <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shrink-0 mt-1 ${
                    isActive ? 'bg-[#10B981] border-[#10B981] shadow-sm' : 'bg-white border-[#E2E8F0] group-hover:border-[#10B981]/50'
                  }`}>
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#334155]/40'}`}>{day.day}</span>
                  </div>

                  {/* Day Content Card */}
                  <div className={`flex-1 bg-white p-5 rounded-2xl transition-all border-l-4 ${
                    isActive 
                      ? 'border-[#10B981] shadow-md transform -translate-x-1' 
                      : 'border-transparent shadow-sm hover:shadow-md'
                  }`}>
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-[#334155]/40 uppercase tracking-widest">Day {day.day}</span>
                      <h3 className="text-lg font-bold text-[#0F172A]">{day.date}</h3>
                    </div>

                    <div className="space-y-4">
                      {day.activities.map((act) => (
                        <div key={act.id} className="flex items-center justify-between group/row">
                          <div className="flex items-center gap-3">
                            <span className="text-lg grayscale group-hover/row:grayscale-0 transition-all">{act.icon}</span>
                            <span className="text-sm font-semibold text-[#334155] truncate max-w-[180px]">{act.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#334155]/30">{act.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL (65%) — MAP & ACTION STRIP */}
      <main className="w-[65%] flex flex-col relative">
        
        {/* Top Floating Stats Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-20">
          <div className="bg-white/90 backdrop-blur-md border border-[#E2E8F0] shadow-sm rounded-2xl px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-bold text-[#0F172A]">Jul 12 – Jul 21, 2026</span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#E2E8F0] pl-8">
                <Clock className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-bold text-[#0F172A]">9 days</span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#E2E8F0] pl-8">
                <Users className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-bold text-[#0F172A]">2 travelers</span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#E2E8F0] pl-8">
                <DollarSign className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-bold text-[#0F172A]">$5,558 total</span>
                <span className="text-[10px] font-medium text-[#334155]/40 tracking-tight">($3,114/person)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-[#10B981] uppercase flex items-center gap-1.5 mr-2 animate-pulse">
                 <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                 All bookings confirmed
               </span>
               <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition-all text-[#334155]">
                 <Download className="w-3.5 h-3.5" /> Export PDF
               </button>
               <button className="bg-[#FF6B6B] hover:bg-[#f05a5a] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-sm flex items-center gap-2">
                 <CreditCard className="w-3.5 h-3.5" /> Book All
               </button>
            </div>
          </div>
        </div>

        {/* MAP PLACEHOLDER AREA */}
        <div className="flex-1 bg-[#DEE8EE] relative overflow-hidden">
          {/* Mock Map Image background (Using subtle patterns or placeholder) */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#10B981 0.5px, #DEE8EE 0.5px)', backgroundSize: '24px 24px' }}></div>

          {/* Dotted Route SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             <path 
               d="M 650 350 Q 750 250 850 180 T 1000 150" 
               fill="none" 
               stroke="#10B981" 
               strokeWidth="2" 
               strokeDasharray="6,6"
               className="opacity-40"
             />
          </svg>

          {/* Map Pins */}
          <div className="absolute top-[28%] left-[62%] z-20 group">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-[#E2E8F0] flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
               <span className="text-[11px] font-bold text-[#0F172A]">Capella Bangkok</span>
            </div>
            <div className="w-0.5 h-3 bg-[#E2E8F0] mx-auto"></div>
          </div>

          <div className="absolute top-[18%] left-[78%] z-20">
            <div className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#E2E8F0] flex items-center gap-2">
               <span className="text-[11px] font-semibold text-[#334155]/60">Grand Palace</span>
            </div>
          </div>

          {/* Selected Day Map Detail Card (Bottom Right) */}
          <div className="absolute bottom-10 right-10 w-80 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl overflow-hidden z-30 transform hover:-translate-y-1 transition-transform">
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#334155]/40 uppercase tracking-widest">Today's Focus</span>
                <h4 className="text-lg font-bold text-[#0F172A]">Sun, Jul 13 — Bangkok</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span className="text-xs font-semibold text-[#334155]">Check-in • Capella Bangkok</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span className="text-xs font-semibold text-[#334155]">Chao Phraya River cruise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span className="text-xs font-semibold text-[#334155]">Dinner at Nahm Restaurant</span>
                </div>
              </div>
              <button className="w-full text-[#10B981] font-bold text-xs pt-2 flex items-center justify-end gap-1 group">
                See full day <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}