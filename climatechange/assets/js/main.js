const random_question = _keyword => {
  const keyword = _keyword ? _keyword : 'データ';
  const q = ['{{data}}は増加傾向にあるか？減少傾向にあるか？', '{{data}}は直線で増加しているか？', '{{data}}は倍増していないだろうか？', '{{data}}と比較できる他のデータはあるだろうか？', 'もっとも大きな数値はどれだろうか？', 'この数値は、どの数値と比べられるだろうか？', 'この数値は、1年前や10年前（あるいはもっと昔）と比べるとどうだろうか？', 'この数値は、似たような国や地域と比べるとどうだろうか？', 'この数値は、ひとりあたりだとどうなるのか？', 'この数値は、どの数値で割るべきか？'];
  let index = [];

  for (let i = 0; i < q.length; i++) {
    index[i] = i;
  }

  let qIndex = [];

  for (let i = 0, len = index.length; i < 3; i++, len--) {
    n = Math.floor(Math.random() * len);
    qIndex.push(index[n]);
    index[n] = index[len - 1];
  }

  output = '';

  for (const i in qIndex) {
    tag = "<div class='d-flex' data-aos='fade-left' data-aos-delay='{{time}}'><div class='d-flex align-items-start mt-1'><svg class='fill-secondary' width='16' height='16' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><title>check</title><path d='M23.146,5.4,20.354,2.6a.5.5,0,0,0-.708,0L7.854,14.4a.5.5,0,0,1-.708,0L4.354,11.6a.5.5,0,0,0-.708,0L.854,14.4a.5.5,0,0,0,0,.707L7.146,21.4a.5.5,0,0,0,.708,0L23.146,6.1A.5.5,0,0,0,23.146,5.4Z'/></svg></div><div class='ml-2'><p class='font-size-5 mb-4'>{{question}}</p></div></div>";
    tag = tag.replace('{{time}}', i * 100);
    tag = tag.replace('{{question}}', q[qIndex[i]].replace('{{data}}', keyword));
    output = output + tag;
  }

  document.currentScript.insertAdjacentHTML('afterend', output);
};