import express from 'express';

import UserRoutes from '@/routes/user.js';

const router = express.Router();

router.get('/', (req, res) => res.send('ROOT'));

router.use('/users', UserRoutes);

export default router;
