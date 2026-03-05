// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaBolt,
//   FaCheckCircle,
//   FaLightbulb,
//   FaStar,
// } from "react-icons/fa";
// import axios from "axios";

// const API_BASE_URL = "https://docket-2aus.onrender.com/api";

// // Map to restore icons
// const ICON_MAP = {
//   "Bolt": FaBolt,
//   "Check Circle": FaCheckCircle,
//   "Lightbulb": FaLightbulb,
//   "Star": FaStar,
// };

// const OurPrograms = () => {
//   const navigate = useNavigate();
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [pastPrograms, setPastPrograms] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/programs`);
//         const allPrograms = res.data;

//         // 2. Filter for Past Dates
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const history = allPrograms.filter(prog => {
//           if (!prog.programDate) return false;
//           const progDate = new Date(prog.programDate);
//           return progDate < today;
//         });

//         // 3. Restore Icons
//         const processed = history.map(p => ({
//           ...p,
//           features: (p.features || []).map(f => ({
//             ...f,
//             icon: ICON_MAP[f.iconLabel] || FaBolt
//           }))
//         }));

//         setPastPrograms(processed);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const categories = [
//     "All",
//     "Technical",
//     "Cultural",
//     "Sports",
//     "Academic",
//     // "Workshop & Training",
//     // "Career & Placement",
//     // "Social & Community",
//     "Arts & Creativity"
//   ];

//   // FILTER PROGRAMS BY CATEGORY
//   const handleFilterChange = useCallback((filter) => {
//     setActiveFilter(filter);
//   }, []);

//   const filteredPrograms = useMemo(() => {
//     if (activeFilter === "All") {
//       return pastPrograms;
//     }
//     return pastPrograms.filter(item => item.category === activeFilter);
//   }, [activeFilter, pastPrograms]);

//   // Navigate to details
//   const handleCardClick = (id) => {
//     navigate(`/programdetails/${id}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 overflow-x-hidden min-h-screen font-out">
//       <div className="flex flex-col w-full pt-24 md:pt-28">

//         {/* SECTION TITLE */}
//         <div className="w-full flex flex-col md:flex-row mt-8 px-1">
//           <div className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-[24px] md:text-[36px] font-bold font-lexend text-white"
//             >
//               <span className="text-cyan-400">Past Programs</span>
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-gray-400 mt-2 text-lg hidden md:block"
//             >
//               Explore our history of successful events and workshops
//             </motion.p>
//           </div>

//           {/* FILTER BUTTONS */}
//           <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
//             {categories.map((category) => {
//               const isActive = activeFilter === category

//               return (
//                 <motion.button
//                   key={category}
//                   onClick={() => handleFilterChange(category)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`
//           px-6 py-2.5
//           rounded-full
//           text-sm font-semibold
//           tracking-wide
//           transition-all duration-300
//           backdrop-blur-md
//           h-fit
//           ${isActive
//                       ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
//                       : "bg-slate-800/60 text-gray-300 hover:bg-slate-700/60 hover:text-white"
//                     }
//         `}
//                 >
//                   {category}
//                 </motion.button>
//               )
//             })}
//           </div>

//         </div>

//         {/* PROGRAMS GRID */}
//         {filteredPrograms.length > 0 ? (
//           <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mt-10">
//             {filteredPrograms.map((item) => (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 key={item._id}
//                 onClick={() => handleCardClick(item._id)}
//                 className="flex flex-col rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group overflow-hidden"
//               >
//                 {/* IMAGE */}
//                 <div className="w-full overflow-hidden rounded-t-2xl relative">
//                   <img
//                     src={`${API_BASE_URL}/uploads/${item.images || "default-event.jpg"}`}
//                     alt={item.name}
//                     className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />

//                   <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
//                     {item.name}
//                   </div>
//                   <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
//                     {item.category}
//                   </div>
//                 </div>

//                 {/* PROGRAM DETAILS */}
//                 <div className="flex flex-col w-full p-5 md:p-6 gap-3 md:gap-4">

//                   {/* TITLE */}
//                   <div>
//                     <h3 className="font-bold text-lg md:text-xl text-white mb-1">
//                       {item.title}
//                     </h3>
//                     <div className="flex items-center gap-4 text-sm text-gray-400">
//                       <span className="flex items-center gap-1">
//                         📅 {item.programDate}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         ⏰ {item.programTime}
//                       </span>
//                     </div>
//                   </div>

//                   {/* DESCRIPTION */}
//                   <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
//                     {(item.description || "").substring(0, 150)}...
//                   </p>

//                   {/* FEATURES */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {item.features && item.features.slice(0, 3).map((feature, index) => (
//                       <div key={index} className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg text-xs text-cyan-300">
//                         <span className="text-cyan-400">{feature.icon && React.createElement(feature.icon)}</span>
//                         <span>{feature.name}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* VIEW DETAILS BUTTON */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleCardClick(item._id);
//                     }}
//                     className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
//                   >
//                     View
//                   </motion.button>

