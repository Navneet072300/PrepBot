import React from "react";

// Define the expected shape of the questions
interface Question {
  question: string;
  // Add other properties if they exist in your mockInterviewQuestion data
}

interface QuestionSectionProps {
  mockInterviewQuestion: Question[] | undefined;
}

const QuestionSection = ({ mockInterviewQuestion }: QuestionSectionProps) => {
  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion && mockInterviewQuestion.length > 0 ? (
          mockInterviewQuestion.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="font-bold p-2 border-secondary rounded-full text-xs md:text-sm text-center cursor-pointer">
                Question #{index + 1}
              </h2>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
