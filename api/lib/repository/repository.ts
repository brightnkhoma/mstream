import { Request, Response } from 'express';
import { createNewUserAccount, userSignIn } from '../datasource/userDatasource';
import { onListenToPayments, verifyTxn } from '../datasource/txt';
import { buyContent, getContent } from '../datasource/contentDataSource';
import { PurchasedContent } from '../types/types';

export const register = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const success = await createNewUserAccount(email, password, name);

    res.status(200).json({ success });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const signIn = async(req : Request, res : Response) : Promise<any>=>{
    try {
        const {email, password} = req.body
         if (!email || !password ) {
         return res.status(400).json({ success: false, message: 'Missing fields' });
    }
        await userSignIn(email,password,(user)=>{
            res.status(200).json({success : true, user})
        },()=>{
             return res.status(400).json({ success: false, message: 'Invalid credentials' });
        })
    } catch (error) {
    console.error('Signin Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const verifyPayment = async(req : Request, res : Response) : Promise<any>=>{
  try {
    const {txn_ref, userId} = req.body
    const result = await verifyTxn(txn_ref)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    
  }
}

export const listenWebhook =async (req : Request, res : Response) : Promise<any>=>{
  try {
    const payload = req.body.toString()
    const signature = req.headers['signature'] as any

    const onSuccess = async (data : any)=>{
      const {reference} = data
      const result = await verifyTxn(reference)
      const txn_ref = result.data.tx_ref as string
      const splitRef = txn_ref.split("*")
      const userId = splitRef[0]
      const contentId = splitRef[1]
      const content = await getContent(contentId)
      if(content){
        const {title,type} = content
        await buyContent(userId,contentId,title,txn_ref,type,()=>{},()=>{console.log("Error")})
      }
    }
    const onFailure = (reason : string)=>{
      res.status(500).send(reason);
    }
    await onListenToPayments(payload,signature,onSuccess,onFailure)
  } catch (error) {
    console.log(error);
    
  }
}