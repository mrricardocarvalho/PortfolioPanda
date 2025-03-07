import axios from 'axios';

const alphaVantageService = {
  async getStockData(symbol, functionName = 'TIME_SERIES_DAILY') {
    try {
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
      if (!apiKey) {
        throw new Error('Alpha Vantage API key not found. Please set the ALPHA_VANTAGE_API_KEY environment variable.');
      }
      const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${apiKey}`;
      const response = await axios.get(url);

      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      if (response.data['Note']) {
          throw new Error(response.data['Note']);
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching data from Alpha Vantage:', error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  },
};

export default alphaVantageService;