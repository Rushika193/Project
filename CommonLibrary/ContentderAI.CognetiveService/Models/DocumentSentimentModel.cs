namespace ContentderAI.CognetiveService.Models
{
    public class DocumentSentimentModel
    {
        public string Sentiment { get; set; }
        public SentimentScorePerLabelModel SentimentScore { get; set; }
    }
}
