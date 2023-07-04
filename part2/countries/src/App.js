import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryForm = (props) => {
  return (
    <form>
      <div>find countries : <input onChange={props.chgInput} /></div>
    </form>
  )
}

const SpecificCountry = ({countryData}) => {
  const [WeatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryData.capitalInfo.latlng[0]}&lon=${countryData.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])
  if (!WeatherData) {
    return null
  }
  return (
    <>
      <h2>{countryData.name.common}</h2>
      <p>Capital : {countryData.capital[0]}</p>
      <p>Area : {countryData.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(countryData.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={countryData.flags.png} alt="flag" />
      <h3>Weather in {countryData.capital[0]}</h3>
      <p>temperature : {WeatherData.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`} alt="weather image" />
      <p>wind : {WeatherData.wind.speed} m/s</p>
    </>
  )
}

const CountryDisplay = (props) => {
  const [countryData, setCountryData] = useState(null);

  const showCountry = (name) => {
    console.log(`fetching data for ${name}...`)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        console.log(response.data)
        setCountryData(response.data)   
      })
      .catch(error => {  
          console.log(error);
      })
  }

  useEffect(() => {
    setCountryData(null)
  }, [props.countries])
  
  if (countryData) {
    return <SpecificCountry countryData={countryData} />
  }
  if (props.countries.length === 1) {
    return <SpecificCountry countryData={props.countries[0]} />  
  }
  else if(props.countries.length > 1 && props.countries.length < 10) {
    return (
      <>{props.countries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={()=>showCountry(country.name.common)}>show</button></div>)}</>
    )
  }
  else {
    return <div>Too many matches, specify another filter</div>
  }
}

const App = () => {
  const [countrieslist, setCountriesList] = useState(null)
  const [countriestoShow, setCountriesToShow] = useState(countrieslist)

  useEffect(() => {
  if (!countrieslist) {
    console.log('fetching all countries data...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountriesList(response.data)
        setCountriesToShow(response.data)
      })
      .catch(error => {  
        console.log(error);
      })
    }
  },[]) 

  if (!countriestoShow) {
    return null
  }

  const handleInputChange = (event) => {
    const searchtxt = event.target.value
    if (searchtxt !== '') {
      console.log(searchtxt);
      const filtered = countrieslist.filter(country => country.name.common.toLowerCase().includes(searchtxt.toLowerCase()))
      setCountriesToShow(filtered)
      console.log(filtered.length);      
    } else {
      console.log("emptyy");
    }
  }

  return (
    <div>
      <CountryForm chgInput={handleInputChange}/>
      <CountryDisplay countries={countriestoShow}/>
    </div>
  )
}

export default App;