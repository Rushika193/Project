function PredictionPopUp($this) {
    let $parent = $this.parents('.cRow');
    let componentsRequested = []
    let datatosend = {
        "count": {
        },
        "componentCount": 0
    }
    userData = [];
    let componentCount = 0;
    $parent.find('.editor-component').each(function () {
        let $this = $(this);
        let compo = $this.attr('data-type');
        if (compo != 'column' &&
            compo != 'holder' &&
            compo != 'container'
        ) {
            componentsRequested.push(compo);
            let total = 1;
            if (datatosend.count.hasOwnProperty(compo)) {
                total = parseInt(datatosend.count[compo]);
                total += 1;
            }
            else {
                componentCount += 1;
            }
            datatosend.count[compo] = total;
            userData.push(GetData($this, compo))
        }
    });
    console.log(componentsRequested)
    console.log(userData);
    var predictionDOM = EasyLibrary.ReadDOM("row/prediction");
    datatosend.componentCount = componentCount;

    let fullpagPopupDOM = DOMCreate('div', predictionDOM, 'fullpagepopupWrapper');
    $('body').append(fullpagPopupDOM);
    $('#cancelPredictPopup').on('click', function () {
        $('.fullpagepopupWrapper').remove();
    });

    function BindSlider(data) {
        let html = '';
        if (data != null
            && data.designs != null
            && data.designs.length > 0) {
            $(data.designs).each(function (i, v) {
                html += ` <div class="images" data-id="${v.id}">
                                <img src="${v.imagePath}" class="tst-img">
                                </div>`;

            });
        }
        $('.predictionImages').html(html);
        InitSlider();
    }
    $('#ApplyData').on('click', function () {
        let id = $('.slick-current').find('.images').attr('data-id');
        let config = {
            async: false,
            url: `${SageFrameHostURL}/Builder/ApplyDesign`,
            data: JSON.stringify({
                Param: JSON.stringify({ "id": id })
            }),
            success: function (data) {
                //let replaceData = [];
                //String.format(data.template, replaceData);

                let replaceData = [];
                if (data != null) {
                    let componentOrderJson = data.componentOrderJson;
                    console.log(componentOrderJson);
                    for (var j = 0, len = componentOrderJson.length; j < len; j++) {
                        for (var i = 0, length = componentsRequested.length; i < length; i++) {
                            if (componentsRequested[i] == componentOrderJson[j]) {
                                replaceData.push(userData[i]);
                                componentsRequested.splice(i, 1);
                                userData.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
                debugger;
                let row = String.format(data.template, replaceData);
                $parent.after(row);
                $('#cancelPredictPopup').trigger('click');
            },
        }
        SecureAjaxCall.PassObject(config);
    });
    String.format = function () {
        var s = arguments[0];
        var tochange = arguments[1];
        for (var i = 0; i < tochange.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, tochange[i]);
        }
        return s;
    }
    function InitSlider() {
        $('.predictionImages').slick({
            dotsClass: 'slick-dots cs-dots-pos-1',
            touchMove: true,
            infinite: false,
            arrows: true,
            slidesToShow: 1,
            autoplay: false
        });
    }
    let config = {
        async: false,
        url: `${SageFrameHostURL}/Builder/GetDesignList`,
        data: JSON.stringify({
            Param: JSON.stringify(datatosend)
        }),
        success: function (data) {
            BindSlider(data);
        },
    }
    SecureAjaxCall.PassObject(config);

    function GetData($this, datatype) {
        let data = '';
        switch (datatype.toLowerCase()) {
            case 'image':
            case 'image link':
                data = $this.find('img').attr('src');
                break;
            case 'text':
                data = $this.find('.editor-para').text();
                break;
            case 'heading':
                data = $this.find('.editor-para').text();
                break;
            case 'button':
                data = $this.find('.com-button-text').text();
                break;
            default:
                break;
        }
        return data;
    }
}