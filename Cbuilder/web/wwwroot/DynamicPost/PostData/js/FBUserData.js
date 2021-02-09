(function ($) {
    function FBUserData($form, formRenderData) {
        this.$form = $form;
        this.formSerializedData = this.$form.serializeFBObject();
        this.fbRenderData = formRenderData;
        this.userData = [];
    }
    FBUserData.prototype = {
        getFBObj: function (key, val) {
            val = val.replace('[]', '');
            return this.fbRenderData.filter(function (obj) {
                var filter = false;
                if (val) {
                    filter = obj[key] === val;
                } else if (obj[key]) {
                    filter = true;
                }
                return filter;
            });
        },
        setValue: function (name, value) {
            let field = this.getFBObj('name', name)[0];
            if (!field) {
                return;
            }
            if (['select', 'checkbox-group', 'radio-group'].indexOf(field.type) !== -1) {
                for (var fieldOption of field.values) {
                    if ($.isArray(value)) {
                        if (value.indexOf(fieldOption.value) != -1) {
                            fieldOption.selected = true;
                        } else {
                            delete fieldOption.selected;
                        }
                    } else {
                        if (value.indexOf(fieldOption.value) === 0) {
                            fieldOption.selected = true;
                        } else {
                            delete fieldOption.selected;
                        }
                    }
                }
            } else {
                field.value = value;
            }
            this.userData.push(field);
        },
        setFormFieldValue: function (field) {
            let self = this;
            let fname = field.name;
            if (field.type == 'checkbox-group' || (typeof field.multiple !== 'undefined' && field.multiple === true)) {
                fname += '[]';
            }
            let value = self.formSerializedData[fname];
            if (['select', 'checkbox-group', 'radio-group'].indexOf(field.type) !== -1) {
                for (var fieldOption of field.values) {
                    if ($.isArray(value)) {
                        if (value.indexOf(fieldOption.value) != -1) {
                            fieldOption.selected = true;
                        } else {
                            delete fieldOption.selected;
                        }
                    } else {
                        if (typeof value !== 'undefined' && value.indexOf(fieldOption.value) === 0) {
                            fieldOption.selected = true;
                        } else {
                            delete fieldOption.selected;
                        }
                    }
                }
            } else if (field.type == 'textarea' && typeof field.subtype !== 'undefined' && field.subtype == 'quill') {
                field.value = JSON.stringify([{
                    insert: $('#' + field.name).find('.ql-editor').html()
                }]);
            } else if (field.type == 'textarea' && typeof field.subtype !== 'undefined' && field.subtype == 'tinymce') {
                field.value = tinyMCE.get(field.name).getContent();
            } else if (field.type == 'richtext') {
                field.value = $('#richtext-' + field.name).find('.documenttext').wrapAll('<div />').parent().html();
            } else {
                field.value = value;
            }
            self.userData.push(field);
        },
        getUserData: function () {
            let self = this;
            $.each(this.fbRenderData, function (i, f) {
                self.setFormFieldValue(f);
            });
            //for (var k in this.formSerializedData) {
            //    self.setValue(k, self.formSerializedData[k]);
            //}
            return this.userData;
        }
    };
    $.fn.fbUserData = function (options) {
        let args = Array.prototype.slice.call(arguments, 1);
        let $form = $(this);
        if ($form.length !== 1) {
            throw "Pass the form where form builder is rendered.";
        }
        if (typeof options === 'undefined' || typeof options.formData === 'undefined') {
            throw "Pass form render options.";
        }
        let p = new FBUserData($form, options.formData);
        return p.getUserData();
    };
}(jQuery));
(function ($) {
    $.fn.serializeFBObject = function () {
        var obj = {};

        $.each(this.serializeArray(), function (i, o) {
            var n = o.name,
              v = o.value;

            obj[n] = obj[n] === undefined ? v
              : $.isArray(obj[n]) ? obj[n].concat(v)
              : [obj[n], v];
        });
        return obj;
    };
})(jQuery);