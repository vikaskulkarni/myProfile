import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  render() {
    return (
      <ReactTable
        data={this.props.tableData}
        columns={this.props.columns}
        defaultPageSize={10}
        className="-striped -highlight rounded"
        getTrProps={(state, rowInfo) => ({
          onClick: () => {
            const idx = rowInfo ? rowInfo.index : 0;
            this.setState({
              selected: idx
            });
            this.props.rowSelected(idx);
          },
          style: {
            background: rowInfo && rowInfo.index === this.state.selected ? '#3a3a3a' : 'white',
            color: rowInfo && rowInfo.index === this.state.selected ? 'white' : 'black'
          }
        })}
        getTdProps={(state, row, column) => ({
          onClick: () => {
            if(column.id === 'delete')
            this.props.handleDelete(row.index);
          }
        })}
      />
    );
  }
}

export default Table;
