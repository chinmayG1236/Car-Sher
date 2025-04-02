import React, { useEffect, useState } from 'react';
import Journey from './Journey';
import { useDispatch, useSelector } from "react-redux";
import socket from '../socket';

function JourneyList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const { currentUser } = useSelector(
      (state) => state.user
    );
  const [userStart, setUserStart] = useState('');
  const [userEnd, setUserEnd] = useState('');
  const [userSeats, setUserSeats] = useState('');
  const [userDate, setUserDate] = useState('');

  useEffect(() => {
    fetch('/api/journey/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data); // Initially show all
      })
      .catch((error) => console.log('error fetching', error));
  }, []);

  // const handleFilter = async (e) => {
  //   e.preventDefault();

  //   const filtered = items.filter((journey) => {
  //     const startMatch = journey.start.toLowerCase().includes(userStart.toLowerCase());
  //     const endMatch = journey.end.toLowerCase().includes(userEnd.toLowerCase());

  //     const seatsMatch =
  //       userSeats === '' || journey.unoccupiedSeats >= parseInt(userSeats);

  //     const dateMatch =
  //       userDate === '' ||
  //       new Date(journey.journeyDate).toISOString().split('T')[0] === userDate;

  //     return startMatch && endMatch && seatsMatch && dateMatch;
  //   });

  //   setFilteredItems(filtered);
  // };

  const handleFilter = async (e) => {
    e.preventDefault();
  
    const filtered = items.filter((journey) => {
      const startMatch = journey.start.toLowerCase().includes(userStart.toLowerCase());
      const endMatch = journey.end.toLowerCase().includes(userEnd.toLowerCase());
  
      const seatsMatch =
    userSeats === '' ||
    journey.unoccupiedSeats == null ||
    parseInt(journey.unoccupiedSeats) >= parseInt(userSeats);

      return startMatch && endMatch && seatsMatch;
    });
  
    // If userDate is given, sort by how close the journey date is to userDate
    let sortedFiltered;
    if (userDate) {
      const targetDate = new Date(userDate);
      sortedFiltered = filtered.sort((a, b) => {
        return Math.abs(new Date(a.journeyDate) - targetDate) - Math.abs(new Date(b.journeyDate) - targetDate);
      });
    } else {
      // Default: nearest future date first
      sortedFiltered = filtered.sort((a, b) => new Date(a.journeyDate) - new Date(b.journeyDate));
    }
  
    setFilteredItems(sortedFiltered);
  };
  


  const handleNotify = (journey) => {
    const passenger = {
      name:currentUser.username,
      id:currentUser._id,
    }

    socket.emit('passenger interested', {
      journey,passenger
    });

    alert(`Notification sent to ${journey.username} (Driver)!`);
  };



  return (
    <div>
      <form className="m-5 grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Start location"
          value={userStart}
          onChange={(e) => setUserStart(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="End location"
          value={userEnd}
          onChange={(e) => setUserEnd(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Seats needed"
          value={userSeats}
          onChange={(e) => setUserSeats(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={userDate}
          onChange={(e) => setUserDate(e.target.value)}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Find Rides
        </button>
      </form>

      {filteredItems.length === 0 ? (
        <p className="ml-5">No journeys available</p>
      ) : (
        <div>
          {filteredItems.map((journey) => (
            <Journey key={journey._id} journey={journey} onNotify={handleNotify}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default JourneyList;

