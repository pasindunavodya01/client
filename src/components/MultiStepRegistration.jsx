import React, { useState } from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import CourseSelectionForm from "./CourseSelectionForm";
// import PaymentForm later if needed

export default function MultiStepRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const next = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const prev = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && <StudentRegistrationForm next={next} />}
      {step === 2 && <CourseSelectionForm prev={prev} next={next} formData={formData} />}
      {/* Step 3: PaymentForm can go here */}
    </div>
  );
}
