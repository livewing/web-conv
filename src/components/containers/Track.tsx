import React, { useState, type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  DeleteForever,
  Layers,
  MusicNote,
  Settings,
  UnfoldLess,
  UnfoldMore
} from '@styled-icons/material';
import { Eye, GameController } from '@styled-icons/ionicons-solid';
import { Midi } from '@styled-icons/fluentui-system-filled';
import { InputConfigPanel } from '../panels/InputConfigPanel';
import { MapConfigPanel } from '../panels/MapConfigPanel';
import { SynthConfigPanel } from '../panels/SynthConfigPanel';
import { VisualizerConfigPanel } from '../panels/VisualizerConfigPanel';
import { Segment } from '../ui/Segment';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { InputStatus } from '../ui/InputStatus';
import { GamepadButtonLabel } from '../ui/GamepadButtonLabel';
import { NoteName } from '../visualizers/NoteName';
import { Keyboard } from '../visualizers/Keyboard';
import { Innocence } from '../visualizers/Innocence';
import { useSynth } from '../../hooks/synth';
import { gamepadsToInputs } from '../../lib/input';
import { noteToStrings } from '../../lib/note';
import { layouts } from '../../lib/map';
import { useGamepads } from '../../contexts/gamepad';
import type { TrackConfig } from '../../lib/track';

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color};
  border-radius: ${({ theme }) => theme.space()};
  overflow: hidden;
  box-shadow: 0 0 5px 0 ${({ theme }) => theme.border.color};
`;
const TitleBar = styled.div<{ fold: boolean }>`
  display: flex;
  align-items: center;
  ${({ fold, theme }) =>
    !fold ? `border-bottom: 1px solid ${theme.border.color};` : ''}
  gap: ${({ theme }) => theme.space()};
`;
const ButtonContainer = styled.button<{ colored?: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.space()};
  cursor: pointer;
  ${({ colored, theme }) => (colored ? `background: ${theme.primary};` : '')}
  ${({ colored }) => (colored ? 'color: white;' : '')}
`;
const Spacer = styled.div`
  flex-grow: 1;
`;
const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SegmentItemLabel = styled.p`
  font-size: 80%;
  text-align: center;
`;
const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`;
const DialogButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
`;
const KeyStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  outline: 1px red;
`;
const KeyStatusMainContainer = styled.div`
  display: flex;
  align-items: center;
`;
const KeyStatusBadge = styled.div`
  font-size: 0.7rem;
  padding: 1px 2px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.space(0.5)};
  margin-right: ${({ theme }) => theme.space(0.5)};
`;
const KeyStatusMain = styled.div`
  font-size: 1rem;
`;
const KeyStatusSub = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.border.color};
`;
const InputStatusContainer = styled.div`
  padding: 0 ${({ theme }) => theme.space()};
`;
const DimLayers = styled(Layers)`
  color: ${({ theme }) => theme.border.color};
`;

