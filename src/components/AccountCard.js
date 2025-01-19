import React from "react";

const AccountCard = ({ name, wins, losses, leaguePoints }) => {
  const winRate =
    wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(2) : "0.00";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Wins-Losses:</span> {wins}-{losses}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">League Points:</span> {leaguePoints}
      </p>
      <p
        className={`font-semibold ${
          winRate >= 50 ? "text-green-500" : "text-red-500"
        }`}
      >
        Win Rate: {winRate}%
      </p>
    </div>
  );
};

export default AccountCard;
