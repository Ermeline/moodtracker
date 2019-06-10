import React from 'react';
import MoodEntry from './model.js';
import './App.css';

//das sind Beispielgefühle, später werden sie aus einer DB gelesen
/*let mood_entries = [
    new MoodEntry("2019-06-07 15:00", ["SADNESS", "FEAR"], "Being home alone", "my girlfriend", "texting her, if she is okay"),
    new MoodEntry("2019-06-08 16:00", ["HAPPINESS"], "Being with my girlfriend", "Blowjob", "sucking her tits"),
]*/




// das ist meine ganze App, MoodEntry ist in der Model.js hinterlegt und beinhaltet quasi die Schablone
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = [{feeling: new MoodEntry()}];
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
        var newFeeling=[
            this.state.MoodEntry
        ];
        this.setState({feeling: this.state.feeling.concats(newFeeling)});
    }

    //hier wird ein bestehender Gefühlseintrag gelöscht sollte besser mit einer funktion passieren
    removeFeeling(emotions){
        var newFeeling = this.state.feeling.filter(feeling => {
            return feeling.emotions !== emotions;
        });
        this.setState({feeling: newFeeling});
    }

    //hier kann man einen Eintrag bearbeiten bzw wie beim hinzufügen nur mit vorhandenen Daten des zu bearbeitenden Eintrags
    // changeFeeling

    //hier werden die emojies zugewiesen

    //hier wird ganz zum schluss im localstorage gespeichert


    //jetzt wird gerendert
    render() {
        return (
            <React.Fragment>
                <h1>Moodtracker</h1>
                <h2>Neuen Gefühlseintrag erstellen</h2>
                <div>

                    <label>Datum: <input value={this.state.date} onChange={this.updateDate.bind(this)}
                                         type="number"/></label>
                    <label>Emotion: <input value={this.state.emotions}
                                           onChange={this.updateEmotions.bind(this)} type="img"/></label>
                        <div>
                            <label>Situation: <input placeholder="Was ist passiert?" value={this.state.situation}
                                                 onChange={this.updateSituation.bind(this)} type="text"/></label>
                        </div>
                        <div>
                            <label>Need: <input placeholder="Was brauchst du?" value={this.state.need}
                                                        onChange={this.updateNeed.bind(this)} type="text"/> </label>
                        </div>
                        <div>
                            <label>Verhalten: <input placeholder="Was machst du damit du dein Need bekommst?" value={this.state.behavior}
                                                 onChange={this.updateBehavior.bind(this)} type="text"/></label>
                        </div>
                    <button onClick={this.addFeeling.bind(this)}>"Gefühlswelt erweitern"</button>
                </div>



                <h2>Alle deine Gefühle</h2>
                {this.state.feeling.length ? (
                    <ul id="gefühlswelt">
                        {this.state.feeling.map((feeling, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={this.removeFeeling.bind(this.feeling.emotions)}>weniger fühlen
                                    </button>
                                    {feeling.date} ({feeling.emotions}): {feeling.situation} {feeling.need} {feeling.behavior}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <span>Deine Gefühlswelt füllt noch keinen Fingerhut!</span>
                )}
            </React.Fragment>
        );
    }

}


export default App;


