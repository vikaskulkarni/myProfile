const searchByValue = (data, key, columns) => {
    const tempArray = [];
  
    const tempData = [...data];
  
    const regex = new RegExp(key, 'gi');
  
    if (key === '') {
      return data;
    }
  
    Object.keys(tempData).map((item) => {
      Object.keys(columns).map((idx) => {
        if (regex.test(tempData[item][columns[idx]])) {
          tempArray.push(tempData[item]);
        }
      });
    });
    return tempArray;
  };
  
  export default searchByValue;