This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## User guideline
This app functions as weather forecast app so all you need to do is go to app url (default: localhost:3000)
and type any location , zipcode or coordinates in the search bar it will autocomplete for you then you choose one of the autocomplete results or hit search or enter and it will get the current weather conditions for this location and the forecast for the next 5 days with cool background that represents the weather condition for some conditions

## Developer guideline
There are 3 main components in this app :

1-index.tsx : which is the root route and main search page that includes all other components in it we call the api to autocomplete whenever the user enters something in the searchbar and the api to get the weather data for that location he choose from autocomplete or entered manually (query) and also has isMetric which defines to use metric or imperial in the results shown and both get passed as props to the other components to use them.
2-currentWeather.tsx: which is a component that takes the weatherData and isMetric as props and only purpose is to render today's weather condition , temprature , wind speed , UV, feels like temprature and humidity.
3-forecastResults.tsx: which is a component that takes the weatherData and isMetric as props and only purpuse is to render the forecast for the next 5 days including the condition , max-temprature and min-temprature.

There's a loader shown with animation with each api call

There's error handling animation shown when any api call fails

Each component has scss file that compiles to css using command 'sass --watch src/styles/scss:src/styles/css' but you don't need to run it everytime you run the app only if you need to edit scss files


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

