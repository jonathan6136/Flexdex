import { Request, Response } from "express";
import * as CategoryService from "../services/file.service";
import { createfileSchema, updatefileSchema, patchfileSchema } from "../dtos/file.dto";

export const getAll = async (req: Request, res: Response) => {
    try {
        const search = typeof req.query.title === "string" ? req.query.title : undefined;
        const notes = await CategoryService.getAllCategory(Number(req.params.id), req.userId!, search);
        res.json(notes);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    };
};

export const getById = async (req : Request, res : Response) => {
    try {
        const note = await CategoryService.getCategoryById(Number(req.params.id), req.userId!);
        if(!note){
            return res.status(400).json({message : "Note not found"})
        };
        res.json(note);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    };
};

export const create = async (req : Request, res : Response) => {
    try {
        const parsed = createfileSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const note = await CategoryService.createCategory(req.userId! , parsed.data);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});    
    };
};

export const update = async (req : Request, res : Response) => {
    try {
        const parsed = updatefileSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const note = await CategoryService.updateCategory(Number(req.params.id), req.userId!, parsed.data);
        if(!note){
            return res.status(404).json({message : "Note not found"});
        }  
        res.json(note)   
    } catch (error) {
       res.status(500).json({message : "Erreur server", error}); 
    };
};

export const patch = async (req : Request, res : Response) => {
    try {
        const parsed = patchfileSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        };
        
        if (Object.keys(parsed.data).length === 0){
            return res.status(400).json({
                message : "Aucun champs à modifier"
            })
        };

        const note = await CategoryService.patchCategory(Number(req.params.id), req.userId!, parsed.data);
        if(!note){
            return res.status(404).json({message : "Note not found"});
        } 
        res.json(note)
    } catch (error) {
        res.status(500).json({message : "Erreur server", error}); 
    };
};

export const remove = async (req : Request, res : Response) => {
    try {
        const result = await CategoryService.deleteCategory(Number(req.params.id), req.userId!)
        if(!result){
           return res.status(404).json({message : "Note not found"}); 
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    }
}