import React from 'react';

import PageController from "./components/page-controller";
import { PlaylistData } from "./types/playlist-data";
import { PhotoalbumData } from "./types/photoalbum-data";
import ApplicationSizeHelper from "./helpers/application-size-helper";
import loadPlaylistData from './api/load-playlist-data';
import loadPhotoalbumData from './api/load-photoalbum-data';

import './App.css';

type Props = {};

type State = {
    playlistDataList: PlaylistData[];
    photoalbumDataList: PhotoalbumData[];
};

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            playlistDataList: [],
            photoalbumDataList: [],
        };
    }

    componentDidMount() {
        this.loadPlaylistData();
        this.loadPhotoalbumData();
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    render() {
        return (
            <div className="App">
                <PageController
                    playlistDataList={this.state.playlistDataList}
                    photoalbumDataList={this.state.photoalbumDataList}
                />
            </div>
        );
    }

    private onResize() {
        const bodyMaxWidth = (new ApplicationSizeHelper(window.document)).getApplicationWidth();
        document.body.style.maxWidth = String(bodyMaxWidth) + 'px';
    }

    private loadPlaylistData = async() => {
        try {
            const playlistDataList: PlaylistData[] = await loadPlaylistData();
            this.setState(state => ({
                ...state,
                playlistDataList: playlistDataList,
            }));
        } catch (err) {
            console.log('Error loading playlist data', err);
        } finally {
        }
    }

    private loadPhotoalbumData = async() => {
        try {
            const photoalbumDataList: PhotoalbumData[] = await loadPhotoalbumData();
            this.setState(state => ({
                ...state,
                photoalbumDataList: photoalbumDataList,
            }));
        } catch (err) {
            console.log('Error loading photoalbum data', err);
        } finally {
        }
    }
}
export default App;
