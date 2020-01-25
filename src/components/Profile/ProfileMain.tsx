import React, { FormEvent, useRef, useState } from 'react';
import { Col, Form, Button, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Panel from '../../components/Site/Panel';
import Avatar from '../../components/Site/Avatar';
import { FormikProps } from 'formik';
import { User } from '../../redux/types';
import { ExistingProfileDetails } from '../../pages/components/Profile';

type ProfileMainProps = {
    formProps: FormikProps<ExistingProfileDetails>;
    user?: User;
};

const ProfileMain: React.FC<ProfileMainProps> = props => {
    const { t } = useTranslation('profile');
    const inputFile = useRef<FormControl & HTMLInputElement>(null);
    const [localAvatar, setAvatar] = useState<string | null>(null);
    const formProps = props.formProps;

    const onAvatarUploadClick = (): void => {
        if (!inputFile.current) {
            return;
        }

        inputFile.current.click();
    };

    return (
        <Panel title={t('Profile')}>
            <Form.Row>
                <Form.Group as={Col} md='6' controlId='formGridEmail'>
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control
                        name='email'
                        type='text'
                        placeholder={t('Enter an email address')}
                        value={formProps.values.email}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={formProps.touched.email && !!formProps.errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>{t('Avatar')}</Form.Label>
                    <div className='full-width'>
                        {!formProps.errors.avatar && localAvatar ? (
                            <img className='profile-avatar' src={localAvatar!} />
                        ) : (
                            <Avatar username={props.user!.username}></Avatar>
                        )}
                        <Button onClick={onAvatarUploadClick}>Change avatar</Button>
                    </div>
                    <Form.Control
                        name='avatar'
                        type='file'
                        accept='image/*'
                        onChange={(event: FormEvent<HTMLInputElement>): void => {
                            if (
                                !event.currentTarget ||
                                !event.currentTarget.files ||
                                event.currentTarget.files.length === 0
                            ) {
                                return;
                            }

                            const file = event.currentTarget.files[0];
                            setAvatar(URL.createObjectURL(file));
                            formProps.setFieldValue('avatar', file);
                        }}
                        onBlur={formProps.handleBlur}
                        hidden
                        ref={inputFile}
                        isInvalid={!!formProps.errors.avatar}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.avatar}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md='6' controlId='formGridPassword'>
                    <Form.Label>{t('Password')}</Form.Label>
                    <Form.Control
                        name='password'
                        type='password'
                        placeholder={t('Enter a password')}
                        value={formProps.values.password}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={formProps.touched.password && !!formProps.errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                    <Form.Label>{t('Password (again)')}</Form.Label>
                    <Form.Control
                        name='passwordAgain'
                        type='password'
                        placeholder={t('Enter the same password')}
                        value={formProps.values.passwordAgain}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={
                            formProps.touched.passwordAgain && !!formProps.errors.passwordAgain
                        }
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.passwordAgain}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </Panel>
    );
};

export default ProfileMain;
