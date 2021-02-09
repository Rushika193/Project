using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Cbuilder.Core.Helper
{
    public class XMLHelper
    {
        public string SerializeXML<T>(T value, string rootName = null, bool OmitXmlDeclaration = false)
        {
            if (value == null)
            {
                return string.Empty;
            }
            try
            {
                XmlSerializer xmlserializer;
                if (string.IsNullOrEmpty(rootName))
                    xmlserializer = new XmlSerializer(typeof(T));
                else
                    xmlserializer = new XmlSerializer(typeof(T), new XmlRootAttribute(rootName));
                XmlSerializerNamespaces namespaces = new XmlSerializerNamespaces();

                var stringWriter = new StringWriter();
                XmlWriterSettings settings = new XmlWriterSettings();
                settings.OmitXmlDeclaration = OmitXmlDeclaration;
                using (var writer = XmlWriter.Create(stringWriter, settings))
                {
                    xmlserializer.Serialize(writer, value);
                    return stringWriter.ToString();
                }
            }
            catch
            {
                throw;
            }
        }
        public string SerializeXML<T>(T value, Dictionary<string, string> nameSpaces = null, string rootName = null, bool OmitXmlDeclaration = false)
        {
            if (value == null)
            {
                return string.Empty;
            }
            try
            {
                XmlSerializer xmlserializer;
                if (string.IsNullOrEmpty(rootName))
                    xmlserializer = new XmlSerializer(typeof(T));
                else
                    xmlserializer = new XmlSerializer(typeof(T), new XmlRootAttribute(rootName));
                XmlSerializerNamespaces namespaces = new XmlSerializerNamespaces();
                if (namespaces != null)
                    foreach (var item in nameSpaces)
                    {
                        namespaces.Add(item.Key, item.Value);
                    }
                var stringWriter = new StringWriter();
                XmlWriterSettings settings = new XmlWriterSettings();
                settings.OmitXmlDeclaration = OmitXmlDeclaration;
                using (var writer = XmlWriter.Create(stringWriter, settings))
                {
                    xmlserializer.Serialize(writer, value, namespaces);
                    return stringWriter.ToString();
                }
            }
            catch
            {
                throw;
            }
        }
        public object DeserializeXML<T>(string xmlData)
        {
            XmlSerializer ser = new XmlSerializer(typeof(T));
            using (StringReader sr = new StringReader(xmlData))
            {
                return (T)ser.Deserialize(sr);
            }
        }
    }
}
