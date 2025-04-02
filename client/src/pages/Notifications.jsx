import React, { useEffect, useState } from 'react';
import socket from '../socket'; // make sure this points to your connected socket instance

export default function Notifications() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.on('request driver', ({ journey, passenger }) => {
      console.log('Received ride interest:', passenger);
      console.log(passenger.id);
      setRequests(prev => [...prev, { journey, passenger }]);
    });

    // Optional: clean up listener on component unmount
    // return () => {
    //   socket.off('request driver');
    // };
  }, []);

  const handleAccept = async (req) => {
    console.log(req);
    socket.emit('driver response', {req});
    const journey=req.journey;
    const passenger=req.passenger;
    const journeyId= journey._id;
    const passengerId= passenger.id;
    const passengerName= passenger.name;
    const data={journeyId,passengerId,passengerName};
    const res = await fetch("/api/journey/addPassenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleReject = (request) => {
    // socket.emit('driver response', {
    //   response: 'rejected',
    //   journeyId: request.journey._id,
    //   passengerId: request.passenger._id,
    // });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Ride Requests</h2>

      {requests.length === 0 ? (
        <p>No new Notification</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, index) => (
            <li key={index} className="border p-4 rounded-lg bg-gray-100">
              <p><strong>{req.passenger.name}</strong> is interested in your ride from <strong>{req.journey.start}</strong> to <strong>{req.journey.end}</strong>.</p>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAccept(req)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleReject(req)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
