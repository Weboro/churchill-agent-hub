"use client";
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Play, ExternalLink, Award, AlertCircle } from 'lucide-react';
import Image from 'next/image';
const AgentInductionCourse = () => {
    const [currentPage, setCurrentPage] = useState('start');
    const [currentModule, setCurrentModule] = useState(0);
    const [currentSection, setCurrentSection] = useState('video');
    const [moduleProgress, setModuleProgress] = useState({});
    const [quizAnswers, setQuizAnswers] = useState({});
    const [videoWatched, setVideoWatched] = useState({});
    const [finalScore, setFinalScore] = useState(0);

    const modules = [
        {
            id: 0,
            name: "Genuine Student Test (GST)",
            videoId: "xo34tlw7pM4",
            resources: [],
            questions: [
                {
                    id: 'q1',
                    question: 'Which of the following best describes the purpose of the Genuine Student Test (GST)?',
                    options: [
                        'To assess if a student has enough English skills to study in Australia',
                        'To determine whether an applicant genuinely intends to study and has realistic expectations of study and life in Australia',
                        'To compare Australian and home‑country tuition fees',
                        'To allocate a risk rating to an education provider'
                    ],
                    correct: 1
                },
                {
                    id: 'q2',
                    question: 'Which criterion focuses on why an applicant is not studying a similar course in their home country?',
                    options: [
                        'Circumstances in Australia',
                        'Immigration history',
                        'Circumstances in the home country',
                        'Value of the course to the student\'s future'
                    ],
                    correct: 2
                },
                {
                    id: 'q3',
                    question: 'A genuine student must demonstrate:',
                    options: [
                        'Guaranteed permanent residency',
                        'Unlimited access to part‑time work income',
                        'Authentic and verifiable documentation',
                        'Military service exemption'
                    ],
                    correct: 2
                },
                {
                    id: 'q4',
                    question: 'Which of the following would negatively impact the GST assessment?',
                    options: [
                        'Clear post‑study career plan',
                        'Strong family ties in the home country',
                        'Unexplained study gaps',
                        'Course relevance to prior study'
                    ],
                    correct: 2
                },
                {
                    id: 'q5',
                    question: 'When assessing the value of the course to the student’s future, immigration officers consider:',
                    options: [
                        'Expected remuneration after graduation',
                        'Provider risk rating',
                        'Agent commission level',
                        'Length of the student’s holiday breaks'
                    ],
                    correct: 2
                }
            ]
        },
        {
            id: 1,
            name: "Simplified Student Visa Framework (SSVF)",
            videoId: "t-mXXcipaOk",
            resources: [
                { name: "Learn more on SSVF – Department of Home Affairs", url: "https://immi.homeaffairs.gov.au/what-we-do/education-program/what-we-do/simplified-student-visa-framework" },
                { name: "Financial Capacity Requirements", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500#Eligibility" },
                { name: "English Language Requirement", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500#Eligibility" },
                { name: "Visa Application Process", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500#HowTo" }
            ],
            questions: [
                {
                    "id": "q6",
                    "question": "The SSVF replaced which two previous systems on July 2016?",
                    "options": [
                        "ESOS and CRICOS",
                        "PRISMS and DHA",
                        "COE and OSHC",
                        "None of the above"
                    ],
                    "correct": 0
                },
                {
                    "id": "q7",
                    "question": "Under the SSVF, the amount of documentation a student must submit is determined by:",
                    "options": [
                        "The agent’s annual recruitment volume",
                        "Combined risk rating of provider and nationality",
                        "The student’s age",
                        "Tuition fee amount"
                    ],
                    "correct": 1
                },
                {
                    "id": "q8",
                    "question": "Which document must be lodged with all Subclass 500 visa applications?",
                    "options": [
                        "Letter of Offer",
                        "Confirmation of Enrolment (CoE)",
                        "Agent Agreement",
                        "Tax Return"
                    ],
                    "correct": 1
                },
                {
                    "id": "q9",
                    "question": "Students relying on part-time work income to meet living costs are:",
                    "options": [
                        "Acceptable if hours are below 48 per fortnight",
                        "Acceptable only when studying a master’s degree",
                        "Not acceptable under SSVF financial capacity rules",
                        "Acceptable if sponsored by a relative"
                    ],
                    "correct": 2
                },
                {
                    "id": "q10",
                    "question": "Changing to a lower AQF level course without a new visa may breach:",
                    "options": [
                        "Standard 7 of the National Code",
                        "The Agent Code of Ethics",
                        "The Biosecurity Act",
                        "The GST criteria"
                    ],
                    "correct": 0
                }
            ]
        },
        {
            id: 2,
            name: " Biosecurity‑Related Visa Cancellations",
            videoId: "2BUje836Q7Q",
            resources: [],
            questions: [
                {
                    "id": "q11",
                    "question": "From January 2021, a student visa can be cancelled at the border for which action?",
                    "options": [
                        "Travelling with more than AUD 10,000 cash",
                        "Failing to declare food items on the Incoming Passenger Card",
                        "Not booking on-campus accommodation",
                        "Arriving without health insurance"
                    ],
                    "correct": 1
                },
                {
                    "id": "q12",
                    "question": "If a student’s visa is cancelled for a biosecurity breach, they may be barred from applying for most Australian visas for up to:",
                    "options": [
                        "1 year",
                        "3 years",
                        "5 years",
                        "10 years"
                    ],
                    "correct": 1
                },
                {
                    "id": "q13",
                    "question": "Which organisation’s resources should agents share to educate students about prohibited items?",
                    "options": [
                        "Australian Taxation Office",
                        "Department of Agriculture / Australian Border Force",
                        "TEQSA",
                        "Austrade"
                    ],
                    "correct": 1
                },
                {
                    "id": "q14",
                    "question": "Unintentional failure to declare a restricted item can lead to:",
                    "options": [
                        "A warning with no consequences",
                        "Immediate visa cancellation",
                        "A fine but no visa impact",
                        "A requirement to attend an interview only"
                    ],
                    "correct": 2
                },
                {
                    "id": "q15",
                    "question": "Agents must include biosecurity information in:",
                    "options": [
                        "Post-arrival accommodation emails only",
                        "Pre-departure briefings and checklists",
                        "Marketing flyers",
                        "The CoE document"
                    ],
                    "correct": 1
                }
            ]
        },
        {
            id: 3,
            name: "Module 4 Test",
            videoId: "2TqP6q5wuaA",
            resources: [],
            questions: [
                {
                    "id": "q16",
                    "question": "According to the Australian Agent Code of Ethics, agents must always act:",
                    "options": [
                        "Primarily in the interest of the provider",
                        "Honestly and in the best interests of the student",
                        "To maximise commission",
                        "In strict secrecy from regulators"
                    ],
                    "correct": 1
                },
                {
                    "id": "q17",
                    "question": "Which marketing claim is prohibited?",
                    "options": [
                        "Listing Churchill’s CRICOS code",
                        "Showing potential career outcomes",
                        "Stating that course completion guarantees permanent residency",
                        "Advertising scholarship opportunities"
                    ],
                    "correct": 2
                },
                {
                    "id": "q18",
                    "question": "A valid written agreement must outline:",
                    "options": [
                        "The agent’s exclusive right to recruit worldwide",
                        "Territories where the agent may recruit and obligations under ESOS",
                        "The exact number of students the agent must enrol",
                        "A guarantee of risk-free visa success"
                    ],
                    "correct": 1
                },
                {
                    "id": "q19",
                    "question": "Failure to comply with the National Code may result in:",
                    "options": [
                        "A temporary increase in commission",
                        "Termination of the agent agreement",
                        "Automatic provider risk reduction",
                        "DHA issuing a new CoE"
                    ],
                    "correct": 1
                },
                {
                    "id": "q20",
                    "question": "Agents are required to remove outdated course materials from:",
                    "options": [
                        "Their personal LinkedIn only",
                        "All platforms, including websites and social media",
                        "Printed brochures only",
                        "Provider’s official site only"
                    ],
                    "correct": 1
                }

            ]
        },
    ];

    const totalQuestions = modules.reduce((sum, module) => sum + module.questions.length, 0);
    const completedModules = Object.keys(moduleProgress).filter(key => moduleProgress[key]).length;
    const progressPercentage = (completedModules / modules.length) * 100;

    const handleStartCourse = () => {
        setCurrentPage('course');
        setCurrentModule(0);
        setCurrentSection('video');
    };

    const handleVideoWatched = (moduleId) => {
        setVideoWatched(prev => ({
            ...prev,
            [moduleId]: true
        }));
    };

    const handleQuizAnswer = (questionId, answerIndex) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const completeModule = () => {
        const currentModuleQuestions = modules[currentModule].questions;
        let moduleScore = 0;

        currentModuleQuestions.forEach(question => {
            if (quizAnswers[question.id] === question.correct) {
                moduleScore++;
            }
        });

        setModuleProgress(prev => ({
            ...prev,
            [currentModule]: true
        }));

        if (currentModule < modules.length - 1) {
            setCurrentModule(currentModule + 1);
            setCurrentSection('video');
        } else {
            let totalCorrect = 0;
            modules.forEach(module => {
                module.questions.forEach(question => {
                    if (quizAnswers[question.id] === question.correct) {
                        totalCorrect++;
                    }
                });
            });
            setFinalScore(Math.round((totalCorrect / totalQuestions) * 100));
            setCurrentPage('results');
        }
    };

    const navigateToModule = (moduleIndex) => {
        setCurrentModule(moduleIndex);
        setCurrentSection('video');
    };

    if (currentPage === 'start') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
                    <div className="mb-8">
                        {/* <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-10 h-10 text-white" />
                        </div> */}
                        <Image
                            src="/assets/agent-hub-logo.svg"
                            width={300}
                            height={200}
                            alt="logo"
                            className="mx-auto w-[80%] md:w-[18rem] mb-10"
                        />
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent Induction Course</h1>
                        <h2 className="text-xl text-orange-600 font-semibold mb-6">
                            Welcome to Churchill Institute of Higher Education Agent Induction Course!
                        </h2>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 text-left">
                        <div className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <p className="text-gray-700 mb-2">
                                    This is a <strong>mandatory training</strong> for all agents who wish to be part of Churchill Institute of Higher Education.
                                </p>
                                {/* <p className="text-red-600 font-semibold">
                                    Failure to complete this course will result in rejection of Agent Application.
                                </p> */}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartCourse}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center mx-auto"
                    >
                        Start Training
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        );
    }

    if (currentPage === 'results') {
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
                            {passed ? 'Congratulations!' : 'Course Not Completed'}
                        </h1>

                        <div className="text-6xl font-bold text-orange-500 mb-4">
                            {finalScore}%
                        </div>

                        <p className="text-lg text-gray-600 mb-8">
                            You scored {finalScore}% on the Agent Induction Course
                            {passed ? '. You have successfully completed the training!' : '. You need 70% to pass.'}
                        </p>
                    </div>

                    {passed ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                            <img
                                src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
                                alt="Celebration"
                                className="w-32 h-32 mx-auto mb-4 rounded-lg"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <p className="text-green-700 font-semibold">
                                You are now certified as a Churchill Institute Agent!
                            </p>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <img
                                src="https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif"
                                alt="Try again"
                                className="w-32 h-32 mx-auto mb-4 rounded-lg"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <p className="text-red-700 font-semibold">
                                Please retake the course to become a certified agent.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setCurrentPage('start');
                            setCurrentModule(0);
                            setCurrentSection('video');
                            setModuleProgress({});
                            setQuizAnswers({});
                            setVideoWatched({});
                            setFinalScore(0);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Start New Attempt
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-800">Agent Induction Course Progress</h2>
                        <span className="text-sm text-gray-600">{completedModules}/{modules.length} modules completed</span>
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
                    <div className="lg:col-span-1 hidden lg:block ">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Modules</h3>
                            <div className="space-y-3">
                                {modules.map((module, index) => (
                                    <button
                                        key={module.id}
                                        onClick={() => navigateToModule(index)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${currentModule === index
                                            ? 'bg-orange-100 border-2 border-orange-300'
                                            : moduleProgress[index]
                                                ? 'bg-green-50 border border-green-200'
                                                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
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
                                            onClick={() => setCurrentSection('video')}
                                            className={`px-4 py-2 rounded-lg font-medium ${currentSection === 'video'
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Play className="w-4 h-4 inline-block mr-2" />
                                            Video
                                        </button>
                                        <button
                                            onClick={() => setCurrentSection('quiz')}
                                            disabled={!videoWatched[currentModule]}
                                            className={`px-4 py-2 rounded-lg font-medium ${currentSection === 'quiz'
                                                ? 'bg-orange-500 text-white'
                                                : videoWatched[currentModule]
                                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Quiz
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {currentSection === 'video' && (
                                    <div className="space-y-6">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${modules[currentModule].videoId}`}
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
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {modules[currentModule].resources.map((resource, index) => (
                                                    <a
                                                        key={index}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200"
                                                    >
                                                        <ExternalLink className="w-5 h-5 text-orange-500 mr-3" />
                                                        <span className="text-gray-700 font-medium">{resource.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {videoWatched[currentModule] && (
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => setCurrentSection('quiz')}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                                                >
                                                    Proceed to Quiz
                                                    <ChevronRight className="w-5 h-5 ml-2" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {currentSection === 'quiz' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-gray-800">Module Quiz</h3>
                                            <button
                                                onClick={() => setCurrentSection('video')}
                                                className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-1" />
                                                Back to Video
                                            </button>
                                        </div>

                                        {modules[currentModule].questions.map((question, qIndex) => (
                                            <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                                                <h4 className="text-lg font-medium text-gray-800 mb-4">
                                                    Q{qIndex + 1}. {question.question}
                                                </h4>
                                                <div className="space-y-3">
                                                    {question.options.map((option, oIndex) => (
                                                        <label
                                                            key={oIndex}
                                                            className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-colors duration-200"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={question.id}
                                                                value={oIndex}
                                                                checked={quizAnswers[question.id] === oIndex}
                                                                onChange={() => handleQuizAnswer(question.id, oIndex)}
                                                                className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 mt-1"
                                                            />
                                                            <span className="ml-3 text-gray-700">{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-end">
                                            <button
                                                onClick={completeModule}
                                                disabled={!modules[currentModule].questions.every(q => quizAnswers[q.id] !== undefined)}
                                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                                            >
                                                {currentModule === modules.length - 1 ? 'Complete Course' : 'Complete Module'}
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