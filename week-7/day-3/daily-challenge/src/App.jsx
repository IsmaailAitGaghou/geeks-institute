import React, { useState } from "react";
import FormComponent from "./FormComponent";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    lactoseFree: false,
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      queryParams.append(key, value);
    });

    const newUrl = `${window.location.origin}?${queryParams.toString()}`;
    window.history.pushState(null, "", newUrl);
    alert("Form submitted! Check the URL for query parameters.");
  };
  return (
    <div className="App">
      <h1>React Form Container</h1>
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
