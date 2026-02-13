import React from "react";
import { motion } from "motion/react";
import { Youtube, Music2, PlayCircle } from "lucide-react";
import logo from "../../assets/logo.webp";
import { LinkButton } from "./ui/Button";

export const Hero = () => {
  return (
    <section className="section-shell-soft relative overflow-hidden py-12 px-4 md:py-20 md:px-6">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="90" cy="10" r="20" fill="currentColor" className="text-blue-500" />
          <circle cx="100" cy="50" r="15" fill="currentColor" className="text-red-500" />
          <circle cx="80" cy="90" r="25" fill="currentColor" className="text-green-500" />
        </svg>
      </div>

      <div className="container-shell grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 relative z-10"
        >
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-tight">
            Співай, танцюй та{" "}
            <span className="bg-gradient-to-r from-[#ef554a] via-[#f5b128] via-[#63ab4e] via-[#16a6a6] via-[#2e87d9] to-[#6b5fd2] bg-clip-text text-transparent">
              веселися
            </span>{" "}
            разом з нами!
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
            Яскравий світ анімаційних пригод та добрих пісень, які вчать малечу дружити, мріяти та відкривати нове щодня.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <LinkButton href="#videos" variant="primary" className="gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-5 text-base md:text-lg transform hover:-translate-y-1">
              <Youtube className="w-5 h-5 md:w-6 md:h-6 fill-white" /> Дивитись кліпи
            </LinkButton>
            <LinkButton
              href="#music"
              variant="outline"
              className="gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-5 text-base md:text-lg transform hover:-translate-y-1"
            >
              <Music2 className="w-5 h-5 md:w-6 md:h-6" /> Слухати пісні
            </LinkButton>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <a
            href="#music"
            aria-label="Перейти до музичного плеєра"
            className="relative z-10 block rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-6 md:border-8 border-white group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-4"
          >
            <img
              src={logo}
              alt="Логотип MalyuKiDs"
              className="w-full h-[380px] md:h-[600px] object-contain bg-white p-6 md:p-10 transition-transform duration-700 group-hover:scale-105"
            />
          </a>
          
          {/* Floating elements match logo colors */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-6 -left-3 md:-top-10 md:-left-10 z-20 w-20 h-20 md:w-32 md:h-32 bg-yellow-400 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-12"
          >
            <Music2 className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 z-20 w-24 h-24 md:w-40 md:h-40 bg-green-500 rounded-full shadow-xl border-4 md:border-8 border-white flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 flex items-center justify-center">
              <PlayCircle className="w-10 h-10 md:w-16 md:h-16 text-white drop-shadow-md" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
