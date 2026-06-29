import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, encrypting, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Start Encryption Phase
    setFormState('encrypting');
    
    // 2. Switch to Sending Phase after 1.5s
    setTimeout(() => {
      setFormState('sending');
    }, 1500);

    // 3. Success Phase after 3s total
    setTimeout(() => {
      setFormState('success');
    }, 3000);

    // 4. Reset form after 6s so they can send another
    setTimeout(() => {
      setFormState('idle');
      e.target.reset(); // Clears the input fields
    }, 6000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 font-sans z-20">
      
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-10 pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            TRANSMISSION
          </h2>
          <p className="text-gray-400 tracking-[0.3em] text-xs uppercase">
            Establish Secure Uplink
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          
          {/* IDENTIFIER FIELD */}
          <div className="flex flex-col">
            <label className="text-cyan-400 text-[10px] tracking-[0.3em] mb-2 uppercase">Callsign / Designation</label>
            <input 
              type="text" 
              required
              disabled={formState !== 'idle'}
              className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-none disabled:opacity-50"
              placeholder="Enter your name..."
            />
          </div>

          {/* FREQUENCY FIELD */}
          <div className="flex flex-col">
            <label className="text-cyan-400 text-[10px] tracking-[0.3em] mb-2 uppercase">Return Frequency</label>
            <input 
              type="email" 
              required
              disabled={formState !== 'idle'}
              className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-none disabled:opacity-50"
              placeholder="Enter your email..."
            />
          </div>

          {/* PAYLOAD FIELD */}
          <div className="flex flex-col">
            <label className="text-cyan-400 text-[10px] tracking-[0.3em] mb-2 uppercase">Data Payload</label>
            <textarea 
              rows="4"
              required
              disabled={formState !== 'idle'}
              className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-none resize-none disabled:opacity-50"
              placeholder="Enter your message..."
            ></textarea>
          </div>

          {/* DYNAMIC SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={formState !== 'idle'}
            className={`relative overflow-hidden w-full py-4 mt-4 rounded font-bold tracking-[0.3em] text-sm uppercase transition-all duration-300 cursor-none
              ${formState === 'idle' ? 'bg-cyan-600 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]' : ''}
              ${formState === 'encrypting' ? 'bg-yellow-500 text-black' : ''}
              ${formState === 'sending' ? 'bg-blue-600 text-white' : ''}
              ${formState === 'success' ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.5)]' : ''}
            `}
          >
            {formState === 'idle' && "Initialize Uplink"}
            {formState === 'encrypting' && (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-lg">⚙</span> ENCRYPTING PAYLOAD...
              </span>
            )}
            {formState === 'sending' && (
              <span className="flex items-center justify-center gap-2 animate-pulse">
                <span className="text-lg">📡</span> TRANSMITTING...
              </span>
            )}
            {formState === 'success' && "UPLINK SUCCESSFUL"}
          </button>

        </form>

      </div>
    </section>
  );
}