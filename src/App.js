import { useState } from 'react';
import './App.css';
import file from "./data/words";

const lists = file;
let failedWords = [];
let count = 0;
let list = lists[1];
const types = [
  {"text": 'Из правил', "isWork": 1},
  {"text": 'Ударения', "isWork": 1},
  {"text": 'Двойные', "isWork": 1},
  {"text": 'Н и нн', "isWork": 1},
  {"text": 'Наречия', "isWork": 1},
  {"text": 'Предлоги', "isWork": 1}
];

function App() {
  const [word, setWord] = useState(list[17]);
  const [field, setField] = useState('Озвучить и показать ответ');
  const [description, setDescription] = useState('');


  const transformText = () => {
    //list = "дивиденд, дизайн, дилемма, дилижанс, дирижер, диссонанс, дифирамб, дубликат, иждивенец, инициатива, инцидент, квитанция, криминальный, критерий, кульминация"
    //answer = "\"дивиденд\", \"дизайн\", ..."
    const str = lists[0][0]
    let answer = '';
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] == ',') {
        answer = answer + '"' + str.slice(counter, i) + '", ';
        counter = i + 2;
      }
    }
    setDescription(answer);
  }

  const changeGroup = (elem) => {
    console.log(elem);
    console.log(types);
    if(types[elem.attributes.index.value].isWork)  {
      types[elem.attributes.index.value].isWork = 0;
      elem.style.background = '#fff';
    }
    else {
      types[elem.attributes.index.value].isWork = 1;
      elem.style.background = '#555';
    }
    list = [];
    for (let i = 0; i < types.length; i++) {
      if (types[i].isWork) {
        list = list.concat(lists[i]);
      }
    }
  }
  

  const changeWord = (ans) => {
    setField('Click to say and show answer');

    if (ans && !failedWords.find(elem=>elem == word)) {
        failedWords.push(word);
    }
    else if (!ans && failedWords.find(elem=>elem == word)) {
      failedWords.shift();
    }
    const k = 4;
    if (count % k == Math.floor(k * Math.random()) && failedWords.length != 0){
      setWord(failedWords[0]);
    }
    else {
      setWord(list[Math.floor(list.length * Math.random())]);
      
    }
    count++; 
  }

  const sayWord = () => {
    window.speechSynthesis.cancel();
    setField(word);
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='description' onClick={transformText}>{description}</div>

        <br /><br />

        <div className='word' onClick={sayWord}>{field}</div>
        <div className='answerpanel'>
          <button className='ansbut' onClick={() => changeWord(1)}>Ошибка</button>
          <button className='ansbut' onClick={() => changeWord(0)}>Правильно</button>
        </div>

        <br /><br />

        <div className='menu'>
          {types.map((elem, i) => {
            return <button className='menubut' key={i} index={i} onClick={(e)=>{ changeGroup(e.target); }}>{elem.text}</button>
          })}
        </div>
      </header>
    </div>
  );

  
}

export default App;
