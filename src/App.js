import { useState } from 'react';
import './App.css';
import list from "./data/words.json";
let failedWords = [];
  let count = 0;
function App() {
  const [word, setWord] = useState(list[0]);
  const [field, setField] = useState('Click to say and show answer');

  // const transformText = () => {
  //   setWord("some text")
  //   //list = "дивиденд, дизайн, дилемма, дилижанс, дирижер, диссонанс, дифирамб, дубликат, иждивенец, инициатива, инцидент, квитанция, криминальный, критерий, кульминация"
  //   //answer = "\"дивиденд\", \"дизайн\", ..."
  //   let answer = '';
  //   let counter = 0;
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i] == ',') {
  //       answer = answer + '"' + list.slice(counter, i) + '", ';
  //       counter = i + 2;
  //     }
  //   }
  //   setWord(answer);
  // }

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
        <div className='word' onClick={sayWord}>{field}</div>
        <div>
          <button className='ansbut' onClick={() => changeWord(1)}>Fail</button>
          <button className='ansbut' onClick={() => changeWord(0)}>Correct</button>
        </div>
      </header>
    </div>
  );

  
}

export default App;
