// Custom.jsx
import { useRef, useState, useEffect } from "react";
import {
  uniName,
  departments,
  formatCourseCode,
  formatDate,
} from "../utils/data";
import { useFormContext } from "../context/FormContext";
import uapLogo from "../assets/UAP-logo.png";

const Custom = () => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { formData } = useFormContext();

  // Get teacher department short form
  const teacherDept =
    departments.find((d) => d.full === formData.teacherDepartment) || departments[0];
  const teacherDeptShort = teacherDept.short;

  // Determine if it's a Lab Report type for dynamic labels
  const isLabReport = formData.isCustomCoverType
    ? formData.customCoverType?.toLowerCase().includes("lab")
    : formData.documentType === "Lab Report";

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;
        const a4Height = 11.69 * 96; // A4 height in pixels (96 DPI)
        const a4Width = 8.27 * 96; // A4 width in pixels
        const padding = 32; // Some padding around the preview

        const scaleHeight = (containerHeight - padding) / a4Height;
        const scaleWidth = (containerWidth - padding) / a4Width;
        setScale(Math.min(scaleHeight, scaleWidth, 1)); // Never scale up beyond 1
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-gray-200 h-full w-full print:min-h-0 print:bg-white print:p-0 print:overflow-visible print:h-dvh"
    >
      {/* A4 Document */}
      <div
        className="
          a4-document
          bg-white
          shadow-2xl
          shrink-0
          print:shadow-none
          relative
        "
        style={{
          width: "8.27in",
          height: "11.69in", // A4 exact size
          fontFamily: "serif",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Watermark */}
        <img
          src={uapLogo}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-4 pointer-events-none"
          style={{ width: "3in", height: "auto" }}
        />
        {/* 0.5in outer margin + 0.5in inner margin */}
        <div
          className="flex flex-col justify-between"
          style={{
            margin: "0.5in",
            padding: "0.5in",
            height: "calc(11.69in - 1in)",
            border: "1px solid black",
          }}
        >
          <div>
            <div className="text-center">
              {/* Logo */}
              <img
                src={uapLogo}
                alt="University Logo"
                className="mx-auto mb-2"
                style={{ width: "1.4in", height: "auto" }}
              />
              <h1 className="text-center font-bold uppercase text-[40px]">
                {uniName}
              </h1>
              <h2 className="text-center font-semibold uppercase text-[20px] mt-2 italic text-gray-700">
                Department of {formData.department}
              </h2>
              <h3 className="text-center font-semibold uppercase text-[22px] mt-2 italic text-gray-700">
                Fall - 2025
              </h3>
              <h4 className="text-center font-semibold uppercase text-2xl mt-4">
                {formData.isCustomCoverType
                  ? formData.customCoverType || "--"
                  : formData.documentType}
              </h4>
            </div>

            <div className="mt-10 text-lg">
              {/* Course Info Section */}
              <div className="space-y-3 mb-6">
                <p>
                  <strong>Course Code:</strong>{" "}
                  {formatCourseCode(formData.courseCode) || "--"}
                </p>
                <p className="capitalize">
                  <strong>Course Title:</strong> {formData.courseTitle || "--"}
                </p>
              </div>

              {/* Assignment/Experiment Info Section */}
              <div className="space-y-3">
                {formData.assignmentNo && (
                  <p>
                    <strong>
                      {isLabReport ? "Experiment No." : "Assignment No."}:
                    </strong>{" "}
                    {formData.assignmentNo}
                  </p>
                )}
                {formData.assignmentName && (
                  <p className="mb-6">
                    <strong>
                      {isLabReport ? "Experiment Name" : "Assignment Name"}:
                    </strong>{" "}
                    {formData.assignmentName}
                  </p>
                )}
                {!formData.assignmentName && formData.assignmentNo && (
                  <div className="mb-3" />
                )}
                {formData.dateOfAssignment && (
                  <p>
                    <strong>
                      {isLabReport
                        ? "Date of Experiment"
                        : "Date of Assignment"}
                      :
                    </strong>{" "}
                    {formatDate(formData.dateOfAssignment)}
                  </p>
                )}
                <p>
                  <strong>Date of Submission:</strong>{" "}
                  {formatDate(formData.dateOfSubmission) || "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Submitted By & Submitted To */}
          <div className="flex justify-between text-base">
            {/* Submitted By - Left */}
            <div className="space-y-1">
              <p className="font-bold underline mb-2">Submitted By</p>
              {formData.isTeam ? (
                <>
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="mb-3">
                      <p>
                        <strong>Name-{index + 1}:</strong> {member.name || "--"}
                      </p>
                      <p>
                        <strong>Reg:</strong> {member.reg || "--"}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {formData.studentName || "--"}
                  </p>
                  <p>
                    <strong>Reg:</strong> {formData.studentReg || "--"}
                  </p>
                </>
              )}
              <p>
                <strong>Semester:</strong> {formData.semester || "--"}
              </p>
              <p>
                <strong>Section:</strong> {formData.section || "--"}
              </p>
            </div>

            {/* Submitted To - Right */}
            <div className="text-right space-y-1">
              <p className="font-bold underline mb-2">Submitted To</p>
              <p>{formData.teacherName || "--"}</p>
              <p>{formData.teacherDesignation || "--"}</p>
              <p>Dept. of {teacherDeptShort}</p>
              <p>{uniName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
