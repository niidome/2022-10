/* HTML の読み込み完了(DOMContentLoaded)時に処理を実行 */
window.addEventListener('DOMContentLoaded', function (e) {
    /* 監視対象 (class="photo-block" の要素全て) */
    const target = document.querySelectorAll('.photo-block');

    /* 観測オブジェクトに渡す引数 */
    const options = {
        root: null, // 指定した要素内で監視 (null ならビューポート全体)
        rootMargin: '0px 0px', // 監視する要素のマージン指定 (大きくすると交差しやすくなる)
        threshold: 0.25 // 監視する要素ないに対象がどのくらい入ったらイベントを発生するか
    };

    /* 交差を観測するオブジェクト (callback は交差した時に呼び出す関数) */
    let observer = new IntersectionObserver(callback, options);

    /* 監視したい要素を登録 (複数あるのでループ) */
    target.forEach(t => {
        observer.observe(t);
    });

    /* イベント発生時に実行する関数の定義 */
    function callback(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                /* イベント発生の時は on-screen クラスを追加 */
                entry.target.classList.add('on-screen');
            } else if (entry.target.classList.contains('on-screen')) {
                /* それ以外の場合、クラスに on-screen がある場合は削除 */
                entry.target.classList.remove('on-screen');
            }
        });
    };
});