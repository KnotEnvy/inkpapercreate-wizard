'use client'

import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronRight, Download, ExternalLink, CheckCircle2 } from 'lucide-react';

// Task data structure
const startupTasks = {
  "form-llc": {
    title: "Form Your Florida LLC",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">InkPaperCreate Setup Wizard</h1>
              <p className="text-sm text-gray-600 mt-1">Complete all tasks before Session 2</p>
            </div>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{completedTasks} of {totalTasks} tasks completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {Object.entries(startupTasks).map(([sectionId, section]) => {
            const { completed, total } = getSectionProgress(sectionId);
            const isComplete = completed === total;
            const isExpanded = expandedSections[sectionId];
            
            return (
              <div key={sectionId} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleSection(sectionId)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    {isComplete && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {completed} / {total}
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {section.tasks.map((task) => {
                      const isTaskComplete = taskStatus[task.id];
                      
                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border ${
                            isTaskComplete 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                isTaskComplete
                                  ? 'bg-green-600 border-green-600'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {isTaskComplete && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </button>
                            
                            <div className="flex-1 space-y-2">
                              <h3 className={`font-medium ${
                                isTaskComplete ? 'text-gray-700 line-through' : 'text-gray-900'
                              }`}>
                                {task.title}
                              </h3>
                              
                              {task.description && (
                                <p className="text-sm text-gray-600">{task.description}</p>
                              )}
                              
                              {task.resources.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {task.resources.map((resource, idx) => (
                                    <a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                      <ExternalLink className="h-3 w-3" />
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
        {completedTasks === totalTasks && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-900">All tasks completed!</h3>
            <p className="text-green-700 mt-2">
              Great job! You're ready for Session 2. Please notify your consultant to schedule the next session.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}