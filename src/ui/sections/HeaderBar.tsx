import { css, domStyled, FC, jsx } from 'alumina';

export const HeaderBar: FC = () => {
  return domStyled(
    <h1>
      <i class="ph-cube-fill" />
      PCB Shape Extractor
      <i class="ph-info info-icon" />
    </h1>,
    css`
      font-size: 40px;
      background: #6c8;
      color: #fff;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 3px;
      > i {
        margin-top: 3px;
      }

      > .info-icon {
        font-size: 44px;
        margin-left: auto;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    `
  );
};
