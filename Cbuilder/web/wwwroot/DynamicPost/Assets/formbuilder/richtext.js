if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Rich text class
     */
    class controlRichtext extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '',
                i18n: {
                    default: 'Rich text'
                }
            };
        }

        /**
         * javascript & css to load
         */
        configure() {
            //
        }

        /**
         * build a text DOM element, supporting other jquery text form-control's
         * @return {Object} DOM Element to be injected into the form.
         */
        build() {
            let html = [
                '<input type="hidden" name="' + this.config.name + '" id="' + this.config.name + '" />',
                '<div class="divRichText" id="richtext-' + this.config.name + '">',
                '<div class="documenttext">',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere, eros quis ullamcorper commodo, est nulla rhoncus velit, in pellentesque metus felis nec justo.',
                '</div>',
                '</div>'
            ];
            return html.join('');
        }

        /**
         * onRender callback
         */
        onRender() {
            let $val = $('#' + this.config.name);
            const value = this.config.value;
            if (value) {
                $('#richtext-' + this.config.name).html(value);
                //$val.val(value);
                //$val.trigger('change');
            }
            let $target = $('#richtext-' + this.config.name);
            //$target.on('blur keyup paste input', '[contenteditable]', function () {
            //    $val.val($target.find('.documenttext').wrapAll('<div />').parent().html());
            //    $val.trigger('change');
            //});
            $target.LightTextEditor();
        }

        on(eventType) {
            if (eventType == 'prerender' && this.preview) {
                return (element) => {
                    if (this.field) {
                        element = this.field;
                    }

                    // if this is a preview, stop events bubbling up so the editor preview is clickable (and not draggable)
                    $(element).on('mousedown', (e) => {
                        e.stopPropagation();
                    });
                };
            }
            return super.on(eventType);
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('richtext', controlRichtext);
    return controlRichtext;
});