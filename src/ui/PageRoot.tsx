import { css, domStyled, FC, jsx } from 'alumina';
import { colors } from './base';
import {
  BottomControlsSection,
  PcbShapeView,
  TopControlsSection,
} from './sections';

export const PageRoot: FC = () => {
  return domStyled(
    <div>
      <div class="inner">
        <h1>
          <i class="ph-cube-fill" />
          PCB Shape Extractor
        </h1>
        <div class="row">
          <TopControlsSection />
        </div>

        <div class="row">
          <PcbShapeView />
        </div>
        <div class="row">
          <BottomControlsSection />
        </div>
      </div>
    </div>,
    css`
      height: 100%;
      padding: 10px;
      > .inner {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;

        > h1 {
          font-size: 40px;
          background: #6c8;
          color: #fff;
          padding-left: 10px;
          display: flex;
          align-items: center;
          gap: 3px;
          > i {
            margin-top: 3px;
          }
        }

        > .row {
          border: solid 1px ${colors.panelEdge};
          padding: 15px 20px;
        }
      }
    `
  );
};
