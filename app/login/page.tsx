
'use client'
import { useState } from "react"
import { authentification } from "../data/dbrequest";
import Link from 'next/link'

export default function LogIn(){
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })

    console.log(credentials);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
      
        try {
          if (!credentials.name || !credentials.password) {
            setError("Please fill all the fields");
            setSucces("");
            return;
          }
          
          const response = await authentification(credentials);
      
          // Verifica si la respuesta contiene información sobre la autenticación exitosa
          if (response) {
            setError("");
            setSucces("Authentication successful");
            
          } else {
            setError("Email or UserName is not correct");
          }
        } catch (error) {
          console.error("Error submitting the form:", error);
          setError("Ocurrió un error al autenticar");
        }
      };

    return(
    <div className='min-h-screen flex flex-col items-center'>
      <h1 className="text-center text-6xl text-green-900 mb-8 font-bold p-3 pt-5 font-mono">
        Welcome back!
      </h1>
      <form  className="flex flex-col rounded-xl shadow-xl p-3 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-5">
          <label htmlFor="name" className="underline decoration-pink-600 font-mono">
            User Name:
          </label>
          <input
            type="text"
            placeholder="Name..."
            id="name"
            name="Name"
            className="bg-gray-800 rounded-xl p-3 w"
            onChange={(e) => {
                setCredentials({...credentials, name: e.target.value})
            }}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="foundation" className="underline decoration-pink-600 font-mono">
                Password
          </label>
          <input
            type="password"
            id="password"
            name="Password"
            className="bg-gray-800 rounded-xl p-3"
            placeholder="Password..."
            onChange={(e) => {
                setCredentials({...credentials, password: e.target.value})
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
    )

}