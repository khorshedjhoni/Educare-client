import React from 'react';
import { FaBookReader, FaHandsHelping, FaCalendarCheck, FaUsers, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaBookReader className="w-6 h-6 text-indigo-400" />,
    title: "Free Book Distribution",
    description: "Easily organize and participate in community drives to deliver textbooks and learning materials to underprivileged students."
  },
  {
    icon: <FaHandsHelping className="w-6 h-6 text-emerald-400" />,
    title: "Volunteer Tutoring",
    description: "Connect passionate educators with young learners for structured, one-on-one mentoring and free academic coaching."
  },
  {
    icon: <FaCalendarCheck className="w-6 h-6 text-indigo-400" />,
    title: "Event Management",
    description: "Create, schedule, and oversee community service events with verified dates, locations, and participant tracking."
  },
  {
    icon: <FaUsers className="w-6 h-6 text-amber-400" />,
    title: "Community Network",
    description: "Join forces with local volunteers and donors dedicated to bridging the educational divide in rural and urban areas."
  },
  {
    icon: <FaShieldAlt className="w-6 h-6 text-blue-400" />,
    title: "Secure Authentication",
    description: "Reliable user profiles and protected routes ensuring safe event creation, management, and registration tracking."
  },
  {
    icon: <FaChartLine className="w-6 h-6 text-purple-400" />,
    title: "Track Your Impact",
    description: "Monitor joined events, review past contributions, and measure the collective educational growth within your community."
  }
];

const Features = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="badge badge-primary badge-outline px-4 py-3 text-xs sm:text-sm font-medium">
            Platform Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Core Features of <span className="text-indigo-400">EduCare</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to run impactful social development drives, connect volunteer mentors, and distribute learning resources seamlessly.
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="card bg-slate-800/50 border border-slate-700/80 shadow-xl hover:border-indigo-500/50 transition-all group rounded-2xl flex flex-col justify-between"
            >
              <div className="card-body p-6 flex flex-col justify-between">
                <div>
                  
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                    {feature.icon}
                  </div>

                 
                  <h3 className="card-title text-xl font-bold text-white tracking-tight mb-2 group-hover:text-indigo-400 transition">
                    {feature.title}
                  </h3>

               
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;