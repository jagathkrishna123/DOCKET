// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

// const ManageProgram = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("events"); // 'programs' or 'events'

//   const [programs, setPrograms] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [deleteConfig, setDeleteConfig] = useState(null); // { id, type }
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

// const formatDate = (dateString) => {
//   if (!dateString) return "-";

//   return new Date(dateString).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [programsRes, eventsRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/programs`),
//           axios.get(`${API_BASE_URL}/events`)
//         ]);
//         setPrograms(programsRes.data);
//         setEvents(eventsRes.data);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error("Failed to load data from backend.");
//       }
//     };
//     fetchData();
//   }, []);

//   // 🔹 Delete Item
//   const handleDelete = (id, type) => {
//     setDeleteConfig({ id, type });
//   };

//   const confirmDelete = async () => {
//     if (!deleteConfig) return;
//     const { id, type } = deleteConfig;
//     console.log("delete", id);


//     try {
//       if (type === "program") {
//         await axios.delete(`${API_BASE_URL}/programs/${id}`);
//         setPrograms(programs.filter(p => p._id !== id));
//         // Also remove associated events from state
//         setEvents(events.filter(e => e.programId !== id));
//         toast.success("Program and associated events deleted successfully");
//       } else {
//         await axios.delete(`${API_BASE_URL}/events/${id}`);
//         setEvents(events.filter(e => e._id !== id));
//         toast.success("Event deleted successfully");
//       }
//       setDeleteConfig(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error(error.response?.data?.error || "Failed to delete item.");
//     }
//   };

//   // 🔹 Edit Item
//   const handleEdit = (item, type) => {
//     if (type === "program") {
//       navigate('/admin/admin-add-program', { state: { programData: item } });
//     } else {
//       // For Admin Add Event
//       navigate(`/admin/addevent/${item._id}`, { state: { eventData: item } });
//     }
//   };

//   // 🔹 Toggle Status (Mock approval for now)
//   const handleToggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "approved" ? "rejected" : "approved";
//     try {
//       await axios.patch(`${API_BASE_URL}/events/${id}/status`, { status: newStatus });
//       setEvents(events.map(e => e._id === id ? { ...e, status: newStatus } : e));
//       toast.success(`Event ${newStatus} successfully!`);
//     } catch (error) {
//       console.error("Status update error:", error);
//       toast.error("Failed to update status.");
//     }
//   };


