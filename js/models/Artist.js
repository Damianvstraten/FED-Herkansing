import {Model} from 'backbone';
import GlobalVars from '../models/GlobalVars';
import $ from 'jquery';
import ArtistInfoView from '../views/artistInfoView'

/**
 * Model for the Artist
 *
 * @constructor
 */
const Artist = Model.extend({
    defaults: {
        name: '',
        bio: '',
        listeners: '',
        playcount: '',
        image: '',
        genres: '',
    },
    initialize: function (artist) {
        let global = new GlobalVars();
        this.url = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ artist +'&api_key='+ global.lastFmKey +'&format=json';
    },
    parse: function(data) {
        this.createArtist(data.artist);
    },
    /**
     *  Create an Artist model
     *
     * @param data
     */
    createArtist: function (data) {
        let genres = [];
        data['tags']['tag'].forEach(function (tag) {
            genres.push(" " + tag['name']);
        });

        let artist = new Artist({
            name: data['name'],
            bio: data['bio']['summary'],
            listeners: data['stats']['listeners'],
            playcount: data['stats']['playcount'],
            image: data['image'][2]['#text'],
            genres: genres
        });
        this.addToView(artist);
    },
    /**
     * Add to view
     *
     * @param artist
     */
    addToView: function (artist) {
        let artistInfo = new ArtistInfoView({model: artist});
        $('.artist-info').append(artistInfo.el);
    }
});

export default Artist;