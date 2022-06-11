import React from 'react';
import {VideosList} from "../../api/videosList";

type Props = {
    videosList: VideosList;
    playlist: string;
    onSetPageCatalog: () => void;
};

type State = {};

class VideoPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <>
            <h1>Home -&gt; {this.props.playlist}</h1>
            <div
                className='grayLink'
                onClick={() => this.props.onSetPageCatalog()}
                >
                Back
            </div>
        </>;
    }
}

export default VideoPage;
