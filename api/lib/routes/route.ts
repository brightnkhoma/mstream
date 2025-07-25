import express from 'express'
import { listenWebhook, register ,signIn, verifyPayment} from '../repository/repository'
import { onSetContent } from '../repository/contentRepository'

const router = express.Router()
router.post('/register',register)
router.post('/signin',signIn)
router.post('/setcontent',onSetContent)
router.post('/verifyTxn',verifyPayment)
router.post('/webhook',listenWebhook)



export default router