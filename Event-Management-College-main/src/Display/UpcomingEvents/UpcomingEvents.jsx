// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //     FaBolt,
// // //     FaCheckCircle,
// // //     FaLightbulb,
// // //     FaStar,
// // // } from "react-icons/fa";
// // // import axios from "axios";

// // // const API_BASE_URL = "https://docket-2aus.onrender.com/api";

// // // // Map to restore icons
// // // const ICON_MAP = {
// // //     "Bolt": FaBolt,
// // //     "Check Circle": FaCheckCircle,
// // //     "Lightbulb": FaLightbulb,
// // //     "Star": FaStar,
// // // };

// // // export function UpcomingEvents() {
// // //     const [events, setEvents] = useState([]);
// // //     const navigate = useNavigate();

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const res = await axios.get(`${API_BASE_URL}/programs`);
// // //                 console.log(res,"upcoming");

// // //                 const storedPrograms = res.data;
// // //                 const today = new Date();
// // //                 today.setHours(0, 0, 0, 0);

// // //                 const upcoming = storedPrograms.filter(prog => {
// // //                     if (!prog.programDate) return false;
// // //                     const progDate = new Date(prog.programDate);
// // //                     return progDate >= today;
// // //                 });

// // //                 setEvents(upcoming);
// // //             } catch (error) {
// // //                 console.error("Fetch error:", error);
// // //             }
// // //         };
// // //         fetchData();
// // //     }, []);

// // //     if (events.length === 0) {
// // //         return (
// // //             <div className="flex items-center justify-center w-full py-20 bg-black/10 rounded-3xl border border-white/5 mx-auto max-w-7xl">
// // //                 <p className="text-gray-500 font-medium">No upcoming programs available at the moment.</p>
// // //             </div>
// // //         );
// // //     }

// // //     // Duplicating items for seamless loop
// // //     const displayedItems = [...events, ...events];

// // //     return (
// // //         <div className="relative w-full py-16 overflow-hidden font-out">
// // //             <div className="max-w-7xl mx-auto px-6 mb-10">
// // //                 <div className="flex items-center justify-between">
// // //                     <div className="flex items-center gap-4">
// // //                         <div className="w-1.5 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
// // //                         <div>
// // //                             <h2 className="md:text-3xl text-xl font-black text-white tracking-widest uppercase font-momo italic">
// // //                                 Upcoming Programs
// // //                             </h2>
// // //                             <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1 ml-1">
// // //                                 Discover what's next in our college
// // //                             </p>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* === Infinite Auto-Scroll Carousel === */}
// // //             <div className="w-full relative py-6 mask-fade-edges overflow-hidden hover-pause">
// // //                 <div
// // //                     className="flex flex-row w-max px-4 animate-scroll"
// // //                     style={{
// // //                         display: 'flex',
// // //                         gap: 'var(--gap)',
// // //                         "--count": events.length,
// // //                         "--scroll-duration": `${Math.max(events.length * 2, 20)}s`
// // //                     }}
// // //                 >
// // //                     {displayedItems.map((item, index) => (
// // //                         <motion.div
// // //                             key={`${item._id}-${index}`}
// // //                             whileHover={{
// // //                                 y: -12,
// // //                                 scale: 1.02,
// // //                                 transition: { duration: 0.4, ease: "easeOut" }
// // //                             }}
// // //                             className="flex-shrink-0 flex flex-col mt-2 overflow-hidden w-[var(--card-width)] rounded-[2rem] relative group bg-gradient-to-b from-gray-900/80 to-black border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-2 hover:border-blue-500/70 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
// // //                         >
// // //                             {/* Background Image Container */}
// // //                             <div
// // //                                 onClick={() => navigate(`/programdetails/${item._id}`)}
// // //                                 className="w-full h-[260px] cursor-pointer relative overflow-hidden"
// // //                             >
// // //                                 <motion.div
// // //                                     className="absolute inset-0 bg-center bg-cover bg-no-repeat"
// // //                                     whileHover={{ scale: 1.15 }}
// // //                                     transition={{ duration: 0.8 }}
// // //                                     style={{
// // //                                         backgroundImage: `url(${API_BASE_URL}/uploads/${item.images || "default-event.jpg"})`,
// // //                                     }}
// // //                                 />
// // //                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
// // //                                 <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

