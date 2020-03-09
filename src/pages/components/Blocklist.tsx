import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as yup from 'yup';

import { Button, Form, Col } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';

type BlocklistProps = {
    blocklist: string[];
    onRemoveBlocklistEntry: (entry: string) => void;
    onSubmit: (values: BlocklistDetails) => void;
};

type BlocklistDetails = {
    username: string;
};

const initialValues = {
    username: ''
};

const Blocklist: React.FC<BlocklistProps> = props => {
    const { t } = useTranslation('blocklist');
    const { blocklist, onRemoveBlocklistEntry } = props;

    const columns = [
        { dataField: 'username', text: t('Username'), sort: true },
        {
            dataField: 'none',
            text: t('Remove'),
            isDummyField: true,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/display-name
            formatter: (_: string, row: { username: string }): ReactElement => {
                return (
                    <Button
                        variant='danger'
                        onClick={(): void => onRemoveBlocklistEntry(row.username)}
                    >
                        Remove
                    </Button>
                );
            }
        }
    ];

    const table =
        blocklist.length === 0 ? (
            <div className='text-center'>{t('Your block list is currently empty.')}</div>
        ) : (
            <BootstrapTable
                bootstrap4
                striped
                keyField='username'
                data={blocklist.map(entry => ({ username: entry }))}
                columns={columns}
                pagination={paginationFactory()}
                defaultSorted={[{ dataField: 'username', order: 'asc' }]}
            />
        );

    const schema = yup.object({
        username: yup
            .string()
            .required(t('You must specify a username'))
            .min(3, t('Username must be at least 3 characters and no more than 15 characters long'))
            .max(
                15,
                t('Username must be at least 3 characters and no more than 15 characters long')
            )
            .matches(
                /^[A-Za-z0-9_-]+$/,
                t('Usernames must only use the characters a-z, 0-9, _ and -')
            )
    });

    return (
        <>
            {table}
            <Formik
                validationSchema={schema}
                onSubmit={props.onSubmit}
                initialValues={initialValues}
            >
                {(formProps: FormikProps<BlocklistDetails>): ReactElement => (
                    <Form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                            event.preventDefault();
                            formProps.handleSubmit(event);
                        }}
                    >
                        <Form.Row>
                            <Form.Group as={Col} md='6' controlId='formGridUsername'>
                                <Form.Label>{t('Username')}</Form.Label>
                                <Form.Control
                                    name='username'
                                    type='text'
                                    placeholder={t('Enter username to block')}
                                    value={formProps.values.username}
                                    onChange={formProps.handleChange}
                                    onBlur={formProps.handleBlur}
                                    isInvalid={
                                        formProps.touched.username && !!formProps.errors.username
                                    }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formProps.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <div className='text-center'>
                            <Button variant='primary' type='submit'>
                                {t('Add')}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Blocklist;
