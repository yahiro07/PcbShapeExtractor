import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { IconButton, IconFontIcon } from '../components';

export const HeaderBar: FC = () => {
  const { showInfoPanel } = appStore.actions;
  return domStyled(
    <h1>
      <IconFontIcon spec="ph-cube-fill" class="icon-cube" />
      <p>PCB Shape Extractor</p>
      <IconButton
        size={44}
        iconSpec="ph-info"
        class="info-icon"
        onClick={showInfoPanel}
      />
    </h1>,
    css`
      font-size: 40px;
      background: #6c8;
      color: #fff;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 3px;
      > .icon-cube {
        transform: translate(0, 3px);
      }

      > .info-icon {
        margin-left: auto;
        transform: translate(0, 6px);
      }
    `
  );
};
