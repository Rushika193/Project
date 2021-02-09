using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
//using SkiaSharp;

namespace Cbuilder.Core.MediaManagement
{
    public class ImageOptimize
    {
        /// <summary>
        /// Optimize images and save thumbnail to media management folder 
        /// </summary>
        /// <param name="rootPath"></param>
        /// <param name="tempPath"></param>
        /// <param name="strBaseLocation"></param>
        /// <param name="newFileName"></param>
        /// <param name="extension"></param>
        public void OptimizeImage(string rootPath, string tempPath, string strBaseLocation, string newFileName, string extension)
        {
            //FileInfo objImage = new FileInfo(originalPath);
            string orginalPath = Path.Combine(rootPath, MediaHelper.originalThumbPath, strBaseLocation, newFileName);  //HttpContext.Current.Server.MapPath(MediaHelper.orginalThumbPath , strBaseLocation) , newFileName;
            string thumbLargePath = Path.Combine(rootPath, MediaHelper.largeThumbPath, strBaseLocation, newFileName); //HttpContext.Current.Server.MapPath(MediaHelper.largeThumbPath , strBaseLocation) , newFileName;
            string thumbMediumPath = Path.Combine(rootPath, MediaHelper.mediumThumbPath, strBaseLocation, newFileName); //HttpContext.Current.Server.MapPath(MediaHelper.mediumThumbPath , strBaseLocation) , newFileName;
            string small = Path.Combine(rootPath, strBaseLocation, newFileName);

            List<MediaThubnailInfo> savePath = new List<MediaThubnailInfo>();
            savePath.Add(new MediaThubnailInfo(orginalPath, 1920));
            savePath.Add(new MediaThubnailInfo(thumbLargePath, 1320));
            savePath.Add(new MediaThubnailInfo(thumbMediumPath, 720));
            savePath.Add(new MediaThubnailInfo(small, 320));
            ResizeImages(tempPath,true, extension, savePath);

        }
        public List<MediaThubnailInfo> GetStandardThubnails( string basePath, string filename)
        {
            List<MediaThubnailInfo> lst = new List<MediaThubnailInfo>();
            lst.Add(new MediaThubnailInfo(Path.Combine( basePath, "extlarge"), filename, 1920));
            lst.Add(new MediaThubnailInfo(Path.Combine( basePath, "large"), filename, 1320));
            lst.Add(new MediaThubnailInfo(Path.Combine( basePath, "medium"), filename, 720));
            lst.Add(new MediaThubnailInfo(Path.Combine( basePath, "small"), filename, 320));
            return lst;
        }
        /// <summary>
        /// optimize image and save thumbnail to any location pass by method invoker.
        /// </summary>
        /// <param name="tempFullPath">temporary uploaded original file location. It will clean after optimize</param>
        /// <param name="extension">file extension</param>
        /// <param name="thumbnailfullPath">Full thumnail path with web root path</param>
        public void OptimizeImage(string originalFilePath,bool deleteOriginal, string extension, List<MediaThubnailInfo> thumbnailfullPath)
        {
            ResizeImages(originalFilePath, deleteOriginal, extension, thumbnailfullPath);
        }
        private void ResizeImages(string originalImagePath, bool removeTemp, string extension, List<MediaThubnailInfo> mediaThubnails)
        {

            //string filePath = rootPath , newFileName;
            if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "webp")
            {
                Bitmap img = new Bitmap(originalImagePath);

                int height = img.Height;
                int width = img.Width;
                img.Dispose();
                double[] ratio = CalculateImageRatio(height, width);
                int ratioLength = ratio.Length;
                //File.Copy(inputPath, orginalPath);
                Image image = Image.FromFile(originalImagePath);

                using (Image sourceImage = image)
                {
                    if (sourceImage != null)
                    {
                        for (int i = 0; i < ratioLength; i++)
                        {
                            int newHeight = (int)Math.Ceiling(height * ratio[i]);
                            int newwidth = (int)Math.Ceiling(width * ratio[i]);
                            //ResizeImage(image, newwidth, newHeight, savePath[i]);
                            CropImage(sourceImage, mediaThubnails[i].FullFilePath, width, height, newwidth, newHeight);
                        }
                    }
                }

                image.Dispose();
                //using (var input = File.OpenRead(tempPath))
                //{
                //    using (var inputStream = new SKManagedStream(input))
                //    {
                //        using (var original = SKBitmap.Decode(inputStream))
                //        {
                //            //for png images we add this
                //            if (original.ColorType != SKImageInfo.PlatformColorType)
                //            {
                //                original.CopyTo(original, SKImageInfo.PlatformColorType);
                //            }
                //            int height = original.Height;
                //            int width = original.Width;
                //            double[] ratio = CalculateImageRatio(height, width);
                //            int quality = 80;
                //            int ratioLength = ratio.Length;
                //            //File.Copy(inputPath, orginalPath);
                //            //https://github.com/mono/SkiaSharp/issues/532 limitation here for skiasharp

                //            for (int i = 0; i < ratioLength; i++)
                //            {
                //                int newHeight = (int)Math.Ceiling(height * ratio[i]);
                //                int newwidth = (int)Math.Ceiling(width * ratio[i]);

                //                //SKBitmap resized = original;
                //                //if (ratio[i] == 1)
                //                //{
                //                //    resized = SKBitmap.Decode(tempPath);
                //                //}
                //                //else
                //                //    resized = original.Resize(new SKImageInfo(newwidth, newHeight),SKFilterQuality.High); //original.Resize(new SKImageInfo(newwidth, newHeight), SKBitmapResizeMethod.Lanczos3);
                //                //if (resized != null)
                //                //{
                //                //    using (resized)
                //                //    {
                //                //        using (var image = SKImage.FromBitmap(resized))
                //                //        {
                //                //            string outFileName = savePath[i];
                //                //            using (var output = File.OpenWrite(outFileName))
                //                //            {
                //                //                SKEncodedImageFormat imageFormat = GetImageFormat(extension.Replace(".", ""));
                //                //                image.Encode(imageFormat, quality).SaveTo(output);
                //                //            }
                //                //        }
                //                //    }
                //                //}
                //            }
                //        }
                //    }
                //}
            }
            else
            {
                int filesaveLength = mediaThubnails.Count;
                for (int i = 0; i < filesaveLength; i++)
                {
                    File.Copy(originalImagePath, mediaThubnails[i].FullFilePath);
                }
            }
            if (removeTemp)
                File.Delete(originalImagePath);
        }
        public void ResizeImage(Image image, int width, int height, string destPath)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            //destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            destImage.Save(destPath);
            destImage.Dispose();
        }

        private void CropImage(Image sourceImage, string destPath, int sourceWidth, int sourceHeight, int destinationWidth, int destinationHeight)
        {
            Image destinationImage = new Bitmap(destinationWidth, destinationHeight);
            using (Graphics g = Graphics.FromImage(destinationImage))
                g.DrawImage(
                  sourceImage,
                  new Rectangle(0, 0, destinationWidth, destinationHeight),
                  new Rectangle(0, 0, sourceWidth, sourceHeight),
                  GraphicsUnit.Pixel
                );
            destinationImage.Save(destPath);
            destinationImage.Dispose();
        }

        public static T FromString<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value.ToUpper());
        }
        //private SKEncodedImageFormat GetImageFormat(string extension)
        //{
        //    SKEncodedImageFormat imgFormat;
        //    switch (extension)
        //    {
        //        case "jpeg":
        //        case "jpg":
        //            imgFormat = SKEncodedImageFormat.Jpeg;
        //            break;
        //        case "bmp":
        //            imgFormat = SKEncodedImageFormat.Bmp;
        //            break;
        //        case "gif":
        //            imgFormat = SKEncodedImageFormat.Gif;
        //            break;
        //        case "ico":
        //            imgFormat = SKEncodedImageFormat.Ico;
        //            break;
        //        case "png":
        //            imgFormat = SKEncodedImageFormat.Png;
        //            break;
        //        case "wbmp":
        //            imgFormat = SKEncodedImageFormat.Wbmp;
        //            break;
        //        case "webp":
        //            imgFormat = SKEncodedImageFormat.Webp;
        //            break;
        //        case "pkm":
        //            imgFormat = SKEncodedImageFormat.Pkm;
        //            break;
        //        case "ktx":
        //            imgFormat = SKEncodedImageFormat.Ktx;
        //            break;
        //        case "astc":
        //            imgFormat = SKEncodedImageFormat.Astc;
        //            break;
        //        case "dng":
        //            imgFormat = SKEncodedImageFormat.Dng;
        //            break;
        //        default:
        //            imgFormat = SKEncodedImageFormat.Jpeg;
        //            break;
        //    }

        //    return imgFormat;
        //}

        private double[] CalculateImageRatio(int imageHeight, int imagewidth)
        {
            double[] ratio = { 1, 0.8, 0.6, 0.5 };
            int[] imageSizes = { imagewidth, imagewidth, imagewidth, imagewidth };
            if (imagewidth > 1920)
                imageSizes = new[] { 1920, 1320, 720, 320 };
            else if (imagewidth > 720)
                imageSizes = new[] { imagewidth, 1320, 720, 320 };
            else if (imagewidth > 720)
                imageSizes = new[] { imagewidth, imagewidth, 720, 320 };
            else if (imagewidth > 320)
                imageSizes = new[] { imagewidth, imagewidth, imagewidth, 320 };
            int length = imageSizes.Length;
            for (int i = 0; i < length; i++)
            {
                ratio[i] = (double)imageSizes[i] / (double)imagewidth;
            }
            //need to calculate for height ?
            return ratio;
        }
    }
}
