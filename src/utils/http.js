import axios from "axios"

var instance = axios.create({
	baseURL: 'http://0.0.0.0:8888/api', //服务器接口地址
	timeout: 250000
})

const httpGet = (url, data) => {
	return new Promise((resolve, reject) => {
		instance
			.get(url, {param: data})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			})
	});
};

const httpDelete = (url, data) => {
	return new Promise((resolve, reject) => {
		instance
			.delete(url, {param: data})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			})
	});
};

const httpPost = (url, data) => {
	return new Promise((resolve, reject) => {
		instance
			.post(url, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			})
	});
};

const httpPut = (url, data) => {
	return new Promise((resolve, reject) => {
		instance
			.put(url, data)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			})
	});
};
export {httpGet, httpPost, httpDelete, httpPut};