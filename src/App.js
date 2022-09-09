import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [images,setImages] = useState([]);
  
  async function getImages(){
    let response = await axios.get('https://images-api.nasa.gov/search?q=moon');
    let items = response.data.collection.items
    let temp = []
    
    for(let item of items){
      if(item && item.links){
        let links = item.links;
        links.forEach(linkObj => {
          if(linkObj.href.endsWith('.jpg')){
            temp.push(linkObj.href);
          }
        })
      }
    }
    setImages(temp);
  }

  useEffect(() => {
    getImages()
  },[])

  return (
    <div className="images">
        {images.map(item => {
          return <img key={item.slice(0,20)} src={item} className='image' alt='moon'/>
        })}
    </div>
  );
}

export default App;
