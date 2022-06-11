import React from 'react';

import CatalogPage from "../catalog-page";
import VideoPage from "../video-page/video-page";

import {VideosList} from '../../api/videosList';

import {PAGES} from '../../constants';

type Props = {
    videosList: VideosList;
};

type State = {
    page: string;
    playlist: string;
};

class PageController extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            page: PAGES.CATALOG,
            playlist: '',
        }
    }

    onSetPageCatalog() {
        this.setState(state => ({
            ...state,
            page: PAGES.CATALOG,
            playlist: '',
        }));
    }

    onSetPageVideo() {
        this.setState(state => ({
            ...state,
            page: PAGES.VIDEO,
            playlist: '',
        }));
    }

    onSetPlaylist(playlist: string) {
        this.setState(state => ({
            ...state,
            page: PAGES.VIDEO,
            playlist: playlist,
        }))
    }

    render() {
        return <>
            {this.state.page === PAGES.CATALOG && (
                <CatalogPage
                    videosList={this.props.videosList}
                    onSetPageVideo={() => this.onSetPageVideo()}
                    onSetPlaylist={(playlist: string) => this.onSetPlaylist(playlist)}
                />
            )}
            {this.state.page === PAGES.VIDEO && (
                <VideoPage
                    videosList={this.props.videosList}
                    playlist={this.state.playlist}
                    onSetPageCatalog={() => this.onSetPageCatalog()}
                />
            )}
        </>;
    }
}

export default PageController;
