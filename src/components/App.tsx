import React, { useCallback, useState, type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import * as Tone from 'tone';
import { Add } from '@styled-icons/material';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { Track } from './containers/Track';
import { Button } from './ui/Button';
import { load, save, type AppConfig } from '../lib/app';
import { defaultConfig } from '../lib/track';

const Wrapper = styled.div`
  height: 100%;
`;
const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
`;
const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.space()};
`;
const StartButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.space()};
  font-size: 200%;
  text-transform: uppercase;
`;

export const App: VFC = () => {
  const [config, setConfig] = useState(load());
  const [started, setStarted] = useState(false);
  const setAndSaveConfig = useCallback((config: AppConfig) => {
    setConfig(config);
    save(config);
  }, []);
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Header />
      {started && (
        <>
          <Tracks>
            {config.tracks.map((track, i) => (
              <Track
                key={track.id}
                config={track}
                onChange={n =>
                  setAndSaveConfig({
                    ...config,
                    tracks: config.tracks.map((t, j) => (i === j ? n : t))
                  })
                }
                onDelete={() =>
                  setAndSaveConfig({
                    ...config,
                    tracks: config.tracks.flatMap((t, j) =>
                      i === j ? [] : [t]
                    )
                  })
                }
              />
            ))}
          </Tracks>
          <AddButtonContainer>
            <Button
              type="primary"
              onClick={() =>
                setAndSaveConfig({
                  ...config,
                  tracks: [...config.tracks, defaultConfig()]
                })
              }
            >
              <Add size={24} />
              {t('track.add-track')}
            </Button>
          </AddButtonContainer>
        </>
      )}
      {!started && (
        <StartButtonContainer>
          <Button
            type="primary"
            onClick={async () => {
              await Tone.start();
              setStarted(true);
            }}
          >
            Start
          </Button>
        </StartButtonContainer>
      )}
      <Footer />
    </Wrapper>
  );
};
