import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import * as yup from 'yup';

import { NewsItem } from '../../redux/types/admin';
import { Formik, FormikProps } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';

type NewsAdminProps = {
    news: NewsItem[];
    onRemoveNewsItem: (id: number) => void;
    onSubmit: (values: NewsDetails) => void;
};

type NewsDetails = {
    text: string;
};

const initialValues = {
    text: ''
};

const Blocklist: React.FC<NewsAdminProps> = props => {
    const { t } = useTranslation('newsadmin');
    const { news, onRemoveNewsItem } = props;

    const columns = [
        {
            dataField: 'datePublished',
            text: t('Date Posted'),
            sort: true,
            formatter: (cell: string): string => moment(cell).format('YYYY-MM-DD HH:mm')
        },
        { dataField: 'poster', text: t('Poster'), sort: true },
        { dataField: 'text', text: t('Text'), sort: true },
        {
            dataField: 'none',
            text: t('Remove'),
            isDummyField: true,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/display-name
            formatter: (_: string, row: { id: number; text: string }): ReactElement => {
                return (
                    <Button variant='danger' onClick={(): void => onRemoveNewsItem(row.id)}>
                        Remove
                    </Button>
                );
            }
        }
    ];

    const table =
        news.length === 0 ? (
            <div className='text-center'>{t('There is currently no news.')}</div>
        ) : (
            <BootstrapTable
                bootstrap4
                striped
                keyField='text'
                data={news}
                columns={columns}
                pagination={paginationFactory()}
                defaultSorted={[{ dataField: 'datePublished', order: 'desc' }]}
            />
        );

    const schema = yup.object({
        text: yup
            .string()
            .required(t('You must provide some text'))
            .min(5, t('News must be at least 5 characters long'))
    });

    return (
        <>
            {table}
            <Formik
                validationSchema={schema}
                onSubmit={props.onSubmit}
                initialValues={initialValues}
            >
                {(formProps: FormikProps<NewsDetails>): ReactElement => (
                    <Form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                            event.preventDefault();
                            formProps.handleSubmit(event);
                        }}
                    >
                        <Form.Row>
                            <Form.Group as={Col} md='12' controlId='formGridNewsText'>
                                <Form.Label>{t('News')}</Form.Label>
                                <Form.Control
                                    name='text'
                                    type='text'
                                    placeholder={t('Enter news text')}
                                    value={formProps.values.text}
                                    onChange={formProps.handleChange}
                                    onBlur={formProps.handleBlur}
                                    isInvalid={formProps.touched.text && !!formProps.errors.text}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formProps.errors.text}
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
