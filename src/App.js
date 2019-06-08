import React from 'react';
import MoodEntry from './model.js';
import './App.css';

let mood_entries = [
    new MoodEntry("2019-06-07 15:00", ["SADNESS", "FEAR"], "Being home alone", "my girlfriend", "texting her, if she is okay"),
    new MoodEntry("2019-06-08 16:00", ["HAPPINESS"], "Being with my girlfriend", "Blowjob", "sucking her tits"),
]

class App extends React.Component {
    constructor() {
        super();
        this.state = mood_entries[0];
    }
    change_mood() {
        this.setState(mood_entries[1]);
    }
    render()
    {
        return (
            <div>
                Am {this.state.date} fühltest du dich <Emotion emotion={this.state.emotions[0]}></Emotion>.
                <button onClick={() => this.change_mood()}>Gefühl ändern</button>
            </div>
        );
    }
}

class Emotion extends React.Component {
    render() {
        return <div class={this.props.emotion}>{this.props.emotion}</div>
    }

}


export default App;
