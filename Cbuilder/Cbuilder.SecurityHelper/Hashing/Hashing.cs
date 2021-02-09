using System;
using System.Security.Cryptography;
using System.Text;

namespace Cbuilder.SecurityHelper
{
    /// <summary>
    /// One way hashing used for the token
    /// </summary>
    public class Hashing
    {
        /// <summary>
        /// the hash key
        /// </summary>
        public string Hash = string.Empty;
        /// <summary>
        /// Hash the given data
        /// </summary>
        /// <param name="data">data to hash in byte</param>
        /// <param name="privateKey">key to hash the data</param>
        public Hashing(byte[] data, string privateKey)
        {
            byte[] key = Encoding.UTF8.GetBytes(privateKey);
            var alg = new HMACSHA512(key);
            var hashed = alg.ComputeHash(data);
            Hash = Convert.ToBase64String(hashed);
        }

        public Hashing(string data, string privateKey)
        {
            byte[] key = Encoding.UTF8.GetBytes(privateKey);
            byte[] byteData = Encoding.UTF8.GetBytes(data);
            var alg = new HMACSHA512(key);
            var hashed = alg.ComputeHash(byteData);
            Hash = Convert.ToBase64String(hashed);
        }
    }
}
