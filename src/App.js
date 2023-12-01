import React from 'react';
import './App.css';
import WeatherBox from './components/WeatherBox';
import Weather from './components/Weather';
import Cities from './components/Cities'


class App extends React.Component{
  state ={
    city: undefined,
    days: new Array(5)
  };

  updateState = data =>{
    const city = data.city.name;
    const days = [];
    const dayIndices = this.getDayIndeces(data);

    for (let i = 0; i<5; i++){
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].main.temp,
        temp:data.list[dayIndices[i]].weather[0].icon
      });
    }
    this.setState({
      city: city,
      days: days
    });
  };

  // tries to make an API call with the given city name and triggers state update
  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=dc4e0175ccb31c85e9f5ca91626b5d02`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
    await this.updateState(api_data);
      return true;
    } else return false;
  };

  // returns array with Indices of the next five days in the list
  // from the API data (every day at 12:00 pm)
  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <header className='App-header'>
        <Cities city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
          <Weather data={this.state.days[0]} city={this.state.city}>
          </Weather>
          <WeatherBoxes />

        </header>
      </div>
    );
  }
}

export default App;
