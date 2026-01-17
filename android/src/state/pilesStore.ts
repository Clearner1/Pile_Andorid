import React from 'react';
import { PileConfig, PilesConfig } from '@core/types';

export type PilesContextValue = {
  config: PilesConfig;
  setConfig: React.Dispatch<React.SetStateAction<PilesConfig>>;
  addPile: (name: string, path: string) => void;
};

export const PilesContext = React.createContext<PilesContextValue | null>(null);

export const createEmptyConfig = (): PilesConfig => ({
  piles: [],
});

export const upsertPile = (config: PilesConfig, pile: PileConfig): PilesConfig => {
  const existing = config.piles.find((item) => item.name === pile.name);
  if (existing) {
    return {
      piles: config.piles.map((item) => (item.name === pile.name ? pile : item)),
    };
  }
  return {
    piles: [pile, ...config.piles],
  };
};
