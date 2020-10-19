import PropTypes from 'prop-types';
import React from 'react';
import { ApartmentDetails, Location, Photo, Price, Rating } from './types';

function ApartmentInfo(props){
    return (
        <div className="apmt-info">
            <div className="apmt-info__name">{props.details.name}</div>
            <div className="apmt-info__price"><b>{props.price.daily} {props.price.currency}</b></div>
        </div>
    );
}

function Apartment(props) {
    const { price, photos, details } = props;
    return (
        <div>
            <img src={photos[0].t} height="240" alt="apartment offer" />
            <ApartmentInfo details={details} price={price}/>
        </div>
    );
}

Apartment.propTypes = {
    id: PropTypes.string.isRequired,
    location: Location,
    price: Price.isRequired,
    photos: PropTypes.arrayOf(Photo).isRequired,
    details: ApartmentDetails,
    rating: Rating
}

export default Apartment;