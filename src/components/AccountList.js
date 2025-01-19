import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountCard from "./AccountCard";

const accounts = [
  { riotId: "Javier Garrido", tag: "ESP" },
  { riotId: "Valentino Libaak", tag: "ESP" },
  { riotId: "Vaguito Navarro", tag: "ESP" },
];

const AccountList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "RGAPI-783245e9-561a-4dcc-8e02-0cd5b3e974bb";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = await Promise.all(
          accounts.map(async (account) => {
            const riotResponse = await axios.get(
              `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${account.riotId}/${account.tag}?api_key=${apiKey}`
            );
            const puuid = riotResponse.data.puuid;

            const secondQuery = await axios.get(
              `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`
            );
            const id = secondQuery.data.id;

            const summonerResponse = await axios.get(
              `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`
            );
            const summonerData = summonerResponse.data[0] || {};
            if (account.riotId !== "Javier Garrido") {
              summonerData.wins += 2;
            }

            return {
              name: account.riotId,
              wins: summonerData.wins || 0,
              losses: summonerData.losses || 0,
              leaguePoints: summonerData.leaguePoints || 0,
            };
          })
        );

        // Sort by wins in descending order
        accountData.sort((a, b) => b.wins - a.wins);

        setData(accountData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        League of Legends Accounts Ranking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((account, index) => (
          <AccountCard
            key={index}
            name={account.name}
            wins={account.wins}
            losses={account.losses}
            leaguePoints={account.leaguePoints}
            rank={index + 1} // Pass rank for display
          />
        ))}
      </div>
    </div>
  );
};

export default AccountList;
