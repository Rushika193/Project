using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Azure;
using Azure.AI.TextAnalytics;
using ContentderAI.CognetiveService.Models;

namespace ContentderAI.CognetiveService
{
    public class TextAnalytics
    {
        #region Fields
        // Client for Azure Text Ana
        private readonly TextAnalyticsClient _client;
        // Azure Text Analytics Data Limit for Name Entity Recognition 
        private const int TextAnalyticsDataLimit = 5;
        #endregion

        #region Constructor
        public TextAnalytics(string endpoint, string subscriptionKey)
        {
            _client = new TextAnalyticsClient(new Uri(endpoint), new AzureKeyCredential(subscriptionKey));
        }
        #endregion

        #region Methods
        /// <summary>
        /// Process text for Key Phrase, Entities and Sentiments
        /// </summary>
        /// <param name="document"></param>
        /// <returns></returns>
        public async Task<List<TextModel>> ProcessText(string document)
        {
            var textModels = new List<TextModel>();
            var textAnalyzeTasks = new List<Task<List<TextModel>>>();

            // Split document into paragraphs
            char[] delimeters = { '\r', '\n' };
            string[] documents = document.Split(delimeters, StringSplitOptions.RemoveEmptyEntries);
            int documentCount = documents.Length;
            int documentIndex = 0;
            try
            {
                while (documentIndex < documentCount)
                {
                    Index startIndex = documentIndex;
                    Index stopIndex;
                    documentIndex += TextAnalyticsDataLimit;
                    if (documentIndex < documentCount)
                    {
                        stopIndex = documentIndex;
                    }
                    else
                    {
                        stopIndex = documentCount;
                    }
                    string[] inputs = documents[startIndex..stopIndex];
                    textAnalyzeTasks.Add(AnalyzeText(inputs));
                }
                await Task.WhenAll(textAnalyzeTasks);
                textAnalyzeTasks?.ForEach(async texts =>
                {
                    textModels.AddRange(await texts);
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return textModels;
        }

        /// <summary>
        /// Analyze text and extract key phrases, entities and sentiment using Azure Text Analytics SDK
        /// </summary>
        /// <param name="inputs"></param>
        /// <returns></returns>
        private async Task<List<TextModel>> AnalyzeText(string[] inputs)
        {
            List<TextModel> textModels = new List<TextModel>();
            // Call Azure Text Analytics
            Task<Response<ExtractKeyPhrasesResultCollection>> kpTask = _client.ExtractKeyPhrasesBatchAsync(inputs);
            Task<Response<RecognizeEntitiesResultCollection>> entitiesTask = _client.RecognizeEntitiesBatchAsync(inputs);
            Task<Response<AnalyzeSentimentResultCollection>> sentimentTask = _client.AnalyzeSentimentBatchAsync(inputs);

            // Wait for all 3 task to compelete
            ExtractKeyPhrasesResultCollection kpResult = await kpTask;
            RecognizeEntitiesResultCollection entitiesResult = await entitiesTask;
            AnalyzeSentimentResultCollection sentimentResult = await sentimentTask;

            for (int i = 0, results = inputs.Length; i < results; i++)
            {
                List<EntityModel> entityModels = new List<EntityModel>();
                foreach (CategorizedEntity entity in entitiesResult[i].Entities)
                {
                    entityModels.Add(new EntityModel()
                    {
                        Text = entity.Text,
                        Category = entity.Category.ToString(),
                        Score = entity.ConfidenceScore
                    });
                }
                string text = inputs[i];
                textModels.Add(new TextModel()
                {
                    Id = Guid.NewGuid().ToString(),
                    Text = text,
                    IsHeadingCandidate = IsHeadingCandidate(text),
                    KeyPhrases = new List<string>(kpResult[i].KeyPhrases),
                    Entities = entityModels,
                    DocumentSentiment = new DocumentSentimentModel()
                    {
                        Sentiment = sentimentResult[i].DocumentSentiment.Sentiment.ToString(),
                        SentimentScore = new SentimentScorePerLabelModel()
                        {
                            Positive = sentimentResult[i].DocumentSentiment.ConfidenceScores.Positive,
                            Negative = sentimentResult[i].DocumentSentiment.ConfidenceScores.Negative,
                            Neutral = sentimentResult[i].DocumentSentiment.ConfidenceScores.Neutral
                        }
                    }
                });
            }
            return textModels;
        }

        /// <summary>
        /// Is the give text suitable to be a Heading
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private bool IsHeadingCandidate(string text)
        {
            if (text.Split(' ').Length <= 5 && !text.Contains("."))
            {
                return true;
            }
            return false;
        }
        #endregion
    }
}