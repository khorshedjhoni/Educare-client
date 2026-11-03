import React from 'react';
import { FaPaperPlane, FaShieldAlt } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-6 shadow-inner">
            <FaPaperPlane size={20} />
          </div>

          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4">
            Stay Updated with Our <span className="text-indigo-400">Community Drives</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Subscribe to our newsletter to receive timely updates about upcoming book distribution events, free tutoring schedules, and volunteer opportunities directly in your inbox.
          </p>

        
          <form  className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>

          
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <FaShieldAlt className="text-emerald-400" />
            <span>We respect your privacy. No spam, unsubscribe at any time.</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;