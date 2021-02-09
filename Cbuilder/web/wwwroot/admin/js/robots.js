$(function () {
    $('.chkDisallowed').on('click', function () {
        let disallowedPages = [];
        $('.pagename').each(function () {
            let $this = $(this);
            if ($this.find('.chkDisallowed').is(':checked'))
                disallowedPages.push($this.find('label').text());
        });
        $('.disallowedPages').val(disallowedPages.join(","));
    });

    $('.selectrobotType').on('change', function () {
        let selected = $(this).val();
        alert(selected)
        $('.selectedType').hide();
        $('[data-type=' + selected + ']').show();
    });
});