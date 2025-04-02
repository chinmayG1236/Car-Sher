import React, { useState, useEffect  } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import Trial from '../components/Trial.jsx';
import PlacesSearchBox from '../components/PlacesSearchBox.jsx';
import OtherInfo from '../components/OtherInfo.jsx';
import JourneyList from '../components/JourneyList.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log('hi');
    if (currentUser === null) {
      console.log("Redirecting to sign-in...");
      navigate('/sign-in');
    }
    if(currentUser.success === false){
      console.log("Redirecting to sign-in...");
      navigate('/sign-in');
    }
  }, [currentUser, navigate]);
  
  return (

    <div>

      {/* <h2 className='font-black text-center' >planning a ney journey ? enter the details below</h2>
      <h3 className='text-center'>Enter your start point</h3>
      <PlacesSearchBox/>
      <h3 className='text-center'>Enter your end point</h3>
      <PlacesSearchBox/>
      <OtherInfo/> */}
      <div className='ml-3.5 mt-6'>
      <Link to='/add-journey'>
        <span className='text-red-600 ml-1 font-bold border bg-green-300 underline' > Add your own Journey by clicking here</span>
      </Link>
      </div>
      <JourneyList/>

      
      
    </div>
  )
}
