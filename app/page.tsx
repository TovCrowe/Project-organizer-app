'use client'
import Image from 'next/image'
import {getUsers} from './data/dbrequest'
import { useEffect } from 'react'




export default function Home() {


  return (
    <div className="min-h-screen flex-col items-center justify-between p-20">
       <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 underline decoration-pink-500">About Our Project</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">HHDO</h3>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 underline decoration-pink-500">Description</h3>
        <p>HHDO is a task management platform designed to facilitate project organization, collaboration, and tracking.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 underline decoration-pink-500">Objective</h3>
        <p>At HHDO, our primary goal is to provide a comprehensive and user-friendly experience.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 underline decoration-pink-500">Key Features</h3>
        <ul>
          <li>Task Management</li>
          <li>Team Collaboration</li>
          <li>Project Tracking</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 underline decoration-pink-500">Technologies Used</h3>
        <p>
          HHDO is built using modern technologies such as:
          ASP.NET Core, Entity Framework Core, NEXTJS 14, SQL.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 underline decoration-pink-500">Join Us!</h3>
        <p>We're excited to introduce HHDO and hope it becomes a valuable tool for your task and project management.</p>
      </section>
    </div>
    </div>
  )
}
