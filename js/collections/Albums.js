import {Collection} from 'backbone';
import $ from 'jquery';
import AlbumViewCollection from '../views/albumViewCollection';
import Album from '../models/Album'
import GlobalVars from '../models/GlobalVars';

/**
 * Collection for all the albums by an artist
 *
 * @constructor
 */
const Albums = Collection.extend({
    model: Album,
    initialize: function (artist) {
        let global = new GlobalVars();
        this.url = 'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=3&artist='+ artist +'&api_key='+ global.lastFmKey +'&format=json';
    },
    parse: function (data) {
        this.data = data.topalbums.album;
        this.createAlbum(this.data);
    },
    /**
     * Create a new Album model for each album
     *
     * @param data - data from the api call
     */
    createAlbum: function (data) {
        let that = this;
        data.forEach(function (data) {
            let album = new Album({
                name: data['name'],
                playcount: data['playcount'],
                image: data['image'][2]['#text'],
            });

            that.add(album)
        });

        this.addCollectionToView(that);
    },
    /**
     * Add collection of albums to the view
     *
     * @param collection - collection of albums
     */
    addCollectionToView: function (collection) {
        collection = collection.toJSON();
        collection.forEach(function (album) {
            let albumView = new AlbumViewCollection({model: album});
            $('.albums').append(albumView.el);
        });
     }
});

export default Albums;
