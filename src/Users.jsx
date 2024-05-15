import { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, Marker } from "pigeon-maps"


const API_KEY = 'ec5f933788ec2e550fc16821c27da3f6';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Users = () => {
    const [userID, setUserID] = useState(1);
    const [userData, setUserData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [Lgt, setLgt] = useState(0);
    const [Lat, setLat] = useState(0);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const userResponse = await axios.get(`${USERS_API_URL}/${userID}`);
            setUserData(userResponse.data);

            const { data } = await axios.get(`${WEATHER_API_URL}?lat=${userResponse.data.address.geo.lat}&lon=${userResponse.data.address.geo.lng}&appid=${API_KEY}`);
            setWeatherData(data);
            setLgt(data.coord.lon);
            console.log(data.coord.lon);
            setLat(data.coord.lat);
            
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const kelvinToCelsius = (value) => (value - 273.15).toFixed(2);

    useEffect(() => {
        fetchUserData();
    }, [userID]);

    if (error) {
        return <p>{error.message}</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }



    return (
        <>
            <input type="number" value={userID} onChange={(e) => setUserID(e.target.value)} />
            {userData && weatherData && (
                <div>
                    <h2>{userData.name}</h2>
                    <h3>{userData.email}</h3>
                    <p>{weatherData.weather[0].description} with {kelvinToCelsius(weatherData.main.temp)} Celsius</p>
                </div>
            )}
            <Map height={300} width={300} defaultCenter={[Lgt, Lat]} defaultZoom={2}>
                <Marker width={50} anchor={[Lgt, Lat]} />
            </Map>

        </>
    );
};

export default Users;