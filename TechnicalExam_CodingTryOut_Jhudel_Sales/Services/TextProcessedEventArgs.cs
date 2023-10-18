using System;
using TechExam.Models;

namespace TechExam.Services
{
    public class TextProcessedEventArgs : EventArgs
    {
        public Users ProcessedData { get; }

        public TextProcessedEventArgs(Users processedText)
        {
            ProcessedData = processedText;
        }
    }

}
