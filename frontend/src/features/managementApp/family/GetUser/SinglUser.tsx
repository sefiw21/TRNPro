import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { studentAPI } from "../../../../api/S_api";

interface SinglUserprops {
  id: number | null;
}

const SinglUser = ({ id }: SinglUserprops) => {
  const [fetchingSuccess, setFetchingSuccess] = useState<boolean>(false);
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [more, setMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchStudentsHandler = async () => {
      if (!id) {
        setError("No student ID provided");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await studentAPI.getStudentById(id);
        if (response?.success) {
          const data = response.data || null;
          setStudent(data);
          setFetchingSuccess(true);
        } else {
          setFetchingSuccess(false);
          setError(response?.error || "Failed to fetch student");
        }
      } catch (err: any) {
        setFetchingSuccess(false);
        setError(err?.message || "Network error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentsHandler();
  }, [id]); // Added id to dependency array

  console.log("Student data:", student);
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading student information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="mb-4 rounded-lg bg-red-900/20 border border-red-800 p-6">
            <p className="text-red-400 flex items-center gap-2 text-lg">
              <span className="text-xl">⚠️</span>
              Error: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No student data state
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No student data found</p>
          <p className="text-gray-500 mt-2">
            Student ID: {id || "Not provided"}
          </p>
        </div>
      </div>
    );
  }
  if (fetchingSuccess) {
    console.log("SinglUser fetched succesfully !!!");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="py-4 bg-black rounded-2xl"
    >
      {/* Compact Student Card */}
      <div className="space-y-4 px-4 overflow-y-auto">
        {/* Square Photo at Center */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <img
              src={
                student?.photo ||
                "https://via.placeholder.com/100/1e40af/ffffff?text=👤"
              }
              alt={student?.fullName || "Student"}
              className="w-150 h-full object-cover rounded-xl group-hover:brightness-110 transition-all duration-200"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/100/1e40af/ffffff?text=👤";
              }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-1 -right-1  text-white text-[9px] px-1.5 py-0.5 rounded"
            >
              🖉
            </motion.div>
          </div>
        </motion.div>

        {/* Name and Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-2xl shadow-2xs shadow-green-600 font-bold text-white truncate">
            {student?.isDeacon ? "ዲ/ን " : ""}
            {student?.fullName || "Unknown Student"}
          </h2>
        </motion.div>

        {/* Personal Info - Compact Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-8 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-2 rounded-br-full rounded-tl-full justify-center  w-full items-center px-3 bg-linear-to-bl  from-blue-800/30 to-blue-900/20  border-none">
              {"  "}
              <div className="space-y-1.5 grid grid-cols-3 gap-4">
                {[
                  {
                    label: "የመጽሐፍ ስም",
                    value: student?.bookName,
                    key: "bookName",
                  },
                  { label: "ቤተሰብ", value: student?.family, key: "family" },
                  {
                    label: "አያት ቤተሰብ",
                    value: student?.grand_family,
                    key: "grand_family",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                    className="bg-gray-800/50 rounded p-1.5"
                  >
                    <p className="text-[10px] text-teal-600">{item.label}</p>
                    <p className="text-teal-200 ">{item.value || "N/A"}</p>
                  </motion.div>
                ))}
              </div>{" "}
            </div>
          </motion.div>

          <button
            onClick={() => setMore(!more)}
            className="bg-gray-800 m-2 float-right text-blue-400 font-light px-2 rounded-br-2xl rounded-tl-2xl hover:px-3 transition-all"
          >
            {`${!more ? "more ..." : "less"}`}
          </button>

          {/* Spiritual Info */}
          {more && (
            <div className="grid grid-cols-2 gap-1.5">
              {[
                {
                  label: "እድሜ",
                  value: student?.age ? `${student.age} ዓመት` : "N/A",
                  key: "age",
                },
                { label: "ስልክ", value: student?.phone, key: "phone" },
                { label: "ወረዳ", value: student?.wereda, key: "wereda" },
                { label: "ዞን", value: student?.zon, key: "wereda" },
                {
                  label: "Dipartment",
                  value: student?.department,
                  key: "wereda",
                },
                {
                  label: "Batch",
                  value: student?.batchYear,
                  key: "wereda",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-gray-800/50 rounded p-1.5"
                >
                  <p className="text-[10px] text-gray-400">{item.label}</p>
                  <p className="text-white text-xs truncate">
                    {item.value || "N/A"}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-2 border-t border-gray-700"
        >
          <div className="flex justify-between items-center text-[10px] text-gray-500">
            <div>
              <span className="text-blue-400">ID:</span> {id || "N/A"}
            </div>
            <div>
              የተመዘገበበት ቀን ፡
              {student?.created_at
                ? new Date(student.created_at).toLocaleDateString("en-GB")
                : "N/A"}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SinglUser;
