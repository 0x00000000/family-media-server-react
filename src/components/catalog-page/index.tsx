import React from 'react';

import { PlaylistData } from '../../api/playlist';
import { PhotoalbumData } from '../../api/photoalbum';

type Props = {
    playlistDataList: PlaylistData[];
    photoalbumDataList: PhotoalbumData[];
    onSetPlaylist: (playlist: string) => void;
    onSetPhotoalbum: (photoalbum: string) => void;
};

type State = {};

class CatalogPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <>
            <h1>Select playlist</h1>
            <div className="catalog-list">
                {this.props.playlistDataList.map(
                    (value, key) => (
                        <div
                            key={key}
                            className='grayLink'
                            onClick={(event: any) => this.props.onSetPlaylist(event.target.innerText)}
                            >
                            {value.playlist}
                        </div>
                    )
                )}
            </div>
            <h1>Select photoalbum</h1>
            <div className="catalog-list">
                {this.props.photoalbumDataList.map(
                    (value, key) => (
                        <div
                            key={key}
                            className='grayLink'
                            onClick={(event: any) => this.props.onSetPhotoalbum(event.target.innerText)}
                        >
                            {value.photoalbum}
                        </div>
                    )
                )}
            </div>
        </>;
    }
}

export default CatalogPage;
