import { BobsCompositeOcr, Daum, Jeocode, OneCallResponse } from './funTypes';
export const KNOWNGEOCODES: Jeocode [] =[
    {"zip":"95630","name":"Folsom","lat":38.6709,"lon":-121.1529,"country":"US"}
    ,{"zip":"55121","name":"Eagan","lat":44.8471,"lon":-93.1543,"country":"US"}
    ,{"zip":"95742","name":"Sacramento County","lat":38.5981,"lon":-121.2153,"country":"US"}
];


export const initialGeoCode: Jeocode = {
    zip: '',
    name: '',
    lat: 0,
    lon: 0,
    country: ''
};

export const initialOneCallResponse: OneCallResponse = {
    lat: 0,
    lon: 0,
    timezone: '',
    timezone_offset: 0,
    data: [],
    prev: '',
    next: ''
}

export const initialBobsCompositeOcr: BobsCompositeOcr ={
    jeocode: initialGeoCode,
    oneCallResponse: initialOneCallResponse,
    dt: 0
}