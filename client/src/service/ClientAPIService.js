import axios from 'axios';

class ClientAPIService {
  constructor(url) {
    this._url = url;
  }
  setUrl(url) {
    this._url = url;
    return this;
  }
  doGetCall(successCB, errorCB) {
    axios
      .get(this._url)
      .then((response) => {
        successCB(response.data);
      })
      .catch((error) => {
        errorCB(error);
      });
  }
  doPostCall(successCB, errorCB, requestBody) {
    axios
      .post(this._url, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        successCB(response.data);
      })
      .catch((error) => {
        errorCB(error.response.data.error);
      });
  }
  doPatchCall(successCB, errorCB, requestBody) {
    axios
      .patch(this._url, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        successCB(response.data);
      })
      .catch((error) => {
        errorCB(error.response.data.error);
      });
  }
  doDeleteCall(successCB, errorCB, requestBody) {
    axios
      .delete(this._url, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        successCB(response.data);
      })
      .catch((error) => {
        errorCB(error.response.data.error);
      });
  }
}

export default ClientAPIService;
