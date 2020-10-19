import PropTypes from 'prop-types';

export const Location = PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string.isRequired
});

export const Photo = PropTypes.shape({
    t: PropTypes.string,
    m: PropTypes.string,
    l: PropTypes.string,
    hr: PropTypes.string,
});

export const Price = PropTypes.shape({
    currency: PropTypes.oneOf(["USD", "EUR"]),
    daily: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
});

export const Rating = PropTypes.shape({
    count: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
});

export const ApartmentDetails = PropTypes.shape({
    name: PropTypes.string.isRequired,
    apartmentType: PropTypes.string.isRequired,
    apartmentTypeTitle: PropTypes.string.isRequired,
    bedroomsCount: PropTypes.number,
    guestsCount: PropTypes.number
});