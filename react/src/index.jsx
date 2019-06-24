import React from 'react'
import ReactDom from 'react-dom'
import {connect, Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import uuid from 'uuid/v4'


const DELETE_ELEM = 'DELETE_ELEM'
const CREATE_ELEM = 'CREATE_ELEM'
//const EDIT_ELEM = 'EDIT_ELEM'

//Erster Probeeintrag
const initialState = {
    feeling: [
        {
            id: uuid(),
            feel: 'traurig',
            situation: 'allein Zuhause',
            need: 'meine Freundin',
            behavior: 'anrufen'

        }
    ]
}

//Button-Funktion im Allgemeinen (Löschen, Erstellen, auflisten)
function App(state = initialState, action) {
    switch (action.type) {
        case CREATE_ELEM: {
            const newFeeling = [...state.feeling, {id: action.payload.id, feel: action.payload.feel, situation: action.payload.situation, need: action.payload.need, behavior: action.payload.behavior}]
            return {...state, feeling: newFeeling}
        }
        /*case EDIT_ELEM:{
            const id = action.payload

        }*/
        case DELETE_ELEM: {
            const id = action.payload
            const newFeeling = []

            for (let elem of state.feeling) {
                if (elem.id !== id) {
                    newFeeling.push(elem)
                }
            }
            return {...state, feeling: newFeeling}
        }
        default:
            return state
    }
}

//ButtonDefinition und Ausgabe
@connect()
class Elem extends React.Component {
    deleteHandler = () => {
        this.props.dispatch({type: DELETE_ELEM, payload: this.props.id})
    }

    render() {
        return <div>
            {this.props.feel}
            {this.props.situation}
            {this.props.need}
            {this.props.behavior}
            <button onClick={this.deleteHandler}>Gefühl verdrängen</button>
        </div>
    }
}

//IDVergabe mit Eingabe Verknüpfen
function connectfeelingTofeelingComponent(state) {
    return {feeling: state.feeling}
}

//IDVergabe
@connect(connectfeelingTofeelingComponent)
class Feeling extends React.Component {
    render() {
        const feeling = this.props.feeling
        const feelingUI = feeling.map(elem => <Elem key={elem.id} id={elem.id} feel={elem.feel} situation={elem.situation} need={elem.need} behavior={elem.behavior}/>)

        return <div>
            {feelingUI}
        </div>
    }
}

//EingabeFeld Zuordnung & Button
@connect()
class CreateElem extends React.Component {
    constructor() {
        super()

        this.feelRef = React.createRef()
        this.situationRef = React.createRef()
        this.needRef = React.createRef()
        this.behaviorRef = React.createRef()


    }

    handleCreate = () => {
        const feel = this.feelRef.current.value;
        const situation = this.situationRef.current.value;
        const need = this.needRef.current.value;
        const behavior = this.behaviorRef.current.value

        this.props.dispatch({type: CREATE_ELEM, payload: {feel, situation, need, behavior, id: uuid()}})
    }

    render() {
        return <div>
            <input ref={this.feelRef} type="text" placeholder="Wie fühlst du dich?"/>
            <input ref={this.situationRef} type="text" placeholder="Was ist passiert?"/>
            <input ref={this.needRef} type="text" placeholder="Was brauchst du?"/>
            <input ref={this.behaviorRef} type="text" placeholder="Was machst du um dein Need zu bekommen?"/>
            <button onClick={this.handleCreate}>Gefühlswelt erweitern</button>
        </div>
    }
}
//Zwischenspeicher der Inhalte, also Auflistung
const store = createStore(App, composeWithDevTools(applyMiddleware(thunk)))



//Ausgabe
ReactDom.render(
    <Provider store={store}>
        <CreateElem/>
        <Feeling/>
    </Provider>,
    document.getElementById('main')
)