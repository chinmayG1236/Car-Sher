import React from 'react'

export default function Journey({ journey }) {
  return (
    <div className="border p-4 my-2 rounded shadow mr-4.5 ml-4.5">
      <h3>{journey.username}</h3>
      <p>
        <strong>Contact No:</strong> {journey.contactNo}
      </p>
      <p>
        <strong>From:</strong> {journey.start}{" "}
        <a href={journey.startOnMap} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png" alt="Map Icon" className="w-4 h-4 mr-1" />
          (Location On Map)
        </a>
      </p>
      <p>
        <strong>To:</strong> {journey.end}{" "}
        <a href={journey.endOnMap} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png" alt="Map Icon" className="w-4 h-4 mr-1" />
          (Location On Map)
        </a>
      </p>
      <p className='bg-amber-200'>
        <strong >Date:</strong> {new Date(journey.journeyDate).toLocaleString()}
        <strong> Seats Available:</strong> {journey.unoccupiedSeats}
        <strong> Vehicle:</strong> {journey.vehicle}
      </p>
      
      <p>
        <strong>Additional Note:</strong> {journey.additionalNote}
      </p>
    </div>
  )
}
