import express from "express";
import { getAllAnalysis, saveAnalysis, deleteAnalysis, updateAnalisys} from './../controllers/analisisControler.js'

const router = express.Router();

router.get('/', getAllAnalysis);
router.post('/', saveAnalysis);
router.delete('/', deleteAnalysis);
router.put('/', updateAnalisys);

export default router;