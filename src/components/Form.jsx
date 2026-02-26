import { IoMdEye } from "react-icons/io";
import { useFormContext } from "../context/FormContext";
import { semesters, sections, departments } from "../utils/data";
import { FaMoon } from "react-icons/fa";
import {
  MdOutlineWbSunny,
  MdOutlineFileDownload,
  MdPreview,
} from "react-icons/md";

// Theme-aware class helpers
const getInputClasses = (isDark) =>
  isDark
    ? "w-full p-2.5 pr-8 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    : "w-full p-2.5 pr-8 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

const getSelectClasses = (isDark) =>
  isDark
    ? "w-full p-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
    : "w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer";

const getLabelClasses = (isDark) =>
  isDark
    ? "block text-sm font-medium text-zinc-400 mb-1"
    : "block text-sm font-medium text-gray-600 mb-1";
const getHeadingClasses = (isDark) =>
  isDark
    ? "block font-medium text-zinc-300"
    : "block font-medium text-gray-700";
const getTextClasses = (isDark) => (isDark ? "text-zinc-300" : "text-gray-700");
const getClearBtnClasses = (isDark) =>
  isDark
    ? "text-zinc-500 hover:text-zinc-300 transition-colors"
    : "text-gray-400 hover:text-gray-600 transition-colors";

