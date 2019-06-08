import React from 'react';
import MoodEntry from './model.js';
import './App.css';

//das sind Beispielgefühle, später werden sie aus einer DB gelesen
let mood_entries = [
    new MoodEntry("2019-06-07 15:00", ["SADNESS", "FEAR"], "Being home alone", "my girlfriend", "texting her, if she is okay"),
    new MoodEntry("2019-06-08 16:00", ["HAPPINESS"], "Being with my girlfriend", "Blowjob", "sucking her tits"),
]


// das ist meine ganze App
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            emotions: "",
            situation: "",
            need: "",
            behavior: "",
            feeling: [
                /*{date: "2019-06-07 15:00", emotions: ["SADNESS", "FEAR"], situation: "Being home alone", need: "my girlfriend", behavior: "texting her if she is okay."},
                {date: "2019-06-08 16:00", emotions: ["HAPPINESS"], situation: "Being with my girlfriend", need: "Blowjob", behavior: "sucking her tits."}*/
            ]
        };
    }



    //hier kann das Datum eingestellt werden
    updateDate(event) {
        this.setState({date: parseInt(event.target.value)});
    }

    //hier können die Emojies ausgewählt werden
    updateEmotions(event) {
        this.setState({emotions: event.target.value});
    }

    //hier kann die Situation zur Emotion geschildert werden
    updateSituation(event) {
        this.setState({situation: event.target.value});
    }

    //hier schreibt man auf was man braucht
    updateNeed(event) {
        this.setState({need: event.target.value});
    }

    //hier wird das gezeigte Verhalten in der Situation dokumentiert
    updateBehavior(event) {
        this.setState({behavior: event.target.value});
    }


    // hier wird ein neuer Gefühlseintrag hinzugefügt
    addFeeling(event) {
        var newFeeling = { date: this.state.date, emotions: this.state.emotions, situation: this.state.situation, need: this.state.need, behavior: this.state.behavior};
        this.setState({ feeling: this.state.feeling.concat(newFeeling) });
        localStorage.setItem('newFeeling');
        }

    //hier wird ein bestehender Gefühlseintrag gelöscht
    /*removeFeeling(){
        var newFeeling = this.state.feeling.filter(feeling => {
            return feeling.emotions != emotions; //hiernochmal schauen!!!!
        });
        this.setState({contacts: newContacts});
    }*/

    //hier kann man einen Eintrag bearbeiten
    change_mood() {
        this.setState(mood_entries[0]);
    }

    //hier werden die emojies zugewiesen



    //jetzt wird gerendert
        render(){
            return(
                <React.Fragment>
                    <h1>Moodtracker</h1>
                    <h2>Neuen Gefühlseintrag erstellen</h2>
                    <label>Datum: <input id="datum" value={this.state.date} onChange={this.updateDate.bind(this)} type="number"/></label>
                    <label>Emotion: <input id="emotion" value={this.state.emotions} onChange={this.updateEmotions.bind(this)} type="img"/></label>
                    <label>Situation: <input id="situation" value={this.state.situation} onChange={this.updateSituation.bind(this)} type="text"/></label>
                    <label>Was brauchst du?: <input id="brauchen" value={this.state.need} onChange={this.updateNeed.bind(this)} type="text"/> </label>
                    <label>Verhalten: <input id="verhalten" value={this.state.behavior} onChange={this.updateBehavior.bind(this)} type="text"/></label>
                    <button onClick = {this.addFeeling.bind(this)}>"Gefühlswelt erweitern"</button>
                    /*<button onClick={() => this.change_mood()}>Gefühl ändern</button>*/

                    <h2>Alle deine Gefühle</h2>
                    {this.state.feeling.length ? (
                        <ul id="gefühlswelt">
                            {this.state.feeling.map((feeling, index) => {
                                return (
                                    <li key= {index}>
                                        <button onClick={this.removeFeeling.bind(this.feeling.emotions)}>weniger fühlen</button> {feeling.date} ({feeling.emotions}): {feeling.situation} {feeling.need} {feeling.behavior}</li>
                                );
                            })}
                        </ul>
                        ) : (
                            <span>Deine Gefühlswelt füllt keinen Fingerhut!</span>
                        )}
                </React.Fragment>
            );
        }

    }











/*
//hier werden meine Emotionen ausgegeben
class Emotion extends React.Component {
    render() {
        return <div class={this.props.emotion}>{this.props.emotion}</div>
    }

}*/


export default App;


