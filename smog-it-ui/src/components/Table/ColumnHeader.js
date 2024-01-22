import React, { useState } from 'react';
import { faArrowDownAZ, faArrowUpZA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ColumnHeader({ title, sortable, sortKey, onSort, currentSortKey, align }) {
    const [icon, setIcon] = useState(faArrowDownAZ);
    const [sort, setSort] = useState({ sortBy: sortKey, direction: 'asc' });
    const handleSortClick = () => {
        const nextIcon = sort.sortBy === currentSortKey ? (sort.direction === 'asc' ? faArrowDownAZ : faArrowUpZA) : faArrowDownAZ;
        setSort({ sortBy: sortKey, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
        setIcon(nextIcon);
        onSort(sort.sortBy, sort.direction);
    };
    return (
        sortable ? (
            <th className={`text-${align}`}>
                <span className={`sortable text-${align}`} onClick={handleSortClick}>
                    {title} {currentSortKey === sortKey && <FontAwesomeIcon icon={icon} />}
                </span>
            </th>
        ) : (

            <th className={`text-${align}`}>
                <span className={`sortable text-${align}`}>
                    {title}
                </span>
            </th >
        )
    );
}
ColumnHeader.defaultProps = {
    onSort: (a, b) => { },
    align: 'left'
};
export default ColumnHeader;
