import {Collection} from 'backbone';
import $ from 'jquery';
import SongViewCollection from '../views/songViewCollection';
import GlobalVars from '../models/GlobalVars';
import Song from '../models/Song';

/**
     * Collection for all the songs by an artist
 *
 * @constructor
 */
let Songs = Collection.extend({
    model: Song,
    initialize: function (artist) {
        let global = new GlobalVars();
        this.url = 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=3&artist=' + artist + '&api_key='+ global.lastFmKey +'&format=json';
    },
    parse: function (data) {
        this.data = data.toptracks.track;
        this.createSong(this.data);
    },
    /**
     * Create a new Song model for each track
     *
     * @param data - data from the api call
     */
    createSong: function (data) {
        data.forEach((track) => {
           let song = new Song({
               title: track['name'],
               listeners: track['listeners']
           });

           this.add(song)
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
        collection.forEach(function (track) {
            let songView = new SongViewCollection({model: track});
            $('.songs').append(songView.el);
        });
    }
});
export default Songs;
