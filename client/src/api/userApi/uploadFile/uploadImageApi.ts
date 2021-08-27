import axios from '../index';

export const uploadImageApi = async (file: any) => {
    const res = await axios.post('/user', file);
    console.log('Image info uploading', res.data);
    return res.data
};

export const getAvatarInfo = async () => {  
    const res = await axios.get('/avatar');
    console.log('Avatar info token update', res.data);
    return res.data
};

export const editUsers = async (file: any) => {
    const res = await axios.put('/user', file);
    console.log('User info update', res.data);
    return res.data
};
