/**
 * @author Ruslan Posevkin <rus.posevkin@gmail.com>
 */


 /*
Что можно сделать лучше:
Проверять наличие параметра из params в тех параметрах, 
которые уже присутствовали в url (переменная currentQuery)
 */

/**
 * @param {String} url
 * @param {Object} params 
 * @returns {String} URL with parameters or empty if error occured 
*/
 var addParamsToUrl = function (url, params) {
	var urlPattern = /(https?:\/\/)?(www\.)?([-а-яa-zёЁцушщхъфырэчстью0-9_\.]{2,}\.)(рф|[a-z]{2,6})((\/[-а-яёЁцушщхъфырэчстьюa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{1,})?((\&[a-z0-9_]{2,}=[-0-9]{1,}){1,})?)/i;

	if (!url || !urlPattern.test(url)) {
		return;
	}

	var query = '';
	var splittedUrl = url.split('?');
	var clearUrl = splittedUrl[0];
	var currentQuery = splittedUrl[1] ? splittedUrl[1].split('#')[0] : '';

    for (key in params) {
    	var clearKey = encodeURIComponent(key);
    	var value = params[key];

    	//if array
    	if (value instanceof Object) {
    		for (innerKey in value) {
    			query += clearKey + '[]=' + encodeURIComponent(value[innerKey]);
		    	query += '&';
    		}
    	} else {
    		query += clearKey + '=' + encodeURIComponent(value);
    	}
    	query += '&';
    }
    return clearUrl + '?' + query;
 };

