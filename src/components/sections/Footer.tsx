import React, { type VFC } from 'react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

const Wrapper = styled.div`
  position: sticky;
  top: 100vh;
  background: #333333;
  color: #aaaaaa;
`;

const Paragraph = styled.p`
  padding: ${({ theme }) => theme.space()};

  &:not(:first-child) {
    padding-top: 0;
  }
`;

const Anchor = styled.a`
  &:link {
    text-decoration: underline;
  }
`;

export const Footer: VFC = () => (
  <Wrapper>
    <Paragraph>
      &copy;{' '}
      <Anchor
        href="https://livewing.net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        livewing.net
      </Anchor>
    </Paragraph>
    <Paragraph>
      <Trans i18nKey="footer.license">
        {''}
        <Anchor
          href="https://github.com/livewing/web-conv/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        ></Anchor>
      </Trans>
    </Paragraph>
  </Wrapper>
);
