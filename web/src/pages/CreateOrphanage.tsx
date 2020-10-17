import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import happyMapIcon from '../utils/mapIcon';
import { LeafletMouseEvent } from "leaflet";

import api from '../services/api';
import { useHistory } from "react-router-dom";
import centroAracaju from '../utils/centroAracaju';

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  function handleMapClick(event: LeafletMouseEvent)
  {
    const {lat, lng} = event.latlng;
    setPosition({
      latitude: lat, 
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent)
  {
    event.preventDefault();
    const {latitude, longitude} = position;
    const formData = new FormData();

    const currentData = {latitude, longitude, name, about, instructions, opening_hours, open_on_weekends};
    
    Object.entries(currentData).forEach(data => formData.append(data[0], data[1].toString()));
    
    images.forEach(image => formData.append('images', image));

    await api.post('orphanages', formData);
    history.push('/map');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>)
  {
    console.log(event.target.files);
    if(!event.target.files)
      return;

    const imagesArray = Array.from(event.target.files);
    setImages(imagesArray);

    const preview = imagesArray.map(img => {
      return URL.createObjectURL(img);
    });

    setPreviewImages(preview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={centroAracaju} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && <Marker 
                interactive={false} 
                icon={happyMapIcon} 
                position={[position.latitude,position.longitude]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(img => <img className="foto" key={img} src={img} alt={name}/>)}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Visita</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? "active" : ""} 
                  onClick={() => {setOpenOnWeekends(true)}}>
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends ? "active" : ""} 
                  onClick={() => {setOpenOnWeekends(false)}}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
