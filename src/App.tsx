import React from 'react';
import './App.css';

import { loadPlaylistDataList, PlaylistData } from './api/playlist';
import { loadPhotoalbumDataList, PhotoalbumData } from './api/photoalbum';

import PageController from "./components/page-controller";

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
        this.loadPlaylistDataList();
        this.loadPhotoalbumDataList();
    }

    loadPlaylistDataList = async() => {
        try {
            const playlistDataList: PlaylistData[] = await loadPlaylistDataList();
            this.setState(state => ({
                ...state,
                playlistDataList: playlistDataList,
            }));
        } catch (err) {
            console.log('Error', err);
        } finally {
        }
    }

    loadPhotoalbumDataList = async() => {
        try {
            const photoalbumDataList: PhotoalbumData[] = await loadPhotoalbumDataList();
            this.setState(state => ({
                ...state,
                photoalbumDataList: photoalbumDataList,
            }));
        } catch (err) {
            console.log('Error', err);
        } finally {
        }
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

}
export default App;
