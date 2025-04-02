import React,{useEffect,useState} from 'react'
import Journey from './Journey';

function JourneyList () {
  const [items,setItems] = useState([]);
  useEffect(()=>{
    fetch('/api/journey/get',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      },
    })
    .then((response)=> response.json())
    .then((data)=>{
      setItems(data);
      console.log('fetched data',items);
    })
    .catch((error)=>console.log('error fetching',error));
  },[])
  

  return (
    <div>
      <h2 className='font-black ml-5 mt-3.5'>Scheduled Rides </h2>
      {items.length === 0 ? (
        <p>No journeys available</p>
      ) : (
        <div>
          {items.map((journey) => (
            <Journey key={journey._id} journey={journey} /> 
            
          ))}
        </div>
      )}
    </div>
  )
}

export default JourneyList
