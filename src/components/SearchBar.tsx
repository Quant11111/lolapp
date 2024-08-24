'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type SearchResult = {
  gameName: string;
  tagLine: string;
  summonerLevel: number;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const [name, tag] = searchQuery.split('#');
    if (name && tag) {
      try {
        const response = await fetch(`/api/riot-search?name=${name}&tag=${tag}`);
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search (e.g., Gabysushi#euw)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : <Search className="h-4 w-4" />}
        </Button>
      </form>
      {searchResult && (
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-bold mb-2">{searchResult.gameName}#{searchResult.tagLine}</h2>
          <p>Summoner Level: {searchResult.summonerLevel}</p>
          <p>Rank: {searchResult.rank}</p>
          <p>League Points: {searchResult.leaguePoints}</p>
          <p>Wins: {searchResult.wins}</p>
          <p>Losses: {searchResult.losses}</p>
        </div>
      )}
    </div>
  );
}