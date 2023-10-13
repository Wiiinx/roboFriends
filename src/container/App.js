import React, {Component, StrictMode} from "react";
import Scroll from '../components/Scroll'
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [], // Initialize the robots state as an empty array
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users })); // Update the robots state with the fetched data
    }

    onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    }

    render(){
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length){ // this means length === 0
            return <h1>Loading</h1>
        }
        else{
            return(
            <div className='tc'>
                 <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>

            </div>);
        }
    }
}

export default App;