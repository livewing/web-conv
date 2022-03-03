import React, { type VFC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { ConfigRow } from '../ui/ConfigRow';
import { Segment } from '../ui/Segment';
import { Select } from '../ui/Select';
import { useTheme } from '../../contexts/theme';
import { getResources } from '../../lib/i18n';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  max-width: 500px;
`;
const Title = styled.h1`
  font-size: 1.5rem;
`;

interface SystemConfigProps {
  onClose?: () => void;
}
export const SystemConfig: VFC<SystemConfigProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { themeKey, setThemeKey } = useTheme();
  const languages = Object.keys(getResources());
  return (
    <Wrapper>
      <Title>{t('system-config.title')}</Title>
      <ConfigRow label={t('system-config.theme')}>
        <Segment
          items={[
            t('system-config.auto'),
            t('system-config.light'),
            t('system-config.dark')
          ]}
          index={
            themeKey === 'auto'
              ? 0
              : themeKey === 'light'
              ? 1
              : themeKey === 'dark'
              ? 2
              : -1
          }
          onChange={i => {
            switch (i) {
              case 0:
                setThemeKey('auto');
                break;
              case 1:
                setThemeKey('light');
                break;
              case 2:
                setThemeKey('dark');
                break;
            }
          }}
        />
      </ConfigRow>
      <ConfigRow label={t('system-config.language')}>
        <Select
          items={languages.map(lng =>
            i18n.exists('locale:name', { lng, fallbackLng: [] })
              ? `${t('locale:name', { lng })} (${lng})`
              : lng
          )}
          index={languages.indexOf(i18n.language) ?? 0}
          onChange={i => i18n.changeLanguage(languages[i])}
        />
      </ConfigRow>
      <Button onClick={onClose}>{t('system-config.close')}</Button>
    </Wrapper>
  );
};
