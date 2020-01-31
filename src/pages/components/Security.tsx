import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toastr } from 'react-redux-toastr';

import { Session } from '../../redux/types';
import { Button } from 'react-bootstrap';

type SecurityProps = {
    sessions: Session[];
    onRemoveSession: (id: number) => void;
};

const Security: React.FC<SecurityProps> = props => {
    const { t } = useTranslation('security');
    const { sessions, onRemoveSession } = props;

    const onRemoveClick = (id: number): void => {
        toastr.confirm(
            t(
                'Are you sure you want to remove this session?  It will be logged out and any games in progress may be abandonded.'
            ),
            {
                onOk: () => {
                    onRemoveSession(id);
                }
            }
        );
    };

    const columns = [
        { dataField: 'ip', text: t('IP Address'), sort: true },
        {
            dataField: 'lastUsed',
            text: t('Last Used'),
            sort: true,
            formatter: (cell: string): string => moment(cell).format('YYYY-MM-DD HH:mm')
        },
        {
            dataField: 'none',
            text: t('Remove'),
            isDummyField: true,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/display-name
            formatter: (cell: string, row: Session): ReactElement => {
                return (
                    <Button variant='danger' onClick={(): void => onRemoveClick(row.id)}>
                        Remove
                    </Button>
                );
            }
        }
    ];

    if (sessions.length === 0) {
        return <div>{t("You have no active sessions.  This shouldn't really happen.")}</div>;
    }
    return (
        <BootstrapTable
            bootstrap4
            keyField='id'
            data={sessions}
            columns={columns}
            pagination={paginationFactory()}
            defaultSorted={[{ dataField: 'lastUsed', order: 'desc' }]}
        />
    );
};

export default Security;
