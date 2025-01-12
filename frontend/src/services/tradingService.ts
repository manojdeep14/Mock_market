import { fetchApi } from '../utils/api';

export interface StockSearch {
  symbol: string;
  name: string;
  type: string;
  region: string;
}

export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
}

export interface TradeRequest {
  symbol: string;
  shares: number;
}

export interface TradeResponse {
  message: string;
  trade: {
    symbol: string;
    shares: number;
    price: number;
    total: number;
    type: 'BUY' | 'SELL';
  };
  newBalance: number;
}

const searchStocks = async (query: string): Promise<StockSearch[]> => {
  const response = await fetchApi<StockSearch[]>(
    `https://34.102.138.199.nip.io/api/stocks/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.data!;
};

const getStockPrice = async (symbol: string): Promise<StockPrice> => {
  const response = await fetchApi<StockPrice>(
    `https://34.102.138.199.nip.io/api/stocks/price/${symbol}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.data!;
};

const executeTrade = async (
  type: 'BUY' | 'SELL',
  { symbol, shares }: TradeRequest
): Promise<TradeResponse> => {
  const response = await fetchApi<TradeResponse>(
    `https://34.102.138.199.nip.io/api/trades/${type.toLowerCase()}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ symbol, shares })
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.data!;
};

export const tradingService = {
  searchStocks,
  getStockPrice,
  executeTrade,
};