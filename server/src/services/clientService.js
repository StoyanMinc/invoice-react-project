import Client from "../models/Client.js";

const createClient = (clientData) => Client.create(clientData)

const getAllClients = () => Client.find();
export const clientService = {
    createClient,
    getAllClients,
}