// // //                                 <div className="absolute top-6 left-6 flex gap-3">
// // //                                     <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-[0.15em] backdrop-blur-xl shadow-2xl border border-white/20">
// // //                                         Active
// // //                                     </span>
// // //                                     {item.category && (
// // //                                         <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.15em] backdrop-blur-xl border border-white/10">
// // //                                             {item.category}
// // //                                         </span>
// // //                                     )}
// // //                                 </div>
// // //                             </div>

// // //                             {/* Event Details Content */}
// // //                             <div className="py-8 px-8 text-left flex flex-col gap-6">
// // //                                 <div>
// // //                                     <h3 className="font-sans font-black text-white text-2xl group-hover:text-blue-400 transition-colors duration-300 mb-2 leading-tight">
// // //                                         {item.name || "Upcoming Event"}
// // //                                     </h3>
// // //                                     <div className="flex items-center gap-2">
// // //                                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
// // //                                         <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
// // //                                             {item.department || "General Event"}
// // //                                         </p>
// // //                                     </div>
// // //                                 </div>

// // //                                 <div className="pt-2">
// // //                                     <button
// // //                                         onClick={() => navigate(`/programdetails/${item._id}`)}
// // //                                         className="w-full py-4 bg-white/[0.05] hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border border-white/10 hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
// // //                                     >
// // //                                         Explore Program
// // //                                     </button>
// // //                                 </div>
// // //                             </div>
// // //                         </motion.div>
// // //                     ))}
// // //                 </div>
// // //             </div>

// // //             <style>{`
// // //                 .mask-fade-edges {
// // //                     mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
// // //                     -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
// // //                 }
// // //                 .hover-pause:hover .animate-scroll {
// // //                     animation-play-state: paused !important;
// // //                 }
// // //                 .animate-scroll {
// // //                     --card-width: 400px;
// // //                     --gap: 32px;
// // //                     animation: scroll-left var(--scroll-duration) linear infinite;
// // //                 }
// // //                 @media (max-width: 1024px) {
// // //                     .animate-scroll {
// // //                         --card-width: 320px;
// // //                         --gap: 24px;
// // //                     }
// // //                 }
// // //                 @media (max-width: 640px) {
// // //                     .animate-scroll {
// // //                         --card-width: 260px;
// // //                         --gap: 16px;
// // //                     }
// // //                 }
// // //                 @keyframes scroll-left {
// // //                     0% { transform: translateX(0); }
// // //                     100% { transform: translateX(calc(-1 * var(--count) * (var(--card-width) + var(--gap)))); }
// // //                 }
// // //             `}</style>
// // //         </div>
// // //     );
// // // }



// // import { motion } from "framer-motion";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //     FaBolt,
// //     FaCheckCircle,
// //     FaLightbulb,
// //     FaStar,
// //     FaCalendarAlt,
// //     FaMapMarkerAlt,
// //     FaArrowRight,
// // } from "react-icons/fa";
// // import axios from "axios";

// // const API_BASE_URL = "https://docket-2aus.onrender.com/api";

// // // Map to restore icons
// // const ICON_MAP = {
// //     "Bolt": FaBolt,
// //     "Check Circle": FaCheckCircle,
// //     "Lightbulb": FaLightbulb,
// //     "Star": FaStar,
// // };

// // export function UpcomingEvents() {
// //     const [events, setEvents] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const res = await axios.get(`${API_BASE_URL}/programs`);
// //                 console.log(res, "upcoming");

// //                 const storedPrograms = res.data;
// //                 const today = new Date();
// //                 today.setHours(0, 0, 0, 0);

// //                 const upcoming = storedPrograms.filter(prog => {
// //                     if (!prog.programDate) return false;
// //                     const progDate = new Date(prog.programDate);
// //                     return progDate >= today;
// //                 });

