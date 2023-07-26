import express from "express"

import {regUserWithToken,sendNotification} from "../controllers/fcmController.js"

const NotificationRouter=express.Router()


NotificationRouter.post('/newDevice',regUserWithToken)

NotificationRouter.post('/sendNotification',sendNotification)

export default NotificationRouter