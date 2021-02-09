using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Cbuilder.Theme
{
    public class ThemeManagement
    {
        public List<MainComponentSettings> MapRulesToComponent(List<CssParserRule> lstRules)
        {
            List<ComponentSettings> lstComponents = new List<ComponentSettings>();
            List<SubComponentSettings> lstSubComponents = new List<SubComponentSettings>();

            IEnumerable<CssParserDeclaration> lstDeclarations = new List<CssParserDeclaration>();

            for (int i = 0; i < lstRules.Count; i++)
            {
                lstDeclarations = lstRules[i].Declarations;


                CssParserDeclaration nameDeclaration = new CssParserDeclaration();
                nameDeclaration.Value = string.Empty;

                
                bool hasMainComponent = lstDeclarations.Any(x => x.Property == CSSProperties.ComponentName);
                bool isSubComponent = lstDeclarations.Any(x => x.Property == CSSProperties.SubComponentName);
                bool isPredefinedThemeSelector = !hasMainComponent;

                if(hasMainComponent)
                    nameDeclaration = lstDeclarations.Where(x => x.Property.ToLower() == CSSProperties.ComponentName.ToLower()).ToList()[0];



                if (!isSubComponent || isPredefinedThemeSelector)
                {
                    ComponentSettings componentSettings = new ComponentSettings();
                    componentSettings.ComponentName = nameDeclaration.Value;
                    componentSettings.Rules.Add(lstRules[i]);
                    componentSettings.IsPredefinedThemeSelector = isPredefinedThemeSelector;
                    lstComponents.Add(componentSettings);

                }
                else
                {
                    SubComponentSettings subComponentSettings = new SubComponentSettings();
                    subComponentSettings.ComponentName = nameDeclaration.Value;
                    subComponentSettings.SubComponentName = lstDeclarations.Where(x => x.Property.ToLower() == CSSProperties.SubComponentName.ToLower()).ToList()[0].Value;
                    subComponentSettings.Rules.Add(lstRules[i]);
                    lstSubComponents.Add(subComponentSettings);
                }


            }


            List<MainComponentSettings> lstMainComponents = new List<MainComponentSettings>();

            foreach (ComponentSettings obj in lstComponents)
            {
                MainComponentSettings mainComponent = new MainComponentSettings();
                mainComponent.ComponentName = obj.ComponentName;
                mainComponent.Rules = obj.Rules;
                mainComponent.IsPredefinedThemeSelector = obj.IsPredefinedThemeSelector;
                mainComponent.SubComponents = lstSubComponents.FindAll(x => x.ComponentName == obj.ComponentName && x.ComponentName!=string.Empty);
                lstMainComponents.Add(mainComponent);
            }


            return lstMainComponents;
        }


        public int SaveCSSFile(List<CSSRuleInfo> lstRules, string filePath)
        {
            int result = 1;

            try
            {
                saveCSSFile(lstRules, filePath);
            }
            catch
            {

                result = 0;
            }

            return result;

        }


        public int ResetThemeSettings(string sourceFile, string destinationFile)
        {
            int result = 1;

            try
            {
                result = resetThemeSettings(sourceFile, destinationFile);
            }
            catch (Exception ex)
            {

                result = 0;
            }


            return result;
        }


        private void saveCSSFile(List<CSSRuleInfo> lstRules, string filePath)
        {

            StringBuilder strCSS = new StringBuilder();
            List<CSSPropVal> lstProps = new List<CSSPropVal>();
            for (int i = 0; i < lstRules.Count; i++)
            {
                strCSS.AppendFormat("\n{0} {{\n", lstRules[i].SelectorName);

                lstProps = lstRules[i].CSSProperties;

                foreach (CSSPropVal obj in lstProps)
                    strCSS.AppendFormat("\t{0}:{1};\n", obj.CSSProperty, obj.CSSValue);


                strCSS.Append("}\n");

            }

            System.IO.File.WriteAllText(filePath, strCSS.ToString());



        }


        private int resetThemeSettings(string sourceFile, string destinationFile)
        {
            int result = 0;
            if (System.IO.File.Exists(sourceFile))
            {
                string resetCSSText = System.IO.File.ReadAllText(sourceFile);
                System.IO.File.WriteAllText(destinationFile, resetCSSText);
                result = 1;
            }

            return result;
        }


    }
}
