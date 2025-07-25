import {Request,Response} from 'express'
import { onAddFile, setContent } from '../datasource/contentDataSource';
import { ContentFile } from '../types/types';

export const onSetContent = async(req : Request, res : Response) : Promise<any>=>{
    try {
        const {userId,content} = req.body
        await setContent(userId,content,()=>{
            res.status(200).json({success : true})
        },()=>{
            res.status(400).json({success : false})
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false})
        
    }

}

export const onSetFile = async(req : Request, res : Response) : Promise<any>=>{
    try {
        const myFile : ContentFile = req.body
        await onAddFile(myFile)
        res.status(200).json({success : true})
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false})
        
    }
}