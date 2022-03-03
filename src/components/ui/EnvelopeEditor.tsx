import React, { type VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigRow } from './ConfigRow';
import { ValueEditor } from './ValueEditor';
import type { ADSREnvelope } from '../../lib/synth';

interface EnvelopeEditorProps {
  envelope: ADSREnvelope;
  onChange?: (envelope: ADSREnvelope) => void;
}
export const EnvelopeEditor: VFC<EnvelopeEditorProps> = ({
  envelope,
  onChange = () => void 0
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ConfigRow label={t('synth-config.attack')}>
        <ValueEditor
          value={envelope.attack}
          minValue={0}
          maxValue={2}
          step={0.001}
          onChange={v =>
            onChange({ ...envelope, attack: Math.round(v * 1000) / 1000 })
          }
        >
          {v => `${v.toFixed(3)} s`}
        </ValueEditor>
      </ConfigRow>
      <ConfigRow label={t('synth-config.decay')}>
        <ValueEditor
          value={envelope.decay}
          minValue={0}
          maxValue={2}
          step={0.001}
          onChange={v =>
            onChange({ ...envelope, decay: Math.round(v * 1000) / 1000 })
          }
        >
          {v => `${v.toFixed(3)} s`}
        </ValueEditor>
      </ConfigRow>
      <ConfigRow label={t('synth-config.sustain')}>
        <ValueEditor
          value={envelope.sustain}
          minValue={0}
          maxValue={1}
          step={0.001}
          onChange={v =>
            onChange({ ...envelope, sustain: Math.round(v * 1000) / 1000 })
          }
        >
          {v => v.toFixed(3)}
        </ValueEditor>
      </ConfigRow>
      <ConfigRow label={t('synth-config.release')}>
        <ValueEditor
          value={envelope.release}
          minValue={0}
          maxValue={5}
          step={0.001}
          onChange={v =>
            onChange({ ...envelope, release: Math.round(v * 1000) / 1000 })
          }
        >
          {v => `${v.toFixed(3)} s`}
        </ValueEditor>
      </ConfigRow>
    </>
  );
};