//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
//             <p className="text-xl">No past programs found.</p>
//             <p className="text-sm mt-2">Events that happened before today will appear here.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default OurPrograms;


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaBolt,
//   FaCheckCircle,
//   FaLightbulb,
//   FaStar,
//   FaCalendarAlt,
//   FaClock,
// } from "react-icons/fa";
// import axios from "axios";

// const API_BASE_URL = "https://docket-2aus.onrender.com/api";

// const ICON_MAP = {
//   Bolt: FaBolt,
//   "Check Circle": FaCheckCircle,
//   Lightbulb: FaLightbulb,
//   Star: FaStar,
// };

// const OurPrograms = () => {
//   const navigate = useNavigate();
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [pastPrograms, setPastPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE_URL}/programs`);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const history = res.data.filter((prog) => {
//           if (!prog.programDate) return false;
//           return new Date(prog.programDate) < today;
//         });

//         const processed = history.map((p) => ({
//           ...p,
//           features: (p.features || []).map((f) => ({
//             ...f,
//             icon: ICON_MAP[f.iconLabel] || FaBolt,
//           })),
//         }));

//         setPastPrograms(processed);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const categories = [
//     "All",
//     "Technical",
//     "Cultural",
//     "Sports",
//     "Academic",
//     "Arts & Creativity",
//   ];

//   const handleFilterChange = useCallback((filter) => {
//     setActiveFilter(filter);
//   }, []);

//   const filteredPrograms = useMemo(() => {
//     if (activeFilter === "All") return pastPrograms;
//     return pastPrograms.filter((item) => item.category === activeFilter);
//   }, [activeFilter, pastPrograms]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Date TBA";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 md:py-16 bg-gray-950 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-10 text-center md:text-left">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-3xl md:text-4xl font-bold text-white font-momo"
//           >
//             Past <span className="text-cyan-400">Programs</span>
//           </motion.h2>
//           <p className="mt-3 text-gray-400 max-w-2xl mx-auto md:mx-0">
//             Highlights from our previous events, workshops, and memorable activities.
//           </p>

//           {/* Filters - scrollable on mobile */}
//           <div className="mt-6 overflow-x-auto pb-4 scrollbar-hide">
//             <div className="flex gap-3 md:gap-4 justify-center md:justify-start min-w-max">
//               {categories.map((category) => {
//                 const isActive = activeFilter === category;
//                 return (
//                   <motion.button
//                     key={category}
//                     onClick={() => handleFilterChange(category)}
//                     whileTap={{ scale: 0.97 }}
//                     className={`
//                       px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
//                       border
//                       ${isActive
//                         ? "bg-cyan-600/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20"
//                         : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
//                       }
//                     `}
//                   >
//                     {category}
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         {filteredPrograms.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {filteredPrograms.map((item) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 25 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//                 onClick={() => navigate(`/programdetails/${item._id}`)}
//                 className="
//                   group bg-gray-900/40 backdrop-blur-sm 
//                   rounded-2xl overflow-hidden 
//                   border border-gray-800/60 
//                   hover:border-cyan-800/40 
//                   hover:shadow-xl hover:shadow-cyan-950/30 
//                   transition-all duration-400 
//                   cursor-pointer flex flex-col
//                 "
//               >
//                 {/* Image */}
//                 <div className="relative h-52 sm:h-56 overflow-hidden">
//                   <img
//                     src={`${API_BASE_URL}/uploads/${item.images || "default-event.jpg"}`}
//                     alt={item.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent/30" />

//                   {/* Category pill */}
//                   <div className="absolute top-5 left-5">
//                     <span className="px-4 py-1.5 bg-gray-950/70 backdrop-blur-md text-cyan-300 text-xs font-medium rounded-full border border-cyan-900/40 shadow-sm">
//                       {item.category}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
//                     {item.name || "Program Title"}
//                   </h3>

//                   <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
//                     <div className="flex items-center gap-2">
//                       <FaCalendarAlt className="text-cyan-500/80" />
//                       <span>{formatDate(item.programDate)}</span>
//                     </div>
//                     {item.programTime && (
//                       <div className="flex items-center gap-2">
//                         <FaClock className="text-cyan-500/80" />
//                         <span>{item.programTime}</span>
//                       </div>
//                     )}
//                   </div>

//                   <p className="mt-5 text-gray-300/90 text-sm leading-relaxed line-clamp-3 flex-grow">
//                     {item.description || "No description available for this past event."}
//                   </p>

//                   {/* Features tags - optional, subtle */}
//                   {item.features?.length > 0 && (
//                     <div className="mt-5 flex flex-wrap gap-2">
//                       {item.features.slice(0, 3).map((feature, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-center gap-1.5 text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 border border-gray-700/50"
//                         >
//                           {feature.icon && <feature.icon className="text-cyan-400/80 text-sm" />}
//                           <span>{feature.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Button - elegant outlined style */}
//                   <div className="mt-6">
//                     <button
//                       className="
//                         w-full py-3 px-6 
//                         text-sm font-medium text-white 
//                         border border-cyan-600/50 rounded-xl 
//                         hover:bg-cyan-900/30 hover:border-cyan-500/70 
//                         transition-all duration-300 
//                         flex items-center justify-center gap-2 group/btn
//                       "
//                     >
//                       View Event Details
//                       <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-24 text-gray-400"
//           >
//             <p className="text-xl font-medium">No past programs match this filter.</p>
//             <p className="mt-3">Try another category or check back for more history.</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Hide scrollbar but keep scrollable */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default OurPrograms;





import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaCheckCircle,
  FaLightbulb,
  FaStar,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "https://docket-2aus.onrender.com/api";

const ICON_MAP = {
  Bolt: FaBolt,
  "Check Circle": FaCheckCircle,
  Lightbulb: FaLightbulb,
  Star: FaStar,
};

const OurPrograms = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [pastPrograms, setPastPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/programs`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const history = res.data.filter((prog) => {
          if (!prog.programDate) return false;
          return new Date(prog.programDate) < today;
        });

        const processed = history.map((p) => ({
          ...p,
          features: (p.features || []).map((f) => ({
            ...f,
            icon: ICON_MAP[f.iconLabel] || FaBolt,
          })),
        }));

        setPastPrograms(processed);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Sports",
    "Academic",
    "Arts & Creativity",
  ];

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (activeFilter === "All") return pastPrograms;
    return pastPrograms.filter((item) => item.category === activeFilter);
  }, [activeFilter, pastPrograms]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-white font-momo"
          >
            Past <span className="text-cyan-400">Programs</span>
          </motion.h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto md:mx-0 text-sm md:text-md">
            Highlights from our previous events, workshops, and memorable activities.
          </p>

          {/* Filters - scrollable on mobile */}
          <div className="mt-6 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-3 md:gap-4 justify-center md:justify-start min-w-max">
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                      border
                      ${isActive
                        ? "bg-cyan-600/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20"
                        : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                      }
                    `}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid - Updated for Mobile Horizontal Scroll */}
        {filteredPrograms.length > 0 ? (
          <div className="
            flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scroll-smooth scrollbar-hide
            sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0
          ">
            {filteredPrograms.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => navigate(`/programdetails/${item._id}`)}
                className="
                  /* Mobile: Take up most of the width and snap to center */
                  min-w-[85vw] snap-center 
                  /* Desktop: Reset min-width and disable snap */
                  sm:min-w-0 sm:snap-align-none
                  
                  group bg-gray-900/40 backdrop-blur-sm 
                  rounded-2xl overflow-hidden 
                  border border-gray-800/60 
                  hover:border-cyan-800/40 
                  hover:shadow-xl hover:shadow-cyan-950/30 
                  transition-all duration-400 
                  cursor-pointer flex flex-col
                "
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/uploads/${item.images || "default-event.jpg"}`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent/30" />

                  {/* Category pill */}
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 bg-gray-950/70 backdrop-blur-md text-cyan-300 text-xs font-medium rounded-full border border-cyan-900/40 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.name || "Program Title"}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-cyan-500/80" />
                      <span>{formatDate(item.programDate)}</span>
                    </div>
                    {item.programTime && (
                      <div className="flex items-center gap-2">
                        <FaClock className="text-cyan-500/80" />
                        <span>{item.programTime}</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-5 text-gray-300/90 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {item.description || "No description available for this past event."}
                  </p>

                  {/* Features tags */}
                  {item.features?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 border border-gray-700/50"
                        >
                          {feature.icon && <feature.icon className="text-cyan-400/80 text-sm" />}
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <div className="mt-6">
                    <button
                      className="
                        w-full py-3 px-6 
                        text-sm font-medium text-white 
                        border border-cyan-600/50 rounded-xl 
                        hover:bg-cyan-900/30 hover:border-cyan-500/70 
                        transition-all duration-300 
                        flex items-center justify-center gap-2 group/btn
                      "
                    >
                      View Event Details
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-gray-400"
          >
            <p className="text-xl font-medium">No past programs match this filter.</p>
            <p className="mt-3">Try another category or check back for more history.</p>
          </motion.div>
        )}
      </div>

      {/* Styles for scrollbar hiding and mobile spacing */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Mobile adjustment to ensure the last card isn't cut off */
        @media (max-width: 639px) {
          .flex.overflow-x-auto::after {
            content: '';
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OurPrograms;