export const WelcomMessage = () => {
  return (
    <div className="mb-8 p-6 bg-linear-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl shadow-sm shadow-blue-500/20">
      <div className="flex items-center">
        <div className="shrink-0 w-12 h-12 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-green-400">
            እንኳን ዎደ ቤተ ቅዱስ ባስልዎስ በደህና መጡ!
          </h3>
          <p className="text-green-300 mt-1">መረጃዎት በሚገባ ተሰብስቧል። በሰላም ይማሩ።</p>
        </div>
      </div>
    </div>
  );
};
