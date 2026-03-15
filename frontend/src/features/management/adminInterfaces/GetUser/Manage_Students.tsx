import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { studentAPI } from "../../../../api/S_api.ts";
import Students_Cards from "../../../../components/ui/Cards.tsx";
import User_Detail_Modal from "../../../../components/ui/Modal.tsx";
import SearchBar from "../../../../components/ui/SearchBar.tsx";
import TableComponent from "../../../../components/ui/Table.tsx"; // Rename import to avoid conflict
import SinglUser from "./SinglUser.tsx";
// import { Table as TableIcon } from "lucide-react"; // Import icon with alias if needed

interface Student {
  id: number;
  family: string;
  grand_family: string;
  fullName: string;
  gender: "male" | "female";
  department: string;
  batchYear: string;
  isDiacon: boolean;
  age: number;
  wereda: string;
  zon: string;
  phone: string;
  registration_status: string;
}

const Manage_Students = () => {
  const [showByT, setShowByT] = useState<boolean>(true);
  const [fetchingSuccess, setFetchingSuccess] = useState<boolean>(false);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [toggleFilters, setFilteTogglers] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );

  const [filters, setFilters] = useState({
    family: "",
    grand_family: "",
    gender: "",
    department: "",
    batchYear: "",
    isDeacon: false,
  });

  const showFilters = () => {
    setFilteTogglers(!toggleFilters);
  };
  const normalized = (value: unknown) => String(value ?? "").toLowerCase();

  const SearchFilter = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;

    return students.filter((student) => {
      // put here the fields that should be searchable
      const valuesToSearch: unknown[] = [
        student.id,
        student.fullName,
        student.family,
        student.department,
        student.age,
        student.phone,
        student.batchYear,
        student.registration_status,
      ];

      return valuesToSearch.some((v) => normalized(v).includes(term));
    });
  }, [students, search]);

  const ClickFilter = useMemo(() => {
    // console.log("Current filters:", filters);
    // console.log("Sample student:", students[0]);
    return students.filter(
      (student) =>
        (!filters.family || student.family === filters.family) &&
        (!filters.grand_family ||
          student.grand_family === filters.grand_family) &&
        (!filters.gender || student.gender === filters.gender) &&
        (!filters.department || student.department === filters.department) &&
        (!filters.batchYear ||
          student.batchYear.toString() === filters.batchYear) &&
        (!filters.isDeacon || student.isDeacon === true),
    );
  }, [students, filters]);

  const filteredStudents = search ? SearchFilter : ClickFilter;

  const updateFilter = (key: keyof typeof filters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Extract unique options from data
  const getUniqueOptions = (key: keyof Student) => {
    return Array.from(
      new Set(students.map((s) => s[key as keyof Student])),
    ) as string[];
  };

  // fetchingSuccess &&
  //   console.log(
  //     "All students are fetched succesfully you can do any thing with this data!"
  //   );
  useEffect(() => {
    fetchStudentsHandler();
  }, []);

  const fetchStudentsHandler = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await studentAPI.getAllStudents();
      if (response?.success) {
        const data = response.data || [];
        setStudents(data);
        console.log("Response:", students);
        // console.log("Data:", data);
        setFetchingSuccess(true);
      } else {
        setFetchingSuccess(false);
        setError(response?.error || "Failed to fetch students");
      }
    } catch (err: any) {
      setFetchingSuccess(false);
      setError(err?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (studentId: number) => {
    setSelectedStudentId(studentId);
  };

  const CloseModal = () => {
    console.log("aout side modal is clicked");
    setSelectedStudentId(null);
  };

  // console.log("unique families ", uniqueFamilies);
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-red-950">
      {/* Header Card with Filters */}
      <motion.div
        variants={cardVariants}
        className="bg-linear-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-blue-900/20 overflow-hidden"
      >
        <div className="m-2">
          {/* Filter Section */}
          {students.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              <div className="gap-4 md:flex-row md:items-center md:justify-between">
                {/* Toggle Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowByT(!showByT)}
                  className={`px-6 mb-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg backdrop-blur-sm border-2 ${
                    showByT
                      ? "bg-linear-to-r from-emerald-600/90 to-emerald-500/90 text-white border-emerald-500/50 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                      : "bg-linear-to-r from-gray-800/90 to-gray-700/90 text-gray-200 border-gray-700/50 hover:border-gray-600/70 shadow-gray-900/30 hover:shadow-gray-900/50 hover:text-white"
                  }`}
                  aria-label={`Switch to ${showByT ? "cards" : "table"} view`}
                >
                  {/* Active Icon */}
                  {showByT ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  )}

                  {showByT ? "Table View" : "Cards View"}
                </motion.button>
                {fetchingSuccess && (
                  <div className="text-green-400 p-2 text-center font-medium">
                    Students data fetched successfully!
                  </div>
                )}

                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  showFilters={showFilters}
                  toggleFilters={toggleFilters}
                />
              </div>

              <div
                className="md:flex md:items-center md:justify-between gap-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(156, 163, 175, 0.3) transparent",
                }}
              >
                {toggleFilters && (
                  <div
                    className="
                              flex lg:justify-center w-full items-center gap-2
                              overflow-x-auto py-2 px-3
                              scrollbar-thin scrollbar-thumb-cyan-500/60 scrollbar-track-transparent
                              snap-x snap-mandatory
                            "
                  >
                    {/* Department */}
                    <select
                      value={filters.department}
                      onChange={(e) =>
                        updateFilter("department", e.target.value)
                      }
                      className="
          snap-start shrink-0 min-w-40
          rounded-full border border-cyan-500/30
          bg-zinc-900/80 px-4 py-2.5
          text-sm text-slate-100
          shadow-sm outline-none
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
          transition
        "
                    >
                      <option value="" className="bg-zinc-900 text-slate-100">
                        All Departments
                      </option>
                      {getUniqueOptions("department").map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-slate-100"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Gender */}
                    <select
                      value={filters.gender}
                      onChange={(e) => updateFilter("gender", e.target.value)}
                      className="
          snap-start shrink-0 min-w-[140px]
          rounded-full border border-cyan-500/30
          bg-zinc-900/80 px-4 py-2.5
          text-sm text-slate-100
          shadow-sm outline-none
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
          transition
        "
                    >
                      <option value="" className="bg-zinc-900 text-slate-100">
                        All Genders
                      </option>
                      {getUniqueOptions("gender").map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-slate-100"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Batch Year */}
                    <select
                      value={filters.batchYear}
                      onChange={(e) =>
                        updateFilter("batchYear", e.target.value)
                      }
                      className="
          snap-start shrink-0 min-w-[140px]
          rounded-full border border-cyan-500/30
          bg-zinc-900/80 px-4 py-2.5
          text-sm text-slate-100
          shadow-sm outline-none
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
          transition
        "
                    >
                      <option value="" className="bg-zinc-900 text-slate-100">
                        All Years
                      </option>
                      {getUniqueOptions("batchYear").map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-slate-100"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Family */}
                    <select
                      value={filters.family}
                      onChange={(e) => updateFilter("family", e.target.value)}
                      className="
          snap-start shrink-0 min-w-[150px]
          rounded-full border border-cyan-500/30
          bg-zinc-900/80 px-4 py-2.5
          text-sm text-slate-100
          shadow-sm outline-none
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
          transition
        "
                    >
                      <option value="" className="bg-zinc-900 text-slate-100">
                        All Families
                      </option>
                      {getUniqueOptions("family").map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-slate-100"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Grand Family */}
                    <select
                      value={filters.grand_family}
                      onChange={(e) =>
                        updateFilter("grand_family", e.target.value)
                      }
                      className="
          snap-start shrink-0 min-w-[170px]
          rounded-full border border-cyan-500/30
          bg-zinc-900/80 px-4 py-2.5
          text-sm text-slate-100
          shadow-sm outline-none
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
          transition
        "
                    >
                      <option value="" className="bg-zinc-900 text-slate-100">
                        All Grand Families
                      </option>
                      {getUniqueOptions("grand_family").map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-slate-100"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Deacon toggle */}
                    <button
                      onClick={() => {
                        updateFilter("isDeacon", !filters.isDeacon);
                      }}
                      className={`
          snap-start shrink-0 min-w-[130px]
          rounded-full border px-4 py-2.5 text-sm shadow-sm outline-none
          transition
          ${
            filters.isDeacon
              ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
              : "border-cyan-500/30 bg-zinc-900/80 text-slate-100"
          }
          hover:border-cyan-400/70 hover:bg-zinc-900
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40
        `}
                    >
                      {filters.isDeacon ? "All" : "Deacons"}
                    </button>

                    {loading && (
                      <div className="flex items-center gap-2 shrink-0 snap-start pl-1">
                        <svg
                          className="h-4 w-4 animate-spin text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="text-xs text-slate-300">Loading…</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          <div className=" overflow-y-auto">
            {/* Conditional Content */}
            {showByT ? (
              <TableComponent
                filteredStudents={filteredStudents}
                selectedFamily={filters.family}
                search={search}
                setSearch={setSearch}
                students={students}
                onRowClick={handleRowClick}
              />
            ) : (
              <div>
                {/* Cards content here */}
                <Students_Cards
                  filteredStudents={filteredStudents}
                  selectedFamily={filters.family}
                  search={search}
                  setSearch={setSearch}
                  students={students}
                  onRowClick={handleRowClick}
                />
              </div>
            )}
          </div>
          {students.length === 0 && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block p-6 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No Student Data
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No students found in the database. Try adding some students
                first.
              </p>
            </motion.div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading students...</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal - Now at the AllUsers level */}
      {selectedStudentId && (
        <User_Detail_Modal CloseModal={CloseModal}>
          <SinglUser id={selectedStudentId} />
        </User_Detail_Modal>
      )}

      {/* Loading State */}
      {loading && students.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading students data...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default Manage_Students;
