"use client";
import React, { useState } from "react";
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

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg  text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="">
                  <h2 className="">
                    Add details about you job role, description and years of
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
                  <div className=" my-4">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="e.g. React JS, Javascript, HTML, JAVA etc."
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className=" my-4">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="e.g. 5"
                      type="number"
                      max={"40"}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="flex gap-5 justify-end">
                <Button type="submit">Start Interview</Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
