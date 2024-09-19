import express from 'express';

import UserController from '@/controllers/user.js';

const router = express.Router();

router.get('/shortest-way', UserController.findShortestWay);

router.get('/by-followers-count', UserController.getUserByMinFollowers);

router.get('/:username/followers', UserController.getFollowers);

router.get('/:username/suggest-friends', UserController.suggestFriends);

export default router;