// //                 setEvents(upcoming);
// //             } catch (error) {
// //                 console.error("Fetch error:", error);
// //             }
// //         };
// //         fetchData();
// //     }, []);

// //     if (events.length === 0) {
// //         return (
// //             <div className="flex items-center justify-center w-full py-20 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-white/10 mx-auto max-w-7xl backdrop-blur-sm">
// //                 <div className="text-center">
// //                     <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
// //                         <FaCalendarAlt className="text-3xl text-blue-400" />
// //                     </div>
// //                     <p className="text-gray-400 font-semibold text-lg">No upcoming programs available</p>
// //                     <p className="text-gray-600 text-sm mt-2">Check back soon for exciting events!</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     // Format date helper
// //     const formatDate = (dateString) => {
// //         if (!dateString) return "Date TBA";
// //         const date = new Date(dateString);
// //         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// //     };

// //     // Duplicating items for seamless loop
// //     const displayedItems = [...events, ...events];

// //     return (
// //         <div className="relative w-full py-16 overflow-hidden font-out">
// //             {/* Header Section */}
// //             <div className="max-w-7xl mx-auto px-6 mb-12">
// //                 <motion.div 
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.6 }}
// //                     className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
// //                 >
// //                     <div className="flex items-center gap-4">
// //                         <div className="relative">
// //                             <div className="w-2 h-14 bg-gradient-to-b from-blue-500 via-blue-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
// //                             <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md"></div>
// //                         </div>
// //                         <div>
// //                             <h2 className="md:text-4xl text-xl font-black text-white tracking-wider uppercase font-momo italic bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
// //                                 Upcoming Programs
// //                             </h2>
// //                             <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 ml-1 flex items-center gap-2">
// //                                 <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
// //                                 Discover what's next in our college
// //                             </p>
// //                         </div>
// //                     </div>
// //                     <div className="hidden md:flex items-center gap-3 text-gray-500 text-sm">
// //                         <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
// //                             {events.length} {events.length === 1 ? 'Program' : 'Programs'}
// //                         </span>
// //                     </div>
// //                 </motion.div>
// //             </div>

// //             {/* Infinite Auto-Scroll Carousel */}
// //             <div className="w-full relative py-8 mask-fade-edges overflow-hidden hover-pause">
// //                 <div
// //                     className="flex flex-row w-max px-4 animate-scroll"
// //                     style={{
// //                         display: 'flex',
// //                         gap: 'var(--gap)',
// //                         "--count": events.length,
// //                         "--scroll-duration": `${Math.max(events.length * 1.5, 25)}s`
// //                     }}
// //                 >
// //                     {displayedItems.map((item, index) => (
// //                         <motion.div
// //                             key={`${item._id}-${index}`}
// //                             whileHover={{
// //                                 y: -16,
// //                                 scale: 1.03,
// //                                 transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
// //                             }}
// //                             className="flex-shrink-0 flex flex-col overflow-hidden w-[var(--card-width)] rounded-[2rem] relative group bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_8px_32px_rgba(59,130,246,0.3),0_0_0_1px_rgba(59,130,246,0.1)]"
// //                         >
// //                             {/* Animated gradient overlay */}
// //                             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700 rounded-[2rem] pointer-events-none"></div>

// //                             {/* Glow effect on hover */}
// //                             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

// //                             {/* Background Image Container */}
// //                             <div
// //                                 onClick={() => navigate(`/programdetails/${item._id}`)}
// //                                 className="w-full h-[280px] cursor-pointer relative overflow-hidden"
// //                             >
// //                                 <motion.div
// //                                     className="absolute inset-0 bg-center bg-cover bg-no-repeat"
// //                                     whileHover={{ scale: 1.1 }}
// //                                     transition={{ duration: 0.6, ease: "easeOut" }}
// //                                     style={{
// //                                         backgroundImage: `url(${API_BASE_URL}/uploads/${item.images || "default-event.jpg"})`,
// //                                     }}
// //                                 />
// //                                 {/* Multi-layer gradient overlay */}
// //                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90"></div>
// //                                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-500"></div>

