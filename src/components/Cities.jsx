import React from "react";
import './Cities.css';

export default class Cities extends React.Component{
    render(props){
        const onKlickHandler = async e=>{
            e.persist();

            const eventKey = e.which ? e.which : e.keyCode;
            const city = e.target.value;

            //check if input contains only letters

            if(eventKey ===13){
                if(/^[a-zA-ZäöüÄÖÜß] +$/.test(city)){
                    e.target.classList.add('loading');

                    if(await this.props.makeApiCall(city)) e.target.placeholder = 'Enter a City...';
                    else e.target.placeholder ='City was not found, enter another city...';

                }else e.target.placeholder = 'That is not a city';
                e.target.classList.remove('loading');
                e.target.value ='';
            }
        };

        const style = {
            top: this.props.city ? '-380px' : '-20px',
            width: '600px',
            display: 'inline-block',
            padding:'10px 0px 10px 30px',
            lineHeight: '120%',
            position: 'relative',
            borderRadius: '20px',
            outline: 'none',
            fontSize: '20px',
            transition: 'all 0.5s ease-out'
        };

        return(
            <input
            className="city-input"
            style={style}
            type="text"
            placeholder="Please enter a city.."
            onKeyPress={onKlickHandler}
            >
            </input>
        );
    }
}