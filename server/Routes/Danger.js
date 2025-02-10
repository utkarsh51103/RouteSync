import { dangerlocation } from "../controllers/dangerRoute.js";
import {Router} from "express"

const dangerChannel = Router();

dangerChannel.post('/get-danger',dangerlocation)

export default dangerChannel;