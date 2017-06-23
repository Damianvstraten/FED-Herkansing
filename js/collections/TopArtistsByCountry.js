import {Collection} from 'backbone';
import $ from 'jquery';
import GlobalVars from '../models/GlobalVars';
import TopArtistByCountry from '../models/TopArtistByCountry';
import TopArtistView from '../views/topArtistView';

/**
 * Collection of all top artists by country
 *
 * @constructor
 */
let TopArtistsByCountry = Collection.extend({
    initialize: function (country) {
        let global = new GlobalVars();
        this.url = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&limit=7&country='+ country +'&api_key='+ global.lastFmKey +'&format=json';
    },
    parse: function (data) {
        data = data.topartists.artist;
        this.createTopArtist(data)
    },
    /**
     * Create a new TopArtistByCountry model for each artist
     *
     * @param data - data from the api call
     */
    createTopArtist: function (data) {
        data.forEach((artist) => {
            let topArtist = new TopArtistByCountry({
                name: artist['name'],
                image: artist['image'][2]['#text']
            });

            this.add(topArtist)
        });

        this.addCollectionToView(this);
    },
    /**
     * Add collection to the view
     *
     * @param collection - the collection of data
     */
    addCollectionToView: function (collection) {
        collection = collection.toJSON();
        collection.forEach(function (artist) {
            let iets = new TopArtistView({model: artist});
            $('#top-artist').append(iets.el);
        });
    }
});
export default TopArtistsByCountry;
