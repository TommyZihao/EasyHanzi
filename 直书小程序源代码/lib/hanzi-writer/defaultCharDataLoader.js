const VERSION = '2.0';
const getCharDataUrl = (char) => `https://hanzi-writer.cdn.coderai.cn/package/${encodeURIComponent(char)}.json`;

export default (char, onLoad, onError) => {
  wx.request({
    url: getCharDataUrl(char),
    header: {
      'content-type': 'application/json',
    },
    success: (res) => {
      onLoad(res.data);
    },
    fail: onError,
  });
};
