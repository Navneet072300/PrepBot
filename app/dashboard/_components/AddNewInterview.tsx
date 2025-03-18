"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/aimodel";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [jsonResponse, setJsonResponse] = useState<any[]>([]);
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const InputPrompt = `Generate a mock interview in JSON format for the following details:
      Job Position: ${jobPosition},
      Job Description: ${jobDescription},
      Years of Experience: ${jobExperience}.
      Return the response as a JSON object with an array of question-answer pairs, e.g., [{"question": "...", "answer": "..."}]`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = result.response.text();
      console.log("Raw API Response:", rawResponse); // Log raw response for debugging

      // Attempt to clean and parse the response
      const MockJsonRep = rawResponse
        .replace("```json", "")
        .replace("```", "")
        .trim();

      // Check if the response is valid JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(MockJsonRep);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        // Fallback: If not JSON, assume it’s plain text and create a mock JSON response
        parsedResponse = [
          {
            question: "Could not parse AI response",
            answer: rawResponse || "No valid response from AI",
          },
        ];
      }

      setJsonResponse(parsedResponse);

      if (user) {
        const rep = await db
          .insert(mockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(parsedResponse), // Store as string
            jobPosition: jobPosition,
            jobDes: jobDescription,
            jobExp: jobExperience,
            createdBy:
              user?.primaryEmailAddress?.emailAddress ?? "unknown@example.com",
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: mockInterview.mockId });

        console.log("DB Insert Response:", rep);
        if (rep) {
          setOpenDialog(false);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setJsonResponse([
        {
          question: "Error",
          answer: "Something went wrong while generating the interview.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job role, description, and years of
                    experience
                  </h2>
                  <div className="mt-7 my-4">
                    <label>Job Role</label>
                    <Input
                      placeholder="e.g. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="e.g. React JS, Javascript, HTML, JAVA etc."
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="e.g. 5"
                      type="number"
                      max="40"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Generating from AI
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
