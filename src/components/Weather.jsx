import React from "react";
import './Weather.css';

export default class Weather extends React.Component{
    render(props){
        const Title = this.props.city ? null : <h1 className="title">Weather Forecasting</h1>;

        return(
            <div className="main">
                <div className="inner-main">

                    {Title}

                    <img
                    src ={
                        this.props.data
                        ? require(`../logo.svg`)
                        :require(`../logo.svg`)
                    }

                    alt="sun"

                    style={
                        {
                            visibility: this.props.city ? 'visible' : 'hidden',
                            opacity:this.props.city ? '1' : '0'
                        }
                    }
                    ></img>

                    <div className="today"
                    style={
                        {
                            visibility:this.props.city ? 'visible' : 'hidden',
                            opacity: this.props.city ? '1': '0'
                        }
                    }

                    >
                        <span>Today</span>
                        <h1>{this.props.city}
                        </h1>
                        <p>
                            Temperature: { this.props.data ? Math.round(this.props.data.temp - 273.15):0 }
                            °C
                        </p>

                        <p>
                            {this.props.data ? this.props.data.weather_desc.toLoweCase() : ''}
                        </p>
                        </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}