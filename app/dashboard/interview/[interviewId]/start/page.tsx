"use client";

import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection"; // Verify this path

const StartInterview = ({ params }: { params: { interviewId: string } }) => {
  interface InterviewData {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDes: string;
    jobExp: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
  }

  const [interviewData, setInterviewData] = useState<
    InterviewData | undefined
  >();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} />
      </div>
    </div>
  );
};

export default StartInterview;
