namespace Cbuilder.SecurityHelper
{
    public class EncryptionHelper
    {
        /// <summary>
        /// encrypt string 
        /// </summary>
        /// <param name="plainText">string to be encrypted</param>
        /// <returns>cipher text</returns>
        public void EncryptString(string plainText, out string cipherText, out string saltValue)
        {
            Encryption objEncrypt = new Encryption();
            objEncrypt.Encrypt(plainText, out cipherText, out saltValue);
        }

        /// <summary>
        /// decrypt strint
        /// </summary>
        /// <param name="cipherText">string to be decrypted</param>
        /// <returns>plain text</returns>
        public void DecryptString(string cipherText, string saltValue, out string plainText)
        {
            Encryption objEncrypt = new Encryption();
            objEncrypt.Decrypt(cipherText, saltValue, out plainText);
        }
    }
}
