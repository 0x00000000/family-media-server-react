import React from 'react';
import './App.css';

import { loadVideosList, VideosList } from './api/videosList';

import PageController from "./components/page-controller";

type Props = {};

type State = {
    videosList: VideosList;
};

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            videosList: [],
        };
    }

    componentDidMount() {
        this.loadVideosList();
    }

    loadVideosList = async() => {
        try {
            const videosList: VideosList = await loadVideosList();
            this.setState(state => ({
                ...state,
                videosList: videosList,
            }));
            console.log('videosListData', videosList);
        } catch (err) {
            console.log('Error', err);
        } finally {
        }
    }

    render() {
        return (
            <div className="App">
                <PageController
                    videosList={this.state.videosList}
                />
            </div>
        );
    }

}
export default App;
