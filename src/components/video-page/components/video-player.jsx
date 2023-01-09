import React from 'react';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';

class VideoPlayer extends React.Component {
    componentDidMount() {
        // Make sure Video.js player is only initialized once
        if (! this.player) {
            this.player = videojs(this.videoNode, this.props.options, () => {
                console.log('onPlayerReady', this);
                this.props.onReady && this.props.onReady(this.player);
            });

            if (this.videoNode) {
                this.videoNode.setAttribute("webkit-playsinline", true);
                this.videoNode.setAttribute("playsinline", true);
            }
        } else {
            // You could update an existing player in the `else` block here
            // on prop change, for example:

            // this.player.autoplay(options.autoplay);
            // this.player.src(options.sources);
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    render() {
        return (
            <div data-vjs-player>
                <video
                    ref={node => (this.videoNode = node)}
                    className="video-js vjs-big-play-centered"
                />
            </div>
        );
    }
}

export default VideoPlayer;
