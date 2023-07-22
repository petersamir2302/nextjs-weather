import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import ForecastResults from '@/components/ForecastResults.tsx';
import CurrentWeather from '@/components/CurrentWeather.tsx';

const inter = Inter({ subsets: ['latin'] });

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const [isMetric, setIsMetric] = useState(true);
  const [suggestionsShown, setSuggestionsShown] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState(null);

  useEffect(() => {
    if (query.length > 0) {
      fetch(`http://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${query}`)
        .then(response => response.json())
        .then(data => {
          setAutocompleteResults(data);
        })
        .catch(error => console.error(error));
    } else {
      setAutocompleteResults(null);
    }
  }, [query]);

  useEffect(() => {
    if (results.current) {
      const isNight = results.location.localtime.split(' ')[1] === 'PM';
      const weatherCondition = results.current.condition.text.toLowerCase().replace(' ', '-');
      const timeOfDayClass = isNight ? styles.night : styles.day;
      const weatherConditionClass = styles[weatherCondition];
      document.body.className = `${inter.className} ${timeOfDayClass} ${weatherConditionClass}`;
    }
  }, [results]);

  function formatTime(epochTime, timezoneOffset) {
    const date = new Date(epochTime * 1000);
    const localTime = date.getTime() + (timezoneOffset * 60 * 1000);
    const localDate = new Date(localTime);
    const formattedTime = localDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short'
    });
    return { formattedTime };
  }

  function handleSearch(event: any) {
    event.preventDefault();
    setResultsLoading(true);
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${query}&days=6&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          data.location.formattedTime = formatTime(data.location.localtime_epoch, data.location.tz_id);
          data.forecast.forecastday = data.forecast.forecastday.slice(1, 6);
          setResults(data);
          setResultsLoading(false);
        } else {
          setResults({});
        }
      })
      .catch(error => console.error(error));
  }

  function selectQuery(event, result) {
    setQuery(`${result.name},${result.region},${result.country}`);
    handleSearch(event);
    setSuggestionsShown(false);
  }

  function showSuggestions() {
    setSuggestionsShown(true);
  }

  function changeToMetric() {
    setIsMetric(true);
  }

  function changetoImperial() {
    setIsMetric(false);
  }

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for location weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} container py-2 px-1 p-x-lg-5 search-component`}>
        <div className={`${inter.className} container py-2 px-1 p-x-lg-5 search-component d-flex justify-content-center`}>

          <div className='col-12 col-lg-6'>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="City, zipcode or coordinates"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    onFocus={showSuggestions}
                  />
                  <label htmlFor="searchInput">Search</label>
                </div>

                {suggestionsShown && autocompleteResults && (
                  <ul className={styles.autocompleteResults}>
                    {autocompleteResults.map((result, index) => (
                      <li key={index} onClick={event => selectQuery(event, result)}>
                        {result.name},{result.region},{result.country}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="btn btn-primary" type="submit" id="button-addon2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
            {resultsLoading && <img className='m-x-auto' src='/images/loader.gif'></img>}
            {results && results.current && <div>
              <ul className="nav nav-pills w-100 mb-3">
                <li className="nav-item w-50 text-center" onClick={changeToMetric}>
                  <a className={`nav-link ${isMetric ? 'active' : ''}`} aria-current="page" href="#">Metric (°C/Km)</a>
                </li>
                <li className="nav-item w-50 text-center" onClick={changetoImperial}>
                  <a className={`nav-link ${!isMetric ? 'active' : ''}`} href="#">Imperial (°F/Mil)</a>
                </li>
              </ul>
              <CurrentWeather weatherData={results.current} isMetric={isMetric} />
            </div>}
            {results.forecast && results.forecast.forecastday.length > 0 && <ForecastResults results={results.forecast.forecastday} isMetric={isMetric} />}

          </div>
        </div>
      </main>
    </>
  );
}