$(function () {
    var IdentityAction = {
        Init: function () {
            let $this = this;           
            $this.Events();
        },       
        Events: function () {
            let $this = this;            
            $("#actionList").find(".identityAction").on("change", function () {
               
                var actions = $(".identityAction").map(function () {
                    let $this = $(this);
                    if ($this.is(":checked")) {
                        return $this.val();
                    }
                }).get().join(',');
                $("#PageAction_SelectedIdentity").val(actions);
            });
        }   
       
    }
    IdentityAction.Init();
});