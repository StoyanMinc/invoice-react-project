import Part from "../models/Part.js"

const getAll = () => Part.find().populate('storageId', 'name');

const getSpecificOption = (storageId) => Part.find({ storageId });

const createPart = (partData) => Part.create(partData);

const deletePart = (partId) => Part.findByIdAndDelete(partId);

export const partService = {
    getAll,
    getSpecificOption,
    createPart,
    deletePart
}