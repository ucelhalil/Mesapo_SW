import express from 'express';
import CustomResponse from '../utils/response.js';

const router = express.Router();

const _Main = '/';

router.route(_Main).get((req, res) => {
    CustomResponse.success(res, 'Welcome to the MESAPOL API');
});

export default router;