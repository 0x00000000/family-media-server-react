import React from 'react';

import {VideosList} from '../../api/videosList';

type Props = {
    videosList: VideosList;
    onSetPageVideo: () => void;
    onSetPlaylist: (playlist: string) => void;
};

type State = {};

class CatalogPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        console.log('this.props.videosList', this.props.videosList);
        return <>
            <h1>Home</h1>
            <div className="catalog-list">
                {this.props.videosList.map(
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
            </div>        </>;
    }
}

export default CatalogPage;
