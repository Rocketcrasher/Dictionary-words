import { useState, useEffect, useCallback } from 'react';
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
    setField('Нажать для прослушивани и просмотра ответа');

    if (ans && !failedWords.find(elem=>elem == word)) {
        failedWords.push(word);
    }
    else if (!ans && failedWords.find(elem=>elem == word)) {
      failedWords.shift();
    }
    else if (ans && failedWords.find(elem=>elem==word)) {
      failedWords.shift();
      failedWords.push(word);
    }
    const k = 5;
    if (count % k == Math.floor(k * Math.random()) && failedWords.length != 0){
      setWord(failedWords[0]);
    }
    else {
      setWord(list[Math.floor(list.length * Math.random())]);
      
    }
    count++; 
  }

  const sayWord = useCallback(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }, [word])

  const downHandler =useCallback(({ key }) => {
    console.log(word)
    if (key >= 'a' && key <= 'z') {
      window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
    }
    else if (key == ' ') setField(word);
    else if (key >= '1' && key <= '3') changeWord(1);
    else if (key >= '4' && key <= '9') changeWord(0);
  }, [ word])
  console.log(word)

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [word]); // Empty array ensures that effect is only run on mount and unmount
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='description' onClick={transformText}>{description}</div>

        <br /><br />
        <div className='word' onClick={()=>{sayWord(); setField(word);}}>{field}</div>
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


function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  
  return keyPressed;
}