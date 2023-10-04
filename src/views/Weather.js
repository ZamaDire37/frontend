import React, {Component} from "react"
import { Link } from 'react-router-dom';
import '../css/Weather.css';
import "../css/weather-icons.css"

class Weather extends Component {
	constructor(props) {
		super(props);

		   this.state = ({
               zip:"",
               returnStatus: "",
			   unitsTemp: "",
			   unitsSpeed: "",
			   validStatus: "loading",
               weatherMain: "",
               weatherDesc: "",
			   temp: "",
			   tempHigh: "",
			   tempLow: "",
               humidity: "",
               windSpeed: "",
			   locationName: "",
			   weatherIcon: ""
		   })
    }


    async componentDidMount()
    {
        let results = await fetch("/callWeatherAPI")
        let data = await results.json()
		this.setState( { zip: data.finalZip, returnStatus: data.locationData.cod } )
		if(data.units === "metric")
		{
			this.setState({ unitsTemp: "°C", unitsSpeed: "Metres Per Hour" })
		}
		else
		{
			this.setState({ unitsTemp: "°F", unitsSpeed: "Miles Per Hour" })
		}
        if(this.state.returnStatus === 200)
        {
			this.setState(
			{
				validStatus: "success",
				weatherMain: data.locationData.weather[0].main,
				weatherDesc: data.locationData.weather[0].description,
				temp: data.locationData.main.temp,
				tempHigh: data.locationData.main.temp_max,
				tempLow: data.locationData.main.temp_min,
				humidity: data.locationData.main.humidity,
				windSpeed: data.locationData.wind.speed,
				locationName: data.locationData.name
			})

			switch (this.state.weatherMain) {
				case "Thunderstorm":
					this.setState({ weatherIcon: "wi wi-thunderstorm" })
					break;

				case "Drizzle":
					this.setState({ weatherIcon: "wi wi-sleet" })
					break;

				case "Rain":
					this.setState({ weatherIcon: "wi wi-rain" })
					break;

				case "Snow":
					this.setState({ weatherIcon: "wi wi-snow" })
					break;

				case "Clear":
					this.setState({ weatherIcon: "wi wi-moon-new" })
					break;

				case "Clouds":
					this.setState({ weatherIcon: "wi wi-cloudy" })
					break;

				default:
					this.setState({ weatherIcon: "wi wi-dust" })
					break;
			}
        }
        else
        {
            if(isNaN(parseInt(this.state.zip)) || parseInt(this.state.zip).toString().length !== this.state.zip.length || this.state.zip.length !== 4)
            {
				this.setState({validStatus: "invalid"})
            }
            else
            {
				this.setState({validStatus: "unknown"})
            }
        }
    }

    render()
    {
		let successCard =
		(
			<div class="wrapper">
				<div class="top">
					<div id="buttons">
						<div id="returnButton">
							<Link to='/'><button>Try a different location</button></Link>
						</div>
					</div>
				</div>
				<div class="centre success">
					<div class="locationName">{this.state.locationName}</div>
					<div class="temperature">
						<div class="tempMain">
							{this.state.temp} {this.state.unitsTemp}
						</div>
					</div>
					<div class="weatherDesc">
						{this.state.weatherDesc}
					</div>
					<div class="weatherIcon">
						<i class={this.state.weatherIcon}></i>
					</div>
				</div>
			</div>
		)

		let invalidCard =
		(
			<div class="wrapper">
				<div class="top">
				<div id="buttons">
						<div id="returnButton">
							<Link to='/'><button>Click here to try again</button></Link>
						</div>
					</div>
				</div>
				<div class="centre invalid">
					<div class="paragraphContainer">
						<div class="errorNotice">Invalid Zipcode</div>
					</div>
				</div>
			</div>
		)

		let unknownCard =
		(
			<div class="wrapper">
				<div class="top">
				<div id="buttons">
						<div id="returnButton">
							<Link to='/'><button>Click here to try again</button></Link>
						</div>
					</div>
				</div>
				<div class="centre invalid">
					<div class="paragraphContainer">
						<div class="errorNotice">Unknown Zipcode</div>
						<div class="errorDesc">
							<p>The zipcode that you have entered; "{this.state.zip}", is unknown.<br/><br/>We could not find a location corresponding to the entered zipcode. The zipcode that you enter must be valid for South Africa.</p>
						</div>
					</div>
				</div>
			</div>
		)

		let loadingCard =
		(
			<div class="wrapper">
				<div class="top"></div>
				<div class ="centre loading">
				<div class="paragraphContainer">
						<div class="errorNotice">Loading</div>
						<div class="errorDesc">
							<p>We are busy fetching your data. In the meantime, you can sit back and relax as this should only take a second</p>
						</div>
					</div>
				</div>
			</div>
		)

		let defaultCard =
		(
			<div class="wrapper">
				<div class="top">
				<div id="buttons">
						<div id="returnButton">
							<Link to='/'><button>Click here to try again</button></Link>
						</div>
					</div>
				</div>
				<div class ="centre loading">
				<div class="paragraphContainer">
						<div class="errorNotice">Oops</div>
						<div class="errorDesc">
							<p>Something went wrong, try reloading the page. If the problem persist, then please try again later.</p>
						</div>
					</div>
				</div>
			</div>
		)

        switch (this.state.validStatus) {
			case "success":
				return successCard

			case "invalid":
				return invalidCard

			case "unknown":
				return unknownCard

			case "loading":
				return loadingCard

			default:
				return defaultCard

		}
    }
}


export default Weather;