//   // 🔹 Pagination Logic
//   const data = activeTab === "programs" ? programs : events;
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="min-h-screen text-slate-400 p-6 font-out">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="md:text-2xl text-md font-semibold">Manage Content</h1>
//           <div className="flex bg-slate-800 rounded-lg p-1">
//             <button
//               onClick={() => { setActiveTab("programs"); setCurrentPage(1); }}
//               className={`px-4 py-2 rounded-md ${activeTab === 'programs' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700'}`}
//             >
//               Programs
//             </button>
//             <button
//               onClick={() => { setActiveTab("events"); setCurrentPage(1); }}
//               className={`px-4 py-2 rounded-md ${activeTab === 'events' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700'}`}
//             >
//               Events
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full border border-white/10 rounded-xl">
//             <thead className="bg-white/5 text-[12px] md:text-sm">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3">Date</th>
//                 {activeTab === 'events' && <th className="p-3">Program</th>}
//                 {activeTab === 'events' && <th className="p-3">Status</th>}
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((item) => (
//                   <tr key={item._id || item.id} className="border-t border-white/10 hover:bg-white/5">
//                     <td className="p-3">
//                       <div className="font-medium text-white text-[12px] md:text-[14px]">{item.name || item.eventName}</div>
//                       <div className="text-xs">{item.category}</div>
//                     </td>
// <td className="p-3 text-center text-[12px] md:text-sm">
//   {formatDate(item.programDate || item.date)}
// </td>
//                     {activeTab === 'events' && (() => {
//                       const program = programs.find(p => p._id === item.programId);
//                       return <td className="p-3 text-center text-[12px] md:text-sm">{program?.name || item.programName || "-"}</td>;
//                     })()}

//                     {activeTab === 'events' && (
//                       <td className="p-3 text-center">
//                         <span className={`px-2 py-1 rounded text-xs ${item.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
//                           {item.status || "Pending"}
//                         </span>
//                       </td>
//                     )}

//                     <td className="p-3 flex gap-3 justify-center">
//                       <button
//                         onClick={() => handleEdit(item, activeTab === "programs" ? "program" : "event")}
//                         className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors"
//                         title="Edit"
//                       >
//                         <FaEdit />
//                       </button>

//                       {activeTab === 'events' && (
//                         <button
//                           onClick={() => handleToggleStatus(item._id, item.status)}
//                           className={`p-2 rounded hover:text-white transition-colors ${item.status === 'approved' ? 'bg-red-500/20 text-red-400 hover:bg-red-500' : 'bg-green-500/20 text-green-400 hover:bg-green-500'}`}
//                           title={item.status === 'approved' ? "Reject" : "Approve"}
//                         >
//                           {item.status === 'approved' ? <FaTimes /> : <FaCheck />}
//                         </button>
//                       )}

//                       <button
//                         onClick={() => handleDelete(item._id, activeTab === "programs" ? "program" : "event")}
//                         className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
//                         title="Delete"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="p-8 text-center text-slate-500">
//                     No {activeTab} found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-slate-400">
//               Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} items
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
//               >
//                 Previous
//               </button>

//               <span className="px-3 py-2 text-white bg-blue-600 rounded text-sm">
//                 {currentPage}
//               </span>

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         <AnimatePresence>
//           {deleteConfig && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="bg-[#0f111a] border border-red-500/20 p-8 rounded-[2rem] shadow-2xl max-w-sm w-full relative overflow-hidden text-center"
//               >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-600"></div>

//                 <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-3xl mb-6 mx-auto shadow-red-500/20 shadow-lg">
//                   <FaTrash />
//                 </div>

//                 <h3 className="text-2xl font-black text-white mb-2">Delete {deleteConfig.type === 'program' ? 'Program' : 'Event'}?</h3>
//                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">
//                   This action cannot be undone.
//                 </p>

//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={() => setDeleteConfig(null)}
//                     className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all text-sm uppercase tracking-wider border border-white/5"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={confirmDelete}
//                     className="py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-900/40 text-sm uppercase tracking-wider"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ManageProgram;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api";

const ManageProgram = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");

  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [deleteConfig, setDeleteConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, eventsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/programs`),
          axios.get(`${API_BASE_URL}/events`),
        ]);
        setPrograms(programsRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load data from backend.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id, type) => setDeleteConfig({ id, type });

  const confirmDelete = async () => {
    if (!deleteConfig) return;
    const { id, type } = deleteConfig;

    try {
      if (type === "program") {
        await axios.delete(`${API_BASE_URL}/programs/${id}`);
        setPrograms(programs.filter((p) => p._id !== id));
        setEvents(events.filter((e) => e.programId !== id));
        toast.success("Program and associated events deleted successfully");
      } else {
        await axios.delete(`${API_BASE_URL}/events/${id}`);
        setEvents(events.filter((e) => e._id !== id));
        toast.success("Event deleted successfully");
      }
      setDeleteConfig(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.error || "Failed to delete item.");
    }
  };

  const handleEdit = (item, type) => {
    if (type === "program") {
      navigate("/admin/admin-add-program", { state: { programData: item } });
    } else {
      navigate(`/admin/addevent/${item._id}`, { state: { eventData: item } });
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "approved" ? "rejected" : "approved";
    try {
      await axios.patch(`${API_BASE_URL}/events/${id}/status`, { status: newStatus });
      setEvents(events.map((e) => (e._id === id ? { ...e, status: newStatus } : e)));
      toast.success(`Event ${newStatus} successfully!`);
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status.");
    }
  };

  const data = activeTab === "programs" ? programs : events;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const isMobile = window.innerWidth < 768; // you can also use useMediaQuery hook

  return (
    <div className="min-h-screen text-slate-400 p-4 sm:p-6 font-out">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Manage Content</h1>
          <div className="flex bg-slate-800 rounded-lg p-1 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab("programs");
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${
                activeTab === "programs" ? "bg-cyan-600 text-white" : "hover:bg-slate-700"
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => {
                setActiveTab("events");
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${
                activeTab === "events" ? "bg-cyan-600 text-white" : "hover:bg-slate-700"
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {/* ==================== MOBILE / CARD VIEW ==================== */}
        <div className="block md:hidden space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => {
              const isEvent = activeTab === "events";
              const program = isEvent ? programs.find((p) => p._id === item.programId) : null;

              return (
                <div
                  key={item._id}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 shadow-sm"
                >
                  <div className="font-medium text-white mb-1">
                    {item.name || item.eventName}
                  </div>
                  <div className="text-sm text-slate-400 mb-3">{item.category}</div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <div className="text-slate-500">Date</div>
                      <div>{formatDate(item.programDate || item.date)}</div>
                    </div>

                    {isEvent && (
                      <>
                        <div>
                          <div className="text-slate-500">Program</div>
                          <div>{program?.name || item.programName || "-"}</div>
                        </div>

                        <div>
                          <div className="text-slate-500">Status</div>
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-xs mt-1 ${
                              item.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleEdit(item, isEvent ? "event" : "program")}
                      className="p-2.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    {isEvent && (
                      <button
                        onClick={() => handleToggleStatus(item._id, item.status)}
                        className={`p-2.5 rounded-lg hover:text-white ${
                          item.status === "approved"
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500"
                            : "bg-green-500/20 text-green-400 hover:bg-green-500"
                        }`}
                        title={item.status === "approved" ? "Reject" : "Approve"}
                      >
                        {item.status === "approved" ? <FaTimes /> : <FaCheck />}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item._id, isEvent ? "event" : "program")}
                      className="p-2.5 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500">
              No {activeTab} found.
            </div>
          )}
        </div>

        {/* ==================== DESKTOP / TABLE VIEW ==================== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-white/10 rounded-xl min-w-[900px]">
            <thead className="bg-white/5 text-sm">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Date</th>
                {activeTab === "events" && <th className="p-3">Program</th>}
                {activeTab === "events" && <th className="p-3">Status</th>}
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3">
                      <div className="font-medium text-white">{item.name || item.eventName}</div>
                      <div className="text-xs text-slate-400">{item.category}</div>
                    </td>
                    <td className="p-3 text-center">{formatDate(item.programDate || item.date)}</td>

                    {activeTab === "events" && (
                      <td className="p-3 text-center">
                        {programs.find((p) => p._id === item.programId)?.name ||
                          item.programName ||
                          "-"}
                      </td>
                    )}

                    {activeTab === "events" && (
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.status || "Pending"}
                        </span>
                      </td>
                    )}

                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(item, activeTab === "programs" ? "program" : "event")}
                        className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      {activeTab === "events" && (
                        <button
                          onClick={() => handleToggleStatus(item._id, item.status)}
                          className={`p-2 rounded hover:text-white transition-colors ${
                            item.status === "approved"
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500"
                          }`}
                          title={item.status === "approved" ? "Reject" : "Approve"}
                        >
                          {item.status === "approved" ? <FaTimes /> : <FaCheck />}
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item._id, activeTab === "programs" ? "program" : "event")}
                        className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === "events" ? 5 : 3} className="p-8 text-center text-slate-500">
                    No {activeTab} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination – works for both views */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="text-sm text-slate-400 text-center sm:text-left">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-white bg-blue-600 rounded text-sm min-w-[2.5rem] text-center">
                {currentPage}
              </span>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Delete Modal – remains unchanged */}
        <AnimatePresence>
          {deleteConfig && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0f111a] border border-red-500/20 p-6 sm:p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-2xl sm:text-3xl mb-4 sm:mb-6 mx-auto shadow-red-500/20 shadow-lg">
                  <FaTrash />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Delete {deleteConfig.type === "program" ? "Program" : "Event"}?
                </h3>
                <p className="text-gray-400 text-sm mb-6 sm:mb-8">
                  This action cannot be undone.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={() => setDeleteConfig(null)}
                    className="py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl sm:rounded-2xl font-bold transition-all text-sm uppercase tracking-wider border border-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-red-900/40 text-sm uppercase tracking-wider"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageProgram;
