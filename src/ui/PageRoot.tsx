import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { colors } from './base';
import {
  BottomControlsSection,
  HeaderBar,
  PcbShapeView,
  TopControlsSection,
} from './sections';
import { UsagePanel } from './sections/UsagePanel';

export const PageRoot: FC = () => {
  const { infoPanelVisible } = appStore.state;
  return domStyled(
    <div>
      <HeaderBar />
      <div class="inner">
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
      <UsagePanel if={infoPanelVisible} />
    </div>,
    css`
      position: relative;
      height: 100%;
      padding: 10px;
      font-size: 15px;
      color: #333;

      > .inner {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;

        > .row {
          border: solid 1px ${colors.panelEdge};
          padding: 15px 20px;
        }
      }
    `
  );
};
