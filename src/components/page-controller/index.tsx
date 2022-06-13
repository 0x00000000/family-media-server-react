import React from 'react';

import CatalogPage from "../catalog-page";
import VideoPage from "../video-page";
import PhotoPage from "../photo-page";

import { PlaylistData } from '../../api/playlist';
import { PhotoalbumData } from '../../api/photoalbum';

import {PAGES} from '../../constants';

type Props = {
    playlistDataList: PlaylistData[];
    photoalbumDataList: PhotoalbumData[];
};

type State = {
    page: string;
    playlistIndex: number;
    photoalbumIndex: number;
};

class PageController extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            page: PAGES.CATALOG,
            playlistIndex: 0,
            photoalbumIndex: 0,
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
        }))
    }

    onSetPhotoalbum(photoalbum: string) {
        let photoalbumIndex: number = this.props.photoalbumDataList.findIndex(
            (photoalbumData: PhotoalbumData, index: number) => (photoalbumData.photoalbum === photoalbum)
        );
        this.setState(state => ({
            ...state,
            page: PAGES.PHOTO,
            photoalbumIndex: photoalbumIndex,
        }))
    }

    render() {
        return <>
            {this.state.page === PAGES.CATALOG && (
                <CatalogPage
                    playlistDataList={this.props.playlistDataList}
                    photoalbumDataList={this.props.photoalbumDataList}
                    onSetPlaylist={(playlist: string) => this.onSetPlaylist(playlist)}
                    onSetPhotoalbum={(playlist: string) => this.onSetPhotoalbum(playlist)}
                />
            )}
            {this.state.page === PAGES.VIDEO && (
                <VideoPage
                    playlistData={this.props.playlistDataList[this.state.playlistIndex]}
                    onSetPageCatalog={() => this.onSetPageCatalog()}
                />
            )}
            {this.state.page === PAGES.PHOTO && (
                <PhotoPage
                    photoalbumData={this.props.photoalbumDataList[this.state.photoalbumIndex]}
                    onSetPageCatalog={() => this.onSetPageCatalog()}
                />
            )}
        </>;
    }
}

/*
*/
export default PageController;
