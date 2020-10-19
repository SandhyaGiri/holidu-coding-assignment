
class HoliduSearchAPI {
    constructor(){
        this.endpoint = 'https://api.holidu.com'; // could change based on prod/dev
        this.searchOffersPath = 'rest/v6/search/offers';
        this.pageIndexQueryParam = 'pageIndex';
        this.searchTermQueryParam = 'searchTerm';
    }
    getOffers(searchTerm, pageIndex = 0){
        return fetch(`${this.endpoint}/${this.searchOffersPath}?${this.searchTermQueryParam}=${searchTerm}`)
        .then(response => response.json()).catch(error => null);
    }
}

export default HoliduSearchAPI;