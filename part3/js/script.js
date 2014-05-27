/**
 * @author Ruslan Posevkin <rus.posevkin@gmail.com>
 */

$(function () {
    $('button').click(function () {
        var form1 = "#form1";
        var form2 = "#form2";

        var changes = window.compareForms(form1, form2);
        window.renderResult(changes);

    });
})

/**
 * @param {String} form1 - CSS-selector
 * @param {String} form2 - CSS-selector
 * @returns {Object|String} Object with params to render or string if error occured 
*/
window.compareForms = function (form1, form2) {
    var form1 = $(form1).serializeArray();
    var form2 = $(form2).serializeArray();


var changeList = [];
var changedFields = {};
    if (!form1 || !form2) {
        return "Error! Form doesn't exist!"
    }

    for (var i = 0, len1 = form1.length; i < len1; i++) {
        var elem1 = form1[i];

        for (var j = 0, len2 = form2.length; j < len2; j++) {
            var elem2 = form2[j];

            if (elem1.name === elem2.name && elem1.value !== elem2.value) {
                changeList.push({
                    'action': 'change', 
                    'name': elem1.name, 
                    'oldValue': elem1.value, 
                    'newValue': elem2.value}); 
                changedFields[elem1.name] = true;
            } 
        }
    }

    var diffFields = function (action, form, changedFields) {
        for (var i = 0, len = form.length; i < len; i++) { 
            var name = form[i].name; 
            if (!changedFields[name]) {
                changeList.push({
                    'action': action, 
                    'name': name
                });
            }
        } 
    };

    diffFields('remove', form1, changedFields);
    diffFields('add', form2, changedFields);

    return changeList;
};

window.renderResult = function (changeList) {
    if ($.type(changeList) === 'string') {
        return $('#result').text(changeList);
    }

    var result = '<h3>Результаты сравнения форм</h3><ol>';
    $.each(changeList, function (key, value) {
        switch (value.action) {
            case 'change':
                result += '<li>Обновилось поле ' + value.name + '. Было: ' + value.oldValue + '. Стало: ' + value.newValue + '</li>'; 
                break;
            case 'remove':
                result += '<li>Удалено поле ' + value.name  + '</li>'; 
                break;
            case 'add':
                result += '<li>Добавлено поле ' + value.name  + '</li>'; 
                break;
        }
    });
    result += '</ol>';
    return $('#result').html(result);
}

