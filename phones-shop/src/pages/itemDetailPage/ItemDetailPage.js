import { React, useEffect, useState } from 'react';
import './ItemDetailPage.css';

const ItemDetail = (props) => {

  const [phoneInfo, setPhoneInfo] = useState({});
  const [indexColorSelected, setcIndexColorSelected] = useState(0);
  const [indexStorageSelected, setIndexStorageSelected] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3050/api/product/" + props.idPhoneSelected)
      .then(urlInfo => {
        return urlInfo.json();
      })
      .then(jsonInfo => {
        const phoneInfo = props.convertFetchResponseToObject(jsonInfo)[0];
        console.log(phoneInfo);
        setPhoneInfo(phoneInfo);
      })

  }, []);

  const addToCart = () => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user": props.user.id,
        "id": props.idPhoneSelected,
        "colorCode": phoneInfo.colors[indexColorSelected].id,
        "storageCode": phoneInfo.storage[indexStorageSelected].id
      })
    };


    fetch('http://localhost:3050/api/cart/', requestOptions)
      .then(response => {
        if(response.status===200){
          props.reloadCartItems();
        }
      });
      
    

  }

  return (

    <div className="ItemDetailPage">
      <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={props.backToHomePage}>back to home page</button>
      <div className="row pageContainer" >
        <div className="col-12 col-md-6 imageContainer">
          <img src={(((phoneInfo.colors || [])[indexColorSelected] || {}).image_url)} />

        </div>
        <div className="col-12 col-md-6 colDescriptionAndActions">
          <div className="sectionContainer">
            <h2>
              {phoneInfo.model}
            </h2>
            <span className="sectionTitle">brand:</span> {phoneInfo.brand}
          </div>
          <div className="sectionContainer">
            <div className="row"><span className="sectionTitle">colors:</span> <div className="row">
              {phoneInfo && phoneInfo.colors && phoneInfo.colors.map((c, ind) => {
                const classnameText = indexColorSelected === ind ? "colorSelector colorSelected" : "colorSelector";
                return <div key={ind} className={classnameText} onClick={() => setcIndexColorSelected(ind)} style={{ backgroundColor: c.name || "white" }}></div>
              })
              }
            </div>
              <span className="sectionTitle">storage selected: {((phoneInfo.storage || [])[indexStorageSelected] || {}).storage || ""} </span>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Storages available
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {(phoneInfo.storage || []).map((s, ind) => {
                    return <a class="dropdown-item" onClick={() => { setIndexStorageSelected(ind) }} >{s.storage}</a>
                  })}
                </div>
              </div>
              <span className="sectionTitle"></span>
              <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={addToCart} disabled={!(props.user || {}).id}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;