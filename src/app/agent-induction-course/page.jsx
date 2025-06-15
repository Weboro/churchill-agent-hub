"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Play,
  ExternalLink,
  Award,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { modules } from "@/constDatas/Modules";

const getAccessToken = async () => {};

const AgentInductionCourse = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [currentModule, setCurrentModule] = useState(0);
  const [currentSection, setCurrentSection] = useState("video");
  const [moduleProgress, setModuleProgress] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [videoWatched, setVideoWatched] = useState({});
  const [finalScore, setFinalScore] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [agentId, setAgentId] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [isAgentVerified, setIsAgentVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalQuestions = modules.reduce(
    (sum, module) => sum + module.questions.length,
    0
  );
  const completedModules = Object.keys(moduleProgress).filter(
    (key) => moduleProgress[key]
  ).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  const verifyAgentId = async () => {
    // Validate agentId
    if (!agentId?.trim()) {
      setErrorMessage("Please enter a valid Agent ID");
      return;
    }

    try {
      const res = await fetch(
        `/api/zoho/search?agentId=${encodeURIComponent(agentId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unknown error");
      }

      console.log("Zoho API response:", data);

      if (data?.data?.length > 0) {
        setErrorMessage("");

        const email = data?.data[0].Email;
        const name = data?.data[0].Account_Name;
        if (email && name) {
          setAgentEmail(email);
          setAgentName(name);
          setIsAgentVerified(true);
        } else {
          throw new Error("This account is invalid!");
        }
      } else {
        setErrorMessage("No account found for the provided Agent ID");
      }
    } catch (error) {
      setErrorMessage(`Error fetching data from Zoho: ${error.message}`);
      console.error("Zoho fetch error:", error.message);
    }
  };

  const handleStartCourse = () => {
    if (isAgentVerified) {
      setCurrentPage("course");
      setCurrentModule(0);
      setCurrentSection("video");
    } else {
      setErrorMessage(
        "Please verify your Agent ID before starting the course."
      );
    }
  };

  const handleVideoWatched = (moduleId) => {
    setVideoWatched((prev) => ({
      ...prev,
      [moduleId]: true,
    }));
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    const currentQuestion = modules[currentModule].questions.find(
      (q) => q.id === questionId
    );
    const isCorrect = answerIndex === currentQuestion.correct;

    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));

    setAnswerFeedback((prev) => ({
      ...prev,
      [questionId]: {
        selected: answerIndex,
        isCorrect: isCorrect,
        correctAnswer: currentQuestion.correct,
      },
    }));
  };

  const completeModule = () => {
    const currentModuleQuestions = modules[currentModule].questions;
    let moduleScore = 0;

    currentModuleQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) {
        moduleScore++;
      }
    });

    setModuleProgress((prev) => ({
      ...prev,
      [currentModule]: true,
    }));

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentSection("video");
    } else {
      let totalCorrect = 0;
      modules.forEach((module) => {
        module.questions.forEach((question) => {
          if (quizAnswers[question.id] === question.correct) {
            totalCorrect++;
          }
        });
      });
      setFinalScore(Math.round((totalCorrect / totalQuestions) * 100));
      setCurrentPage("results");
    }
  };

  const navigateToModule = (moduleIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentSection("video");
  };

  if (currentPage === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-8">
            <Image
              src="/assets/agent-hub-logo.svg"
              width={300}
              height={200}
              alt="logo"
              className="mx-auto w-[80%] md:w-[18rem] mb-10"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Agent Induction Course
            </h1>
            <h2 className="text-xl text-orange-600 font-semibold mb-6">
              Welcome to Churchill Institute of Higher Education Agent Induction
              Course!
            </h2>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 text-left">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700 mb-2">
                  This is a <strong>mandatory training</strong> for all agents
                  who wish to be part of Churchill Institute of Higher
                  Education.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label
                htmlFor="agentId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Agent ID
              </label>
              <input
                id="agentId"
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                onBlur={verifyAgentId}
                placeholder="Enter your Agent ID (e.g., RP-207)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="agentName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="agentName"
                type="text"
                value={agentName}
                readOnly
                placeholder="Name will be auto-filled"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="agentEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="agentEmail"
                type="email"
                value={agentEmail}
                readOnly
                placeholder="Email will be auto-filled"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            {isLoading && (
              <p className="text-gray-600 text-sm">Verifying Agent ID...</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
          </div>

          <button
            onClick={handleStartCourse}
            disabled={!isAgentVerified || isLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            Start Training
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === "results") {
    const passed = finalScore >= 70;
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-8">
            {passed ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {passed ? "Congratulations!" : "Course Not Completed"}
            </h1>
            <div className="text-6xl font-bold text-orange-500 mb-4">
              {finalScore}%
            </div>
            <p className="text-lg text-gray-600 mb-8">
              You scored {finalScore}% on the Agent Induction Course
              {passed
                ? ". You have successfully completed the training!"
                : ". You need 70% to pass."}
            </p>
          </div>
          {passed ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setCurrentPage("start");
                setCurrentModule(0);
                setCurrentSection("video");
                setModuleProgress({});
                setQuizAnswers({});
                setVideoWatched({});
                setFinalScore(0);
                setAnswerFeedback({});
                setAgentId("");
                setAgentName("");
                setAgentEmail("");
                setIsAgentVerified(false);
                setErrorMessage("");
                setIsLoading(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Start New Attempt
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Agent Induction Course Progress
            </h2>
            <span className="text-sm text-gray-600">
              {completedModules}/{modules.length} modules completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Course Modules
              </h3>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => navigateToModule(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      currentModule === index
                        ? "bg-orange-100 border-2 border-orange-300"
                        : moduleProgress[index]
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        Module {index + 1}
                      </span>
                      {moduleProgress[index] && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{module.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Module {currentModule + 1}: {modules[currentModule].name}
                  </h1>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentSection("video")}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentSection === "video"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Play className="w-4 h-4 inline-block mr-2" />
                      Video
                    </button>
                    <button
                      onClick={() => setCurrentSection("quiz")}
                      disabled={!videoWatched[currentModule]}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentSection === "quiz"
                          ? "bg-orange-500 text-white"
                          : videoWatched[currentModule]
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Quiz
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {currentSection === "video" && (
                  <div className="space-y-6">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://player.vimeo.com/video/${modules[currentModule].videoId}`}
                        title={`Module ${currentModule + 1} Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-[500px] rounded-lg"
                      ></iframe>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={videoWatched[currentModule] || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleVideoWatched(currentModule);
                            }
                          }}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          I have watched and understood the training video
                        </span>
                      </label>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Resources
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modules[currentModule].resources.map(
                          (resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200"
                            >
                              <ExternalLink className="w-5 h-5 text-orange-500 mr-3" />
                              <span className="text-gray-700 font-medium">
                                {resource.name}
                              </span>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                    {videoWatched[currentModule] && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setCurrentSection("quiz")}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                        >
                          Proceed to Quiz
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {currentSection === "quiz" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Module Quiz
                      </h3>
                      <button
                        onClick={() => setCurrentSection("video")}
                        className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Video
                      </button>
                    </div>
                    {modules[currentModule].questions.map(
                      (question, qIndex) => (
                        <div
                          key={question.id}
                          className="bg-gray-50 rounded-lg p-6"
                        >
                          <h4 className="text-lg font-medium text-gray-800 mb-4">
                            Q{qIndex + 1}. {question.question}
                          </h4>
                          <div className="space-y-3">
                            {question.options.map((option, oIndex) => {
                              const feedback = answerFeedback[question.id];
                              const isSelected =
                                quizAnswers[question.id] === oIndex;
                              const isCorrect = oIndex === question.correct;
                              const isWrong =
                                feedback &&
                                feedback.selected === oIndex &&
                                !feedback.isCorrect;

                              return (
                                <label
                                  key={oIndex}
                                  className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                                    isWrong
                                      ? "border-red-300 bg-red-50"
                                      : isSelected && isCorrect
                                      ? "border-green-300 bg-green-50"
                                      : "border-gray-200 hover:bg-white"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={oIndex}
                                    checked={
                                      quizAnswers[question.id] === oIndex
                                    }
                                    onChange={() =>
                                      handleQuizAnswer(question.id, oIndex)
                                    }
                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 mt-1"
                                  />
                                  <div className="ml-3 flex-1">
                                    <span className="text-gray-700">
                                      {option}
                                    </span>
                                    {isWrong && (
                                      <div className="mt-2 flex items-center text-red-600 text-sm font-medium">
                                        <XCircle className="w-4 h-4 mr-1" />
                                        You have selected the wrong answer
                                      </div>
                                    )}
                                    {isSelected && isCorrect && (
                                      <div className="mt-2 flex items-center text-green-600 text-sm font-medium">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Correct answer!
                                      </div>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={completeModule}
                        disabled={
                          !modules[currentModule].questions.every(
                            (q) => quizAnswers[q.id] !== undefined
                          )
                        }
                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                      >
                        {currentModule === modules.length - 1
                          ? "Complete Course"
                          : "Complete Module"}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInductionCourse;
