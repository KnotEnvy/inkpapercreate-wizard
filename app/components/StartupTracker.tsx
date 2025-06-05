'use client';
// components/StartupTracker.tsx   

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Check, ChevronDown, ChevronRight, Download, ExternalLink, CheckCircle2,
  Building2, FileText, CreditCard, Receipt, Calculator, Shield, Globe,
  Lightbulb, Rocket, TrendingUp, Sparkles, Clock, Target, Award
} from 'lucide-react';

// Section icons mapping
const sectionIcons = {
  'form-llc': Building2,
  'register-dba': FileText,
  'banking': CreditCard,
  'taxes-licenses': Receipt,
  'accounting': Calculator,
  'insurance': Shield,
  'digital': Globe,
  'intellectual-property': Lightbulb
};

// Section colors for visual variety
const sectionColors = {
  'form-llc': 'blue',
  'register-dba': 'purple',
  'banking': 'green',
  'taxes-licenses': 'orange',
  'accounting': 'pink',
  'insurance': 'red',
  'digital': 'indigo',
  'intellectual-property': 'yellow'
};

// Task data structure
const startupTasks = {
  "form-llc": {
    title: "Form Your Florida LLC",
    description: "Establish your legal business entity",
    tasks: [
      {
        id: "llc-name-search",
        title: "Confirm unique business name on Sunbiz",
        description: "Search Sunbiz.org to ensure chosen name is available.",
        resources: [
          { label: "Florida Sunbiz Name Search", url: "https://search.sunbiz.org/Inquiry/CorporationSearch" }
        ]
      },
      {
        id: "file-articles",
        title: "File Articles of Organization",
        description: "File on Sunbiz ($125 fee). List Registered Agent and use Mike R. as Authorized Representative.",
        resources: [
          { label: "Sunbiz e-Filing", url: "https://dos.myflorida.com/sunbiz/" }
        ]
      },
      {
        id: "download-articles",
        title: "Download stamped Articles",
        description: "Download and save PDF copy in cloud storage once Sunbiz posts them.",
        resources: []
      },
      {
        id: "operating-agreement",
        title: "Draft Operating Agreement",
        description: "Not filed but essential for banks and liability protection.",
        resources: []
      },
      {
        id: "get-ein",
        title: "Order EIN from IRS",
        description: "Free from IRS.gov using Form SS-4 (5-minute online process).",
        resources: [
          { label: "IRS EIN Application", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" }
        ]
      }
    ]
  },
  "register-dba": {
    title: "Register Fictitious Name (DBA)",
    description: "Create your brand identity",
    tasks: [
      {
        id: "decide-brand",
        title: "Decide brand name(s)",
        description: "Choose your business brand name (e.g., Daytona Custom Prints).",
        resources: []
      },
      {
        id: "file-fictitious",
        title: "File Fictitious Name Registration",
        description: "File on Sunbiz ($50 fee).",
        resources: [
          { label: "Sunbiz Fictitious Name", url: "https://dos.myflorida.com/sunbiz/" }
        ]
      },
      {
        id: "publish-notice",
        title: "Publish legal notice",
        description: "Publish in a Daytona-area newspaper and keep proof of publication.",
        resources: []
      }
    ]
  },
  "banking": {
    title: "Open Business Bank & Merchant Accounts",
    description: "Set up financial infrastructure",
    tasks: [
      {
        id: "choose-bank",
        title: "Choose a Florida-friendly bank",
        description: "Consider Chase, Truist, Navy Federal, etc.",
        resources: []
      },
      {
        id: "open-accounts",
        title: "Open business checking account",
        description: "Bring: EIN confirmation, stamped Articles, Operating Agreement, driver's license.",
        resources: []
      },
      {
        id: "business-card",
        title: "Apply for business debit/credit card",
        description: "Get a business card for expenses and building credit.",
        resources: []
      },
      {
        id: "setup-stripe",
        title: "Set up Stripe account",
        description: "Connect to your new business checking account for payment processing.",
        resources: [
          { label: "Stripe", url: "https://stripe.com" }
        ]
      },
      {
        id: "setup-paypal",
        title: "Set up PayPal Business (optional)",
        description: "Alternative payment processing option.",
        resources: [
          { label: "PayPal Business", url: "https://www.paypal.com/business" }
        ]
      }
    ]
  },
  "taxes-licenses": {
    title: "Register for State & Local Taxes / Licenses",
    description: "Ensure compliance with regulations",
    tasks: [
      {
        id: "sales-tax",
        title: "Register for Florida Sales & Use Tax",
        description: "Register online (DR-1) to receive certificate.",
        resources: [
          { label: "Florida Dept. of Revenue", url: "https://floridarevenue.com/taxes/registration" }
        ]
      },
      {
        id: "county-license",
        title: "Get Volusia County Business Tax Receipt",
        description: "Apply through county website.",
        resources: [
          { label: "Volusia County BT Receipt", url: "https://www.volusia.org/services/revenue-services/" }
        ]
      },
      {
        id: "city-license",
        title: "Get Daytona Beach Business Tax Receipt",
        description: "Apply at city hall or online portal.",
        resources: [
          { label: "Daytona Beach BT Receipt", url: "https://codb.us/business_tax" }
        ]
      },
      {
        id: "tax-calendar",
        title: "Mark tax filing dates",
        description: "Set calendar reminders for monthly/quarterly sales tax filings.",
        resources: []
      }
    ]
  },
  "accounting": {
    title: "Accounting & Record-Keeping",
    description: "Organize your financial tracking",
    tasks: [
      {
        id: "choose-software",
        title: "Choose cloud bookkeeping software",
        description: "Consider free Wave or QuickBooks Simple Start.",
        resources: [
          { label: "Wave Accounting", url: "https://www.waveapps.com/" },
          { label: "QuickBooks", url: "https://quickbooks.intuit.com/" }
        ]
      },
      {
        id: "chart-accounts",
        title: "Create Chart of Accounts",
        description: "Set up categories: sales, COGS, merchant fees, marketing, etc.",
        resources: []
      },
      {
        id: "link-accounts",
        title: "Link bank & payment processor feeds",
        description: "Connect business bank, Stripe, and PayPal to bookkeeping software.",
        resources: []
      },
      {
        id: "receipt-system",
        title: "Set up receipt capture system",
        description: "Use Hubdoc or create smartphone folder for receipt photos.",
        resources: []
      }
    ]
  },
  "insurance": {
    title: "Business Insurance",
    description: "Protect your business assets",
    tasks: [
      {
        id: "get-quotes",
        title: "Get insurance quotes",
        description: "Request quotes for General Liability and Product Liability.",
        resources: [
          { label: "Next Insurance", url: "https://www.nextinsurance.com/" },
          { label: "Hiscox", url: "https://www.hiscox.com/" },
          { label: "Thimble", url: "https://www.thimble.com/" }
        ]
      },
      {
        id: "bind-coverage",
        title: "Bind insurance coverage",
        description: "Choose policy with minimum $1M occurrence limit.",
        resources: []
      }
    ]
  },
  "digital": {
    title: "Digital Foundations",
    description: "Establish your online presence",
    tasks: [
      {
        id: "domain-purchase",
        title: "Purchase domain name",
        description: "Buy main domain + common TLD variants (.com, .net, etc.).",
        resources: []
      },
      {
        id: "dns-setup",
        title: "Configure DNS",
        description: "Point DNS to HostArmada and enable AutoSSL.",
        resources: []
      },
      {
        id: "google-workspace",
        title: "Create Google Workspace",
        description: "Set up professional email (e.g., mike@brand.com).",
        resources: [
          { label: "Google Workspace", url: "https://workspace.google.com/" }
        ]
      }
    ]
  },
  "intellectual-property": {
    title: "Intellectual Property & Branding (Optional)",
    description: "Protect your brand identity",
    tasks: [
      {
        id: "trademark-search",
        title: "Run USPTO trademark search",
        description: "Check for trademark conflicts with your brand name.",
        resources: [
          { label: "USPTO TESS", url: "https://www.uspto.gov/trademarks/search" }
        ]
      },
      {
        id: "trademark-decision",
        title: "Decide on trademark filing",
        description: "Consider filing after brand validation.",
        resources: []
      }
    ]
  }
};

export default function StartupTracker() {
  const [taskStatus, setTaskStatus] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('startupTaskStatus');
    const savedExpanded = localStorage.getItem('expandedSections');
    
    if (savedStatus) {
      setTaskStatus(JSON.parse(savedStatus));
    }
    
    if (savedExpanded) {
      setExpandedSections(JSON.parse(savedExpanded));
    } else {
      // Default to first section expanded
      setExpandedSections({ 'form-llc': true });
    }
    
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever taskStatus changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('startupTaskStatus', JSON.stringify(taskStatus));
    }
  }, [taskStatus, isLoading]);

  // Save expanded sections
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('expandedSections', JSON.stringify(expandedSections));
    }
  }, [expandedSections, isLoading]);

  const toggleTask = (taskId) => {
    setTaskStatus(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Calculate progress
  const totalTasks = Object.values(startupTasks).reduce(
    (sum, section) => sum + section.tasks.length, 0
  );
  const completedTasks = Object.keys(taskStatus).filter(id => taskStatus[id]).length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getSectionProgress = (sectionId) => {
    const section = startupTasks[sectionId];
    const sectionTaskIds = section.tasks.map(t => t.id);
    const completed = sectionTaskIds.filter(id => taskStatus[id]).length;
    return { completed, total: section.tasks.length };
  };

  const exportPDF = () => {
    // In a real implementation, this would generate a PDF
    alert('PDF export functionality would be implemented here using a library like jsPDF or react-pdf');
  };

  // Check if all tasks are complete
  useEffect(() => {
    if (completedTasks === totalTasks && totalTasks > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [completedTasks, totalTasks]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  InkPaperCreate Setup Wizard
                </h1>
                <p className="text-sm text-gray-600 mt-1">Your journey to business success starts here</p>
              </div>
            </div>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
          
          {/* Progress Section */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-800">Overall Progress</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {completedTasks} of {totalTasks} tasks completed
                </span>
                <span className="font-bold text-lg text-gray-800">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-500">Est. Time</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">2 weeks</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-500">Sections</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">8</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-500">Completed</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {Object.entries(startupTasks).filter(([id, _]) => {
                    const { completed, total } = getSectionProgress(id);
                    return completed === total;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {Object.entries(startupTasks).map(([sectionId, section], index) => {
            const { completed, total } = getSectionProgress(sectionId);
            const isComplete = completed === total;
            const isExpanded = expandedSections[sectionId];
            const Icon = sectionIcons[sectionId];
            const colorScheme = sectionColors[sectionId];
            
            return (
              <div 
                key={sectionId} 
                className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleSection(sectionId)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-t-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${colorScheme}-100 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 text-${colorScheme}-600`} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        {section.title}
                        {isComplete && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 animate-bounce-once" />
                        )}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-sm font-medium ${isComplete ? 'text-green-600' : 'text-gray-600'}`}>
                        {completed} / {total} tasks
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isComplete ? 'bg-green-600' : `bg-${colorScheme}-600`
                          }`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-5 space-y-3 animate-fadeIn">
                    {section.tasks.map((task, taskIndex) => {
                      const isTaskComplete = taskStatus[task.id];
                      
                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-sm ${
                            isTaskComplete 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ animationDelay: `${taskIndex * 50}ms` }}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                                isTaskComplete
                                  ? 'bg-green-600 border-green-600 scale-110'
                                  : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                              }`}
                            >
                              {isTaskComplete && (
                                <Check className="h-4 w-4 text-white animate-check" />
                              )}
                            </button>
                            
                            <div className="flex-1 space-y-2">
                              <h3 className={`font-medium transition-all duration-200 ${
                                isTaskComplete ? 'text-gray-700 line-through opacity-70' : 'text-gray-900'
                              }`}>
                                {task.title}
                              </h3>
                              
                              {task.description && (
                                <p className={`text-sm transition-all duration-200 ${
                                  isTaskComplete ? 'text-gray-500 opacity-70' : 'text-gray-600'
                                }`}>
                                  {task.description}
                                </p>
                              )}
                              
                              {task.resources.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {task.resources.map((resource, idx) => (
                                    <a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors group"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                                      {resource.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Completion Message */}
        {completedTasks === totalTasks && totalTasks > 0 && (
          <div className="mt-8 relative">
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Sparkles className="h-16 w-16 text-yellow-500 animate-ping" />
              </div>
            )}
            <div className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
              <div className="relative z-10">
                <CheckCircle2 className="h-16 w-16 text-white mx-auto mb-4 animate-bounce-once" />
                <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
                <p className="text-lg opacity-90">
                  You've completed all startup tasks! You're ready for Session 2.
                </p>
                <p className="mt-4 text-sm opacity-80">
                  Please notify your consultant to schedule the next session on Systems & Automation.
                </p>
                <button className="mt-6 px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Contact Consultant
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes check {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-in-out;
        }
        
        .animate-check {
          animation: check 0.3s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}