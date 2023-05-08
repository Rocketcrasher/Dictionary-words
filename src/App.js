import { useState } from 'react';
import './App.css';
import list from "./data/words.json";

function App() {
  const [word, setWord] = useState('text');

  let failedWords = [];
  let count = 0;

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
    if (ans) {
      if (!failedWords.find(elem=>elem == word))
        failedWords.push(word);
    }
    if (count % 5 != 5 * Math.random())
      setWord(list[Math.round(list.length * Math.random())]);
    else setWord(failedWords[Math.round(failedWords.length * Math.random())])

    count++;
  }

  const sayWord = () => {
    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='word' onClick={sayWord}>{word}</div>
        <div>
          <button className='ansbut' onClick={() => changeWord(1)}>Mistake</button>
          <button className='ansbut' onClick={() => changeWord(0)}>Right</button>
        </div>
      </header>
    </div>
  );

  
}

export default App;
