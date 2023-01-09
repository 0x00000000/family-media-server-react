import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { PhotoalbumData } from '../../types/photoalbum-data';
import { BASE_URL, URL_POSTFIXES } from '../../constants';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Props = {
    photoalbumData: PhotoalbumData;
    onSetPageCatalog: () => void;
};

type State = {};

class PhotoPage extends React.Component<Props, State> {
    _images: string[] = [];

    constructor(props: Props) {
        super(props);

        this._images = this.getImagesList(this.props.photoalbumData);
    }

    render() {
        return <>
            <div
                className='grayButton'
                onClick={() => this.props.onSetPageCatalog()}
            >
                &lt;&lt;&lt; Back to list
            </div>
            <Carousel>
                {this._images.map((url: string, key:number) => (
                    <div key={key}>
                        <img src={url} alt="" />
                    </div>
                ))}
            </Carousel>
        </>;
    }

    private getImagesList(photoalbumData: PhotoalbumData) {
        let images: string[] = photoalbumData.photos.map(
            (filename: string) =>
                BASE_URL + URL_POSTFIXES.PHOTO + photoalbumData.photoalbum + '/' + filename
        );
        return images;
    }
}

export default PhotoPage;
