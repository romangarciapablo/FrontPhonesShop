import { React, useState, useEffect } from 'react';
import ItemPreview from '../../components/ItemPreview'
import {useFetch} from "../../hooks/useFetch"
import FiltersModal from "../../components/FiltersModal"
const ONE_HOUR = 60 * 60 * 1000

const HomePage = (props) => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({text:""});
    const [flagFilterModal, setFlagFilterModal] = useState(false);
    const [diferentBrands, setDiferentBrands] = useState([]);
    const [diferentColors, setDiferentColors] = useState([]);
    const [diferentStorages, setDiferentStorages] = useState([]);
    const getCacheData = () => { 
        try {
            const savedData=localStorage.getItem("itemsListCache")
            const now = new Date();
            if(savedData){
                const savedDataAsJson = JSON.parse(savedData)
                if (savedDataAsJson.data && (now-savedDataAsJson.date<ONE_HOUR)){
                    //return null;
                    return savedDataAsJson.data;
                } //else return null
            } //else return null
        }
        catch(e){
            console.error(e.message)
        }
    
        return null;
    }

    const setCacheData = (dataToSave) => {
        const now = new Date();
        const dataWithDate = {
            data: dataToSave,
            date: now.getTime()
        }
        try{
            localStorage.setItem("itemsListCache",JSON.stringify(dataWithDate))
        }
        catch(e){
            localStorage.clear();
        }

    }

    useEffect(() => {
        var data = getCacheData();
        if (data) {
            setItems(data);
        } else {
            fetch("http://localhost:3050/api/product")
            .then(urlInfo => {
                return urlInfo.json();
            })
            .then(jsonInfo => {
                let itemsMaped = props.convertFetchResponseToObject(jsonInfo);
                setCacheData(itemsMaped);
                setItems(itemsMaped);
            })
        }
        
    }, []);

    useEffect(() => {
        let diferentBrands = [];
        let diferentColors = [];
        let diferentStorages = [];
        items.forEach(i => {
            if (!diferentBrands.some(brand => brand===i.brand)){
                diferentBrands.push(i.brand);
            }
            i.colors.forEach(c => {
                if(!diferentColors.some(color => color.id===c.id)){
                    diferentColors.push({id:c.id, name:c.name})
                }
            })
            i.storage.forEach(s => {
                if(!diferentStorages.some(storage => storage.id===s.id)){
                    diferentStorages.push(s)
                }
            })
        })
        setDiferentBrands(diferentBrands);
        setDiferentColors(diferentColors);
        setDiferentStorages(diferentStorages);
    }, [items])

    function onChangeFilter(e) {
        setFilter({...filter, [e.target.name]:e.target.value});
    }
    
    function applyFilters(item) {
        const filterText = filter.text.toLowerCase();
        return item.brand.toLowerCase().includes(filterText) 
        || item.model.toLowerCase().includes(filterText);
    } 

    return (
        <div className="HomePage">
        <FiltersModal
            diferentBrands={diferentBrands}
            diferentColors={diferentColors}
            diferentStorages={diferentStorages}
            filter={filter}
            setFilter={setFilter}/>
        <div className="row pageContainer" >
            <div className="row textSearch">
            <div className="col-12 col-md-6 imageContainer"/>
            <div className="col-12 col-md-6 imageContainer">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#filtersModal">
                More filters
            </button>

                <input type="text" placeholder="Search..." name="text" onChange={onChangeFilter}/>
            </div>
            </div>
        <div className="row pageContainer" />
            <div className="row">
            {items.filter(item => applyFilters(item)).map((item, index) => {
                return (<div className="col-12 col-md-3" key={index}>
                    <ItemPreview 
                    key={index}
                    setIdPhoneSelected={props.setIdPhoneSelected}
                    item={item}
                    />
                </div>)
            })}
            </div>
        </div>
        </div>
        
    );
}

export default HomePage;