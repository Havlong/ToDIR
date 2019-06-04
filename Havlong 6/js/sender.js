"use strict";

$(document).ready(function () {
    $(document.answerForm).submit(function (e) {
        e.preventDefault();
        let jsonData = getJSON($(this).serializeArray());
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: async function (jsonResult) {
                let result = JSON.parse(jsonResult);
                let alert = $('#alert');
                alert
                    .html(result.message);
                if (result.result === 'ok') {
                    if (result.valid) {
                        let content = $('div#content')
                            .css({
                                backgroundColor: '#62e763'
                            });
                        await sleep(3000);
                        content
                            .css({
                                backgroundColor: '#eff1d1'
                            });
                        alert
                            .html("");
                    } else {
                        let content = $('div#content')
                            .css({
                                backgroundColor: '#ffa47b'
                            });
                        await sleep(3000);
                        content
                            .css({
                                backgroundColor: '#eff1d1'
                            })
                    }
                }
            }
        })
    })
});

function getJSON(data) {
    let object = {};

    $.each(data, function (index, field) {
        object[field['name']] = field['value'];
    });

    return JSON.stringify(object);
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
