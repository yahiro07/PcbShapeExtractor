import { css, domStyled, FC, jsx } from 'alumina';
import { allFootprintDisplayModes } from '~/base';
import { appStore } from '~/store';
import { GeneralInput, GeneralSelector } from '../components';

export const TopControlsSection: FC = () => {
  const {
    state: { footprintSearchWord, footprintDisplayMode },
    readers: { numFootprintsMatched },
    actions: { setFootprintSearchWord, setFootprintDisplayMode },
  } = appStore;

  const inputWidth = 200;

  return domStyled(
    <div>
      <div class="top-row">
        <div>
          <label>フットプリント抽出ワード</label>
          <GeneralInput
            value={footprintSearchWord}
            onChange={setFootprintSearchWord}
            width={inputWidth}
          />
        </div>
        <div>
          <label>フットプリント表示</label>
          <GeneralSelector
            value={footprintDisplayMode}
            onChange={setFootprintDisplayMode}
            options={allFootprintDisplayModes}
            width={inputWidth}
          />
        </div>
      </div>

      <div>
        <p>{numFootprintsMatched}個のフットプリントを表示しています。</p>
      </div>
    </div>,
    css`
      font-size: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      > .top-row {
        display: flex;
        gap: 30px;

        > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
      }
    `
  );
};
