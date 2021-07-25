import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import HomePage from './pages/homePage/HomePage'
import ItemDetailPage from './pages/itemDetailPage/ItemDetailPage';
import { useFetch } from "./hooks/useFetch"

function App() {

  const [idPhoneSelected, setIdPhoneSelected] = useState();
  const [user, setUser] = useState({first_name:"User1", last_name:"LNUser1", id:1});
  const [cartItems, setCartItems] = useState(3);

  useEffect(() => {
    reloadCartItems();
  }, []);
  const reloadCartItems = () => {
    fetch("http://localhost:3050/api/cart/" + user.id)
    .then(urlInfo => {
      return urlInfo.json();
    })
    .then(jsonInfo => {
      
      setCartItems(jsonInfo[0].numberCartItems||0);
    })

  }

  const convertFetchResponseToObject = (fetchResponse) => {
    let itemsMaped = [];
    fetchResponse.forEach(phone => {
      let phoneMaped = itemsMaped.find(e => e.id === phone.id);
      if (phoneMaped) {
        if (!phoneMaped.colors.some(c => c.id === phone.color_id)) {
          phoneMaped.colors.push({
            id: phone.color_id,
            name: phone.color_name,
            image_url: phone.image_url
          });
        }
        if (!phoneMaped.storage.some(s => s.id === phone.storage_id)) {
          phoneMaped.storage.push({
            id: phone.storage_id,
            storage: phone.storage,
            price: phone.price,
            ram: phone.ram
          })
        }
      } else {
        itemsMaped.push({
          id: phone.id,
          brand: phone.brand,
          model: phone.model,
          colors: [{
            id: phone.color_id,
            image_url: phone.image_url
          }],
          storage: [{
            id: phone.storage_id,
            storage: phone.storage,
            price: phone.price,
            ram: phone.ram
          }]
        })
      }
    })
    return itemsMaped;
  }

  const pageToRender = [];
  if (idPhoneSelected != null) {
    pageToRender.push(<ItemDetailPage
      idPhoneSelected={idPhoneSelected}
      backToHomePage={() => setIdPhoneSelected(null)}
      convertFetchResponseToObject={convertFetchResponseToObject}
      user={user}
      reloadCartItems={reloadCartItems} />);
  } else {
    pageToRender.push(<HomePage 
      setIdPhoneSelected={setIdPhoneSelected}
      convertFetchResponseToObject={convertFetchResponseToObject} />);
  }

  return (
    <div className="App">
      <div className="row">
        <Header user={user} setUser={setUser} cartItems={cartItems}></Header>
      </div>
      <div className="row">
        {pageToRender}
      </div>
    </div>
  );
}

export default App;
