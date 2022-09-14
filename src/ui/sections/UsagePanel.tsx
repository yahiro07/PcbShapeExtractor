import { css, domStyled, FC, jsx } from 'alumina';
import { appConfig } from '~/base';
import { appStore } from '~/store';
import { IconButton } from '../components/IconButton';

const PlainLink: FC<{ url: string }> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
};

const DocumentContent: FC = () => {
  return domStyled(
    <div>
      <h1>PCB Shape Extractor</h1>
      <h3>概要</h3>

      <p>
        KiCadのPCB設計ファイルから外形やフットプリントの位置を抽出するツールです。
        主に自作キーボードの基板設計データからキースイッチの座標を取り出す用途を想定しています。
      </p>

      <h3>使い方</h3>
      <img src="https://i.gyazo.com/822146c30354b7ec7c323ea99ae0a3f7.png" />
      <div class="usage-block">
        <p>
          「ファイルを読み込む」ボタンを押すとファイル選択ダイアログが表示されるので、ここでKiCadの基板設計ファイルを選んで開きます。
          とりあえず表示を見たいときには、「サンプルをロード」ボタンを押すと表示確認用の基板データが読み込まれます。
        </p>

        <p>
          基板データが読み込まれた状態で「SVG出力」や「JSON出力」のボタンを押すと別タブでSVGやJSONの内容が開きます。
        </p>
      </div>

      <h3>各部詳細</h3>
      <img src="https://i.gyazo.com/de9fca0c0c504a910ad3ea8f70f997fe.png" />
      <div class="usage-block">
        <h4>1.フットプリント抽出ワード</h4>
        <p>
          フットプリント名のフィルタです。ここに入力した単語を含むフットプリントが抽出されます。基板データを読み込んだ際に、キースイッチに関連する単語を含むフットプリントがある場合、その単語が初期値としてセットされます。
        </p>

        <h4>2.プットプリント表示モード</h4>
        <p>フットプリントを表示する際の形状を選択します。</p>

        <h4>3.基板レイアウト表示</h4>
        <p>基板データから抽出された外形とフットプリントが表示されます。</p>
        <h4>4.ファイル読み込みボタン</h4>
        <p>
          ファイルシステムから、KiCadの基板設計ファイルを選択して読み込みます。
        </p>
        <h4>5.SVG出力ボタン</h4>
        <p>
          データをSVGで書き出します。別タブでSVG画像が開かれるので、それを右クリックして保存してください。
        </p>
        <h4>6.JSON出力ボタン</h4>
        <p>
          データをJSONとして書き出します。JSONの形式は特定のアプリケーションを想定しない、汎用的なものになっています。
          別タブでJSONの内容が表示されます。
        </p>

        <h4>7.サンプル読み込みボタン</h4>
        <p>表示確認用のデータを読み込みます。</p>
      </div>

      <h3>ソースコード</h3>
      <p>
        Githubでソースコードを公開しています。
        <br />
        <PlainLink url="https://github.com/yahiro07/PcbShapeExtractor" />
      </p>

      <h3>連絡先</h3>
      <p>不具合等がありましたら下記の連絡先にお知らせください。</p>
      <p>
        Twitter
        <a
          href="https://twitter.com/yahiro120"
          target="_blank"
          rel="noreferrer"
        >
          @yahiro120
        </a>
      </p>
      <p class="mail">
        mail: yahiro1200
        <img src="https://i.gyazo.com/e54845878425c702a37b27c14c3587e2.png" />
      </p>
      <div class="version">version {appConfig.versionCode}</div>
    </div>,
    css`
      padding: 30px 30px;
      font-size: 16px;
      width: 100%;
      max-width: 800px;

      background: #fff;
      position: relative;

      text-size-adjust: none;
      -webkit-text-size-adjust: none;

      touch-action: pan-y;

      p {
        line-height: 1.5em;
      }

      > h1 {
        font-size: 44px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      > h3 {
        /* color: #008; */
        color: #fff;
        background: #47b;
        padding: 6px;
        font-size: 22px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }

      > img {
        width: 100%;
      }

      > .mail {
        display: flex;
        align-items: center;
        gap: 1px;
      }

      > div + div {
        margin-top: 10px;
      }

      > .usage-block {
        margin-top: 10px;
        h4 {
          margin-bottom: 5px;
          color: #008;
          font-size: 18px;
        }
        > * + h4 {
          margin-top: 10px;
        }

        > p + p {
          margin-top: 10px;
        }
      }

      > .version {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 15px;
        margin: 35px;
      }
    `
  );
};

export const UsagePanel: FC = () => {
  const frameColor = '#4ae';
  const { hideInfoPanel } = appStore.actions;

  return domStyled(
    <div>
      <div class="panel">
        <div class="top-bar">
          <IconButton iconSpec="ph-x-bold" size={30} onClick={hideInfoPanel} />
        </div>
        <div class="content-body">
          <DocumentContent />
        </div>
      </div>
    </div>,
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 10px;

      > .panel {
        background: #fff;
        color: #333;
        border: solid 3px ${frameColor};
        border-radius: 4px;

        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        > .top-bar {
          background: ${frameColor};
          height: 40px;
          padding: 0 3px;
          color: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
        }

        > .content-body {
          flex-grow: 1;
          display: flex;
          overflow-x: hidden;
          overflow-y: auto;
          flex-direction: column;
          align-items: center;
          background: #ddd;
        }
      }
    `
  );
};
