import { makeArray } from './_make-array';
import gsap from 'gsap';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    /**
     * @param {string} name スライドさせるクラスの名前
     * @example
     * <div style={textAlign: 'center'}>
     *  <div style={position: 'relative', fontSize: '14px', height: '1.4em', position: 'relative'}>
     *
     *    // 初期状態に表示する
     *    <div class="name curret" style={position: 'absolute', transform:' translate3d(0, 0, 0)'}></div>
     *
     *     //その他
     *    <div class="name" style={position: 'absolute', transform:' translate3d(0, -105%, 0)'}></div>
     *  </div>
     * </div>
     */
    const textSlide = name => {
      let count = 0; // 表示するカウント
      let time = Date.now();

      // 繰り返し処理をさせる
      const ticker = () => {
        const distanc = 1000;
        window.requestAnimationFrame(ticker);

        // 間引き
        if (time + distanc - Date.now() < 0) {
          time = new Date().getTime();

          const $$text = document.querySelectorAll(`.${name}`);
          const _el = makeArray($$text);
          count++;

          if (count >= _el.length) {
            count = 0;
          }

          _el.forEach((r, i) => {
            if (i === count) {
              gsap.set(r, {
                y: '100%'
              });

              gsap.to(r, {
                duration: 0.5,
                y: '0%'
              });
            } else {
              gsap.to(r, {
                duration: 0.5,
                y: '-105%'
              });
            }
          });
        }
      };

      ticker();
    };

    textSlide('text');
  });
})();
