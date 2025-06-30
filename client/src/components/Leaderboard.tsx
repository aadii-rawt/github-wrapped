import React from "react";

type User = {
    username: string;
    profile: string;
    character: string;
    score: number;
    commits: number;
    streak: number;
};

const dummyData: User[] = [
    {
        username: "aadii-rawt",
        profile: "https://avatars.githubusercontent.com/u/1?v=4",
        character: "Itachi",
        score: 9400,
        commits: 1200,
        streak: 312,
    },
    {
        username: "devgirl",
        profile: "https://avatars.githubusercontent.com/u/2?v=4",
        character: "Goku",
        score: 9200,
        commits: 1100,
        streak: 280,
    },
    {
        username: "openmaster",
        profile: "https://avatars.githubusercontent.com/u/3?v=4",
        character: "Levi",
        score: 8900,
        commits: 1045,
        streak: 270,
    },
    {
        username: "bugslayer",
        profile: "https://avatars.githubusercontent.com/u/4?v=4",
        character: "Naruto",
        score: 8700,
        commits: 980,
        streak: 250,
    },
    {
        username: "darkcoder",
        profile: "https://avatars.githubusercontent.com/u/5?v=4",
        character: "Sasuke",
        score: 8600,
        commits: 970,
        streak: 230,
    },
    {
        username: "nextgen",
        profile: "https://avatars.githubusercontent.com/u/6?v=4",
        character: "Luffy",
        score: 8500,
        commits: 940,
        streak: 225,
    },
    {
        username: "debugqueen",
        profile: "https://avatars.githubusercontent.com/u/7?v=4",
        character: "Hinata",
        score: 8300,
        commits: 915,
        streak: 210,
    },
    {
        username: "backendboss",
        profile: "https://avatars.githubusercontent.com/u/8?v=4",
        character: "Kakashi",
        score: 8100,
        commits: 890,
        streak: 200,
    },
    {
        username: "uiwizard",
        profile: "https://avatars.githubusercontent.com/u/9?v=4",
        character: "Nezuko",
        score: 8000,
        commits: 860,
        streak: 195,
    },
    {
        username: "codeblade",
        profile: "https://avatars.githubusercontent.com/u/10?v=4",
        character: "Zoro",
        score: 7900,
        commits: 850,
        streak: 190,
    },
];

const Leaderboard: React.FC = () => {
    return (
        <div className="bg-black">
            <div className="py-10 px-4 max-w-7xl mx-auto black">
                <h2 className="text-3xl font-bold text-white mb-6">🏆 Leaderboard</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-700 bg-[#1a1a1a]">
                    <table className="min-w-full divide-y divide-gray-700 text-sm">
                        <thead className="bg-[#2a2a2a] text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Profile</th>
                                <th className="px-4 py-3 text-left">Username</th>
                                <th className="px-4 py-3 text-left">Score</th>
                                <th className="px-4 py-3 text-left">Character</th>
                                <th className="px-4 py-3 text-left">Commits</th>
                                <th className="px-4 py-3 text-left">Streak</th>
                            </tr>
                        </thead>
                        <tbody className="text-white divide-y divide-gray-700">
                            {dummyData.map((user, idx) => (
                                <tr key={user.username} className="hover:bg-[#333333] transition">
                                    <td className="px-4 py-3 font-semibold text-gray-400">{idx + 1}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            src={user.profile}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full border border-white/20"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{user.username}</td>
                                    <td className="px-4 py-3 font-semibold text-green-400">{user.score}</td>
                                    <td className="px-4 py-3 text-purple-300">{user.character}</td>
                                    <td className="px-4 py-3">{user.commits}</td>
                                    <td className="px-4 py-3 text-pink-400">{user.streak}🔥</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
