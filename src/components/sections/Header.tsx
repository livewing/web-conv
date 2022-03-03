import React, { useEffect, useState, type VFC } from 'react';
import styled from 'styled-components';
import { Help, Settings, Update } from '@styled-icons/material';
import { Github } from '@styled-icons/fa-brands';
import { useTranslation } from 'react-i18next';
import { SystemConfig } from '../panels/SystemConfig';
import { Modal } from '../ui/Modal';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: white;
`;
const Title = styled.div`
  font-size: 150%;
  padding: ${({ theme }) => theme.space()};
`;
const ButtonsContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled.button<{ blink?: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.space()};
  gap: ${({ theme }) => theme.space()};
  border-radius: ${({ theme }) => theme.space(0.5)};
  align-items: center;
  cursor: pointer;

  ${({ blink = false }) =>
    blink ? 'animation: 2s linear infinite blink;' : ''}

  @keyframes blink {
    0% {
      background: #ffffff00;
    }
    50% {
      background: #ffffff60;
    }
    100% {
      background: #ffffff00;
    }
  }
`;

export const Header: VFC = () => {
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        registration?.addEventListener('updatefound', () => {
          setShowUpdateButton(true);
        });
      }
    })();
  }, []);
  return (
    <>
      <Wrapper>
        <Title>{t('header.title')}</Title>
        <ButtonsContainer>
          {showUpdateButton && (
            <ButtonContainer blink onClick={() => location.reload()}>
              <Update size={24} />
              {t('header.update')}
            </ButtonContainer>
          )}
          <ButtonContainer>
            <a
              href="https://github.com/livewing/web-conv"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github size={24} />
            </a>
          </ButtonContainer>
          <ButtonContainer>
            <a
              href="https://github.com/livewing/web-conv/blob/main/doc/how-to-use.md"
              target="_blank"
              rel="noopener noreferrer"
              title="Help"
            >
              <Help size={24} />
            </a>
          </ButtonContainer>
          <ButtonContainer onClick={() => setIsOpenConfig(true)}>
            <Settings size={24} />
          </ButtonContainer>
        </ButtonsContainer>
      </Wrapper>
      <Modal isOpen={isOpenConfig} onClose={() => setIsOpenConfig(false)}>
        <SystemConfig onClose={() => setIsOpenConfig(false)} />
      </Modal>
    </>
  );
};
