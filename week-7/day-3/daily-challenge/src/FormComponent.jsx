import React from "react";

export default function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <label className="mb-2">
        First Name:
        <input
          type="text"
          name="firstName"
          className="border border-gray-300 p-2 rounded w-full"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label className="mb-2">
        Last Name:
        <input
          type="text"
          name="lastName"
          className="border border-gray-300 p-2 rounded w-full"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>

      <label>
        Age:
        <input
          className="border border-gray-300 p-2 rounded w-full"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Gender:
        <input
          className="mr-2"
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          className="mx-2"
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
      </label>
      <label>
        Destination:
        <select
          className="border border-gray-300 p-2 rounded w-full"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        >
          <option value="">-- Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="Brazil">Brazil</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree}
          onChange={handleChange}
        />
        Lactose Free
      </label>
      <button type="submit">Submit</button>
      <hr />
      <h3>Entered Information:</h3>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Age: {formData.age}</p>
      <p>Gender: {formData.gender}</p>
      <p>Destination: {formData.destination}</p>
      <p>
        Lactose Free: {formData.lactoseFree ? "Yes ✅" : "No ❌"}
      </p>
    </form>
  );
}
