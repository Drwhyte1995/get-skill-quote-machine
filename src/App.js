import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';



let quoteDBurl="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote, setQuote]= useState("A person who never made a mistake never tried anything new.")
  const [author, setAuthor]=useState("Albert Einstein")
 
  const [quotesArray, setQuotesArray]=useState(null)
  const [accentColor, setAccentcolor]=useState('282c34')
  
  


  const fetchQuotes =async(url)=>{
    const response = await fetch (url)
    const parsedJSON= await response.json()
    setQuotesArray(parsedJSON.quotes)
  }
  useEffect(()=>{
       fetchQuotes(quoteDBurl)
    },[])

   const getRandomQuote =()=>{
    let randomInteger= Math.floor(quotesArray.length*Math.random())
    
    setAccentcolor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
   }

  
  return (
    <div className="App">
      
      <header className="App-header" style={{backgroundColor:accentColor, color:accentColor}}>
      <div id="quote-box"style={{color:accentColor}}>
      
        <p id="text">
        "{quote}"
        </p>
        <p id="author">- {author}</p>
        <div className="button">
        <a id="tweet-quote"style={{backgroundColor:accentColor}} href={encodeURI('http://www.twitter.com/intent/tweet?text=')}><FontAwesomeIcon icon={faTwitter}/>
        </a>
        </div>
        <button id="new-quote"style={{backgroundColor:accentColor}} onClick={()=>getRandomQuote()}>Change Quote</button>
        </div>
      </header>
      
    </div>
  );
}

export default App;