// //                                 {/* Top badges */}
// //                                 <div className="absolute top-5 left-5 flex gap-2 z-10">
// //                                     <motion.span 
// //                                         whileHover={{ scale: 1.05 }}
// //                                         className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-[10px] font-black text-white uppercase tracking-[0.15em] backdrop-blur-xl shadow-lg border border-white/30 flex items-center gap-1.5"
// //                                     >
// //                                         <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
// //                                         Active
// //                                     </motion.span>
// //                                     {item.category && (
// //                                         <motion.span 
// //                                             whileHover={{ scale: 1.05 }}
// //                                             className="px-4 py-2 bg-white/15 rounded-full text-[10px] font-black text-white uppercase tracking-[0.15em] backdrop-blur-xl border border-white/20 shadow-lg"
// //                                         >
// //                                             {item.category}
// //                                         </motion.span>
// //                                     )}
// //                                 </div>

// //                                 {/* Date badge */}
// //                                 {item.programDate && (
// //                                     <div className="absolute bottom-5 right-5 z-10">
// //                                         <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
// //                                             <div className="flex items-center gap-2 text-white">
// //                                                 <FaCalendarAlt className="text-blue-400 text-xs" />
// //                                                 <span className="text-xs font-bold tracking-wide">
// //                                                     {formatDate(item.programDate)}
// //                                                 </span>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Event Details Content */}
// //                             <div className="py-7 px-7 text-left flex flex-col gap-5 relative z-10">
// //                                 <div>
// //                                     <h3 className="font-sans font-black text-white text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 mb-3 leading-tight line-clamp-2">
// //                                         {item.name || "Upcoming Event"}
// //                                     </h3>
// //                                     <div className="flex items-center gap-2 mb-3">
// //                                         <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
// //                                         <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
// //                                             {item.department || "General Program"}
// //                                         </p>
// //                                     </div>

// //                                     {/* Description preview */}
// //                                     {/* {item.description && (
// //                                         <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-2">
// //                                             {item.description}
// //                                         </p>
// //                                     )} */}
// //                                 </div>

// //                                 {/* Action button */}
// //                                 <div className="pt-3">
// //                                     <motion.button
// //                                         whileHover={{ scale: 1.02 }}
// //                                         whileTap={{ scale: 0.98 }}
// //                                         onClick={() => navigate(`/programdetails/${item._id}`)}
// //                                         className="w-full py-4 bg-gradient-to-r from-white/[0.07] to-white/[0.05] hover:from-blue-600 hover:to-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.25em] transition-all duration-500 border border-white/10 hover:border-transparent group/button shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden"
// //                                     >
// //                                         <span className="relative z-10 flex items-center justify-center gap-2">
// //                                             Explore Program
// //                                             <FaArrowRight className="text-xs group-hover/button:translate-x-1 transition-transform duration-300" />
// //                                         </span>
// //                                         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>
// //                                     </motion.button>
// //                                 </div>
// //                             </div>

// //                             {/* Corner accent */}
// //                             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// //                         </motion.div>
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* Scroll indicator */}
// //             <div className="flex justify-center mt-8 gap-2">
// //                 <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
// //                     <p className="text-gray-500 text-xs font-semibold tracking-wider flex items-center gap-2">
// //                         <span className="text-blue-400">←</span>
// //                         Hover to pause
// //                         <span className="text-blue-400">→</span>
// //                     </p>
// //                 </div>
// //             </div>

// //             <style>{`
// //                 .mask-fade-edges {
// //                     mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
// //                     -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
// //                 }
// //                 .hover-pause:hover .animate-scroll {
// //                     animation-play-state: paused !important;
// //                 }
// //                 .animate-scroll {
// //                     --card-width: 420px;
// //                     --gap: 40px;
// //                     animation: scroll-left var(--scroll-duration) linear infinite;
// //                 }
// //                 @media (max-width: 1024px) {
// //                     .animate-scroll {
// //                         --card-width: 340px;
// //                         --gap: 28px;
// //                     }
// //                 }
// //                 @media (max-width: 640px) {
// //                     .animate-scroll {
// //                         --card-width: 280px;
// //                         --gap: 20px;
// //                     }
// //                 }
// //                 @keyframes scroll-left {
// //                     0% { transform: translateX(0); }
// //                     100% { transform: translateX(calc(-1 * var(--count) * (var(--card-width) + var(--gap)))); }
// //                 }

