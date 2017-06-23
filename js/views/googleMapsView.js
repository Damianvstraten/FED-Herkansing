import {View} from 'backbone';
import TopArtistsByCountry from '../collections/TopArtistsByCountry'

/**
 *  View for the google maps
 *
 * @constructor
 */
const GoogleMapsView = View.extend({
    initialize: function() {
        let mapCenter = new google.maps.LatLng(47.376887 , 8.541694);
        let mapOptions = {
            zoom: 5,
            center: mapCenter,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            navigationControl: false,
            streetViewControl: false,
        };

        let map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

        map.setMapTypeId('terrain');

        let contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent">'+
                '<div id="top-artist"></div>'+
            '</div>'+
            '</div>';

        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //this.clickhandler();
        this.createMarkers(map, infowindow, contentString);
    },
    /**
     *  Create markers in the google map
     *
     * @param map - the google map
     * @param infowindow - the infowindow
     * @param contentstring - content for the infowindow
     */
    createMarkers: function (map, infowindow, contentstring) {
        let markers = [
            {
                country: 'netherlands',
                longitude: '52.370216 ',
                latitude: '4.895168'
            }, {
                country: 'spain',
                longitude: '40.416775',
                latitude: '-3.70379'
            }, {
                country: 'italy',
                longitude: '41.902784',
                latitude: '12.496366'
            }, {
                country: 'france',
                longitude: '48.856582 ',
                latitude: '2.352215'
            }, {
                country: 'germany',
                longitude: '52.520007',
                latitude: '13.404954'
            }, {
                country: 'belgium',
                longitude: '50.85034',
                latitude: '4.35171'
            }, {
                country: 'portugal',
                longitude: '38.722326',
                latitude: '-9.139271'
            }, {
                country: 'united+kingdom',
                longitude: '51.507351',
                latitude: '-0.127758'
            }, {
                country: 'ireland',
                longitude: '53.349805',
                latitude: '-6.26031'
            }, {
                country: 'switzerland',
                longitude: '47.376887',
                latitude: '8.541694'
            }];

        // Loop trough all the data of the markers to create the markers
        for (let i = 0; i < markers.length; i++) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i].longitude, markers[i].latitude),
                map: map,
                title: markers[i].country
            });

            let currentMarker = null;
            // Add event listener on the markers
            marker.addListener('click', () => {
                infowindow.setContent(contentstring);
                map.setCenter(marker.getPosition());
                infowindow.open(map, marker);

                new TopArtistsByCountry(marker.title).fetch();

            });
        }
    }
});

export default GoogleMapsView;