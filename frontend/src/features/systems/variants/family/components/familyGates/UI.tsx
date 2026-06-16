import { useStudentForm } from "./HandleUI";

export interface FamilysGateProps {
  src: string;
  Family: string;
  GrandFamily: string;
}

const FamilysGate = ({ src, Family, GrandFamily }: FamilysGateProps) => {
  const {
    isSubmitting,
    submitSuccess,
    BATCH_YEARS,
    departments,
    register,
    handleSubmit,
    errors,
    apiError,
    selectedGender,
    handlePhotoChange,
    photoUploadStatus,
    previewImage,
    isDeacon,
  } = useStudentForm(Family, GrandFamily);

  console.log(errors.photo?.message);
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header Section */}
      <div className="text-center mb-8 border-b border-gray-700 pb-6">
        <h1 className="text-3xl font-bold mb-2">{GrandFamily}</h1>

        <div className="flex flex-col items-center">
          <img
            src={src}
            alt={Family}
            className="w-24 h-24 rounded-full object-cover mb-4 border"
          />
          <h1 className="text-2xl font-bold mb-3">{Family}</h1>
          <p className="italic max-w-2xl">
            "ዕውቀትን የሚወድ የጌታን ትዕዛዝ ይወዳል፤ ነገርን የሚወቀስ ግን ጕድለት ይቀበላል።" (ምሳ. 12:1)
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Personal Information Section */}
        <div className="mb-8 p-6 bg-black border border-gray-700 rounded">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">
            የተማሪ የግል መረጃ
          </h2>

          {/* Profile Photo Section */}
          <div className="relative mb-8 border border-gray-700 rounded p-4">
            {/* Hidden File Input */}
            <input
              type="file"
              onChange={handlePhotoChange}
              accept="image/png, image/jpeg, image/jpg, image/jfif"
              name="photo"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              id="photo"
              required
            />

            {/* Upload Area - Clickable Label */}
            <label
              htmlFor="photo"
              className="block w-full h-full cursor-pointer"
            >
              {previewImage ? (
                /* Success Preview State */
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-4 overflow-hidden rounded border">
                    <img
                      src={previewImage}
                      alt="Uploaded Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-green-400 mb-1">
                    ብትክክል ተጭኗል!
                  </p>
                  <p className="text-sm text-gray-300">መቀየር ይችላል ...</p>
                </div>
              ) : (
                /* Upload Prompt State */
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 border border-dashed border-gray-600 px-4 py-2 rounded">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold mb-2">
                    እባክዎ በቅርብ ጊዜ የተነሱትን ፎቶ ያስገቡ
                  </p>
                  <p className="text-sm text-gray-300">
                    PNG, JPG, JPEG (Max 5MB)
                  </p>
                </div>
              )}
            </label>

            {/* Loading Overlay */}
            {photoUploadStatus && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 rounded">
                <div className="flex items-center gap-2 px-4 py-2 border border-amber-400 rounded">
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-amber-300">በመጫን...</span>
                </div>
              </div>
            )}
            {errors.photo && (
              <p className="text-sm text-red-400 mt-2">
                {errors.photo?.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm mb-2">ሙሉ ስም *</label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="ሙሉ ስም በአማርኛ ያስገቡ......"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.fullName && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Book Name */}
            <div>
              <label className="block text-sm mb-2">የመጽህፍ ስም *</label>
              <input
                type="text"
                {...register("bookName")}
                placeholder="/የክርስትና ስም"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.bookName && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.bookName.message}
                </p>
              )}
            </div>

            {/* Gender Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-3">gender *</label>
              <div className="flex space-x-8">
                {/* Male Option */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="ወንድ"
                    {...register("gender")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      selectedGender === "ወንድ"
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-600"
                    }`}
                  >
                    {selectedGender === "ወንድ" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={
                      selectedGender === "ወንድ"
                        ? "text-blue-400"
                        : "text-gray-300"
                    }
                  >
                    ወንድ
                  </span>
                </label>

                {/* Female Option */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="ሴት"
                    {...register("gender")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      selectedGender === "ሴት"
                        ? "bg-pink-500 border-pink-500"
                        : "border-gray-600"
                    }`}
                  >
                    {selectedGender === "ሴት" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={
                      selectedGender === "ሴት"
                        ? "text-pink-400"
                        : "text-gray-300"
                    }
                  >
                    ሴት
                  </span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Deacon Checkbox - Only shown for males */}
            {selectedGender === "ወንድ" && (
              <div className="md:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isDeacon")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                      isDeacon
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-600"
                    }`}
                  >
                    {isDeacon && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-200">ዲያቆን ኖት (ከሆነ)</span>
                </label>
              </div>
            )}

            {/* Location - Zone */}
            <div>
              <label className="block text-sm mb-2">zon *</label>
              <input
                type="text"
                {...register("zon")}
                placeholder="zon . . ."
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.zon && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.zon.message}
                </p>
              )}
            </div>

            {/* Location - Wereda */}
            <div>
              <label className="block text-sm mb-2">wereda *</label>
              <input
                type="text"
                {...register("wereda")}
                placeholder="wereda . . . "
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.wereda && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.wereda.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm mb-2">እድሜ *</label>
              <input
                type="number"
                {...register("age", { valueAsNumber: true })}
                placeholder="20, 21, 22 ....."
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.age && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm mb-2">phone ቁጥር *</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="0912345678"
                pattern="09[0-9]{8}"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              />
              {errors.phone && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="mb-8 p-6 bg-black border border-gray-700 rounded">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">
            የትምህርት መረጃ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Selection */}
            <div>
              <label className="block text-sm mb-2">department *</label>
              <select
                {...register("department")}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              >
                <option value="">እባክዎ department ይምረጡ...</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept} className="text-black">
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.department.message}
                </p>
              )}
            </div>

            {/* Batch Year Selection */}
            <div>
              <label className="block text-sm mb-2">ባች (ዓመት) *</label>
              <select
                {...register("batchYear")}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
              >
                <option value="">እባክዎ ባች ዓመት ይምረጡ</option>
                {BATCH_YEARS.map((year, index) => (
                  <option
                    key={index}
                    value={year}
                    className="text-shadow-fuchsia-300"
                  >
                    {year}
                  </option>
                ))}
              </select>
              {errors.batchYear && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.batchYear.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Submission Section */}
        <div className="mb-12 p-6 bg-black border border-gray-700 rounded">
          <div className="flex flex-col items-center space-y-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-gray-700 text-white font-semibold rounded ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  እየተሰበሰበ ነው...
                </div>
              ) : (
                "መረጃውን አስገባ"
              )}
            </button>

            <p className="text-sm text-amber-300 text-center">
              * ይህ ምልክት ያላቸው መስኮች መሞላት አለባቸው
            </p>
          </div>
        </div>
      </form>

      {/* Success Message */}
      {submitSuccess && (
        <div className="max-w-4xl mx-auto mb-8 p-6 bg-green-900/40 border border-green-600 rounded">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <h3 className="text-lg font-bold text-green-400">
                እንኳን ዎደ {Family} በደህና መጡ!
              </h3>
              <p className="text-green-300">መረጃዎት በሚገባ ተሰብስቧል። በሰላም ይማሩ።</p>
            </div>
          </div>
        </div>
      )}

      {/* API Error Message */}
      {apiError && (
        <div className="max-w-4xl mx-auto mb-8 p-6 bg-red-900/40 border border-red-600 rounded">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-400">ስህተት ተፈጥሯል!</h3>
              <p className="text-red-300">{apiError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center border-t border-gray-700 pt-6 mt-8">
        <p className="text-gray-300 italic mb-2">
          "ዕውቀት አለበት የሚሉት በጌታ በማደራጃ ደስ ይበላቸው።" (ኢሳይያስ 11:2)
        </p>
        <p className="text-gray-400 text-sm">
          ይህ ፎርም የቅድስት ሥላሴ ትምህርት ቤት ለማስተዳደር ብቻ ነው የሚጠቀም።
        </p>
      </div>
    </div>
  );
};

export default FamilysGate;
