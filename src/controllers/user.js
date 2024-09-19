import UserRepository from '@/repositories/user.js';

const getFollowers = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await UserRepository.getUserByUsername(username);

    if (!user) {
      res.status(404).send('User not found');
    }

    const followers = await UserRepository.getUserFollowers(username);

    res.json(followers);
  } catch (e) {
    console.error('Error getFollowers:', e);

    res.status(500);
  }
};

const getUserByMinFollowers = async (req, res) => {
  const minFollowers = parseInt(req.query.minFollowers) || 2;

  try {
    const users = await UserRepository.getUserByMinFollowers(minFollowers);

    res.json(users);
  } catch (e) {
    console.error('Error getUserByMinFollowers:', e);

    res.status(500);
  }
};

const suggestFriends = async (req, res) => {
  const username = req.params.username;

  const user = await UserRepository.getUserByUsername(username);

  if (!user) {
    res.status(404).send('User not found');
  }

  try {
    const suggestions = await UserRepository.suggestFriends(username);

    res.json(suggestions);
  } catch (e) {
    console.error('Error suggestFriends:', e);

    res.status(500);
  }
};

const findShortestWay = async (req, res) => {
  const { leftUser, rightUser } = req.query;

  const leftUserData = await UserRepository.getUserByUsername(leftUser);
  const rightUserData = await UserRepository.getUserByUsername(rightUser);

  if (!leftUserData || !rightUserData) {
    res.status(404).send('User(s) not found');
  }

  try {
    const path = await UserRepository.findShortestWay(leftUser, rightUser);

    res.json(path);
  } catch (e) {
    console.error('Error findShortestWay:', e);

    res.status(500);
  }
};

export default { getFollowers, getUserByMinFollowers, findShortestWay, suggestFriends };
