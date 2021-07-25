import { React, useState } from 'react';

const ItemPreview = (props) => {
    const [indexColorShow, setIndexColorShow] = useState(0);
    
    // setTimeout(() => {
    //     var runFn = function(){
    //         setIndexColorShow((indexColorShow+1)%props.item.colors.length);
    //     }
    //     runFn();
        
    // },Math.random() * (7000 - 3000) + 3000);

    return <div className="card mb-3" style={{maxWidth: '540px'}} onMouseEnter={()=>{setIndexColorShow((indexColorShow+1)%props.item.colors.length)}} onClick={() => props.setIdPhoneSelected(props.item.id)}>
        <div className="row g-0">
            <div className="col-md-4">
                <img src={props.item.colors[indexColorShow].image_url} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.item.model}</h5>
                    <p className="card-text">
                        <small className="text-muted">{props.item.brand}</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default ItemPreview;