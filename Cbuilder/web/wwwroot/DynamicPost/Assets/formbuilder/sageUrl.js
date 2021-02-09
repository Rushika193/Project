if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Url class
     */
    class controlSageUrl extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '',
                i18n: {
                    default: 'URL'
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
            let config = { type: 'text', name: this.config.name, id: this.config.name };
            if (this.config.placeholder) {
                config.placeholder = this.config.placeholder;
            }
            this.input = this.markup('input', null, config);
            return this.input;
        }

        /**
         * onRender callback
         */
        onRender() {
            const value = this.config.value;
            if (value) {
                $('#' + this.config.id).val(value);
            }
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('sageUrl', controlSageUrl);
    return controlSageUrl;
});