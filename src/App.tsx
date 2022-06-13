import React from 'react';
import './App.css';

import { loadPlaylistDataList, PlaylistData } from './api/playlist';

import PageController from "./components/page-controller";

type Props = {};

type State = {
    playlistDataList: PlaylistData[];
};

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            playlistDataList: [],
        };
    }

    componentDidMount() {
        this.loadPlaylistDataList();
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

    render() {
        return (
            <div className="App">
                <PageController
                    playlistDataList={this.state.playlistDataList}
                />
            </div>
        );
    }

}
export default App;
