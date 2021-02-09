using Cbuilder.Core.Helper.Models;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;

namespace Cbuilder.Core.Helper
{
    public class MethodInvoke
    {
        public object Invoke(string namespaces, string classnames, string methodName, object[] args)
        {
            Type type = Type.GetType(namespaces + "." + classnames + ", " + namespaces);
            object instance = Activator.CreateInstance(type, null);
            MethodInfo method = type.GetMethod(methodName);
            return method.Invoke(instance, args);
        }
        public object Invoke(ControllerDetail controllerDetail)
        {
            return Invoke(controllerDetail.Namespaces, controllerDetail.ClassNames, controllerDetail.MethodNames, controllerDetail.Args);
        }
        public ControllerDetail Execute(ControllerDetail controllerDetail, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker)
        {
            string[] urlParams = objReuseableParams.UrlParameters;
            try
            {
                switch (controllerDetail?.Type)
                {
                    case "URL":
                        {
                            List<object> objList = new List<object>();
                            if (!string.IsNullOrEmpty(controllerDetail.Parameters))
                            {
                                string[] allParameters = controllerDetail.Parameters.Split('#');
                                if (allParameters.Length > 0 && !string.IsNullOrEmpty(allParameters[0]))
                                {
                                    string[] para = allParameters[0].Split(',');
                                    int urlLen = urlParams == null ? 0 : urlParams.Length;
                                    int argLen = para.Length;
                                    for (int j = 0; j < argLen; j++)
                                    {
                                        object arg = string.Empty;
                                        int position = -1;
                                        bool parsed = int.TryParse(para[j], out position);
                                        if (parsed)
                                        {
                                            for (int i = 0; i < urlLen; i++)
                                            {
                                                if (i == position)
                                                {
                                                    arg = urlParams[i];
                                                    break;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            arg = ParseARGs(para[j].ToString(), objReuseableParams);
                                        }
                                        objList.Add(arg);
                                    }
                                }
                                if (allParameters.Length == 2)
                                {
                                    objList.AddRange(ParamsToArgsList(allParameters[1], objReuseableParams));
                                }
                            }
                            if (objList.Count == 0)
                                controllerDetail.Args = null;
                            else
                                controllerDetail.Args = objList.ToArray();
                        }
                        break;
                    case "method":
                        {
                            controllerDetail.Args = ParamsToArgsObject(controllerDetail.Parameters, objReuseableParams);
                        }
                        break;
                }
                if (controllerDetail?.ComponentID?.Trim() == "apps_extra_components")
                {
                    lstApsExtraCompsInvoker.Add(controllerDetail);
                }
                else
                {
                    object resultInvoke = Invoke(controllerDetail);
                    if (resultInvoke != null)
                    {
                        controllerDetail.ErrorOccured = false;
                        controllerDetail.Result = new object[1];
                        controllerDetail.Result[0] = resultInvoke;
                        controllerDetail.Args = null;// set Null after invocation. if serialization not work for http context
                    }
                }
            }
            catch (Exception ex)
            {
                controllerDetail.ErrorOccured = true;
                controllerDetail.Error = new object[1];
                controllerDetail.Error[0] = ex.ToString();
            }
            return controllerDetail;
        }
        private List<object> ParamsToArgsList(string parameters, ReuseableParams objReuseableParams)
        {
            List<object> objList = new List<object>();
            if (!string.IsNullOrEmpty(parameters))
            {
                string[] args = parameters.Split(',');
                for (int i = 0, length = args.Length; i < length; i++)
                {
                    //if (args[i].Length > 0)
                    //{
                    object arg = ParseARGs(args[i], objReuseableParams);
                    objList.Add(arg);
                    //}
                }
            }
            return objList;
        }

        private object[] ParamsToArgsObject(string parameters, ReuseableParams objReuseableParams)
        {
            List<object> objList = ParamsToArgsList(parameters, objReuseableParams);
            if (objList.Count == 0)
                return null;
            else
                return objList.ToArray();
        }
        private object ParseARGs(string args, ReuseableParams objReuseableParams)
        {
            object arg = args;
            switch (args.ToLower())
            {
                case "%username%":
                    arg = objReuseableParams.UserName;
                    break;
                case "%hosturl%":
                    arg = objReuseableParams.HostURL;
                    break;
                case "%userimage%":
                    arg = objReuseableParams.UserImage;
                    break;
                case "$siteid$":
                    arg = objReuseableParams.SiteID.ToString();
                    break;
                case "%siteid%":
                    arg = objReuseableParams.SiteID.ToString();
                    break;
                case "%currentroleids%":
                    arg = objReuseableParams.CurrentRoleIDs;
                    break;
                case "%culturecode%":
                    arg = objReuseableParams.Culture;
                    break;
                case "%httpcontextaccessor%":
                    arg = objReuseableParams.HttpContextAccessor;
                    break;
                case "%cache%":
                    arg = objReuseableParams.MemoryCache;
                    break;
            }
            return arg;
        }
    }
}
