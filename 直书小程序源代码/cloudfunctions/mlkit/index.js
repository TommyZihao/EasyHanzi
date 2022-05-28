// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');
const uuid = require('uuid');

cloud.init()
const db = cloud.database()
const mlkit = axios.create({
	baseURL: 'https://ml-api-drcn.ai.dbankcloud.com/v1',
	headers: {
		'X-Request-ID': uuid.v4(),
		'X-Package-Name': 'com.huawei.crj.mlkittest',
		'X-Country-Code': 'cn',
		'HMS-APPLICATION-ID': '105990247',
		'X-Mlkit-Version': 'ml-computer-vision:1.0.2.300',
		'Authorization': 'Bearer DAEDAFFOjVHEd7nfgFs3N1B6tN+V2V+kQJemzNY5w0XBp6QX6DhZAUmACdURMUgoIELB2yvaG8+PUUwIc+eWky71bIzvEpDMUv486w==',
		'Content-Type': 'application/json'
	}
})
const ocr = async (fileID) => {
	const res = await cloud.downloadFile({
		fileID: fileID,
	})
	const buffer = res.fileContent
	const imgBase64 = buffer.toString('base64')
	const resp = await mlkit.post('/image/recognition/ocr/text', {
		imgBase64,
		language: ["zh"]
	});
	const ocrResult = Array.from(resp.data.texts[0].text.replace(/[^\u4e00-\u9fa5]*/g, ''));
	return ocrResult;
}
const asr = async (fileID) => {
	const res = await cloud.downloadFile({
		fileID: fileID,
	})
	const buffer = res.fileContent
	const audioBase64 = buffer.toString('base64')
	const resp = await mlkit.post('/asr/short', {
		data: audioBase64,
		"config": {
		        "encoding": "aac",
		        "sampleRate": 16000,
		        "languageCode": "zh"
		    }
	});
	const asrResult = Array.from(resp.data.result.text.replace(/[^\u4e00-\u9fa5]*/g, ''));
	return asrResult;
}
const translate = async (sourceText) => {
	const resp = await mlkit.post('/translation/language/translate', {
		targetLanguage: "zh",
		sourceTexts: [sourceText, ]
	});
	const translatedResult = Array.from(resp.data.data.translatedResults[0].text.replace(/[^\u4e00-\u9fa5]*/g,
		''));
	return translatedResult;
}
const tts = async (text) => {
	const resp = await mlkit.post('/tts/text2audio', {
		data: {
			language: "zh-Hans",
			text,
		},
		config: {
			person: "zh-Hans-st-2",
			codec: 3,
			sampleRate: 16000,
			speed: "5.0",
			pitch: "5.0",
			volume: "5.0",
			type: 0
		}
	}, {
		responseType: 'arraybuffer',
	})
	const cloudPath = `hanzi-writer/tts/${text}.mp3`;
	const docFindRes = await db.collection('tts').where({
		text,
	}).get();
	if (docFindRes.data.length !== 0) {
		return docFindRes.data[0].fileID
	} else {
		const uploadRes = await cloud.uploadFile({
			cloudPath,
			fileContent: resp.data.subarray(8)
		})
		await db.collection('tts').add({
			data: {
				text,
				fileID: uploadRes.fileID
			}
		})
		return uploadRes.fileID
	}
}
// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.api) {
		case 'ocr':
			return await ocr(event.params)
		case 'translate':
			return await translate(event.params)
		case 'tts':
			return await tts(event.params)
		case 'asr':
			return await asr(event.params)
	}
}
