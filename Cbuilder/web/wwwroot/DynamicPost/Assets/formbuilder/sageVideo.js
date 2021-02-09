if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Sage Video class
     */
    class controlSageVideo extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '',
                i18n: {
                    default: 'Video'
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
            let videoHolder = `<div id="sagevideo-${this.config.name}"></div>`;
            let providerDD = `<div class="form-group">
	                            <label for="sagevideo-provider-${this.config.name}">Provider</label>
	                            <div class="input-wrap">
		                            <select id="sagevideo-provider-${this.config.name}" name="sagevideo-provider" class="form-control">
			                            <option label="Youtube" value="youtube">Youtube</option>
		                            </select>
	                            </div>
                            </div>`;
            let input = `<div class="form-group">
	                            <label for="sagevideo-url-${this.config.name}">Url</label>
	                            <div class="input-wrap">
		                            <input type="text" id="sagevideo-url-${this.config.name}" name="sagevideo-url" class ="form-control">
	                            </div>
                            </div>`;
            this.input = this.markup('input', null, { type: 'hidden', name: this.config.name, id: this.config.name });
            this.wrapper = this.markup('div', videoHolder + providerDD + input, { id: this.config.name + '-wrapper' });
            return [this.input, this.wrapper];
        }

        /**
         * onRender callback
         */
        onRender() {
            let $videoHolder = $('#sagevideo-' + this.config.name);
            let $input = $('#sagevideo-url-' + this.config.name);
            let $val = $('#' + this.config.name);
            let $providerDD = $('#sagevideo-provider-' + this.config.name);
            const value = this.config.value;
            try {
                let vJSON = JSON.parse(value);
                $providerDD.val(vJSON.provider);
                $videoHolder.html(this.getVideoCode(vJSON));
                $input.val(vJSON.url);
                $val.val(value);
            } catch (e) {
                //
            }
            $input.off().on('blur', function () {
                let r = {
                    provider: $providerDD.val(),
                    url: $input.val().trim()
                };
                $val.val(JSON.stringify(r));
                $val.trigger('change');
            });
        }

        getVideoCode(data) {
            let code = "";
            switch (data.provider) {
                case 'youtube':
                    let url = 'https://www.youtube.com/embed/';
                    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    var match = data.url.trim().match(regExp);
                    if (match && match[2].length == 11) {
                        url += match[2];
                        code = `<iframe style="width: 200px; height: 200px; border: none;" src="${url}"></iframe>`;
                    }
                    break;
            }
            return code;
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('sageVideo', controlSageVideo);
    return controlSageVideo;
});