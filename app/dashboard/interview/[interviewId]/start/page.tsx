import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const StartInterview = ({ params }: { params: { interviewId: string } }) => {
  interface InterviewData {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDes: string;
    jobExp: string;
    createdBy: string;
    createdAt: string | null; // nullable since no .notNull() in schema
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

  return <div>StartInterview</div>;
};

export default StartInterview;
