import React from 'react';
import PropTypes from 'prop-types';
import Apartment from './apartment';

function ApartmentList(props) {
    const { apartments, handleApartmentClick } = props;
    if(apartments.length > 0){
        const apartmentListItems = apartments.map((apmt) => {
            return (
                <li key={apmt.id} className="apmt-list__apmt-list-item" onClick={() => {handleApartmentClick(apmt.id)}}>
                    <Apartment {...apmt} />
                </li>
            );
        });
        return (
            <div>
                <ul className="apmt-list">
                    {apartmentListItems}
                </ul>
            </div>
        )
    } else {
        return null; // no list will be rendered.
    }
}

ApartmentList.propTypes = {
    apartments: PropTypes.arrayOf(PropTypes.shape(Apartment.propTypes)).isRequired,
    handleApartmentClick: PropTypes.func.isRequired
};

export default ApartmentList;