"use client";
import { useState, useEffect } from "react";
import { authentification } from "../data/dbrequest";
import { useRouter } from "next/navigation";
import Decoder from "../utilities/Decoder"

export default function LogIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!credentials.name || !credentials.password) {
        setError("Please fill all the fields");
        return;
      }

      const response = await authentification(credentials);
      if (response) {
        setError("");
        const token = response.data.token;
        localStorage.setItem("token", token);
        if(localStorage.getItem('token')){
          window.location.href = '/'
        }
      } else {
        setError("UserName or Password is not correct");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("Ocurrió un error al autenticar");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-center text-6xl text-green-900 mb-8 font-bold p-3 pt-5 font-mono">
        Welcome back!
      </h1>
      <form
        className="flex flex-col rounded-xl shadow-xl p-3 w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-5">
          <label
            htmlFor="name"
            className="underline decoration-pink-600 font-mono text-white"
          >
            User Name:
          </label>
          <input
            type="text"
            placeholder="Name..."
            id="name"
            name="Name"
            className="bg-gray-800 rounded-xl p-3 w"
            onChange={(e) => {
              setCredentials({ ...credentials, name: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label
            htmlFor="foundation"
            className="underline decoration-pink-600 font-mono text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="Password"
            className="bg-gray-800 rounded-xl p-3"
            placeholder="Password..."
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col mb-5">
          {error && <div className="text-red-600 mb-3">{error}</div>}

          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-950 p-3 rounded-full font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
