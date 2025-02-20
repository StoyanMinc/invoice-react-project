import { get, post } from "./requester.js";
const BASE_URL = 'http://localhost:5001/clients';

const createClient = (clientData) => post(BASE_URL, clientData);

const getAllClients = () => get(BASE_URL);
export const clientService = {
    createClient,
    getAllClients,
}