// //                 /* Line clamp utilities */
// //                 .line-clamp-2 {
// //                     display: -webkit-box;
// //                     -webkit-line-clamp: 2;
// //                     -webkit-box-orient: vertical;
// //                     overflow: hidden;
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // }


// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     FaBolt,
//     FaCheckCircle,
//     FaLightbulb,
//     FaStar,
//     FaCalendarAlt,
//     FaMapMarkerAlt,
//     FaArrowRight,
// } from "react-icons/fa";
// import axios from "axios";

// const API_BASE_URL = "https://docket-2aus.onrender.com/api";

// // Map to restore icons
// const ICON_MAP = {
//     "Bolt": FaBolt,
//     "Check Circle": FaCheckCircle,
//     "Lightbulb": FaLightbulb,
//     "Star": FaStar,
// };

// export function UpcomingEvents() {
//     const [events, setEvents] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(`${API_BASE_URL}/programs`);
//                 console.log(res, "upcoming");

//                 const storedPrograms = res.data;
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);

//                 const upcoming = storedPrograms.filter(prog => {
//                     if (!prog.programDate) return false;
//                     const progDate = new Date(prog.programDate);
//                     return progDate >= today;
//                 });

//                 setEvents(upcoming);
//             } catch (error) {
//                 console.error("Fetch error:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     if (events.length === 0) {
//         return (
//             <div className="flex items-center justify-center w-full py-20 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-white/10 mx-auto max-w-7xl backdrop-blur-sm">
//                 <div className="text-center">
//                     <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
//                         <FaCalendarAlt className="text-3xl text-blue-400" />
//                     </div>
//                     <p className="text-gray-400 font-semibold text-lg">No upcoming programs available</p>
//                     <p className="text-gray-600 text-sm mt-2">Check back soon for exciting events!</p>
//                 </div>
//             </div>
//         );
//     }

//     // Format date helper
//     const formatDate = (dateString) => {
//         if (!dateString) return "Date TBA";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//     };

//     // Duplicating items for seamless loop
//     const displayedItems = [...events, ...events];

//     return (
//         <div className="relative w-full py-16 overflow-hidden font-out">
//             {/* Header Section */}
//             <div className="max-w-7xl mx-auto px-6 mb-12">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//                 >
//                     <div className="flex items-center gap-4">
//                         <div className="relative">
//                             <div className="w-2 h-14 bg-gradient-to-b from-blue-500 via-blue-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
//                             <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-md"></div>
//                         </div>
//                         <div>
//                             <h2 className="md:text-4xl text-2xl font-black text-white tracking-wider uppercase font-momo italic bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
//                                 Upcoming Programs
//                             </h2>
//                             <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 ml-1 flex items-center gap-2">
//                                 <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
//                                 Discover what's next in our college
//                             </p>
//                         </div>
//                     </div>
//                     <div className="hidden md:flex items-center gap-3 text-gray-500 text-sm">
//                         <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
//                             {events.length} {events.length === 1 ? 'Program' : 'Programs'}
//                         </span>
//                     </div>
//                 </motion.div>
//             </div>

