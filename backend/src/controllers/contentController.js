import { getAllContent, getContentById, addContent } from '../services/contentService.js';

// add new content
export const createContent = async(req, res) => {
    try{
        const data = await addContent(req.body);
        res.status(201).json(data);  
    } catch(err) {
        res.status(400).json({error: err.message});
    }
};


// fetch all content  
export const fetchAllContent = async(req, res) => {
    try {
        const data = await getAllContent(req.query);
        res.status(200).json(data); 
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};


// fetch content by id
export const fetchContentById = async(req, res) => {
    try {
        const data = await getContentById(req.params.id.trim());
        if(!data) return res.status(404).json({ error: "Content not found" });
        res.status(200).json(data); 
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}