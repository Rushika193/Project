namespace Cbuilder.Block
{
    public class Block
    {
        public int BoardID { get; set; }
        /// <summary>
        /// name of the viecomponent or path of partial view
        /// </summary>
        public string BlockName { get; set; }
        /// <summary>
        /// At which order the block is going to render
        /// </summary>
        public string BlockOrder { get; set; }
        /// <summary>
        /// ViewComponent or partialview
        /// </summary>
        public string BlockType { get; set; }
        /// <summary>
        /// size of  block if any
        /// </summary>
        public string BlockSize { get; set; }
        /// <summary>
        /// class to append at top of block 
        /// </summary>
        public string BlockClass { get; set; }
        /// <summary>
        /// can call 
        /// </summary>
        public string RenderName { get; set; }
    }
}
