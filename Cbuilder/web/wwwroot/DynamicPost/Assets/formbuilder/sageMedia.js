if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Sage Media class
     */
    class controlSageMedia extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '',
                i18n: {
                    default: 'Image'
                }
            };
        }

        /**
         * javascript & css to load
         */
        configure() {
            //if (typeof $.fn.SageMedia == 'undefined') {
            //    this.js = '/js/SageMediaManagement.js';
            //}
            //this.css = '//';
        }

        /**
         * build a text DOM element, supporting other jquery text form-control's
         * @return {Object} DOM Element to be injected into the form.
         */
        build() {
            this.imgPlHld = '<img src="/DynamicPost/Assets/images/image_placeholder.png" class="imgPlHld" />';
            let btn = '<input type="button" value="Select Image" class="smbtn" id="smbtn-' + this.config.name + '">';
            let imgHolder = '<div class="smimghld" id="smimg-' + this.config.name + '">' + this.imgPlHld + '</div>';
            let imgDel = '<a href="#" style="display:none" class="smimgdel" id="smimgdel-' + this.config.name + '">Remove</a>';
            this.input = this.markup('input', null, { type: 'hidden', name: this.config.name, id: this.config.name });
            this.wrapper = this.markup('div', btn + imgHolder + imgDel, { id: this.config.name + '-wrapper', class: 'smwrapper' });
            return [this.input, this.wrapper];
        }

        /**
         * onRender callback
         */
        onRender() {
            let imgPlHld = this.imgPlHld;
            let $del = $('#smimgdel-' + this.config.name);
            let $btn = $('#smbtn-' + this.config.name);
            let $img = $('#smimg-' + this.config.name);
            let $val = $('#' + this.config.name);
            const value = this.config.value;
            try {
                let vJSON = JSON.parse(value);
                $img.html(vJSON.html);
                $val.val(value);
                $del.show();
            } catch (e) {
                //console.log("sage media no value");
            }
            $btn.off('click').on('click', function () {
              let sagemedia = $(this).SageMedia({
                    userModuleID: dynCmpUserModuleID,
                    onSelect: function (src, response, type, filename, extension) {
                        //
                    },
                mediaType: 'image',
                extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                   
              });   
              sagemedia.Show(function (r) {
                $img.html(r.html);
                $val.val(JSON.stringify(r));
                $val.trigger('change');
                $del.show();
              });
            });
            $del.off('click').on('click', function (e) {
                e.preventDefault();
                SageConfirmDialog('Are you sure?').done(function () {
                    $img.html(imgPlHld);
                    $val.val('');
                    $val.trigger('change');
                    $del.hide();
                });
            });
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('sageMedia', controlSageMedia);
    return controlSageMedia;
});