export default class Flight {
    constructor({flightId, airline, departureCity, arrivalCity, basePrice}) {
        this.flightId = flightId;
        this.airline = airline;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.basePrice = basePrice;
    }
    
    calculateSurgePrice = (attempts) => {
        if(attempts >= 3) {
            return Math.round(this.basePrice * 1.10);
        }
        
        return this.basePrice;
    }
}