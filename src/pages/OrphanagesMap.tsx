import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import mapMaker from '../images/marker.svg';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function OrphanagesMap()
{
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMaker} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Aracaju</strong>
                    <span>Sergipe</span>
                </footer>
            </aside>

            <Map 
                center={[-10.9137696,-37.0466949]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size="32" color="#fff"/>
            </Link>
        </div>
    );
}