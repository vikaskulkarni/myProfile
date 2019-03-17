import React, { Component } from 'react';

class SearchBox extends Component {
  state = {
    closeButtonStatus: false,
    searchedValue: ''
  };

  clearInputValue = () => {
    this.setState({ closeButtonStatus: false, searchedValue: '' });
    this.props.onChange('');
  };

  handleChange = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        closeButtonStatus: true,
        searchedValue: event.target.value
      });
    } else {
      this.setState({ closeButtonStatus: false, searchedValue: '' });
    }

    this.props.onChange(event.target.value);
  };

  render() {
    let closeButton = '';
    if (this.state.closeButtonStatus) {
      closeButton = (
        <button
          style={{
            position: 'absolute',
            right: '20px',
            outline: 'none',
            display: 'inline-block',
            top: '9px'
          }}
          type="button"
          className="close"
          aria-label="Close"
          onClick={this.clearInputValue}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    }

    return (
      <div
        style={{
          position: 'relative',
          padding: '0px'
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          style={{
            fontSize: '0.865rem',
            padding: '8px 6px 8px 9px',
            display: 'inline-block'
          }}
          aria-label="search"
          onChange={this.handleChange}
          value={this.state.searchedValue}
        />
        {closeButton}
      </div>
    );
  }
}

export default SearchBox;
