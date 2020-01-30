import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Session } from '../../redux/types';
import { Table, Button } from 'react-bootstrap';

type SecurityProps = {
    sessions: Session[];
};

const Security: React.FC<SecurityProps> = props => {
    const { t } = useTranslation('security');
    const { sessions } = props;

    if (sessions.length === 0) {
        return <div>{t("You have no active sessions.  This shouldn't really happen.")}</div>;
    }
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>{t('IP Address')}</th>
                    <th>{t('Last Used')}</th>
                    <th>{t('Remove')}</th>
                </tr>
            </thead>
            <tbody>
                {sessions.map(session => (
                    <tr key={session.id}>
                        <td>{session.ip}</td>
                        <td>{moment(session.lastUsed).format('YYYY-MM-DD HH:mm')}</td>
                        <td>
                            <Button variant='danger'>{t('Remove')}</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Security;
