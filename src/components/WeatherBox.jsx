import React  from "react";
import './WeatherBox.css';

export default class WeatherBox extends React.Component{

    getDay = date =>{
        let weekday = new Array(7);
        weekday[0] = 'sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'saturday';

        return weekday[new Date(date).getDate()];
    };

    render(props){
        return(
            <div className="weather-box">
                <h1>{this.props.date ? this.getDay(this.props.date) : ''}</h1>
                <img src={
                    this.props.icon
                    ?require(`../logo.svg`)
                    :require('../logo.svg')
                }
                alt="sun">
                </img>

                <span className="temp">
                    {Math.round(this.props.temp -273.15)}°C
                </span>

            </div>
        );
    }
}