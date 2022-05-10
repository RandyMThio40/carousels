import {Carousel1, Carousel2,Carousel3} from './carousel/carousel';
import React, {useState} from 'react';
import './App.css';

function App() {
  const [visible_c3,setVisible_c3] = useState(2);
  return (
    <main className="App">
      <div>
        <a target="_blank" href='https://github.com/RandyMThio40/carousels'>go to github repository</a>
      </div>
      <h1>Carousel 1</h1>
      <Carousel1>
        <div className="cards img-slide"><span>0</span></div>
        <div className="cards img-slide"><span>1</span></div>
        <div className="cards img-slide"><span>2</span></div>
        <div className="cards img-slide"><span>3</span></div>
        <div className="cards img-slide"><span>4</span></div>
        <div className="cards img-slide"><span>5</span></div>
        <div className="cards img-slide"><span>6</span></div>
        <div className="cards img-slide"><span>7</span></div>
      </Carousel1>

      <h1>Carousel 2</h1>
      <Carousel2 visible={3}>
        <div className="cards shadow"><span>0</span></div>
        <div className="cards shadow"><span>1</span></div>
        <div className="cards shadow"><span>2</span></div>
        <div className="cards shadow"><span>3</span></div>
        <div className="cards shadow"><span>4</span></div>
        <div className="cards shadow"><span>5</span></div>
        <div className="cards shadow"><span>6</span></div>
        <div className="cards shadow"><span>7</span></div>
      </Carousel2>
      <h1>Carousel 3</h1>
      <form>
        <label htmlFor='visible'>Change number visible in carousel </label>
        <input type="number" step={1} min={1} onChange={(e)=>setVisible_c3(e.target.value)} value={visible_c3}/>
      </form>
      <Carousel3 visible={visible_c3}>
        <div className="cards"><span>0</span></div>
        <div className="cards"><span>1</span></div>
        <div className="cards"><span>2</span></div>
        <div className="cards"><span>3</span></div>
        <div className="cards"><span>4</span></div>
        <div className="cards"><span>5</span></div>
        <div className="cards"><span>6</span></div>
        <div className="cards"><span>7</span></div>
      </Carousel3>
    </main>
  );
}

export default App;
