import React from 'react';
import styles from '@/styles/css/CurrentWeather.module.css'

const CurrentWeather = ({ weatherData, isMetric }) => {
    const backgroundImage = `url(${weatherData.condition.icon})`;

    return (
        <div className='card bg-white bordered rounded p-4 mb-3'>
            <h2>Current Weather</h2>
            <div className='d-flex gap-5'>
                <div className='flex-1 d-flex flex-column'>
                    <span className='fs-1 fw-bold'>{isMetric ? weatherData.feelslike_c : weatherData.feelslike_f}<sup className='fs-5'>{isMetric ? '°C' : '°F'}</sup></span>
                    <span>Feels like : {isMetric ? weatherData.feelslike_c : weatherData.feelslike_f}<sup>{isMetric ? '°C' : '°F'}</sup></span>
                    <div className='d-flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#0d6efd" className="bi bi-wind" viewBox="0 0 16 16">
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <span className='fw-semibold'>
                            {isMetric ? weatherData.wind_kph : weatherData.wind_mph}<span>{isMetric ? 'km/h' : 'mil/h'}</span>
                        </span>
                    </div>
                    <div className='d-flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#0d6efd" className="bi bi-sunglasses" viewBox="0 0 16 16">
                            <path d="M3 5a2 2 0 0 0-2 2v.5H.5a.5.5 0 0 0 0 1H1V9a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3 1 1 0 1 1 2 0 3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-.5h.5a.5.5 0 0 0 0-1H15V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-1.888 1.338A1.99 1.99 0 0 0 8 6a1.99 1.99 0 0 0-1.112.338A2 2 0 0 0 5 5H3zm0 1h.941c.264 0 .348.356.112.474l-.457.228a2 2 0 0 0-.894.894l-.228.457C2.356 8.289 2 8.205 2 7.94V7a1 1 0 0 1 1-1z" />
                        </svg>
                        <span className='fw-semibold'>
                            {weatherData.uv}
                        </span>
                    </div>
                    <div className='d-flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#0d6efd" class="bi bi-moisture" viewBox="0 0 16 16">
                            <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z" />
                        </svg>
                        <span className='fw-semibold'>
                            {weatherData.humidity}%
                        </span>
                    </div>
                </div>
                <div className='flex-1 d-flex flex-column'>
                    <div className={`${styles.conditionImageContainer} flex-1`} style={{ backgroundImage }}>
                    </div>
                    <span className='text-center fw-bold'>{weatherData.condition.text}</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;