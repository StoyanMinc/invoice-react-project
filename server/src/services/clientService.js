import Client from "../models/Client.js";

const createClient = (clientData) => Client.create(clientData)

const getAllClients = () => Client.find();

const getOneClient = (clientId) => Client.findById(clientId);

const updateClient = (clientId, clientData) => Client.findByIdAndUpdate(clientId, clientData);

const deleteClient = (clientId) => Client.findByIdAndDelete(clientId);

export const clientService = {
    createClient,
    getAllClients,
    deleteClient,
    getOneClient,
    updateClient,
}