// Table.tsx - Add onRowClick prop and remove internal modal
import { AnimatePresence, motion, type Variants } from "framer-motion";
// Remove the SinglUser import from here

interface TableProps {
  filteredStudents: any[];
  selectedFamily: any;
  search: any;
  setSearch: any;
  students: any[];
  onRowClick: (studentId: number) => void;
}

export interface HighlightProps {
  text: string;
  query: string;
}

export const Highlight: React.FC<HighlightProps> = ({ text, query }) => {
  const term = query.trim();
  if (!term) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();

  const parts: React.ReactNode[] = [];
  let start = 0;
  let index: number;

  while ((index = lowerText.indexOf(lowerTerm, start)) !== -1) {
    if (index > start) {
      parts.push(text.slice(start, index));
    }
    parts.push(
      <span key={index} className="text-blue-100 bg-blue-700 px-0.5">
        {text.slice(index, index + term.length)}
      </span>
    );
    start = index + term.length;
  }

  if (start < text.length) {
    parts.push(text.slice(start));
  }

  return <>{parts}</>;
};

const TableComponent = ({
  filteredStudents,
  selectedFamily,
  students,
  search,
  setSearch,
  onRowClick,
}: TableProps) => {
  const toggle = (i: number) => {
    onRowClick(i);
  };
  console.log(filteredStudents);
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: { scale: 0.95 },
  };

  const tableHeaderVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="">
      {/* Students Table - Only show if we have data */}
      <AnimatePresence>
        {filteredStudents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-linear-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-blue-900/20 overflow-hidden"
          >
            {/* ... table content ... */}
            <motion.div
              variants={tableHeaderVariants}
              className="px-6 py-4 border-b border-gray-700/50 bg-linear-to-r from-gray-900/80 to-black/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-lg">
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

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-linear-to-r from-gray-900 to-black border-b border-gray-700/50">
                    {[
                      { key: "id", label: "ID" },
                      { key: "ሙሉ_ስም", label: "ሙሉ ስም" },
                      { key: "family", label: "Family" }, // NEW COLUMN
                      { key: "ጾታ", label: "ጾታ" },
                      { key: "ዲያቆን_ኖት", label: "ዲያቆን_ኖት_?" },
                      { key: "ዞን", label: "ዞን" },
                      { key: "ወረዳ", label: "ወረዳ" },
                      { key: "ዕድሜ", label: "እድሜ" },
                      { key: "ስልክ", label: "ስልክ" },
                      { key: "ዲፓርትመንት", label: "ዲፓርትመንት" },
                      { key: "ባች_ዓመት", label: "ባች ዓመት" },
                    ].map((column, index) => (
                      <motion.th
                        key={column.key}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        {column.label}
                      </motion.th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  <AnimatePresence>
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => toggle(student.id)}
                        className="cursor-pointer group"
                        transition={{ delay: index * 0.02 }}
                      >
                        {/* ID */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                              <Highlight
                                text={String(student.id)}
                                query={search}
                              />{" "}
                            </span>
                            <motion.div
                              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ scale: 1.2 }}
                            >
                              <svg
                                className="w-4 h-4 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                ></path>
                              </svg>
                            </motion.div>
                          </div>
                        </td>

                        {/* ሙሉ ስም */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300 group-hover:text-white">
                          {" "}
                          <Highlight
                            text={String(student.fullName)}
                            query={search}
                          />
                        </td>

                        {/* Family */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30">
                            <Highlight text={student.family} query={search} />
                          </span>
                        </td>

                        {/* ጾታ */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              student["ጾታ"] === "ወንድ"
                                ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-linear-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border border-pink-500/30"
                            }`}
                          >
                            {" "}
                            <Highlight
                              text={String(student.gender)}
                              query={search}
                            />
                            {/* {student["gender"] || "-"} */}
                          </span>
                        </td>

                        {/* ዲያቆን ኖት */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              student["ዲያቆን_ኖት"]
                                ? "bg-linear-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-linear-to-r from-gray-700/20 to-gray-800/20 text-gray-400 border border-gray-600/30"
                            }`}
                          >
                            {student.isDeacon ? "አዎ" : "አይደለሁም"}
                          </span>
                        </td>

                        {/* ዞን */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                          {/* {student.zon || "-"} */}
                          <Highlight
                            text={String(student.zon)}
                            query={search}
                          />
                        </td>

                        {/* ወረዳ */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                          {/* {student["wereda"] || "-"} */}
                          <Highlight
                            text={String(student.wereda)}
                            query={search}
                          />
                        </td>

                        {/* ዕድሜ */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                          {/* {student["age"] || "-"} */}
                          <Highlight
                            text={String(student.age)}
                            query={search}
                          />
                        </td>

                        {/* ስልክ */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-300 group-hover:text-white">
                          {/* {student["phone"] || "-"} */}
                          <Highlight
                            text={String(student.phone)}
                            query={search}
                          />
                        </td>
                        {/* ዲፓርትመንት */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                          {/* {student["department"] || "-"} */}
                          <Highlight
                            text={String(student.department)}
                            query={search}
                          />
                        </td>

                        {/* ባች ዓመት */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                            {/* {student["batchYear"] || "-"} */}
                            <Highlight
                              text={String(student.batchYear)}
                              query={search}
                            />
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-4 border-t border-gray-700/50 bg-linear-to-r from-gray-900/80 to-black/80"
            >
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>
                    Showing {filteredStudents.length} of {students.length}{" "}
                    records
                    {selectedFamily !== "all" &&
                      ` (Filtered by: ${selectedFamily})`}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Data loaded: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-20 bg-linear-to-b from-gray-900/30 to-gray-900/10 rounded-2xl border-2 border-dashed border-gray-700/50"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
              <div className="absolute inset-0 bg-linear-to-br from-gray-700/20 to-gray-900/20 rounded-full blur-xl" />
              <svg
                className="relative w-full h-full text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">
              No students found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {search
                ? `No matches found for "${search}"`
                : "No students available in the database"}
            </p>
            {search && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSearch("");
                }}
                className="mt-4 px-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear search
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableComponent;
