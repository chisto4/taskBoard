import axios from '../../index';

export const uploadImageApi = async (file: FormData) => {
    const res = await axios.post('/user', file);
    return res.data
};

export const getAvatarInfo = async () => {
    const res = await axios.get('/avatar');
    return res.data
};
