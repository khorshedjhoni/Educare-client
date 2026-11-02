import Link from "next/link";
import { FaHandsHelping, FaHeart } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-between pb-6 border-b border-slate-900">
          
        
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <FaHandsHelping size={14} />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Edu<span className="text-indigo-400">Care</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm">
              Empowering communities by bridging educational divides through free book distributions and structured tutoring.
            </p>
          </div>

          
          <div className="text-center md:text-center text-xs text-slate-400">
            <p className="font-medium text-slate-300">Join our growing community initiative</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Connecting volunteer mentors with eager learners every week.</p>
          </div>

          
          <div className="flex items-center justify-start md:justify-end gap-3">
            <span className="text-xs text-slate-400 mr-1">Follow Us:</span>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="X (Twitter)" 
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaXTwitter size={13} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook" 
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaFacebookF size={13} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaInstagram size={13} />
            </a>
          </div>

        </div>

        
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EduCare. All rights reserved.</p>
          
          <p className="flex items-center gap-1 text-[11px]">
            Crafted with <FaHeart className="text-rose-500 mx-0.5" size={11} /> for community education.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;