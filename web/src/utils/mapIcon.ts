import Leaflet from 'leaflet';
import mapMaker from '../images/marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMaker,
    iconSize: [58, 68], 
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

export default mapIcon;