const rp = require('request-promise');

module.exports = async function(city = '') {
	if (!city) {
		throw new Error('City name can`t be empty!');
	}

	const KEY = '442aed0590b12c76932c18d012e62013';
	const uri = 'http://api.openweathermap.org/data/2.5/weather';

	const options = {
		uri,
		qs: {
			appid: KEY,
			q: city,
			units: 'imperial'
		},
		json: true
	}

	try {
		const data = await rp(options),
					celsius = (data.main.temp - 32) * 5/9;

		return {
			weather: `${data.name}: ${celsius.toFixed(0)}`,
			error: null
		}
	} catch (error) {
		return {
			weather: null,
			error: error.error.message
		}
	}

}