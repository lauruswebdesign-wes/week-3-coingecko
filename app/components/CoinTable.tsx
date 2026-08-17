import Image from 'next/image';

async function fetchCoinData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    console.log('here is the coin data-->', data)
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
}

export default async function CoinTable() {
  const coins = await fetchCoinData();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Top 20 Cryptocurrencies</h1>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left font-semibold">Image</th>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Symbol</th>
              <th className="px-6 py-3 text-right font-semibold">Current Price</th>
              <th className="px-6 py-3 text-right font-semibold">24h Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin: any, index: number) => (
              <tr
                key={coin.id}
                className={`border-b ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-6 py-4">
                  {coin.image && (
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{coin.name}</td>
                <td className="px-6 py-4 uppercase text-gray-600">
                  {coin.symbol}
                </td>
                <td className="px-6 py-4 text-right font-semibold">
                  ${coin.current_price?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
