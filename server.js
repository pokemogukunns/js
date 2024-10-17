const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.set('view engine', 'ejs');  // テンプレートエンジンとしてEJSを使用
app.set('views', './templates');  // テンプレートの保存先

app.get('/watch', async (req, res) => {
    const videoId = req.query.v;  // URLパラメータから動画IDを取得

    if (!videoId) {
        return res.status(400).send('動画IDが指定されていません');
    }

    try {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // ストリーミングURLを取得
        const streamUrls = extractStreamUrls($);  // 例: extractStreamUrls関数でURLを抽出
        const video2 = streamUrls;  // 取得したストリーミングURLをvideo2に保存

        // video.htmlにストリーミングURLを渡して表示
        res.render('video', { videourls: video2, videoid: videoId });
    } catch (error) {
        console.error(error);
        res.status(500).send('動画を読み込めませんでした');
    }
});

function extractStreamUrls($) {
    // ストリーミングURLを解析する処理
    const urls = [];
    // 実際の解析ロジックをここに記述
    return urls;
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
