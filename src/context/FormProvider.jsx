  import { useState } from "react";
  import { FormContext } from "./FormContext";
  const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
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
      // Teacher info
      teacherName: "Nakiba Nuren Rahman",
      teacherDesignation: "Lecturer",
      teacherDepartment: "Computer Science & Engineering",
      // Student info
      studentName: "",
      studentReg: "",
      semester: "",
      section: "",
      // Team members
      isTeam: false,
      teamMembers: [{ name: "", reg: "" }],
    });

    return (
      <FormContext.Provider value={{ formData, setFormData }}>
        {children}
      </FormContext.Provider>
    );
  };

  export default FormProvider;
