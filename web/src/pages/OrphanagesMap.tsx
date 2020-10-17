import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import mapMaker from '../images/marker.svg';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import centroAracaju from '../utils/centroAracaju';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMap()
{
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

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
                center={centroAracaju}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {orphanages.map(orphanage => {
                    return (<Marker 
                    position={[orphanage.latitude,orphanage.longitude]}
                    icon={mapIcon}
                    key={orphanage.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <a href={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size="20" color="#fff"/>
                            </a>
                        </Popup>
                    </Marker>)
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#fff"/>
            </Link>
        </div>
    );
}