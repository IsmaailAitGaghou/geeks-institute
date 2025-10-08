import './App.css';
import { Carousel } from 'react-responsive-carousel';

function App() {
  return (
     <div className="App">
        <Carousel>
           <div>
              <img
                 src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg"
                 alt="Slide 1"
              />
              <p className="legend">Slide 1</p>
           </div>
           <div>
              <img
                 src="https://via.placeholder.com/800x300?text=Slide+2https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp"
                 alt="Slide 2"
              />
              <p className="legend">Slide 2</p>
           </div>
           <div>
              <img
                 src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp"
                 alt="Slide 3"
              />
              <p className="legend">Slide 3</p>
           </div>
           <div>
              <img
                 src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp"
                 alt="Slide 4"
              />
              <p className="legend">Slide 4</p>
           </div>
        </Carousel>
     </div>
  );
}

export default App;
