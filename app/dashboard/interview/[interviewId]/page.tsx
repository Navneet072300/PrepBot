/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

// Define the interview data type based on your schema
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

const Interview = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<
    InterviewData | undefined
  >();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    if (result.length > 0) {
      setInterviewData(result[0]);
    }
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">
        Let&apos;s get started with the mock interview!
        <div className="">
          <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
          <Webcam />
        </div>
      </h2>
    </div>
  );
};

export default Interview;
