import React from "react";
import { motion } from "motion/react";
import { Youtube, Music2, PlayCircle } from "lucide-react";
import logo from "../../assets/logo.webp";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-20 px-6">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="90" cy="10" r="20" fill="currentColor" className="text-blue-500" />
          <circle cx="100" cy="50" r="15" fill="currentColor" className="text-red-500" />
          <circle cx="80" cy="90" r="25" fill="currentColor" className="text-green-500" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            Співай, танцюй та <span className="text-blue-500">веселися</span> разом з нами!
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
            Яскравий світ анімаційних пригод та добрих пісень, які вчать малечу дружити, мріяти та відкривати нове щодня.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#videos" className="flex items-center gap-3 px-8 py-5 bg-[#FC3C44] text-white rounded-[2rem] font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <Youtube className="w-6 h-6 fill-white" /> Дивитись кліпи
            </a>
            <a href="#music" className="flex items-center gap-3 px-8 py-5 border-4 border-gray-200 text-gray-700 rounded-[2rem] font-bold text-lg hover:bg-white transition-all transform hover:-translate-y-1">
              <Music2 className="w-6 h-6" /> Слухати пісні
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group">
            <img
              src={logo}
              alt="MalyuKiDs Logo"
              className="w-full h-[600px] object-contain bg-white p-10 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Floating elements match logo colors */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-10 -left-10 z-20 w-32 h-32 bg-yellow-400 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-12"
          >
            <Music2 className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            className="absolute -bottom-10 -right-10 z-20 w-40 h-40 bg-green-500 rounded-full shadow-xl border-8 border-white flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white drop-shadow-md" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
