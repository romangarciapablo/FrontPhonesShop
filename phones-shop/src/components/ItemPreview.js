import { React } from 'react';

const ItemPreview = (props) => {
    return (<div className="card mb-3" style={{maxWidth: '540px'}}>
        <div className="row g-0">
            <div className="col-md-4">
                <img src={props.image_url} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.model}</h5>
                    <p className="card-text">color:{props.color}</p>
                    <p className="card-text">storage:{props.storage}</p>
                    <p className="card-text">
                        <small className="text-muted">{props.brand}</small>
                    </p>
                </div>
            </div>
        </div>
    </div>);
}

export default ItemPreview;