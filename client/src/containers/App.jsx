import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalHeader from '../components/header/GlobalHeader';
import GlobalFooter from '../components/footer/GlobalFooter';
import ClientAPIService from '../service/ClientAPIService';
import menuItems from './menuItems';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: menuItems
    };
    this._clientAPIService = new ClientAPIService();
    this._myProfileURL = '/api/profileDetails/';
  }
Í
  componentWillMount() {
    this.getDataFromServer();
  }

  getDataFromServer = (id) => {
    const successCB = (responseData) => {
      this.setState({

      });
    };

    const errorCB = (error) => {
      toast.error('Operation Failed!', {
        autoClose: false
      });
      this.setState({
        editMode: false
      });
    };

    this._clientAPIService.setUrl(this._myProfileURL).doGetCall(successCB, errorCB);
  };

  render() {
    return (
      <React.Fragment>
        <GlobalHeader items={this.state.menu} />
        <div className="containter-fluid app-body">
          Content
        </div>
        <GlobalFooter />
        <ToastContainer />
      </React.Fragment>
    );
  }
}
module.exports = App;
