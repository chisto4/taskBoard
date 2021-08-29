import React, { useState } from 'react';
import { Card, Form, Button, Figure } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../../api/axios';
import { StateReduxType } from '../../../store/reducers';
import { uploadAvatar } from '../../../store/userStore/thunkUser';
import css from './ProfilePage.module.css';

const UploadAvatar: React.FC = () => {
    const iconUrl = useSelector((state: StateReduxType) => state.userState.user?.avatar);
    const [userAvatar, setUserAvatar] = useState<string | Blob>('');
    const dispatch = useDispatch();
    const urlImg = !iconUrl ? 'images.jpeg' : baseURL + '/' + iconUrl;

    const submitUserImg = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const formData = new FormData();
        e.preventDefault();
        formData.append('filedata', userAvatar);
        dispatch(uploadAvatar(formData));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const currentAvatar = e.currentTarget.files[0];
            setUserAvatar(currentAvatar);
        }
    };

    return (
        <div className={css.profilePage__photo}>
            <Card style={{ maxWidth: '15rem', margin: 'auto', textAlign: 'center' }}>
                <Figure className="text-center mt-3">
                    <Figure.Image width={200} height={200} alt="171x180" src={urlImg} />
                </Figure>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.File onChange={handleChange} />
                            <Button
                                style={{ marginTop: '10px' }}
                                variant="outline-primary"
                                className="mt-2"
                                as="input"
                                onClick={submitUserImg}
                                type="submit"
                                value="Load"
                                size="sm"
                                disabled={!userAvatar}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};