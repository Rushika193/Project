using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Theme
{
    public static class PredefinedCSS
    {

        public static string[] buttonSelectors = new string[] {".btn", ".btn.round",
                                                                ".btn.primary", ".btn.primary:hover",".btn.primary-outline",".btn.primary-outline:hover",
                                                                ".btn.secondary",".btn.secondary:hover",".btn.secondary-outline",".btn.secondary-outline:hover",
                                                                ".btn.success",".btn.success:hover",".btn.success-outline",".btn.success-outline:hover",
                                                                ".btn.info",".btn.info:hover",".btn.info-outline",".btn.info-outline:hover",
                                                                ".btn.warning",".btn.warning:hover",".btn.warning-outline",".btn.warning-outline:hover",
                                                                ".btn.danger",".btn.danger:hover",".btn.danger-outline",".btn.danger-outline:hover",
                                                                ".btn.light",".btn.light:hover", ".btn.light-outline",".btn.light-outline:hover",
                                                                ".btn.dark",".btn.dark:hover",".btn.dark-outline",".btn.dark-outline:hover"
                                                                 };

        public static string[] textColorSelectors = new string[] { ".color-primary", ".color-secondary", ".color-success", ".color-info", 
                                                                ".color-warning", ".color-danger", ".color-light", ".color-dark" };

        public static string[] linkSelectors = new string[] { ".link-primary", ".link-primary:hover", ".link-secondary", ".link-secondary:hover",
                                                                ".link-success",".link-success:hover",".link-info",".link-info:hover",
                                                                ".link-warning",".link-warning:hover",".link-danger",".link-danger:hover",
                                                                ".link-light",".link-light:hover",".link-dark",".link-dark:hover"
                                                            };


        public static string[] backgroundSelectors = new string[] { ".bg-primary", ".bg-secondary", ".bg-success", ".bg-info", 
                                                                    ".bg-warning", ".bg-danger", ".bg-light", ".bg-dark" };

        public static string[] pillsSelectors = new string[] { ".pills", ".pills-primary", ".pills-primary:hover", ".pills-secondary", ".pills-secondary:hover",
                                                               ".pills-success",".pills-success:hover",".pills-info",".pills-info:hover",
                                                               ".pills-warning",".pills-warning:hover",".pills-danger",".pills-danger:hover",
                                                               ".pills-light",".pills-light:hover",".pills-dark",".pills-dark:hover"
                                                                };



        public static string[] capsuleSelectors = new string[] {".capsule", ".capsule-primary", ".capsule-primary:hover", ".capsule-secondary", ".capsule-secondary:hover",
                                                               ".capsule-success",".capsule-success:hover",".capsule-info",".capsule-info:hover",
                                                               ".capsule-warning",".capsule-warning:hover",".capsule-danger",".capsule-danger:hover",
                                                               ".capsule-light",".capsule-light:hover",".capsule-dark",".capsule-dark:hover"
                                                                };



        public static string[] badgeSelectors=new string[]{ ".badge", ".badge-primary", ".badge-secondary", ".badge-success", ".badge-info", 
                                                            ".badge-warning", ".badge-danger", ".badge-light", ".badge-dark", };


        public static string[] alertBoxSelectors = new string[] { ".act-message.primary", ".act-message.secondary", ".act-message.success", ".act-message.info",
                                                                  ".act-message.warning",".act-message.danger",".act-message.light",".act-message.dark" };




        //public static string[] arrThemes = new string[] { "primary", "secondary", "success", "info", "warning", "danger", "light", "dark" };

        //public static string[] primarySelectors = new string[] { ".btn.primary", ".btn.primary:hover", ".btn.primary-outline", ".btn.primary-outline:hover",
        //                                                         ".color-primary",".link-primary",".link-primary:hover",".bg-primary",".pills-primary",".pills-primary:hover",
        //                                                        ".capsule-primary",".capsule-primary:hover",
        //                                                        ".badge-primary",
        //                                                        ".act-message.Primary"};


        //public static string[] secondarySelectors = new string[] { ".btn.secondary", ".btn.secondary:hover", ".btn.secondary-outline", ".btn.secondary-outline:hover",
        //                                                         ".color-secondary",".link-secondary",".link-secondary:hover",".bg-secondary",".pills-secondary",".pills-secondary:hover",
        //                                                        ".capsule-secondary",".capsule-secondary:hover",
        //                                                        ".badge-secondary",
        //                                                        ".act-message.Secondary"};

        //public static string[] successSelectors = new string[] { ".btn.success", ".btn.success:hover", ".btn.success-outline", ".btn.success-outline:hover",
        //                                                         ".color-success",".link-success",".link-success:hover",".bg-success",".pills-success",".pills-success:hover",
        //                                                        ".capsule-success",".capsule-success:hover",
        //                                                        ".badge-success",
        //                                                        ".act-message.Success"};


        //public static string[] infoSelectors = new string[] { ".btn.info", ".btn.info:hover", ".btn.info-outline", ".btn.info-outline:hover",
        //                                                         ".color-info",".link-info",".link-info:hover",".bg-info",".pills-info",".pills-info:hover",
        //                                                        ".capsule-info",".capsule-info:hover",
        //                                                        ".badge-info",
        //                                                        ".act-message.Info"};


        //public static string[] warningSelectors = new string[] { ".btn.warning", ".btn.warning:hover", ".btn.warning-outline", ".btn.warning-outline:hover",
        //                                                         ".color-warning",".link-warning",".link-warning:hover",".bg-warning",".pills-warning",".pills-warning:hover",
        //                                                        ".capsule-warning",".capsule-warining:hover",
        //                                                        ".badge-warning",
        //                                                        ".act-message.Warning"};


        //public static string[] dangerSelectors = new string[] { ".btn.danger", ".btn.danger:hover", ".btn.danger-outline", ".btn.danger-outline:hover",
        //                                                         ".color-danger",".link-danger",".link-danger:hover",".bg-danger",".pills-danger",".pills-danger:hover",
        //                                                        ".capsule-danger",".capsule-danger:hover",
        //                                                        ".badge-danger",
        //                                                        ".act-message.Danger"};

        //public static string[] lightSelectors = new string[] { ".btn.light", ".btn.light:hover", ".btn.light-outline", ".btn.light-outline:hover",
        //                                                         ".color-light",".link-light",".link-light:hover",".bg-light",".pills-light",".pills-light:hover",
        //                                                        ".capsule-light",".capsule-light:hover",
        //                                                        ".badge-light",
        //                                                        ".act-message.Light"};


        //public static string[] darkSelectors = new string[] { ".btn.dark", ".btn.dark:hover", ".btn.dark-outline", ".btn.dark-outline:hover",
        //                                                         ".color-dark",".link-dark",".link-dark:hover",".bg-dark",".pills-dark",".pills-dark:hover",
        //                                                        ".capsule-dark",".capsule-dark:hover",
        //                                                        ".badge-dark",
        //                                                        ".act-message.Dark"};












    }




}
