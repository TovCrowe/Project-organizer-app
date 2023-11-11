'use client'
import { User } from '@nextui-org/react';
import {use, useState} from 'react'
import { useRouter } from 'next/navigation';
import {CreateUser, getUsers} from '../data/dbrequest'
import { create } from 'domain';


export default function SignUp(){
    const [error, setError] = useState("");
    const [succes, setSucces] = useState('');
   

    const [createUser, setCreateUser] = useState({
        name:'',
        email: '',
        password: ''
    })


    const handleSubmit = async (e: any) => { 
        e.preventDefault();
        if( createUser.name === "" || createUser.email === "" || createUser.password === ""){
          setError("Please fill all the fields")
          return;
        }

        const existingUsers = await getUsers();
        const existingUserByEmail = existingUsers.response.find((u:any) => u.email === createUser.email);
        const existingUserByName = existingUsers.response.find((u:any) => u.name === createUser.name);
        if (existingUserByEmail && existingUserByName) {
          setError("User with this email already exists");
          return;
        
        }
        if (existingUserByEmail) {
          setError("User with this email already exists");
          setSucces(""); 
          
          return;
        }
        if (existingUserByName) {
          setError("User with this name already exists");
          setSucces(""); 
          
          
          return;
        }

        try {
          await CreateUser(createUser.name, createUser.email, createUser.password)
          setSucces("User created successfully");
          setError("");
        } catch (error:any) {
          console.error("Error submitting the form:", error);
          setError("Error: " + error.message);
          setSucces(""); 
        }        
        

     }



    return (
        <div className='min-h-screen flex flex-col items-center'>
      <h1 className="text-center text-6xl text-green-900 mb-8 font-bold p-3 pt-5 font-mono">
        Make your account
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
            onChange={(e) => setCreateUser({ ...createUser, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="city" className="underline decoration-pink-600 font-mono">
            Email
          </label>
          <input
            type="text"
            placeholder="Email..."
            id="email"
            name="email"
            onChange={(e) => setCreateUser({ ...createUser, email: e.target.value })}
            className="bg-gray-800 rounded-xl p-3"
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
            onChange={(e) => setCreateUser({ ...createUser, password: e.target.value })}
            
          />
        </div>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {succes && <div className="text-blue-600 mb-3">{succes}</div>}
        <div className="flex flex-col mb-5">
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