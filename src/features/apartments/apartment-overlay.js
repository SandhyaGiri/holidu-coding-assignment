import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Apartment from './apartment';

function ApartmentPhotos(props){
    // using state hook
    const [photoIndex, setPhotoIndex] = useState(0);

    const handleClick = function(event){
        if(photoIndex < props.photos.length-1){
            event.stopPropagation(); // so that overlay is not dismissed.
            setPhotoIndex(photoIndex+1);
        }
    }
    const photos = props.photos.map((photo, index) => {
        // TODO: extract imageId from url to set li's key
        // TODO: can use classnames package here
        const show = index === photoIndex;
        return (
            <li key={photo.t} className={`photos-list__list-item ${show ? 'show' : 'hdn'}`}>
                <img src={photo.m} width="100%" height="100%" />
            </li>
        );
    });

    return (
        <div className="photos-container" onClick={(event) => {handleClick(event)}}>
            <ul className="photos-list">
                {photos}
            </ul>
            <i className="arrow arrow--right"></i>
        </div>
    );
}

function ApartmentDetailedInfo(props){
    return (
        <div className="info-container">
            <div className="info-container__content">
                <ul className="pb-li-1 list-styling--hidden">
                    <li><b>Location</b>: {props.location.name}</li>
                    <li><b>Rating</b>: {props.rating.value} % ({props.rating.count} users)</li>
                    <li><b>Bedrooms</b>: {props.details.bedroomsCount}</li>
                    <li><b>Permissible guests</b>: {props.details.guestsCount}</li>
                </ul>
            </div>
        </div>
    );
}

export default function ApartmentOverlay(props) {
    return (
        <div className="overlay" onClick={() => props.dismissOverlay()}>
            <div className="overlay__content">
                <ApartmentPhotos photos={props.apartment.photos} />
                <ApartmentDetailedInfo details={props.apartment.details} location={props.apartment.location} rating={props.apartment.rating}/>
            </div>
        </div>
    );
}

ApartmentOverlay.propTypes = {
    apartment: PropTypes.shape(Apartment.propTypes).isRequired,
    dismissOverlay: PropTypes.func.isRequired
}