//             {/* Infinite Auto-Scroll Carousel */}
//             <div className="w-full relative py-8 mask-fade-edges overflow-hidden hover-pause">
//                 <div
//                     className="flex flex-row w-max px-4 animate-scroll"
//                     style={{
//                         display: 'flex',
//                         gap: 'var(--gap)',
//                         "--count": events.length,
//                         "--scroll-duration": `${Math.max(events.length * 1.5, 15)}s`
//                     }}
//                 >
//                     {displayedItems.map((item, index) => (
//                         <motion.div
//                             key={`${item._id}-${index}`}
//                             whileHover={{
//                                 y: -16,
//                                 scale: 1.03,
//                                 transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
//                             }}
//                             className="flex-shrink-0 flex flex-col overflow-hidden w-[var(--card-width)] h-[var(--card-height)] rounded-xl sm:rounded-2xl lg:rounded-[2rem] relative group bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_8px_32px_rgba(59,130,246,0.3),0_0_0_1px_rgba(59,130,246,0.1)]"
//                         >
//                             {/* Animated gradient overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700 rounded-xl sm:rounded-2xl lg:rounded-[2rem] pointer-events-none"></div>

//                             {/* Glow effect on hover */}
//                             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl lg:rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

//                             {/* Background Image Container */}
//                             <div
//                                 onClick={() => navigate(`/programdetails/${item._id}`)}
//                                 className="w-full h-[var(--image-height)] cursor-pointer relative overflow-hidden flex-shrink-0"
//                             >
//                                 <motion.div
//                                     className="absolute inset-0 bg-center bg-cover bg-no-repeat"
//                                     whileHover={{ scale: 1.1 }}
//                                     transition={{ duration: 0.6, ease: "easeOut" }}
//                                     style={{
//                                         backgroundImage: `url(${API_BASE_URL}/uploads/${item.images || "default-event.jpg"})`,
//                                     }}
//                                 />
//                                 {/* Multi-layer gradient overlay */}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90"></div>
//                                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-500"></div>

//                                 {/* Top badges */}
//                                 <div className="absolute top-3 left-3 sm:top-4 lg:top-5 sm:left-4 lg:left-5 flex gap-1.5 sm:gap-2 z-10 flex-wrap">
//                                     <motion.span
//                                         whileHover={{ scale: 1.05 }}
//                                         className="px-2.5 py-1 sm:px-3 lg:px-4 sm:py-1.5 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-[8px] sm:text-[9px] lg:text-[10px] font-black text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] backdrop-blur-xl shadow-lg border border-white/30 flex items-center gap-1"
//                                     >
//                                         <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-pulse"></span>
//                                         Active
//                                     </motion.span>
//                                     {item.category && (
//                                         <motion.span
//                                             whileHover={{ scale: 1.05 }}
//                                             className="px-2.5 py-1 sm:px-3 lg:px-4 sm:py-1.5 lg:py-2 bg-white/15 rounded-full text-[8px] sm:text-[9px] lg:text-[10px] font-black text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] backdrop-blur-xl border border-white/20 shadow-lg"
//                                         >
//                                             {item.category}
//                                         </motion.span>
//                                     )}
//                                 </div>

//                                 {/* Date badge */}
//                                 {item.programDate && (
//                                     <div className="absolute bottom-3 right-3 sm:bottom-4 lg:bottom-5 sm:right-4 lg:right-5 z-10">
//                                         <div className="px-2.5 py-1.5 sm:px-3 lg:px-4 sm:py-2 bg-black/60 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 shadow-xl">
//                                             <div className="flex items-center gap-1.5 sm:gap-2 text-white">
//                                                 <FaCalendarAlt className="text-blue-400 text-[8px] sm:text-[9px] lg:text-xs" />
//                                                 <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-wide">
//                                                     {formatDate(item.programDate)}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Event Details Content */}
//                             <div className="py-4 px-4 sm:py-5 lg:py-7 sm:px-5 lg:px-7 text-left flex flex-col gap-3 sm:gap-4 lg:gap-5 relative z-10 flex-1">
//                                 <div className="flex-1">
//                                     <h3 className="font-sans font-black text-white text-base sm:text-xl lg:text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 mb-2 sm:mb-2.5 lg:mb-3 leading-tight line-clamp-2">
//                                         {item.name || "Upcoming Event"}
//                                     </h3>
//                                     <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 lg:mb-3">
//                                         <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse flex-shrink-0"></div>
//                                         <p className="text-gray-400 text-[9px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] lg:tracking-[0.2em] truncate">
//                                             {item.department || "General Event"}
//                                         </p>
//                                     </div>

