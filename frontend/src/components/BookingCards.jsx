import React, { useState } from 'react';
import { ArrowRight, ChevronRight, SlidersHorizontal, ArrowLeft, Star, CheckCircle2 } from 'lucide-react';

export default function BookingCards() {
  // Mock Flight Data
  const flightsData = [
    { id: 'f1', airline: 'Singapore Airlines', stops: 'Non-stop', depTime: '09:15', arrTime: '06:40+1', depCode: 'JFK', arrCode: 'BKK', duration: '17h 25m', price: 842 },
    { id: 'f2', airline: 'Thai Airways', stops: '1 stop', depTime: '13:40', arrTime: '12:10+1', depCode: 'JFK', arrCode: 'BKK', duration: '18h 30m', price: 718 },
    { id: 'f3', airline: 'Emirates', stops: '1 stop', depTime: '22:00', arrTime: '23:15+1', depCode: 'JFK', arrCode: 'BKK', duration: '19h 15m', price: 695 },
  ];

  // Mock Hotel Data
  const hotelsData = [
    { id: 'h1', name: 'Capella Bangkok', area: 'Charoenkrung', stars: 5, price: 320, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60' },
    { id: 'h2', name: 'Rosewood Bangkok', area: 'Ploenchit', stars: 5, price: 285, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60' },
    { id: 'h3', name: 'Mandarin Oriental', area: 'Riverside', stars: 5, price: 410, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60' },
  ];

  // State Management for Selections
  const [selectedFlight, setSelectedFlight] = useState('f1'); // Default selection matching image
  const [selectedHotel, setSelectedHotel] = useState('h2');   // Default selection matching image

  // Calculations
  const activeFlightPrice = flightsData.find(f => f.id === selectedFlight)?.price || 0;
  const activeHotelPrice = hotelsData.find(h => h.id === selectedHotel)?.price || 0;
  
  // Total logic calculation (Simulating: Flight + Hotel base calculation or fixed bundle representation)
  // Matching image value: $3,284 total per person estimate
  const estimatedTotal = 3284; 

  const totalSelectionsCount = (selectedFlight ? 1 : 0) + (selectedHotel ? 1 : 0);

  return (
    <div className="min-h-screen w-full bg-white text-[#0F172A] font-sans pb-32 overflow-x-hidden">
      
      {/* GLOBAL HEADER BAR */}
      <header className="flex items-center justify-between px-12 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="bg-[#10B981] p-1.5 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 transform rotate-45">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">Voyager AI</span>
        </div>

        {/* Selected Counter Pill */}
        <div className="bg-[#E2E8F0]/40 border border-[#E2E8F0] px-3 py-1 rounded-full text-xs font-semibold text-[#334155] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          {totalSelectionsCount} options selected
        </div>

        <div className="flex items-center gap-4">
          <button className="text-xs font-semibold text-[#334155]/60 hover:text-[#0F172A] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Chat
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition-all text-[#334155]">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
        </div>
      </header>

      {/* CORE DISPLAY WORKSPACE */}
      <main className="max-w-7xl mx-auto px-12 pt-10 space-y-12">
        
        {/* HERO TITLE BLOCK */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] mb-2">Here's what I found</h1>
          <div className="flex items-center justify-between text-sm text-[#334155]/60 font-medium">
            <p>Bangkok & Thai Islands • Jul 12 – Jul 22, 2026 • 2 travelers</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-[#10B981] font-semibold">
                ✨ AI matched 24 options
              </span>
              <span>🕒 Prices valid for 48h</span>
            </div>
          </div>
        </div>

        {/* FLIGHTS BLOCK */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-[#334155]">
              <span>✈️ Flights</span>
              <span className="text-xs font-normal text-[#334155]/50 lowercase normal-case">Round trip • Economy</span>
            </div>
            <button className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-0.5">
              See all 12 options <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Shelf Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {flightsData.map((flight) => {
              const isSelected = selectedFlight === flight.id;
              return (
                <div 
                  key={flight.id}
                  className={`bg-white border rounded-2xl p-5 transition-all relative ${
                    isSelected 
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/5 shadow-md' 
                      : 'border-[#E2E8F0] hover:border-[#E2E8F0]/80 shadow-3xs'
                  }`}
                >
                  {/* Airline & Stops */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#0F172A]">{flight.airline}</span>
                    <span className="bg-[#F1F5F9] text-[#334155]/70 text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                      {flight.stops}
                    </span>
                  </div>

                  {/* Route Timeline */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold text-[#0F172A] tracking-tight">{flight.depTime}</div>
                      <div className="text-[10px] font-bold text-[#334155]/40 tracking-wider text-center">{flight.depCode}</div>
                    </div>

                    {/* Path graphic line */}
                    <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
                      <span className="text-[10px] text-[#334155]/50 whitespace-nowrap mb-1">{flight.duration}</span>
                      <div className="w-full h-[1px] bg-[#E2E8F0] relative flex items-center justify-center">
                        <span className="text-[10px] absolute transform -translate-y-[1px]">✈️</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-2xl font-bold text-[#0F172A] tracking-tight">{flight.arrTime}</div>
                      <div className="text-[10px] font-bold text-[#334155]/40 tracking-wider text-center">{flight.arrCode}</div>
                    </div>
                  </div>

                  {/* Pricing Action Area */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                    <div>
                      <span className="text-2xl font-black text-[#0F172A]">${flight.price}</span>
                      <span className="text-[10px] text-[#334155]/40 font-medium ml-1">/person</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="#deal" className="text-xs font-semibold text-[#334155]/50 hover:text-[#0F172A] transition-colors underline decoration-[#E2E8F0]">
                        View Deal
                      </a>
                      <button 
                        onClick={() => setSelectedFlight(flight.id)}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                          isSelected 
                            ? 'bg-[#10B981] text-white shadow-xs' 
                            : 'bg-[#10B981] hover:bg-[#0fa673] text-white'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOTELS BLOCK */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-[#334155]">
              <span>🏨 Hotels</span>
              <span className="text-xs font-normal text-[#334155]/50 lowercase normal-case">Bangkok • 4 nights</span>
            </div>
            <button className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-0.5">
              See all 18 options <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Hotel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hotelsData.map((hotel) => {
              const isSelected = selectedHotel === hotel.id;
              return (
                <div 
                  key={hotel.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all relative ${
                    isSelected 
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/5 shadow-md' 
                      : 'border-[#E2E8F0] hover:border-[#E2E8F0]/80 shadow-3xs'
                  }`}
                >
                  {/* Photo Container */}
                  <div className="h-44 w-full bg-[#F1F5F9] relative overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details block */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">{hotel.name}</h4>
                      <p className="text-[11px] font-semibold text-[#334155]/40 mt-0.5 uppercase tracking-wider">{hotel.area}</p>
                    </div>

                    {/* Star Score representation */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] stroke-none" />
                      ))}
                    </div>

                    {/* Pricing Actions row */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
                      <div>
                        <span className="text-xl font-extrabold text-[#0F172A]">${hotel.price}</span>
                        <span className="text-[10px] text-[#334155]/40 font-medium ml-0.5">/night</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href="#deal" className="text-xs font-semibold text-[#334155]/50 hover:text-[#0F172A] transition-colors underline decoration-[#E2E8F0]">
                          View Deal
                        </a>
                        <button 
                          onClick={() => setSelectedHotel(hotel.id)}
                          className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                            isSelected 
                              ? 'bg-[#10B981] text-white shadow-xs' 
                              : 'bg-[#10B981] hover:bg-[#0fa673] text-white'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* FIXED BASE APPROVAL STICKY BAR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] py-4 px-12 flex items-center justify-between shadow-lg z-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#334155]/40 uppercase tracking-wider">Estimated total</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#0F172A]">${estimatedTotal}</span>
            <span className="text-xs font-medium text-[#334155]/50">/person</span>
          </div>
        </div>

        {/* Central status confirmation counter confirmation */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#334155]">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{selectedFlight ? '1 flight' : '0 flights'} • {selectedHotel ? '1 hotel' : '0 hotels'} selected</span>
        </div>

        {/* Primary Submission Call-To-Action */}
        <div className="flex items-center gap-4">
          <button className="text-xs font-bold text-[#334155]/60 hover:text-[#0F172A] transition-colors">
            Show more options
          </button>
          <button className="bg-[#FF6B6B] hover:bg-[#f05a5a] text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-sm">
            Confirm Selections
          </button>
        </div>
      </footer>

    </div>
  );
}