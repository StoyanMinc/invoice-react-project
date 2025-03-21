import Part from "../models/Part.js"

const getAll = () => Part.find().populate('storageId', 'name');

const getSpecificOption = (storageId) => Part.find({ storageId });

const getOnePart = (partId) => Part.findById(partId).populate('storageId', 'name');

const createPart = (partData) => Part.create(partData);

const editPart = (partId, editData) => Part.findByIdAndUpdate(partId, editData, { new: true });

const deletePart = (partId) => Part.findByIdAndDelete(partId);

export const partService = {
    getAll,
    getSpecificOption,
    getOnePart,
    editPart,
    createPart,
    deletePart
}