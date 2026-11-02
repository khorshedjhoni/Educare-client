import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaBookOpen, FaUsers, FaArrowRight, FaHandsHelping } from 'react-icons/fa';

const Banner = () => {
  return (
    <section className="relative bg-slate-900 text-slate-100 overflow-hidden py-16 sm:py-24 border-b border-slate-800">
      
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
       
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
        
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-medium shadow-sm">
              <FaHandsHelping className="w-4 h-4 text-indigo-400" />
              <span>Empowering Communities Through Education</span>
            </div>

            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bridging the Educational Divide with <span className="text-indigo-400">Free Books</span> & <span className="text-emerald-400">Tutoring</span>
            </h1>

            
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join our community-driven initiative connecting passionate volunteer educators with eager young learners. Together, we distribute essential learning materials and provide structured mentoring to build sustainable futures.
            </p>

           
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/upcoming-events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm"
              >
                Explore Upcoming Events
                <FaArrowRight size={12} />
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-8 py-3.5 rounded-xl transition text-sm shadow-md"
              >
                Become a Volunteer
              </Link>
            </div>

          
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 text-center lg:text-left shadow-md">
                <div className="text-2xl font-extrabold text-white">1,250+</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Books Distributed</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 text-center lg:text-left shadow-md">
                <div className="text-2xl font-extrabold text-white">320+</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Active Students</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 text-center lg:text-left shadow-md">
                <div className="text-2xl font-extrabold text-white">45+</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Community Tutors</div>
              </div>
            </div>

          </div>

          
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-slate-700/80 aspect-[4/5] bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
                    alt="Children learning together"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width={600}
                    height={750}
                    priority
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-slate-700/80 aspect-[4/5] bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop"
                    alt="Book distribution event"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width={600}
                    height={750}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;