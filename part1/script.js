/**
 * @author Ruslan Posevkin <rus.posevkin@gmail.com>
 * @param {String} url
 * @returns {String|Object} Error message or object with parameters
 */

var queryToParams = function (url) {

	var result = {};
	if (!url) {
		return "Error! URL not found";
	}

	var urlPattern = /(https?:\/\/)?(www\.)?([-а-яa-zёЁцушщхъфырэчстью0-9_\.]{2,}\.)(рф|[a-z]{2,6})((\/[-а-яёЁцушщхъфырэчстьюa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{1,})?((\&[a-z0-9_]{2,}=[-0-9]{1,}){1,})?)/i;
	if (!urlPattern.test(url)) {
		return "String isn't URL";
	}

	//terminated by '#' or end of string
	var query = url.split('?')[1].split('#')[0];
	if (query) {
		var allParams = query.split('&'); 
		for (i = 0, length = allParams.length; i < length; i++) {
			var param = allParams[i].split('=');
			var key = param[0];
			var value = param[1];
			// if array
			var index = key.indexOf('[]');
			if (index + 1) {
				key = key.substring(0, index);
				if (!result[key]) {
					result[key] = [value];
				} else {
			    	result[key].push(value);
			    }
			} else {
				result[key] = value;
			}
		}
	}
	return result;
};