// Reusable clearable input component with optional label
const ClearableInput = ({
  name,
  value,
  onChange,
  onClear,
  placeholder,
  label,
  isDark = true,
  className = "",
}) => (
  <div>
    {label && <label className={getLabelClasses(isDark)}>{label}</label>}
    <div className="relative">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${getInputClasses(isDark)} ${className}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onClear(name)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 ${getClearBtnClasses(isDark)}`}
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

// Date input component with clear button
const DateInput = ({
  name,
  value,
  onChange,
  onClear,
  label,
  isDark = true,
}) => (
  <div>
    {label && <label className={getLabelClasses(isDark)}>{label}</label>}
    <div className="relative">
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2.5 pr-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          isDark
            ? "bg-zinc-800 border border-zinc-700 text-white scheme-dark"
            : "bg-white border border-gray-300 text-gray-900"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onClear(name)}
          className={`absolute right-10 top-1/2 -translate-y-1/2 ${getClearBtnClasses(isDark)}`}
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

const Form = ({ onPreviewToggle, isDark = true, onThemeToggle }) => {
  const { formData, setFormData } = useFormContext();

  const initialState = {
    documentType: "Assignment",
    customCoverType: "",
    isCustomCoverType: false,
    department: "Computer Science & Engineering",
    courseCode: "",
    courseTitle: "",
    assignmentNo: "",
    assignmentName: "",
    dateOfAssignment: "",
    dateOfSubmission: "",
    teacherName: "",
    teacherDesignation: "",
    teacherDepartment: "Computer Science & Engineering",
    studentName: "",
    studentReg: "",
    semester: "",
    section: "",
    isTeam: false,
    teamMembers: [{ name: "", reg: "" }],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When main department changes, also update teacher department
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      department: value,
      teacherDepartment: value,
    }));
  };

  const handleClear = (name) => {
    setFormData((prev) => ({ ...prev, [name]: "" }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      documentType: type,
      isCustomCoverType: false,
    }));
  };

  const handleCustomToggle = (e) => {
    setFormData((prev) => ({ ...prev, isCustomCoverType: e.target.checked }));
  };

  const handleTeamToggle = (e) => {
    setFormData((prev) => ({
      ...prev,
      isTeam: e.target.checked,
      teamMembers: e.target.checked
        ? [{ name: "", reg: "" }]
        : [{ name: "", reg: "" }],
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const newMembers = [...prev.teamMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, teamMembers: newMembers };
    });
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", reg: "" }],
    }));
  };

  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className={`p-6 space-y-5 print:hidden overflow-y-auto h-full ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
    >
      {/* Top buttons */}
      {/* <div className="flex gap-3">
        <button
          onClick={() => window.print()}
          className={`flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-2xl px-3 aspect-square md:text-xl`}
        >
          Download PDF
        </button>
        <button
          onClick={onPreviewToggle}
          className="md:hidden px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
        >
          Preview
        </button>
        <button
          onClick={onThemeToggle}
          className={`px-4 py-2.5 font-medium rounded-lg transition-colors ${
            isDark
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {isDark ? <MdOutlineWbSunny /> : <FaMoon />}
        </button>
        <button
          onClick={handleReset}
          className={`px-4 py-2.5 font-medium rounded-lg transition-colors ${
            isDark
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Reset
        </button>
      </div> */}
      <div className="flex justify-around gap-1 md:gap-3 flex-wrap">
        {/* Download Button */}
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center 
               w-12 h-12 sm:w-18 md:w-auto md:h-auto
               md:flex-1
               bg-blue-600 hover:bg-blue-500 
               text-white font-medium 
               rounded-lg transition-colors"
        >
          {/* Mobile: Icon only */}
          <MdOutlineFileDownload className="text-xl md:hidden" />

          {/* Desktop: Text */}
          <span className="hidden md:inline text-md lg:text-lg px-3 py-2.5">
            Download PDF
          </span>
        </button>

        {/* Preview Button */}
        <button
          onClick={onPreviewToggle}
          className="flex items-center justify-center
               w-12 h-12 sm:w-18 
               bg-emerald-600 hover:bg-emerald-500 
               text-white rounded-lg 
               transition-colors md:hidden"
        >
          <IoMdEye className="text-xl" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className={`px-4 py-2.5 font-medium rounded-lg transition-colors ${
            isDark
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {isDark ? <MdOutlineWbSunny /> : <FaMoon />}
        </button>

        {/* Reset Button (unchanged) */}
        <button
          onClick={handleReset}
          className={`px-4 py-2.5 font-medium rounded-lg transition-colors ${
            isDark
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Reset
        </button>
      </div>

      {/* Document Type Selection */}
      <div className="space-y-3">
        <label className={getHeadingClasses(isDark)}>Document Type</label>
        <div className="flex gap-4 flex-wrap">
          <label
            className={`flex items-center gap-2 cursor-pointer ${getTextClasses(isDark)}`}
          >
            <input
              type="radio"
              name="documentType"
              checked={
                formData.documentType === "Assignment" &&
                !formData.isCustomCoverType
              }
              onChange={() => handleTypeChange("Assignment")}
              className="w-4 h-4 accent-blue-500"
            />
            Assignment
          </label>
          <label
            className={`flex items-center gap-2 cursor-pointer ${getTextClasses(isDark)}`}
          >
            <input
              type="radio"
              name="documentType"
              checked={
                formData.documentType === "Lab Report" &&
                !formData.isCustomCoverType
              }
              onChange={() => handleTypeChange("Lab Report")}
              className="w-4 h-4 accent-blue-500"
            />
            Lab Report
          </label>
          <label
            className={`flex items-center gap-2 cursor-pointer ${getTextClasses(isDark)}`}
          >
            <input
              type="radio"
              checked={formData.isCustomCoverType}
              onChange={handleCustomToggle}
              className="w-4 h-4 accent-blue-500 rounded"
            />
            Custom Cover Type
          </label>
        </div>
        {formData.isCustomCoverType && (
          <ClearableInput
            name="customCoverType"
            placeholder="Enter custom cover type"
            value={formData.customCoverType}
            onChange={handleChange}
            onClear={handleClear}
            isDark={isDark}
          />
        )}
      </div>

      {/* Department Selection */}
      <div>
        <label className={getLabelClasses(isDark)}>Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleDepartmentChange}
          className={getSelectClasses(isDark)}
        >
          {departments.map((dept) => (
            <option key={dept.short} value={dept.full}>
              {dept.full}
            </option>
          ))}
        </select>
      </div>

      <ClearableInput
        name="courseCode"
        label="Course Code"
        placeholder="e.g. CSE-301"
        value={formData.courseCode}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />
      <ClearableInput
        name="courseTitle"
        label="Course Title"
        placeholder="e.g. Database Management System"
        value={formData.courseTitle}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />
      <ClearableInput
        name="assignmentNo"
        label="Assignment/Experiment No. (optional)"
        placeholder="e.g. 01"
        value={formData.assignmentNo}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />
      <ClearableInput
        name="assignmentName"
        label="Assignment/Experiment Name (optional)"
        placeholder="e.g. ER Diagram Design"
        value={formData.assignmentName}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />
      <DateInput
        name="dateOfAssignment"
        label="Date of Assignment (optional)"
        value={formData.dateOfAssignment}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />
      <DateInput
        name="dateOfSubmission"
        label="Date of Submission"
        value={formData.dateOfSubmission}
        onChange={handleChange}
        onClear={handleClear}
        isDark={isDark}
      />

      <div
        className={`border-t my-5 ${isDark ? "border-zinc-700" : "border-gray-300"}`}
      />

      {/* Submitted To */}
      <div className="space-y-3">
        <label className={getHeadingClasses(isDark)}>Submitted To</label>
        <ClearableInput
          name="teacherName"
          label="Teacher Name"
          placeholder="e.g. Nakiba Nuren Rahman"
          value={formData.teacherName}
          onChange={handleChange}
          onClear={handleClear}
          isDark={isDark}
        />
        <ClearableInput
          name="teacherDesignation"
          label="Designation"
          placeholder="e.g. Lecturer"
          value={formData.teacherDesignation}
          onChange={handleChange}
          onClear={handleClear}
          isDark={isDark}
        />
        <div>
          <label className={getLabelClasses(isDark)}>Department</label>
          <select
            name="teacherDepartment"
            value={formData.teacherDepartment}
            onChange={handleChange}
            className={getSelectClasses(isDark)}
          >
            {departments.map((dept) => (
              <option key={dept.short} value={dept.full}>
                {dept.full}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={`border-t my-5 ${isDark ? "border-zinc-700" : "border-gray-300"}`}
      />

      {/* Submitted By */}
      <div className="space-y-3">
        <label className={getHeadingClasses(isDark)}>Submitted By</label>

        <label
          className={`flex items-center gap-2 cursor-pointer ${getTextClasses(isDark)}`}
        >
          <input
            type="checkbox"
            checked={formData.isTeam}
            onChange={handleTeamToggle}
            className="w-4 h-4 accent-blue-500 rounded"
          />
          Team Submission
        </label>

        {formData.isTeam ? (
          <div className="space-y-3">
            <div
              className={`flex gap-2 text-sm font-medium ${isDark ? "text-zinc-400" : "text-gray-600"}`}
            >
              <span className="flex-1">Name</span>
              <span className="w-28">Reg No.</span>
              <span className="w-8"></span>
            </div>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <input
                    placeholder={`Member ${index + 1}`}
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "name", e.target.value)
                    }
                    className={getInputClasses(isDark)}
                  />
                  {member.name && (
                    <button
                      type="button"
                      onClick={() => handleTeamMemberChange(index, "name", "")}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 ${getClearBtnClasses(isDark)}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="relative w-28">
                  <input
                    placeholder="Reg"
                    value={member.reg}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "reg", e.target.value)
                    }
                    className={getInputClasses(isDark)}
                  />
                  {member.reg && (
                    <button
                      type="button"
                      onClick={() => handleTeamMemberChange(index, "reg", "")}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 ${getClearBtnClasses(isDark)}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
                {formData.teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
            >
              + Add Member
            </button>
          </div>
        ) : (
          <>
            <ClearableInput
              name="studentName"
              label="Your Name"
              placeholder="e.g. Ikhtiyar al-Din Muhammad bin Bakhtiyar Khilji"
              value={formData.studentName}
              onChange={handleChange}
              onClear={handleClear}
              isDark={isDark}
            />
            <ClearableInput
              name="studentReg"
              label="Registration No."
              placeholder="e.g. 25101000"
              value={formData.studentReg}
              onChange={handleChange}
              onClear={handleClear}
              isDark={isDark}
            />
          </>
        )}

        <div className="flex gap-3">
          <div className="flex-1">
            <label className={getLabelClasses(isDark)}>Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={getSelectClasses(isDark)}
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className={getLabelClasses(isDark)}>Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className={getSelectClasses(isDark)}
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
