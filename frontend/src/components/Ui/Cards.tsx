import { AnimatePresence, motion, type Variants } from "framer-motion";

interface Student {
  id: number;
  fullName: string;
  department: string;
  batchYear: string;
  phone: string;
  photo?: string;
  age?: number;
  isDeacon: boolean;
  family?: string;
  registration_status?: string;
  // Add other fields as needed
}

interface Students_CardsProp {
  filteredStudents: Student[];
  selectedFamily: string;
  search: string;
  setSearch: any;
  students: Student[];
  onRowClick: (studentId: number) => void;
}

const Students_Cards = ({
  filteredStudents,
  selectedFamily,
  search,
  setSearch,
  students,
  onRowClick,
}: Students_CardsProp) => {
  // Efficient search highlighting function
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    console.log(students);
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-yellow-400/20 text-yellow-800 font-semibold px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.05,
      },
    }),
    hover: {
      scale: 1.05,
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className=" ">
      <div className="bg-linear-to-br from-black via-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-blue-900/20 overflow-hidden">
        {/* Header - Now properly contained */}
        <motion.div className="px-6 py-4 border-b border-gray-700/50 bg-linear-to-r from-gray-900/80 to-black/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-100/20 to-purple-600/20 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">
                  Student Records
                </h3>
                {selectedFamily !== "all" && (
                  <p className="text-sm text-gray-400">
                    Family: {selectedFamily}
                  </p>
                )}
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="px-4 py-2 bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-full border border-blue-700/30"
            >
              <span className="text-blue-300 font-bold">
                {filteredStudents.length}
              </span>
              <span className="text-gray-400 text-sm ml-2">ብዛት</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Cards Grid - FIXED: Now properly responsive */}
        <AnimatePresence>
          <section className="px-4 py-8 sm:px-6 lg:px-8">
            {filteredStudents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    layout
                    className="group relative h-full flex flex-col bg-linear-to-br from-slate-950 via-slate-900/95 to-slate-900 rounded-3xl border border-slate-800/60 p-5 shadow-2xl hover:shadow-cyan-500/25 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-500"
                  >
                    {/* Top: Avatar + name + phone */}
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative shrink-0 w-16 h-16">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 group-hover:blur-md transition-all duration-500" />
                        <motion.div
                          whileHover={{ y: -2, scale: 1.02 }}
                          className="relative w-full h-full overflow-hidden rounded-2xl ring-2 ring-slate-800/70 group-hover:ring-cyan-500/50 transition-all duration-300"
                        >
                          <img
                            src={
                              student.photo ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
                            }
                            alt={student.fullName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face";
                            }}
                          />
                        </motion.div>

                        {/* Status badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-3 border-slate-950 bg-emerald-500 shadow-lg"
                        >
                          <svg
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Name + phone */}
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-all duration-300 leading-tight">
                          {highlightText(
                            student.isDeacon
                              ? "ዲ/ን " + student.fullName
                              : student.fullName,
                            search
                          )}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300">
                          <svg
                            className="h-4 w-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="truncate">
                            {highlightText(student.phone, search)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-cyan-400/90 tracking-wide">
                          {highlightText(
                            `${student?.department} • ${student?.batchYear}`,
                            search
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Middle: family + quick meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-300 font-medium border border-slate-800/50">
                        {highlightText(student.family || "N/A", search)}
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                        {highlightText(
                          `${student?.registration_status}`,
                          search
                        )}
                      </span>
                    </div>

                    {/* Bottom: actions */}
                    <div className="mt-auto pt-4 flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onRowClick(student.id)}
                        className="group/btn inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 active:shadow-md transition-all duration-300"
                      >
                        <svg
                          className="h-4 w-4 group-hover:rotate-12 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>View</span>
                      </motion.button>
                    </div>

                    {/* Bottom glow effect */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 bg-linear-to-b from-slate-900/30 to-slate-900/10 rounded-3xl border-2 border-dashed border-slate-700/50 shadow-xl"
              >
                <div className="w-24 h-24 mb-6 relative p-4">
                  <div className="absolute inset-0 bg-linear-to-br from-slate-700/30 to-slate-900/30 rounded-2xl blur-xl animate-pulse" />
                  <svg
                    className="relative w-full h-full text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-400 mb-3 tracking-tight">
                  No students found
                </h3>
                <p className="text-sm text-slate-500 max-w-md text-center leading-relaxed mb-6">
                  {search
                    ? `No matches found for "${search}"`
                    : "No students available in the database"}
                </p>
                {search && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearch("")}
                    className="px-6 py-3 text-sm font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-400/50 rounded-2xl bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                  >
                    Clear search
                  </motion.button>
                )}
              </motion.div>
            )}
          </section>
        </AnimatePresence>

        {/* Footer - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 md:mt-6 p-4 sm:p-6 bg-linear-to-r from-gray-900/80 to-slate-900/80 rounded-2xl border border-gray-700/50 text-sm text-gray-400"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-gray-200">
                    {filteredStudents.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-200">
                    {students.length}
                  </span>{" "}
                  records
                </span>
                {selectedFamily !== "all" && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-xs sm:text-sm">
                      Filtered by:{" "}
                      <span className="font-medium text-cyan-300">
                        {selectedFamily}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Students_Cards;
