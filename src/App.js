import React, {Component} from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    /*all'interno del costruttore, inserisco uno stato con una stringa , che vado a richiamare 
    nel tag p con l'uso di this.state*/
    this.state = {
      monsters: [],
      searchField: ''
    }

    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    /*con fetch() faccio una chiamata API all'indirizzo che contiene la lista dei mostri che restituisce la lista stessa*/
    fetch('https://jsonplaceholder.typicode.com/users')
    /*converto la response in formato json */
    .then(response => response.json())
    /*modifico lo stato utilizzando i dati presi con il fetch() e modificati in json */
    .then(users => this.setState({monsters: users }))
  }
  /*Utilizzando l'arrow function nel metodo , evitiamo di fare il bind()  del metodo stesso. in questo modo stiamo rendendo il bind automatico*/
  handleChange = e => {
    this.setState({searchField: e.target.value})
  }

  render() {
    /*in questo modo applichiamo un filtro di selezione sulle cards  */
    const { monsters, searchField } =  this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );
  
    return (
      <div className="App">
      <h1>Monster Rolodex</h1>
        <SearchBox   
         placeholder='search monsters'         
         handleChange = { this.handleChange}/>
      <CardList monsters={filteredMonsters} />
    </div>
    )
  } 
}

export default App;
