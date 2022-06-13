import React from 'react';

import CatalogPage from "../catalog-page";
import VideoPage from "../video-page";

import {PlaylistData} from '../../api/playlist';

import {PAGES} from '../../constants';

type Props = {
    playlistDataList: PlaylistData[];
};

type State = {
    page: string;
    playlistIndex: number;
    videoIndex: number;
};

class PageController extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            page: PAGES.CATALOG,
            playlistIndex: 0,
            videoIndex: 0,
        }
    }

    onSetPageCatalog() {
        this.setState(state => ({
            ...state,
            page: PAGES.CATALOG,
        }));
    }

    onSetPlaylist(playlist: string) {
        let playlistIndex: number = this.props.playlistDataList.findIndex(
            (playlistData: PlaylistData, index: number) => (playlistData.playlist === playlist)
        );
        this.setState(state => ({
            ...state,
            page: PAGES.VIDEO,
            playlistIndex: playlistIndex,
            videoIndex: 0,
        }))
    }

    render() {
        return <>
            {this.state.page === PAGES.CATALOG && (
                <CatalogPage
                    playlistDataList={this.props.playlistDataList}
                    onSetPlaylist={(playlist: string) => this.onSetPlaylist(playlist)}
                />
            )}
            {this.state.page === PAGES.VIDEO && (
                <VideoPage
                    playlistData={this.props.playlistDataList[this.state.playlistIndex]}
                    onSetPageCatalog={() => this.onSetPageCatalog()}
                />
            )}
        </>;
    }
}

/*
*/
export default PageController;