//                                     {/* Description preview */}
//                                     {item.description && (
//                                         <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mt-1.5 sm:mt-2 hidden sm:block">
//                                             {item.description}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Action button */}
//                                 <div className="pt-2 sm:pt-2.5 lg:pt-3">
//                                     <motion.button
//                                         whileHover={{ scale: 1.02 }}
//                                         whileTap={{ scale: 0.98 }}
//                                         onClick={() => navigate(`/programdetails/${item._id}`)}
//                                         className="w-full py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-white/[0.07] to-white/[0.05] hover:from-blue-600 hover:to-purple-600 text-white rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.22em] lg:tracking-[0.25em] transition-all duration-500 border border-white/10 hover:border-transparent group/button shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden"
//                                     >
//                                         <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
//                                             <span className="hidden xs:inline">Explore Program</span>
//                                             <span className="xs:hidden">View</span>
//                                             <FaArrowRight className="text-[8px] sm:text-[9px] lg:text-xs group-hover/button:translate-x-1 transition-transform duration-300" />
//                                         </span>
//                                         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>
//                                     </motion.button>
//                                 </div>
//                             </div>

//                             {/* Corner accent */}
//                             <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-2xl sm:rounded-bl-[2.5rem] lg:rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Scroll indicator */}
//             <div className="flex justify-center mt-8 gap-2">
//                 {/* <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
//                     <p className="text-gray-500 text-xs font-semibold tracking-wider flex items-center gap-2">
//                         <span className="text-blue-400">←</span>
//                         Hover to pause
//                         <span className="text-blue-400">→</span>
//                     </p>
//                 </div> */}
//             </div>

//             <style>{`
//                 .mask-fade-edges {
//                     mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
//                     -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
//                 }
//                 .hover-pause:hover .animate-scroll {
//                     animation-play-state: paused !important;
//                 }
//                 .animate-scroll {
//                     --card-width: 420px;
//                     --card-height: auto;
//                     --image-height: 280px;
//                     --gap: 40px;
//                     animation: scroll-left var(--scroll-duration) linear infinite;
//                 }
//                 @media (max-width: 1024px) {
//                     .animate-scroll {
//                         --card-width: 320px;
//                         --card-height: auto;
//                         --image-height: 200px;
//                         --gap: 24px;
//                     }
//                 }
//                 @media (max-width: 640px) {
//                     .animate-scroll {
//                         --card-width: 280px;
//                         --card-height: 420px;
//                         --image-height: 180px;
//                         --gap: 16px;
//                     }
//                 }
//                 @media (max-width: 480px) {
//                     .animate-scroll {
//                         --card-width: 260px;
//                         --card-height: 400px;
//                         --image-height: 160px;
//                         --gap: 12px;
//                     }
//                 }
//                 @keyframes scroll-left {
//                     0% { transform: translateX(0); }
//                     100% { transform: translateX(calc(-1 * var(--count) * (var(--card-width) + var(--gap)))); }
//                 }
                
//                 /* Line clamp utilities */
//                 .line-clamp-2 {
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// }




