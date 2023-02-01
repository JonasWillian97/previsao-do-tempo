import axios from "axios";
import { useState } from "react";
import './App.css';

function App () {
  
  const [city, setCity] = useState('');
  const [weatherForeCast, setWeatherForeCast] = useState(null);
  


  function handleSearch  ()  {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${city}&lang=pt`)
    .then((res) => {
      if(res.status === 200) {
        return res
      }
    })
    .then((data) => {
      setWeatherForeCast(data);
      setCity('');
    })
  }

  return(
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <h4>Veja a previsão para sua cidade abaixo:  👇  </h4>
      <div>
        <input type='text' placeholder='EX:São Paulo...' value={city} onChange={e => setCity(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>

        {
          weatherForeCast
          ?
          (
            <div className="container-details">
        <div>
          <div>
            <img src={weatherForeCast.data.current.condition.icon} />
            <h5>{weatherForeCast.data.location.name} - {weatherForeCast.data.location.region}</h5>
          <h5>Hoje o dia está: {weatherForeCast.data.current.condition.text}</h5>
          </div>
          <h5>Temperatura: {weatherForeCast.data.current.temp_c}°C</h5>
          <h5>Umidade relativa do ar: {weatherForeCast.data.current.humidity}%</h5>
        </div>
      </div>
            )
            :
            null
          }

    </div>
  )
}

export default App;