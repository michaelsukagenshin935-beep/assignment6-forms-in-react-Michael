import { useState } from "react";
import "./RegistrationForm.css";

export default function RegistrationForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    role: "",
    acceptTerms: false,
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    if (!formData.age || formData.age <= 0)
      newErrors.age = "Age must be greater than 0";

    if (!formData.gender)
      newErrors.gender = "Please select a gender";

    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the terms";

    if (
      !formData.fullName &&
      !formData.email &&
      !formData.age &&
      !formData.gender &&
      !formData.role &&
      !formData.acceptTerms
    ) {
      setGlobalError("Please complete all required fields.");
    } else {
      setGlobalError("");
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedData(null);
    } else {
      setErrors({});
      setGlobalError("");
      setSubmittedData(formData);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Registration Form</h2>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          {/* Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
        
            {/* Age */}
            <div className="form-group">
            <label>Age:</label>
            <input
                type="number"
                name="age"
                className="small-input"
                value={formData.age}
                onChange={handleChange}
            />
            </div>

            {errors.age && <p className="error">{errors.age}</p>}


            {/* Gender */}
        <div className="form-group">
        <label>Gender:</label>

        <div className="radio-group">
            <label>
            <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
            />
            Male
            </label>

            <label>
            <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
            />
            Female
            </label>
            
            </div>
            </div>

        {errors.gender && <p className="error">{errors.gender}</p>}

                {/* Role */}
        <div className="form-group">
        <label>Role:</label>
        <select
            name="role"
            className="small-input"
            value={formData.role}
            onChange={handleChange}
        >
        <option value="" disabled hidden>
              Select Role
         </option>
         <option value="Student">Student</option>
         <option value="Teacher">Teacher</option>
         <option value="Admin">Admin</option>
          </select>
        </div>


          {/* Terms */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              Accept{" "}
              <span
                className="terms-link"
                onClick={() => setShowTerms(!showTerms)}
              >
                Terms and Conditions
              </span>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="error">{errors.acceptTerms}</p>
          )}

          {showTerms && (
            <div className="terms-box">
              These are the Terms and Conditions.
              Please read carefully before accepting.
            </div>
          )}

          <button type="submit" className="submit-btn">
                 Submit
            </button>

            <hr className="divider" />


          {globalError && (
            <p className="error global-error">
              {globalError}
            </p>
          )}

        </form>
      </div>

      {submittedData && (
        <div className="card summary">
          <h2>Registration Summary</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Role:</strong> {submittedData.role}</p>
          <p><strong>Accepted Terms:</strong> Yes</p>
        </div>
      )}
    </div>
  );
}