interface TrackProps {
  config: TrackConfig;
  onChange?: (config: TrackConfig) => void;
  onDelete?: () => void;
}
export const Track: VFC<TrackProps> = ({
  config,
  onChange = () => void 0,
  onDelete = () => void 0
}) => {
  const [fold, setFold] = useState(false);
  const [settings, setSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState(0);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const { t } = useTranslation();
  const press = gamepadsToInputs(useGamepads(), config.input);
  const { pressing, shiftMode, functionButtons } = useSynth(config, onChange);
  return (
    <>
      <Wrapper>
        <TitleBar fold={fold}>
          <ButtonContainer
            onClick={() => {
              setFold(f => !f);
              setSettings(false);
            }}
          >
            {fold ? <UnfoldMore size={24} /> : <UnfoldLess size={24} />}
          </ButtonContainer>
          {!settings && (
            <>
              <p>{config.name}</p>
              <Spacer />
            </>
          )}
          {settings && (
            <Input
              defaultValue={config.name}
              placeholder={t('track.track-name')}
              onChange={e => onChange({ ...config, name: e.target.value })}
              size={1}
            />
          )}
          {press.back && (
            <>
              <KeyStatusContainer>
                <KeyStatusMainContainer>
                  <KeyStatusBadge>{t('map-config.key')}</KeyStatusBadge>
                  <KeyStatusMain>{config.map.key}</KeyStatusMain>
                </KeyStatusMainContainer>
                <KeyStatusSub>
                  {noteToStrings(config.map.key).join(' · ')}
                </KeyStatusSub>
              </KeyStatusContainer>
              <GamepadButtonLabel
                button={
                  config.map.playMode === 'melody'
                    ? layouts[config.map.melody.layout][
                        config.map.melody.keyButton
                      ]
                    : config.map.chord.currentSet
                }
              />
            </>
          )}
          {config.map.playMode === 'chord' && <DimLayers size={24} />}
          <InputStatusContainer>
            <InputStatus inputConfig={config.input} />
          </InputStatusContainer>
          {!fold && (
            <ButtonContainer
              colored={settings}
              onClick={() => setSettings(s => !s)}
            >
              <Settings size={24} />
            </ButtonContainer>
          )}
        </TitleBar>
        {!fold && !settings && (
          <VisualizerContainer>
            {config.visualizer.map(v => (
              <React.Fragment key={v.id}>
                {v.type === 'note-name' && (
                  <NoteName
                    mapConfig={config.map}
                    synthConfig={config.synth}
                    visualizerConfig={v}
                    pressing={pressing}
                    shiftMode={shiftMode}
                    functionButtons={functionButtons}
                  />
                )}
                {v.type === 'keyboard' && (
                  <Keyboard
                    mapConfig={config.map}
                    visualizerConfig={v}
                    pressing={pressing}
                    shiftMode={shiftMode}
                    functionButtons={functionButtons}
                  />
                )}
                {v.type === 'innocence' && (
                  <Innocence visualizerConfig={v} pressing={pressing} />
                )}
              </React.Fragment>
            ))}
          </VisualizerContainer>
        )}
        {!fold && settings && (
          <SettingsContainer>
            <Segment
              items={[
                <Center key={0}>
                  <GameController size={24} />
                  <SegmentItemLabel>{t('track.input')}</SegmentItemLabel>
                </Center>,
                <Center key={1}>
                  <Midi size={24} />
                  <SegmentItemLabel>{t('track.map')}</SegmentItemLabel>
                </Center>,
                <Center key={2}>
                  <MusicNote size={24} />
                  <SegmentItemLabel>{t('track.synthesizer')}</SegmentItemLabel>
                </Center>,
                <Center key={3}>
                  <Eye size={24} />
                  <SegmentItemLabel>{t('track.visualizer')}</SegmentItemLabel>
                </Center>,
                {
                  foreground: 'crimson',
                  node: (
                    <Center>
                      <DeleteForever size={24} />
                      <SegmentItemLabel>{t('track.delete')}</SegmentItemLabel>
                    </Center>
                  )
                }
              ]}
              index={settingsTab}
              onChange={setSettingsTab}
              fullWidth
            />
            {settingsTab === 0 && (
              <InputConfigPanel
                config={config.input}
                onChange={input => onChange({ ...config, input })}
              />
            )}
            {settingsTab === 1 && (
              <MapConfigPanel
                config={config.map}
                onChange={map => onChange({ ...config, map })}
              />
            )}
            {settingsTab === 2 && (
              <SynthConfigPanel
                config={config.synth}
                onChange={synth => onChange({ ...config, synth })}
              />
            )}
            {settingsTab === 3 && (
              <VisualizerConfigPanel
                config={config.visualizer}
                onChange={visualizer => onChange({ ...config, visualizer })}
              />
            )}
            {settingsTab === 4 && (
              <Button type="danger" onClick={() => setIsOpenDeleteDialog(true)}>
                {t('track.delete-this-track')}
              </Button>
            )}
          </SettingsContainer>
        )}
      </Wrapper>
      <Modal
        isOpen={isOpenDeleteDialog}
        onClose={() => setIsOpenDeleteDialog(false)}
      >
        <DialogContainer>
          <p>{t('track.delete-confirm')}</p>
          <DialogButtonContainer>
            <Button fullWidth onClick={() => setIsOpenDeleteDialog(false)}>
              {t('track.delete-cancel')}
            </Button>
            <Button
              type="danger"
              fullWidth
              onClick={() => {
                setIsOpenDeleteDialog(false);
                onDelete();
              }}
            >
              {t('track.delete-do')}
            </Button>
          </DialogButtonContainer>
        </DialogContainer>
      </Modal>
    </>
  );
};
