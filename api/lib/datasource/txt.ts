import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export const verifyTxn = async(tx_ref : string)=>{
    try {
        const res = await axios.get(`https://api.paychangu.com/verify-payment/${tx_ref}`,{ headers : {
                'Accept': 'application/json',
            Authorization : `Bearer sec-test-ZM29ETg3S8HxxPzJVMLWT2028E86IXzP`}})
        return res.data
    } catch (error) {
        console.log(error);
    }
}


export const onListenToPayments = async(payload : string,signature : string,onSuccess : (data : any)=> void, onFailure : (reason : string)=> void)=>{
    try {
        const webhookSecret = process.env.SECRETE_KEY!
        const computedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(payload)
            .digest('hex');
        if (computedSignature !== signature) {
            onFailure('Invalid webhook request')
            return;
        }
        const webhookData = JSON.parse(payload);
        onSuccess(webhookData)
        console.log('Received valid webhook data:', webhookData);
    } catch (error) {
        console.log(error);
        onFailure("Error")
    }
}