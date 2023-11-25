import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Places = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [passLevel, setPassLevel] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/places')
      .then(res => {
        if (res.status === 200) {
          setPlaces(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/passes/${user.pass_id}`)
      .then(res => {
        if (res.status === 200) {
          setPassLevel(res.data.level);
        }
      })
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  },  []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <p className='text-center text-white mb-5'>Age: {user.age}, Niveau du pass: {passLevel}</p>
      <ul className='flex flex-wrap gap-5'>
        {places.map(place => (
          <li className='w-96 bg-slate-900 mx-auto text-white rounded-lg border-2 border-slate-900'>
            <div className='grid grid-cols-2 gap-x-2'>
              <p className='ml-auto'>age requis: </p>
              <p className={user.age < place.required_age_level ? 'text-red-500' : 'text-green-500'}>{place.required_age_level}</p>
              <p className='ml-auto'>niveau de pass requis: </p>
              <p className={passLevel < place.required_pass_level ? 'text-red-500' : 'text-green-500'}>{place.required_pass_level}</p>
            </div>
            <div className='w-full h-28 grid place-items-center'>
              <Link
                to={`/places/${place._id}`}
                className='m-auto bg-blue-500 rounded hover:bg-blue-600 px-5 py-2'
              >
                Voir la place
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Places