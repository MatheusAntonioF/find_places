import axios from 'axios';

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Supermercado&inputtype=textquery&language=pt-BR&locationbias=circle:10000@${latitude},${longitude}&fields=formatted_address,name,rating,geometry&key=AIzaSyDHmAC9pMhcHcgNqxBkeGh_MkvAMf1ZI7U`

export const api_maps = axios.create({});
