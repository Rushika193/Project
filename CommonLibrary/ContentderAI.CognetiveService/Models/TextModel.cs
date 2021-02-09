using System.Collections.Generic;

namespace ContentderAI.CognetiveService.Models
{
    public class TextModel
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public bool IsHeadingCandidate { get; set; }
        public List<string> KeyPhrases { get; set; }
        public List<EntityModel> Entities { get; set; }
        public DocumentSentimentModel DocumentSentiment { get; set; }
    }
}
