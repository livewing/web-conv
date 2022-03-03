import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useGamepads } from '../contexts/gamepad';
import { buttonToInput, type InputConfig } from '../lib/input';
import { clamp } from '../lib/number';
import {
  buttonToMidiNote,
  isFunctionButton,
  isNoteButton,
  layouts,
  type MapConfig,
  type Modifier
} from '../lib/map';
import { chordSetMapIndex, chordToTones, type Chord } from '../lib/chord';
import type { MidiNote } from 'tone/build/esm/core/type/NoteUnits';
import type { TrackConfig } from '../lib/track';

export interface Pressing {
  note: MidiNote;
  button: keyof InputConfig;
  sustain: boolean;
  chord?: Chord;
}

export const useSynth = (
  config: TrackConfig,
  onChange: (config: TrackConfig) => void
) => {
  const synth = useRef<Tone.PolySynth>();
  const [pressing, setPressing] = useState<Pressing[]>([]);
  const [shiftMode, setShiftMode] = useState(false);
  const [functionButtons, setFunctionButtons] = useState({
    lb: false,
    rb: false,
    lt: false,
    rt: false
  });
  const sustain = useRef(0);
  useEffect(() => {
    if (config.synth.source.type === 'oscillator') {
      synth.current = new Tone.PolySynth({ maxPolyphony: 256 }).toDestination();
    }
    return () => {
      synth.current?.dispose();
      synth.current = void 0;
    };
  }, [config.synth.source.type]);
  useEffect(() => {
    if (typeof synth.current === 'undefined') return;
    const { envelope, ...oscillator } = config.synth.source.option;
    synth.current.set({
      oscillator: { ...oscillator, volume: 20 * Math.log10(oscillator.volume) },
      envelope
    });
  }, [config.synth.source.option, config.synth.source.option.type]);
  useGamepads(ev => {
    const s = synth.current;
    if (typeof s === 'undefined' || s === null) return;

    for (const e of ev.flatMap(e =>
      buttonToInput(config.input, e.button)
        .map(input => ({
          action: e.action,
          input
        }))
        .sort((a, b) => (a.input === 'back' ? -1 : b.input === 'back' ? 1 : 0))
    )) {
      if (e.input === 'back') {
        setShiftMode(e.action === 'down');
        continue;
      }
      if (e.input === 'start') {
        if (e.action === 'down') {
          onChange({
            ...config,
            map: {
              ...config.map,
              playMode: config.map.playMode === 'melody' ? 'chord' : 'melody'
            }
          });
          pressing.forEach(p =>
            synth.current?.triggerRelease(Tone.mtof(p.note))
          );
          setPressing([]);
        }
        continue;
      }
      if (isFunctionButton(e.input)) {
        setFunctionButtons(functionButtons => ({
          ...functionButtons,
          [e.input]: e.action === 'down'
        }));
      }
      if (shiftMode && e.action === 'down') {
        if (isNoteButton(e.input)) {
          if (config.map.playMode === 'melody') {
            const keyButton = layouts[config.map.melody.layout].indexOf(
              e.input
            ) as -1 | MapConfig['melody']['keyButton'];
            if (keyButton !== -1 && config.map.melody.keyButton !== keyButton) {
              onChange({
                ...config,
                map: {
                  ...config.map,
                  melody: { ...config.map.melody, keyButton }
                }
              });
            }
          } else if (config.map.playMode === 'chord') {
            onChange({
              ...config,
              map: {
                ...config.map,
                chord: { ...config.map.chord, currentSet: e.input }
              }
            });
          }
        } else if (isFunctionButton(e.input)) {
          const shift = config.map.shiftMode[e.input].amount;
          if (shift !== 0) {
            onChange({
              ...config,
              map: {
                ...config.map,
                key: clamp(0, 127, config.map.key + shift)
              }
            });
          }
        }
        continue;
      }
      if (config.map.playMode === 'melody') {
        if (isNoteButton(e.input)) {
          if (e.action === 'down') {
            const m = buttonToMidiNote(config.map, e.input);
            const shift = (
              Object.entries(config.map.melody.functions) as [
                keyof typeof config.map.melody.functions,
                Modifier
              ][]
            ).reduce(
              (acc, [k, v]) =>
                acc + (functionButtons[k] && v.type === 'shift' ? v.amount : 0),
              0
            );
            if (typeof m !== 'undefined') {
              const n = m + shift;
              if (n >= 0 && n <= 127) {
                const note = n as MidiNote;
                s.triggerAttack(Tone.mtof(note));
                setPressing(pressing => [
                  ...pressing,
                  {
                    note,
                    button: e.input,
                    sustain: false
                  }
                ]);
              }
            }
          } else if (e.action === 'up') {
            setPressing(pressing =>
              pressing.flatMap(p => {
                if (p.button === e.input) {
                  if (sustain.current > 0) {
                    return [{ ...p, sustain: true }];
                  } else {
                    s.triggerRelease(Tone.mtof(p.note));
                    return [];
                  }
                }
                return [p];
              })
            );
          }
          continue;
        }

        if (isFunctionButton(e.input)) {
          sustain.current +=
            config.map.melody.functions[e.input].type === 'sustain'
              ? e.action === 'down'
                ? 1
                : -1
              : 0;
          if (sustain.current === 0) {
            setPressing(pressing =>
              pressing.filter(p => {
                if (p.sustain) {
                  s.triggerRelease(Tone.mtof(p.note));
                  return false;
                }
                return true;
              })
            );
          }
        }
      } else if (config.map.playMode === 'chord') {
        if (isNoteButton(e.input)) {
          if (e.action === 'down') {
            const c =
              config.map.chord.chords[config.map.chord.currentSet][
                chordSetMapIndex(functionButtons)
              ][e.input];
            if (c !== null) {
              pressing.forEach(p =>
                synth.current?.triggerRelease(Tone.mtof(p.note))
              );
              setPressing([]);
              chordToTones(c)
                .map(t => t + config.map.key)
                .forEach(n => {
                  if (n >= 0 && n <= 127) {
                    const note = n as MidiNote;
                    s.triggerAttack(Tone.mtof(note));
                    setPressing(pressing => [
                      ...pressing,
                      {
                        note,
                        button: e.input,
                        sustain: false,
                        chord: c
                      }
                    ]);
                  }
                });
            }
          } else if (e.action === 'up') {
            setPressing(pressing =>
              pressing.flatMap(p => {
                if (p.button === e.input) {
                  s.triggerRelease(Tone.mtof(p.note));
                  return [];
                }
                return [p];
              })
            );
          }
          continue;
        }
      }
    }
  });

  return { pressing, shiftMode, functionButtons };
};
