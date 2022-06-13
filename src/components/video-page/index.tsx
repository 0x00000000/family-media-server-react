import React from 'react';
import { PlaylistData } from "../../api/playlist";
import VideoPlayer from './components/video-player';

import { BASE_URL, URL_POSTFIXES } from '../../constants';
import { MEDIA_TYPES } from '../../constants';
import MediaStatisticModel from '../../models/media-statistic-model'

type Props = {
    playlistData: PlaylistData;
    onSetPageCatalog: () => void;
};

type State = {
    videoIndex: number,
};

class VideoPage extends React.Component<Props, State> {

    _player = null;
    _statistic = new MediaStatisticModel(MEDIA_TYPES.VIDEO);


    _videoJsOptions = {
        autoplay: false,
        controls: false,
        responsive: true,
        fluid: true,
        // playbackRates: [0.5, 1, 1.25, 1.5, 2],
        // width: 720,
        // height: 300,
        sources: [
            {
                src: '',
                type: 'video/mp4',
            },
        ],
    };

    constructor(props: Props) {
        super(props);
        let videoIndex = this.getUnwatchedFileIndex(this.props.playlistData);
        this._videoJsOptions.sources[0].src = this.getVideoUrl(videoIndex);
        this.state = {
            videoIndex: videoIndex,
        };
    }

    getVideoUrl(videoIndex: number) {
        let filename: string = this.props.playlistData.videos[videoIndex];
        let directory: string = this.props.playlistData.playlist;
        return BASE_URL + URL_POSTFIXES.VIDEO + directory + '/' + filename;
    }

    getUnwatchedFileIndex(playlistData: PlaylistData): number {
        let watchedFilename: string = this._statistic.getWatchedFile(playlistData.playlist);
        let index: number = playlistData.videos.findIndex(
            (filename: string) => (watchedFilename === filename)
        );
        index++;
        if (index >= playlistData.videos.length) {
            index = 0;
        }
        return index;
    }

    setWatchedFile(directory: string, filename: string): void {
        this._statistic.addWatchedFile(directory, filename);
    }

    clearWatchedFile(directory: string): void {
        this._statistic.addWatchedFile(directory, '');
    }

    startWatchingFile(directory: string, index: number) {
        if (index < 0 || index >= this.props.playlistData.videos.length) {
            index = 0;
        }
        this.setState(state => ({
            ...this.state,
            videoIndex: index,
        }));
        this.setWatchedFile(directory, this.props.playlistData.videos[index]);
        if (this._player) {
            // @ts-ignore: Object is possibly 'null'.
            this._player.src([{src: this.getVideoUrl(index), type: 'video/mp4',},]);
            // @ts-ignore: Object is possibly 'null'.
            this._player.autoplay(true);
            // @ts-ignore: Object is possibly 'null'.
            this._player.controls(true);
            // @ts-ignore: Object is possibly 'null'.
            this._player.play();
        }
    }

    restartWatching(directory: string) {
        let index: number = 0;
        this.setState(state => ({
            ...this.state,
            videoIndex: index,
        }));
        if (this._player) {
            // @ts-ignore: Object is possibly 'null'.
            this._player.src([{src: this.getVideoUrl(index), type: 'video/mp4',},]);
            // @ts-ignore: Object is possibly 'null'.
            this._player.autoplay(false);
            // @ts-ignore: Object is possibly 'null'.
            this._player.controls(false);
        }
        this.clearWatchedFile(directory);
    }

    onSetAsUnwatched(): void {
        let directory: string = this.props.playlistData.playlist;
        if (this.state.videoIndex === 0) {
            this.clearWatchedFile(directory);
        } else {
            let prevIndex: number = this.state.videoIndex - 1;
            this.setWatchedFile(directory, this.props.playlistData.videos[prevIndex]);
        }
    }

    onPlayThis(): void {
        this.startWatchingFile(this.props.playlistData.playlist, this.state.videoIndex);
    }

    onPlayNext(): void {
        let nextIndex: number = this.state.videoIndex + 1;

        if (nextIndex < this.props.playlistData.videos.length) {
            this.startWatchingFile(this.props.playlistData.playlist, nextIndex);
        } else {
            this.restartWatching(this.props.playlistData.playlist);
        }
    }

    onPlayPrev(): void {
        let prevIndex: number = this.state.videoIndex - 1;

        if (prevIndex >= 0) {
            this.startWatchingFile(this.props.playlistData.playlist, prevIndex);
        } else {
            this.restartWatching(this.props.playlistData.playlist);
        }
    }

    handlePlayerReady(player: any) {
        this._player = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    render() {
        return <>
            <h1>{this.props.playlistData.videos[this.state.videoIndex]} ({this.state.videoIndex + 1} of {this.props.playlistData.videos.length})</h1>
            <div>
                <div
                    className='grayButton'
                    onClick={() => this.props.onSetPageCatalog()}
                >
                    Back to list
                </div>
                <div
                    className='grayButton'
                    onClick={() => this.onSetAsUnwatched()}
                >
                    I didn't watch it
                </div>
            </div>
            <div>
                <div
                    className='grayButton'
                    onClick={() => this.onPlayPrev()}
                >
                    &lt; - Prev
                </div>
                <div
                    className='grayButton'
                    onClick={() => this.onPlayThis()}
                >
                    Play
                </div>
                <div
                    className='grayButton'
                    onClick={() => this.onPlayNext()}
                >
                    Next - &gt;
                </div>
            </div>
            <VideoPlayer
                options={this._videoJsOptions}
                onReady={(player: any) => this.handlePlayerReady(player)}

            />
        </>;
    }
}

export default VideoPage;
