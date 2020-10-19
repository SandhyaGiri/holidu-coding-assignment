import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ApartmentList from './apartment-list';
import ApartmentOverlay from './apartment-overlay';
import { focusOffer, getOffers, removeFocusedOffer } from './apartmentsSlice';

class ApartmentsContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleApartmentClick = this.handleApartmentClick.bind(this);
    }
    componentDidMount(){
        this.props.fetchApartments(this.props.searchTerm);
    }
    handleApartmentClick(id) {
        this.props.viewApartment(id);
    }
    render(){
        const loadingMessage = 'Loading search results ...';
        const resultMessage = `Showing results for ${this.props.searchTerm}`;
        let focusedApmtDetails = null;
        if(!this.props.loaded){
            return (
                <div className="container">
                    {this.props.errorMessage ? this.props.errorMessage : loadingMessage}
                </div>
            )
        }
        if(this.props.focusedApmt){
            const filteredApmts = this.props.apartments.filter((apmt) => apmt.id === this.props.focusedApmt);
            if(filteredApmts.length === 1){
                focusedApmtDetails = filteredApmts[0];
            }
        }
        return (
            <div className="container">
                {resultMessage}
                <ApartmentList apartments={this.props.apartments} handleApartmentClick={this.handleApartmentClick}/>
                {focusedApmtDetails && <ApartmentOverlay apartment={focusedApmtDetails} dismissOverlay={this.props.dismissApartment}/>}
            </div>
        );
    }
}

ApartmentsContainer.propTypees = {
    apartments: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    focusedApmt: PropTypes.string,
    fetchApartments: PropTypes.func.isRequired,
    viewApartment: PropTypes.func.isRequired,
    dismissApartment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    apartments: state.apartments.offers,
    searchTerm: state.apartments.searchTerm,
    loaded: state.apartments.loaded,
    errorMessage: state.apartments.errorMessage,
    focusedApmt: state.apartments.focusedOffer
});

const mapDispatchToProps = dispatch => ({
    fetchApartments: (searchTerm) => dispatch(getOffers({ searchTerm: searchTerm})),
    viewApartment: (id) => dispatch(focusOffer({ offerId: id})),
    dismissApartment: () => dispatch(removeFocusedOffer())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsContainer); 