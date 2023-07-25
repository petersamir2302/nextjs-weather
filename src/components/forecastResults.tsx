import React from 'react';

interface Result {
  date: string;
  day: {
    condition: {
      text: string;
      icon: string;
    };
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
}

interface Props {
  results: Result[];
  isMetric: boolean;
}

const ForecastResults = ({ results, isMetric }: Props) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {results.map((result, index) => (
        <div className="col" key={index}>
          <div className="card h-100">
            <div className="card-body">
              <div className='d-flex flex-column'>
                <h5 className="card-title text-center">{new Date(result.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</h5>
                <img className="mx-auto" width="64px" height="64px" alt={result.day.condition.text} src={result.day.condition.icon}></img>
                <p className="card-text text-center">{isMetric ? result.day.maxtemp_c : result.day.maxtemp_f}<sup>{isMetric ? '°C':'°F'}</sup> / {isMetric ? result.day.mintemp_c : result.day.mintemp_f}<sup>{isMetric ? '°C':'°F'}</sup></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastResults;