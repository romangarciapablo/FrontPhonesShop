import { React, useState, useEffect } from 'react';
import ItemPreview from '../components/ItemPreview'


const Home = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch("http://localhost:3050/api/product")
            .then(urlInfo => {
                return urlInfo.json();
            })
            .then(jsonInfo => {
                console.log(jsonInfo);
                setItems(jsonInfo);
            })
    });
    
    return (
        <div className="Home">
            <div className="row">
            {items.map((item, index) => {
                return (<div className="col-12 col-md-3" key={index}>
                    <ItemPreview 
                    brand={item.brand}
                    brand={item.brand}
                    color={item.color}
                    id={item.id}
                    image_url={item.image_url}
                    model={item.model}
                    storage={item.storage}
/>
                </div>)
            })}
            </div>
        </div>
        
    );
}

export default Home;