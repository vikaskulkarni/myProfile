import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import GlobalHeader from '../components/header/GlobalHeader';
import GlobalFooter from '../components/footer/GlobalFooter';
import ClientAPIService from '../service/ClientAPIService';
import menuItems from './menuItems';
import tabItems from './tabItems';
import './App.scss';
import '@zendeskgarden/react-tabs/dist/styles.css';

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
    };

    this._clientAPIService.setUrl(this._myProfileURL).doGetCall(successCB, errorCB);
  };

  render() {
    return (
      <ThemeProvider>
        <Tabs vertical>
          {tabItems.map(tab => (
            <TabPanel label={tab.label} key={tab.key}>
              {tab.value}
            </TabPanel>
          ))}
        </Tabs>
      </ThemeProvider>
    );
  }
}
module.exports = App;
