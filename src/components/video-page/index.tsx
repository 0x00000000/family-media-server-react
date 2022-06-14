import React from 'react';
import { PlaylistData } from "../../api/playlist";
import VideoPlayer from './components/video-player';

import { BASE_URL, URL_POSTFIXES } from '../../constants';
import { MEDIA_TYPES } from '../../constants';
import MediaStatisticModel from '../../models/media-statistic-model'

import playlistFinished from '../../api/playlistFinished';

type Props = {
    playlistData: PlaylistData;
    onSetPageCatalog: () => void;
};

type State = {
    videoIndex: number,
    started: boolean,
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
            started: false,
        };
    }

    getVideoUrl(videoIndex: number) {
        if (videoIndex < this.props.playlistData.videos.length) {
            let filename: string = this.props.playlistData.videos[videoIndex];
            let directory: string = this.props.playlistData.playlist;
            return BASE_URL + URL_POSTFIXES.VIDEO + directory + '/' + filename;
        } else {
            return '';
        }
    }

    getUnwatchedFileIndex(playlistData: PlaylistData): number {
        let watchedFilename: string = this._statistic.getWatchedFile(playlistData.playlist);
        let index: number = playlistData.videos.findIndex(
            (filename: string) => (watchedFilename === filename)
        );
        index = this.getNextIndex(index, playlistData);

        return index;
    }

    getNextIndex(index: number, playlistData: PlaylistData): number {
        if (playlistData.options && playlistData.options.random) {
            let newIndex = Math.floor(Math.random() * (playlistData.videos.length));
            if (newIndex === index) {
                newIndex++;
                if (newIndex === playlistData.videos.length) {
                    newIndex = 0;
                }
            }
            return newIndex;
        } else {
            return index + 1;
        }

    }

    setWatchedFile(directory: string, filename: string): void {
        this._statistic.addWatchedFile(directory, filename);
    }

    clearWatchedFile(directory: string): void {
        this._statistic.addWatchedFile(directory, '');
    }

    startWatchingFile(index: number, playlistData: PlaylistData) {
        if (index < playlistData.videos.length) {
            this.setState(state => ({
                ...state,
                videoIndex: index,
            }));
            this.setWatchedFile(playlistData.playlist, playlistData.videos[index]);
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

            if (index === playlistData.videos.length - 1) {
                playlistFinished(playlistData.playlist);
            }

        }
    }

    restartWatching(directory: string) {
        let index: number = 0;
        this.setState(state => ({
            ...state,
            videoIndex: index,
            started: false,
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
        } else if (this.state.videoIndex < this.props.playlistData.videos.length) {
            let prevIndex: number = this.state.videoIndex - 1;
            this.setWatchedFile(directory, this.props.playlistData.videos[prevIndex]);
        }
    }

    onPlayThis(): void {
        if (! this.state.started) {
            this.setState(state => ({
                ...state,
                started: true,
            }));
            this.startWatchingFile(this.state.videoIndex, this.props.playlistData);
        }
    }

    onPlayNext(): void {
        if (this.state.started) {
            let nextIndex: number = this.getNextIndex(this.state.videoIndex, this.props.playlistData);

            if (nextIndex < this.props.playlistData.videos.length) {
                this.startWatchingFile(nextIndex, this.props.playlistData);
            }
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
            {this.state.videoIndex < this.props.playlistData.videos.length && (
                <h1>{this.props.playlistData.videos[this.state.videoIndex]} ({this.state.videoIndex + 1} of {this.props.playlistData.videos.length})</h1>
            )}

            {this.state.videoIndex >= this.props.playlistData.videos.length && (
                <h1>You've watched all videos.</h1>
            )}

            <div
                className='grayButton'
                onClick={() => this.props.onSetPageCatalog()}
            >
                &lt;&lt;&lt; Back to list
            </div>

            {this.state.videoIndex < this.props.playlistData.videos.length && (
                <div
                    className='grayButton'
                    onClick={() => this.onSetAsUnwatched()}
                >
                    I didn't watch it
                </div>
            )}

            {! this.state.started && (
                <div
                    className='grayButton'
                    onClick={() => this.onPlayThis()}
                >
                    Play - &gt;
                </div>
            )}
            {this.state.started && (
                <div
                    className='grayButton'
                    onClick={() => this.onPlayNext()}
                >
                    Next - &gt;
                </div>
            )}
            {this.state.videoIndex < this.props.playlistData.videos.length && (
                <VideoPlayer
                    options={this._videoJsOptions}
                    onReady={(player: any) => this.handlePlayerReady(player)}
                />
            )}
        </>;
    }
}

export default VideoPage;
