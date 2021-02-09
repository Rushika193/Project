using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Cbuilder.Webbuilder
{
    public class ControllerInoker
    {
        public async Task<Dictionary<string, ControllerDetail>> EditLoadAPI(string pageName, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            IList<ControllerDetail> objControllersList = await objDataProvider.GetAPIList(pageName, siteID);
            //objReuseableParams.UrlParameters = objReuseableParams?.UrlParameters?.Skip(1).ToArray();
            return await ResultInvoke(objControllersList, objReuseableParams, lstApsExtraCompsInvoker);
        }

        public async Task<Dictionary<string, ControllerDetail>> ViewLoadAPI(string pageName, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            IList<ControllerDetail> objControllersList = await objDataProvider.GetAPIList(pageName, siteID);
            return await ResultInvoke(objControllersList, objReuseableParams, lstApsExtraCompsInvoker);
        }
        public async Task<Dictionary<string, ControllerDetail>> ViewLoadAPIPublished(string pageName, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            List<ControllerDetail> objControllersList = objDataProvider.GetAPIListPublished(pageName, siteID);
            return await ResultInvoke(objControllersList, objReuseableParams, lstApsExtraCompsInvoker);
        }

        private Task<Dictionary<string, ControllerDetail>> ResultInvoke(IList<ControllerDetail> objControllers, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker)
        {
            Dictionary<string, ControllerDetail> result = new Dictionary<string, ControllerDetail>();
            MethodInvoke methodInvoke = new MethodInvoke();
            foreach (ControllerDetail item in objControllers)
            {
                ControllerDetail controllerDetail = methodInvoke.Execute(item, objReuseableParams, lstApsExtraCompsInvoker);
                if (!result.ContainsKey(controllerDetail.ComponentID.Trim()))
                    result.Add(controllerDetail.ComponentID.Trim(), item);
            }
            return Task.FromResult(result);
        }
    }
}
//examples
//https://stackoverflow.com/questions/801070/dynamically-invoking-any-function-by-passing-function-name-as-string
//public void Invokers()
//{
//    // Default constructor, void method
//    ControllerInoker.CreateAndInvoke("Test.Tester", null, "TestMethod", null);

//    // Constructor that takes a parameter
//    ControllerInoker.CreateAndInvoke("Test.Tester", new[] { "constructorParam" }, "TestMethodUsingValueFromConstructorAndArgs", new object[] { "moo", false });

//    // Constructor that takes a parameter, invokes a method with a return value
//    string result = (string)ControllerInoker.CreateAndInvoke("Test.Tester", new object[] { "constructorValue" }, "GetContstructorValue", null);
//    //Console.WriteLine("Expect [constructorValue], got:" + result);

//    // Console.ReadKey(true);
//}