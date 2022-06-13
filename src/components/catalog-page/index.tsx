import React from 'react';

import {PlaylistData} from '../../api/playlist';

type Props = {
    playlistDataList: PlaylistData[];
    onSetPlaylist: (playlist: string) => void;
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
        </>;
    }
}

export default CatalogPage;
