import React, { useState, useEffect } from 'react';
import ColumnHeader from './ColumnHeader';
import './Table.css';
import './ScrollableTable.css';
ScrollableTable.defaultProps = {
    data: [],
    direction: 'asc',
    rowTemplate: () => { },
    headerTemplate: () => { }
};
function ScrollableTable({ data, rowTemplate, sortBy, direction, headerTemplate }) {
    const colCount = React.Children.toArray(headerTemplate().props.children).length;
    const [displayedData, setDisplayedData] = useState([]);
    const columns = React.Children.toArray(headerTemplate().props.children)
        .filter(child => child.props.sortKey)
        .map(child => child.props.sortKey);

    useEffect(() => {
        render();
    }, [data]);
    const render = () => {
        const sortedData = data.sort((a, b) => {
            const order = direction === 'asc' ? 1 : -1;
            if (a[sortBy] !== b[sortBy]) {
                return a[sortBy] > b[sortBy] ? order : -order;
            }
            return 0;
        });
        setDisplayedData(sortedData);
    }
    return (
        <div>
            <table className='scrollable'>
                <thead>
                    {headerTemplate()}
                </thead>
                <tbody>
                    {displayedData.length ? (
                        displayedData.map((rowData, index) => rowTemplate(rowData, index))
                    ) : (
                        <tr>
                            <td colSpan={colCount} style={{ textAlign: 'center' }}>
                                No data to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default Object.assign(ScrollableTable, { ColumnHeader });