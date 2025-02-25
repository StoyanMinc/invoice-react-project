import { del, get, post, put } from "./requester.js";
const BASE_URL = 'http://localhost:5001/clients';

const createClient = (clientData) => post(BASE_URL, clientData);

const getAllClients = () => get(BASE_URL);

const getOneClient = (clientId) => get(`${BASE_URL}/${clientId}`);

const deleteClient = (clientId) => del(`${BASE_URL}/${clientId}`);

const updateClient = (clientId, clientData) => put(`${BASE_URL}/${clientId}`, clientData)

export const clientService = {
    createClient,
    getAllClients,
    deleteClient,
    getOneClient,
    updateClient
}
