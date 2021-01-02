import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "1e053c993b4f310dd3b6629cd5a394ad"; 


/*Initialize a component*/
class App extends React.Component{
    
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error:undefined
    }
    //Creating a method called getWeather//
    //e is just an event object//
    getWeather = async (e) =>{
        /*e.preventDefault is going to prevent default behaviour of the component*/
        e.preventDefault();
        /*Form should accept dynamic values. City an country can be changed */
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        //Arrow function allows us to use "this" keyword independently//
        //Making the API call//
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        /*Converting the response in JSON format. JSON converts the data from api to a readable format
        that any programming language can understand*/
        const data = await api_call.json();
        if(city && country)
        {
            //console.log(data);
            this.setState({
                temperature: data.main.temp, 
                city: data.name, 
                country: data.sys.country,
                humidity: data.main.humidity, 
                description: data.weather[0].description, 
                error: " "
    
             });
        }
        else
        {
            this.setState({
                temperature: undefined, 
                city: undefined, 
                country: undefined,
                humidity: undefined, 
                description: undefined, 
                error: "Please enter city and country"
             }); 
        }
       
        /*State is an object that liven within a component and it is responsible for keeping track of changing
        data within a component. It is basically some sort of interaction with the application 
        that causes the data to change*/

         
        /*Template strings are normal strings,but they allow you inject the variables
        that you have defined within your files. */
    
        //async await is a great way of making HTTP calls. It makes web requests extremely easy//
    }
    /*To display the data that's is going to be inside the component- Use render method*/
    render() {
        /*Render method is going to return JSX. JSX is not HTML. However, it looks like a HTML.
        But, it is a JavaScript code running in the background. 
        Babble behind the scene converts the code into JavaScript that browser can understand */
        /*render method returns JSX. JSX can return only 1 parent element. Hence, we cannot 
        return another div, paragraph(p). 
        Anything that you want to return has to be within 1 single component that is div*/
        /*Props = Props are very much like HTML attribute. We can name them with whatever we want*/
        //Importing Titles component //
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 title-container">
                                <Titles />
                                <div className="col-xs-9 form-container">
                                <Form getWeather={this.getWeather}/>
                                <Weather temperature={this.state.temperature}
                                city ={this.state.city} 
                                country ={this.state.country}
                                humidity ={this.state.humidity}
                                description ={this.state.description}
                                error={this.state.error}
                                />
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
};

                
export default App;