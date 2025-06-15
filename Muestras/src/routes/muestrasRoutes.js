import express from "express";
import {
    getAllMuestras,
    saveMuestra,
    deleteMuestra,
    updateMuestra,
    getMuestraById
} from "../controllers/muestrasController.js";

const router = express.Router();

router.get('/', getAllMuestras);
router.post('/', saveMuestra);
router.delete('/:muestraId', deleteMuestra);
router.put('/:muestraId', updateMuestra);
router.get('/:muestraId', getMuestraById);

export default router;