import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import {
  FaBolt,
  FaCheckCircle,
  FaLightbulb,
  FaStar,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "https://docket-2aus.onrender.com/api";

const ICON_MAP = {
  Bolt: FaBolt,
  "Check Circle": FaCheckCircle,
  Lightbulb: FaLightbulb,
  Star: FaStar,
};

export function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/programs`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = res.data.filter((prog) => {
          if (!prog.programDate) return false;
          return new Date(prog.programDate) >= today;
        });

        setEvents(upcoming);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  if (events.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 font-out">
        <div className="rounded-2xl bg-gray-900/60 p-10 text-center backdrop-blur-sm border border-gray-700/50">
          <FaCalendarAlt className="mx-auto h-12 w-12 text-blue-500/70" />
          <h3 className="mt-4 text-xl font-semibold text-white">No upcoming programs</h3>
          <p className="mt-2 text-gray-400">Check back later for new events!</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isMobile = window.innerWidth < 768; // you can also use useMediaQuery if preferred

  return (
    <section className="relative py-12 md:py-16 lg:py-20 font-out">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl font-momo">
              Upcoming <span className="text-cyan-400">Programs</span>
            </h2>
            <p className="mt-2 text-gray-400">
              Exciting events and activities coming up
            </p>
          </div>

          {events.length > 0 && (
           <div className="rounded-full bg-white/10 backdrop-blur-md px-4 md:py-2 py-1 text-sm text-gray-300 border border-white/20 w-fit text-[12px] md:text-sm">
  {events.length} {events.length === 1 ? "Program" : "Programs"}
</div>
          )}
        </div>

        {/* Carousel / Scroll container */}
        <div
          className={`
            -mx-4 px-4
            overflow-x-auto no-scrollbar
            scroll-smooth
            pb-6
            ${isMobile ? "snap-x snap-mandatory" : ""}
            ${!isMobile ? "animate-scroll-container" : ""}
          `}
          style={{
            // only apply auto-scroll animation on non-mobile
            ...(isMobile ? {} : { animation: "scroll-left var(--scroll-duration) linear infinite" }),
          }}
        >
          <div
            className={`
              flex gap-5 sm:gap-6 lg:gap-8
              ${isMobile ? "w-max" : "w-max"}
            `}
            // duplicate only for desktop auto-scroll
            style={isMobile ? {} : { display: "flex" }}
          >
            {events.map((item) => (
              <motion.div
                key={item._id}
                whileHover={isMobile ? {} : { y: -12, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`
                  flex-shrink-0 snap-start
                  w-[85vw] max-w-[340px] sm:w-[340px] md:w-[380px] lg:w-[420px]
                  rounded-2xl overflow-hidden
                  bg-gradient-to-b from-gray-900 to-gray-950
                  border border-gray-800/70
                  shadow-xl shadow-black/40
                  transition-all duration-300
                  hover:border-blue-700/40
                `}
              >
                {/* Image */}
                <div
                  className="relative h-48 sm:h-52 cursor-pointer"
                  onClick={() => navigate(`/programdetails/${item._id}`)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${API_BASE_URL}/uploads/${item.images || "default-event.jpg"})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      Upcoming
                    </span>
                    {item.category && (
                      <span className="rounded-full bg-gray-700/80 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur-sm">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  {item.programDate && (
                    <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-gray-700/50">
                      {formatDate(item.programDate)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  <div className="min-h-[3.5rem]">
                    <h3 className="line-clamp-2 text-lg font-semibold text-white sm:text-xl">
                      {item.name || "Program"}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-400 line-clamp-1">
                      {item.department || "College Program"}
                    </p>
                  </div>

                  {item.description && (
                    <p className="line-clamp-2 text-sm text-gray-300/90 sm:text-base">
                      {item.description}
                    </p>
                  )}

                  <button
                    onClick={() => navigate(`/programdetails/${item._id}`)}
                    className="
                      mt-2 w-full
                      flex items-center justify-center gap-2
                      rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700
                      py-3 text-sm font-semibold text-white
                      transition hover:brightness-110 active:scale-98
                    "
                  >
                    Expolore Program
                    <MdOutlineKeyboardDoubleArrowRight className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Only duplicate on desktop for infinite scroll */}
            {!isMobile &&
              events.map((item) => (
                <motion.div
                  key={"dup-" + item._id}
                  aria-hidden="true"
                  className="flex-shrink-0 w-[340px] md:w-[380px] lg:w-[420px] opacity-0 pointer-events-none"
                >
                  {/* empty duplicate — only used for visual continuity in auto-scroll */}
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .animate-scroll-container {
            mask-image: linear-gradient(
              to right,
              transparent,
              black 8%,
              black 92%,
              transparent
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              black 8%,
              black 92%,
              transparent
            );
          }

          .animate-scroll-container:hover {
            animation-play-state: paused;
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(
                calc(-1 * ${events.length} * (420px + 32px))
              );
            }
          }
        }

        /* Improve scroll behavior on mobile */
        .no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
      `}</style>
    </section>
  );
}