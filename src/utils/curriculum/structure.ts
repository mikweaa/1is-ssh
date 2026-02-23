import type { Subject, DegreeType, Branch } from "./types";

/** When a semester has foreignLanguageElective, electiveCount must be the number of non-FL elective slots only;
 * the dashboard adds the FL slot separately, so counting it in electiveCount would show one extra elective. */
export const curriculum: Record<string, Branch> = {
  ME: {
    id: "ME",
    name: "Mechanical Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ENS101", name: "Introduction to Engineering" },
              { id: "ENS103", name: "Introduction to Machine Design" },
              { id: "MATH101", name: "Calculus I" },
              { id: "NS102", name: "Physics" },
              { id: "NS104", name: "General Chemistry" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "ENS207-3", name: "Engineering Graphics" },
              { id: "ENS209-3", name: "Statics" },
              {
                id: "ENS213",
                name: "Programming for Engineers / Introduction to Programming",
              },
              { id: "MATH102", name: "Calculus II" },
              { id: "MATH201", name: "Linear Algebra" },
              { id: "NS122", name: "Physics II" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "ENS202", name: "Thermodynamics" },
              { id: "ENS205-3", name: "Materials Science" },
              { id: "ENS208-3", name: "Introduction to Manufacturing Systems" },
              { id: "MATH202", name: "Differential Equations" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "ME208-3", name: "Dynamics" },
              { id: "ME210-3", name: "Strength of Materials I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ENS203", name: "Electrical Circuits I" },
              { id: "ENS204", name: "Thermodynamics II" },
              { id: "MATH205", name: "Numerical Analysis" },
              { id: "ME206", name: "Engineering Materials" },
              { id: "ME211", name: "Strength of Materials II" },
              { id: "ME304", name: "Fluid Mechanics" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "ME306", name: "Heat and Mass Transfer" },
              { id: "ME312", name: "Machine Elements" },
            ],
            electiveCount: 3,
            foreignLanguageElective: "I",
          },
          "6": {
            mandatory: [
              { id: "EE305", name: "Instrumentation and Measurements" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "ENS206", name: "System Modeling" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
              { id: "NS112", name: "Understanding Science and Technology" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "7": {
            mandatory: [
              { id: "EE311", name: "Control System Design" },
              { id: "ME370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ENS490", name: "Graduation Project" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic, 1-Year, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional, 1-Year, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS500", name: "Research Methodologies for Engineers and Scientists" },
              { id: "MATH517", name: "Advanced Mathematics for Engineers and Scientists" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [],
            electiveCount: 5,
          },
          "3": {
            mandatory: [
              { id: "ME551", name: "Scientific Activity I" },
              { id: "ME550", name: "Seminar" },
              { id: "ME500", name: "Research Activity" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ME552", name: "Scientific Activity II" },
              { id: "ME595", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
              { id: "ME700", name: "Scientific Activity (Research Seminar)" },
              { id: "ME690", name: "PhD Thesis" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  ARCH: {
    id: "ARCH",
    name: "Architecture",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ARCH100", name: "Introduction to Architectural Design" },
              { id: "ARCH101", name: "Basic Design Communication" },
              { id: "ARCH110", name: "Freehand Drawing" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MATH100", name: "Mathematical Skills" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ARCH102", name: "History of Architecture I" },
              { id: "ARCH106", name: "Introduction to Building Technology" },
              { id: "ARCH108", name: "Introduction to Architectural Design II" },
              { id: "ARCH109", name: "Basic Design Communication II" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ARCH201-8", name: "Architectural Design Studio I" },
              { id: "ARCH203", name: "Building Services I" },
              { id: "ARCH204-6", name: "Structural Design I" },
              { id: "ARCH216-6", name: "Introduction to CAD" },
              { id: "ARCH217", name: "History of Architecture II" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ARCH202-8", name: "Architectural Design Studio II" },
              { id: "ARCH209-6", name: "History of Architecture III" },
              { id: "ARCH210-6", name: "Structural Design II" },
              { id: "ARCH208", name: "Architectural Communication" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "ARCH302", name: "Urban Design and Planning" },
              { id: "ARCH303-8", name: "Architectural Design Studio III" },
              { id: "ARCH313-6", name: "Building Construction I" },
              { id: "ARCH372-6", name: "Composition in Architecture" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "ARCH304-8", name: "Architectural Design Studio IV" },
              { id: "ARCH307-6", name: "Sustainable Design" },
              { id: "ARCH358-6", name: "Building Construction II" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "ARCH380", name: "Work Placement / Internship" },
              { id: "ARCH401-6", name: "Architectural Heritage Conservation" },
              { id: "ARCH402", name: "Contemporary Architectural Theory" },
              { id: "ARCH405-8", name: "Architectural Design Studio V" },
              { id: "ARCH408-6", name: "Building Physics" },
            ],
            electiveCount: 0,
          },
          "8": {
            mandatory: [
              { id: "ARCH403-6", name: "Management in Architecture" },
              { id: "ARCH406-10", name: "Final Design Project" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic, 1-Year, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ARCH512", name: "Research Methods in Architecture" },
              { id: "ARCH513", name: "Architectural Design Studio VII" },
              { id: "ARCH514", name: "Understanding Design Behavior" },
              { id: "ARCH515", name: "Advanced Urban Planning" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ARCH510", name: "Conservation and Restoration" },
              { id: "ARCH518", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional, 1-Year, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ARCH512", name: "Research Methods in Architecture" },
              { id: "ARCH513", name: "Architectural Design Studio VII" },
              { id: "ARCH514", name: "Understanding Design Behavior" },
              { id: "ARCH515", name: "Advanced Urban Planning" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ARCH510", name: "Conservation and Restoration" },
              { id: "ARCH517", name: "Graduation Project" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ARCH512", name: "Research Methods in Architecture" },
              { id: "ARCH513", name: "Architectural Design Studio VII" },
              { id: "ARCH514", name: "Understanding Design Behavior" },
              { id: "ARCH515", name: "Advanced Urban Planning" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ARCH510", name: "Conservation and Restoration" },
            ],
            electiveCount: 4,
          },
          "3": {
            mandatory: [
              { id: "ARCH580", name: "Research Activity" },
              { id: "ARCH581", name: "Scientific Activity I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ARCH582", name: "Scientific Activity II" },
              { id: "ARCH518", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  GBE: {
    id: "GBE",
    name: "Genetics & Bioengineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MATH101", name: "Calculus I" },
              { id: "NS102", name: "Physics" },
              { id: "NS104", name: "General Chemistry" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "MATH102", name: "Calculus II" },
              { id: "NS103", name: "Biology" },
              { id: "NS112", name: "Understanding Science and Technology" },
              { id: "NS207", name: "Organic Chemistry" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "MATH202", name: "Differential Equations" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "NS202", name: "Biochemistry I" },
              { id: "NS205", name: "Cell Biology" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "BIO305", name: "Biochemistry II" },
              { id: "NS209", name: "Genetics I" },
              { id: "ENS213", name: "Programming for Engineers" },
            ],
            electiveCount: 2,
          },
          "5": {
            mandatory: [
              { id: "BIO301", name: "Molecular Biology" },
              { id: "BIO303", name: "Genetics II" },
              { id: "BIO310", name: "Bioinformatics" },
              { id: "ENS202", name: "Thermodynamics" },
              { id: "IE408", name: "Project Management" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "BIO306", name: "General Microbiology" },
              { id: "BIO312", name: "Techniques in Molecular Biology" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "BIO370", name: "Work Placement / Internship" },
              { id: "BIO415", name: "Genetic Engineering" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "BIO407", name: "Protein Engineering" },
              { id: "ENS490", name: "Graduation Project" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (1-Year, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [],
            electiveCount: 4,
          },
          "2": {
            mandatory: [
              { id: "BIO590", name: "Master Thesis" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS500", name: "Research Methodologies for Engineers and Scientists" },
            ],
            electiveCount: 3,
          },
          "2": {
            mandatory: [
              { id: "BIO500", name: "Research Activity" },
            ],
            electiveCount: 3,
          },
          "3": {
            mandatory: [
              { id: "BIO550", name: "Seminar" },
              { id: "BIO551", name: "Scientific Activity I" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "BIO552", name: "Scientific Activity II" },
              { id: "BIO590", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
              { id: "BIO700", name: "Scientific Activity (Research Seminar)" },
              { id: "BIO790", name: "Doctoral Dissertation" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  IE: {
    id: "IE",
    name: "Industrial Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS100", name: "Computer Skills" },
              { id: "MATH101", name: "Calculus I" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "MATH102", name: "Calculus II" },
              { id: "NS102", name: "Physics I" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ENS205", name: "Materials Science" },
              { id: "ENS207", name: "Engineering Graphics" },
              { id: "MATH201", name: "Linear Algebra" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "ENS208", name: "Introduction to Manufacturing Systems" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "MATH205", name: "Numerical Analysis" },
              { id: "MATH202", name: "Differential Equations" },
              { id: "ENS213", name: "Programming for Engineers" },
              { id: "MATH306", name: "Statistical Modeling" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "IE301", name: "Production Planning I" },
              { id: "IE303", name: "Operations Research I" },
              { id: "IE309", name: "Ergonomics" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "IE306", name: "Simulation" },
              { id: "IE307", name: "Quality and Reliability Engineering" },
              { id: "SPS103", name: "Law and Ethics" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "IE408", name: "Project Management" },
              { id: "IE370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "IE425", name: "Computer Aided Design and Manufacturing" },
              { id: "IE413", name: "Manufacturing Systems" },
              { id: "ENS490", name: "Graduation Project" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (1-Year, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
            ],
            electiveCount: 4,
          },
          "2": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
              { id: "IE790", name: "PhD Thesis" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  CSE: {
    id: "CSE",
    name: "Computer Sciences and Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS103", name: "Introduction to Programming" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ENS101", name: "Introduction to Engineering" },
              { id: "MATH101", name: "Calculus I" },
              { id: "NS102", name: "Physics I" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "CS105", name: "Advanced Programming" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "MATH102", name: "Calculus II" },
              { id: "MATH201", name: "Linear Algebra" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "CS206", name: "Data Structures" },
              { id: "CS303", name: "Digital Design" },
              { id: "MATH202", name: "Differential Equations" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "MATH204", name: "Discrete Mathematics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "CS207", name: "Analysis of Algorithms" },
              { id: "CS304", name: "Computer Architecture" },
              { id: "CS306", name: "Database Management" },
              { id: "ENS203", name: "Electrical Circuits I" },
              { id: "MATH205", name: "Numerical Analysis" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "CS305", name: "Programming Languages" },
              { id: "CS307", name: "Operating Systems" },
              { id: "CS412", name: "Web Application Development" },
              { id: "IE308", name: "Project Management" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "CS308", name: "Software Engineering" },
              { id: "EE325", name: "Embeded Systems" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
              { id: "SE308", name: "Communication Systems and Networks" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "CS313", name: "Theory of Computation" },
              { id: "CS370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ENS490", name: "Graduation Project" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (1-Year, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS500", name: "Research Methodologies for Engineers and Scientists" },
            ],
            electiveCount: 3,
          },
          "2": {
            mandatory: [],
            electiveCount: 5,
          },
          "3": {
            mandatory: [
              { id: "CS500", name: "Research Activity" },
              { id: "CS550", name: "Seminar" },
              { id: "CS551", name: "Scientific Activity I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "CS552", name: "Scientific Activity II" },
              { id: "CS590", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
              { id: "CS700", name: "Scientific Activity (Research Seminar)" },
            ],
            electiveCount: 4,
          },
          "2": {
            mandatory: [
              { id: "CS790", name: "PhD Thesis" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  EE: {
    id: "EE",
    name: "Electrical and Electronics Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS103", name: "Introduction to Programming" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MATH101", name: "Calculus I" },
              { id: "NS102", name: "Physics I" },
              { id: "ENS101", name: "Introduction to Engineering" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "MATH102", name: "Calculus II" },
              { id: "NS122", name: "Physics II" },
              { id: "MATH201", name: "Linear Algebra" },
              { id: "ENS203", name: "Electrical Circuits I" },
              { id: "NS112", name: "Understanding Science and Technology" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              {
                id: "ENS213",
                name: "Introduction to Programming / Programming for Engineers",
              },
              { id: "EE201", name: "Analog Electronics I" },
              { id: "EE202", name: "Electrical Circuits II" },
              { id: "MATH202", name: "Differential Equations" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "EE305", name: "Instrumentation and Measurements" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "ENS201", name: "Electromagnetism I" },
              { id: "ENS206", name: "System Modeling" },
              { id: "MATH205", name: "Numerical Analysis" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "CS303", name: "Digital Design" },
              { id: "EE311", name: "Control System Design" },
              { id: "EE322", name: "Power Systems" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "EE321", name: "Electrical Machines" },
              { id: "EE325", name: "Embedded Systems" },
              { id: "ENS207", name: "Engineering Graphics" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "EE370", name: "Work Placement / Internship" },
              { id: "IE408", name: "Project Management" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ENS490", name: "Graduation Project" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (1-Year, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MATH517", name: "Advanced Mathematics for Engineers and Scientists" },
            ],
            electiveCount: 4,
          },
          "2": {
            mandatory: [
              { id: "EE599", name: "Master Thesis" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS500", name: "Research Methodologies for Engineers and Scientists" },
              { id: "MATH517", name: "Advanced Mathematics for Engineers and Scientists" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [],
            electiveCount: 5,
          },
          "3": {
            mandatory: [
              { id: "EE585", name: "Research Activity" },
              { id: "EE590", name: "Seminar" },
              { id: "EE591", name: "Scientific Activity I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "EE592", name: "Scientific Activity II" },
              { id: "EE599", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENS666", name: "Advanced Research Methodologies and Design" },
              { id: "EE701-706", name: "Scientific Activity (Research Seminar)" },
              { id: "EE699", name: "PhD Thesis" },
            ],
            electiveCount: 4,
          },
          "2": {
            mandatory: [
              { id: "EE699", name: "PhD Thesis" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  SE: {
    id: "SE",
    name: "Software Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS103", name: "Introduction to Programming" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ENS101", name: "Introduction to Engineering" },
              { id: "MATH101", name: "Calculus I" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "CS105", name: "Advanced Programming" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "MATH201", name: "Linear Algebra" },
              { id: "SE211", name: "Software Construction" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "CS206", name: "Data Structures" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "MATH204", name: "Discrete Mathematics" },
              { id: "SE322", name: "Software Requirements Analysis" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "CS207", name: "Analysis of Algorithms" },
              { id: "CS304", name: "Computer Architecture" },
              { id: "CS306", name: "Database Management" },
              { id: "CS310", name: "Human Computer Interaction" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "CS305", name: "Programming Languages" },
              { id: "CS307", name: "Operating Systems" },
              { id: "CS412", name: "Web Application Development" },
              { id: "IE408", name: "Project Management" },
              { id: "SE302", name: "Software Testing and Maintenance" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "CS308", name: "Software Engineering" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
              { id: "SE308", name: "Communication Systems and Networks" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "CS420", name: "Network Programming" },
              { id: "SE370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ENS490", name: "Graduation Project" },
              { id: "SE407", name: "Software Quality Management" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (1-Year, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  AIDE: {
    id: "AIDE",
    name: "Artificial Intelligence and Data Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS103", name: "Introduction to Programming" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ENS101", name: "Introduction to Engineering" },
              { id: "MATH101", name: "Calculus I" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "AIDE201", name: "Fundamentals of Data Science" },
              { id: "CS105", name: "Advanced Programming" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "MATH201", name: "Linear Algebra" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "AID201", name: "Programming for Data Science" },
              { id: "CS206", name: "Data Structures" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
              { id: "MATH204", name: "Discrete Mathematics" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "CS207", name: "Analysis of Algorithms" },
              { id: "CS306", name: "Database Management" },
              { id: "CS417", name: "Introduction to Data Mining" },
              { id: "MATH306", name: "Statistical Modeling" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "CS412", name: "Web Application Development" },
              { id: "EE418", name: "Introduction to Machine Learning" },
              { id: "IE408", name: "Project Management" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "AID302", name: "Optimization for Data Science" },
              { id: "AID304", name: "Big Data Analytics" },
              { id: "CS404", name: "Artificial Intelligence" },
              { id: "ENS309", name: "Ethics in Engineering and Natural Sciences" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "AID401", name: "Deep Learning" },
              { id: "CS370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ENS490", name: "Graduation Project" },
              { id: "AID402", name: "Applied Data Engineering" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  MD: {
    id: "MD",
    name: "Medicine",
    degrees: {
      integrated: {
        id: "integrated",
        name: "Integrated Program (Double Degree, 6 Years / 360 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MED100", name: "MED100 - Behavioral Sciences" },
              { id: "MED101", name: "MED101 - Cell Biology and Molecular Genetics" },
              { id: "MED102", name: "MED102 - Medical Chemistry and Biochemistry I" },
              { id: "MED103", name: "MED103 - Medical Physics and Biophysics" },
              { id: "MED104", name: "MED104 - Medical Ethics and Sociology" },
              { id: "MED105", name: "MED105 - Introduction to Medicine with History of Medicine" },
              { id: "MED106", name: "MED106 - First Aid" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "MED107", name: "MED107 - Human Genetics" },
              { id: "MED108", name: "MED108 - Medical Chemistry and Biochemistry II" },
              { id: "MED109", name: "MED109 - Biostatistics" },
              { id: "MED110", name: "MED110 - Medical Informatics" },
              { id: "MED111", name: "MED111 - Human Anatomy I" },
              { id: "MED112", name: "MED112 - Introduction to Scientific Methods I" },
              { id: "MED113", name: "MED113 - Hygiene" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "MED200", name: "MED200 - Human Anatomy II" },
              { id: "MED201", name: "MED201 - Histology and Embryology I" },
              { id: "MED202", name: "MED202 - Human Physiology I" },
              { id: "MED203", name: "MED203 - Biophysics" },
              { id: "MED204", name: "MED204 - Fundamentals of Clinical Practice I" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "MED205", name: "MED205 - Human Physiology II" },
              { id: "MED206", name: "MED206 - Histology and Embryology II" },
              { id: "MED207", name: "MED207 - Medical Microbiology I" },
              { id: "MED208", name: "MED208 - Human Anatomy III" },
              { id: "MED209", name: "MED209 - Introduction to Scientific Methods II" },
              { id: "MED210", name: "MED210 - Fundamentals of Clinical Practice II" },
            ],
            electiveCount: 2,
          },
          "5": {
            mandatory: [
              { id: "MED300", name: "MED300 - Pathology I" },
              { id: "MED301", name: "MED301 - Pathophysiology I" },
              { id: "MED302", name: "MED302 - Pharmacology and Toxicology I" },
              { id: "MED303", name: "MED303 - Medical Microbiology II" },
              { id: "MED304", name: "MED304 - Immunology" },
              { id: "MED305", name: "MED305 - Preventive Medicine and Epidemiology" },
              { id: "MED306", name: "MED306 - Fundamentals of Clinical Practice III" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "MED307", name: "MED307 - Pathology II" },
              { id: "MED308", name: "MED308 - Pathophysiology II" },
              { id: "MED309", name: "MED309 - Pharmacology and Toxicology II" },
              { id: "MED310", name: "MED310 - Clinical Propedeutics" },
              { id: "MED311", name: "MED311 - Clinical Biochemistry" },
              { id: "MED312", name: "MED312 - Social Medicine and Organization of Health Care" },
              { id: "MED313", name: "MED313 - Fundamentals of Clinical Practice IV" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "ICHS_XX_001", name: "ICHS XX 001 - Internal Medicine" },
              { id: "CSHS_XX_001", name: "CSHS XX 001 - Pediatrics" },
              { id: "GNCR_XX_001", name: "GNCR XX 001 - General Surgery" },
              { id: "KHDG_XX_001", name: "KHDG XX 001 - Obstetrics and Gynecology" },
              { id: "ANES_XX_001", name: "ANES XX 001 - Anesthesiology and Reanimation" },
              { id: "UROL_XX_001", name: "UROL XX 001 - Urology" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "GOHS_XX_001", name: "GOHS XX 001 - Pulmonology" },
              { id: "KARD_XX_001", name: "KARD XX 001 - Cardiology" },
              { id: "NORO_XX_001", name: "NORO XX 001 - Neurology" },
              { id: "RSHS_XX_001", name: "RSHS XX 001 - Mental Health and Child Psychiatry" },
              { id: "ENKM_XX_001", name: "ENKM XX 001 - Infectious Diseases and Clinical Microbiology" },
              { id: "ACLT_XX_001", name: "ACLT XX 001 - Emergency Medicine" },
              { id: "RDYO_XX_001", name: "RDYO XX 001 - Radiology" },
              { id: "DERM_XX_001", name: "DERM XX 001 - Dermatology and Venereal Diseases" },
              { id: "FTRE_XX_001", name: "FTRE XX 001 - Physical Medicine and Rehabilitation" },
              { id: "OTRM_XX_001", name: "OTRM XX 001 - Orthopedics and Traumatology" },
              { id: "KBBC_XX_001", name: "KBBC XX 001 - Otorhinolaryngology (ENT)" },
              { id: "GZHS_XX_001", name: "GZHS XX 001 - Ophthalmology" },
              { id: "BSCR_XX_001", name: "BSCR XX 001 - Neurosurgery" },
              { id: "PREC_XX_001", name: "PREC XX 001 - Plastic, Reconstructive and Aesthetic Surgery" },
              { id: "ADLT_XX_001", name: "ADLT XX 001 - Forensic Medicine" },
            ],
            electiveCount: 3,
          },
          "9": {
            mandatory: [
              { id: "GNCR_XX_001_06", name: "GNCR XX 001 06 - General Surgery" },
              { id: "ICHS_XX_001_06", name: "ICHS XX 001 06 - Internal Medicine" },
              { id: "CSHS_XX_001_06", name: "CSHS XX 001 06 - Pediatrics" },
              { id: "KHDG_XX_001_06", name: "KHDG XX 001 06 - Obstetrics and Gynecology" },
              { id: "ACLT_XX_001_06", name: "ACLT XX 001 06 - Emergency Medicine" },
              { id: "AHEK_XX_001_06", name: "AHEK XX 001 06 - Family Medicine" },
              { id: "HSAG_XX_001_00", name: "HSAG XX 001 00 - Public Health" },
              { id: "RSHS_XX_001_06", name: "RSHS XX 001 06 - Mental Health and Psychiatry" },
              { id: "MTEZ_XX_001_06", name: "MTEZ XX 001 06 - Graduation Thesis" },
            ],
            electiveCount: 1,
          },
        },
      },
    },
  },
  DM: {
    id: "DM",
    name: "Dental Medicine",
    degrees: {
      integrated: {
        id: "integrated",
        name: "Integrated Program (Double Degree, 6 Years / 360 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "DEN100", name: "Behavioral Sciences" },
              { id: "DEN101", name: "Medical Biology" },
              { id: "DEN102", name: "Chemistry and Biochemistry I" },
              { id: "DEN103", name: "Microbiology and Immunology" },
              { id: "DEN104", name: "Dental Terminology (Elective Course)" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "DEN200", name: "Biostatistics" },
              { id: "DEN201", name: "Genetics" },
              { id: "DEN202", name: "Chemistry and Biochemistry II" },
              { id: "DEN203", name: "Physics and Biophysics" },
              { id: "DEN204", name: "History of Dentistry and Deontology (Elective Course)" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "DEN300", name: "Human Anatomy I" },
              { id: "DEN301", name: "Physiology I" },
              { id: "DEN302", name: "Histology and Embryology I" },
              { id: "DEN303", name: "Dental Morphology and Manipulation I" },
              { id: "DEN304", name: "Radiology" },
              { id: "DEN305", name: "Dental Materials and Equipments" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "DEN400", name: "Human Anatomy II" },
              { id: "DEN401", name: "Physiology II" },
              { id: "DEN402", name: "Histology and Embryology II" },
              { id: "DEN403", name: "Dental Morphology and Manipulation II" },
              { id: "DEN404", name: "First Aid" },
              { id: "DEN405", name: "Preventive Medicine and Epidemiology" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "DEN500", name: "Prosthodontics I" },
              { id: "DEN501", name: "Oral, Dental and Maxillofacial Radiology I" },
              { id: "DEN502", name: "Restorative Dentistry I" },
              { id: "DEN503", name: "Endodontics I" },
              { id: "DEN504", name: "Dental Occlusion" },
              { id: "DEN505", name: "Pediatrics, Internal Medicine and General Medicine" },
              { id: "DEN506", name: "Hygiene" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "DEN600", name: "Prosthodontics II" },
              { id: "DEN601", name: "Oral, Dental and Maxillofacial Radiology II" },
              { id: "DEN602", name: "Restorative Dentistry II" },
              { id: "DEN603", name: "Endodontics II" },
              { id: "DEN604", name: "Preventive and Protective Dentistry" },
              { id: "DEN605", name: "Dental Research" },
              { id: "DEN606", name: "Anesthesia and Sedation" },
            ],
            electiveCount: 0,
          },
          "7": {
            mandatory: [
              { id: "DEN700", name: "Prosthodontics III" },
              { id: "DEN701", name: "Oral, Dental and Maxillofacial Radiology III" },
              { id: "DEN702", name: "Restorative Dentistry III" },
              { id: "DEN703", name: "Endodontics III" },
              { id: "DEN704", name: "Periodontology I" },
              { id: "DEN705", name: "Oral, Dental and Maxillofacial Surgery I" },
              { id: "DEN706", name: "Pediatric Dentistry I" },
              { id: "DEN707", name: "Orthodontics I" },
              { id: "DEN708", name: "Dental Anesthesia" },
              { id: "DEN709", name: "Pharmacology" },
              { id: "DEN710", name: "Internal Medicine (Elective Course)" },
            ],
            electiveCount: 0,
          },
          "8": {
            mandatory: [
              { id: "DEN800", name: "Prosthodontics IV" },
              { id: "DEN801", name: "Oral, Dental and Maxillofacial Radiology IV" },
              { id: "DEN802", name: "Restorative Dentistry IV" },
              { id: "DEN803", name: "Endodontics IV" },
              { id: "DEN804", name: "Periodontology II" },
              { id: "DEN805", name: "Oral, Dental and Maxillofacial Surgery II" },
              { id: "DEN806", name: "Pediatric Dentistry II" },
              { id: "DEN807", name: "Orthodontics II" },
              { id: "DEN808", name: "Pathology" },
              { id: "DEN809", name: "Immunology (Elective Course)" },
            ],
            electiveCount: 0,
          },
          "9": {
            mandatory: [
              { id: "DEN900", name: "Prosthodontics V" },
              { id: "DEN901", name: "Oral, Dental and Maxillofacial Radiology V" },
              { id: "DEN902", name: "Restorative Dentistry V" },
              { id: "DEN903", name: "Endodontics V" },
              { id: "DEN904", name: "Oral, Dental and Maxillofacial Surgery III" },
              { id: "DEN905", name: "Periodontology III" },
              { id: "DEN906", name: "Pediatric Dentistry III" },
              { id: "DEN907", name: "Orthodontics III" },
              { id: "DEN908", name: "Oral Diseases" },
              { id: "DEN909", name: "Health Law and Professional Legislation" },
            ],
            electiveCount: 0,
          },
          "10": {
            mandatory: [
              { id: "DEN1000", name: "Prosthodontics VI" },
              { id: "DEN1001", name: "Oral, Dental and Maxillofacial Radiology VI" },
              { id: "DEN1002", name: "Restorative Dentistry VI" },
              { id: "DEN1003", name: "Endodontics VI" },
              { id: "DEN1004", name: "Oral, Dental and Maxillofacial Surgery IV" },
              { id: "DEN1005", name: "Periodontology IV" },
              { id: "DEN1006", name: "Pediatric Dentistry IV" },
              { id: "DEN1007", name: "Orthodontics IV" },
              { id: "DEN1008", name: "General Surgery" },
              { id: "DEN1009", name: "Infection Control in Dentistry" },
            ],
            electiveCount: 0,
          },
          "11": {
            mandatory: [
              { id: "DEN1100", name: "Clinical Rotation: Prosthodontics I" },
              { id: "DEN1101", name: "Clinical Rotation: Oral, Dental and Maxillofacial Radiology" },
              { id: "DEN1102", name: "Clinical Rotation: Restorative Dentistry" },
              { id: "DEN1103", name: "Clinical Rotation: Oral, Dental and Maxillofacial Surgery I" },
              { id: "DEN1104", name: "Clinical Rotation: Endodontics" },
              { id: "DEN1105", name: "Maxillofacial Surgery" },
              { id: "DEN1106", name: "Maxillofacial Prostheses" },
              { id: "DEN1107", name: "Implantology" },
              { id: "DEN1108", name: "Dermatology" },
              { id: "DEN1109", name: "Otorhinolaryngology" },
            ],
            electiveCount: 0,
          },
          "12": {
            mandatory: [
              { id: "DEN1200", name: "Clinical Rotation: Prosthodontics II" },
              { id: "DEN1201", name: "Clinical Rotation: Periodontology" },
              { id: "DEN1202", name: "Clinical Rotation: Pediatric Dentistry" },
              { id: "DEN1203", name: "Clinical Rotation: Oral, Dental and Maxillofacial Surgery II" },
              { id: "DEN1204", name: "Clinical Rotation: Orthodontics" },
              { id: "DEN1205", name: "Oral Pathology" },
              { id: "DEN1206", name: "Ophthalmology" },
              { id: "DEN1207", name: "Social Aspects of Dental Practice" },
              { id: "DEN1208", name: "General Psychology and Neurology" },
              { id: "DEN1209", name: "Graduate Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  PSY: {
    id: "PSY",
    name: "Psychology",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSY103", name: "Introduction to Psychology" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MATH100", name: "Mathematical Skills" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "POLS101", name: "Introduction to Philosophy" },
              { id: "PSY105", name: "Statistics in Psychology" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "PSY202", name: "Research Methods in Psychology" },
              { id: "PSY204", name: "Biological Psychology" },
              { id: "PSY212", name: "Life-span Development" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "PSY303", name: "Personality Psychology" },
              { id: "PSY308", name: "Social Psychology" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "PSY210", name: "Health Psychology" },
              { id: "PSY305", name: "Cognitive Psychology" },
            ],
            electiveCount: 3,
          },
          "6": {
            mandatory: [
              { id: "PSY311", name: "Organizational Psychology" },
              { id: "PSY402", name: "Experimental Psychology" },
              { id: "PSY412", name: "Abnormal Psychology" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "PSY425", name: "History and Systems" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [
              { id: "PSY370", name: "Internship/Work Placement" },
              { id: "PSY490", name: "Graduation Project" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSYM501", name: "Advanced Psychotherapy and Counseling" },
              { id: "PSYM502", name: "Clinical Psychopathology" },
              { id: "PSYM503", name: "Advanced Research Methods and Statistics" },
              { id: "PSYM504", name: "Clinical (Counseling) Practice I" },
              { id: "PSYM505", name: "Clinical (Counseling) Practice II" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "PSYM506", name: "Professional Project or Term Paper (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSYM601", name: "Advanced Psychotherapy and Counseling" },
              { id: "PSYM602", name: "Clinical Psychopathology" },
              { id: "PSYM603", name: "Advanced Research Methods and Statistics" },
              { id: "PSYM604", name: "Clinical (Counseling) Practice I" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "PSYM605", name: "Master Thesis (24 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSYM701", name: "Advanced Psychotherapy and Counseling" },
              { id: "PSYM702", name: "Clinical Psychopathology" },
              { id: "PSYM703", name: "Advanced Research Methods and Statistics" },
              { id: "PSYM704", name: "Master Thesis Research Proposal" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "PSYM705", name: "Clinical (Counseling) Practice I" },
              { id: "PSYM706", name: "Clinical (Counseling) Practice II" },
            ],
            electiveCount: 3,
          },
          "3": {
            mandatory: [
              { id: "PSYM707", name: "Seminar I" },
              { id: "PSYM708", name: "Seminar II" },
              { id: "PSYM709", name: "Individual Supervision I" },
              { id: "PSYM710", name: "Individual Supervision II" },
              { id: "PSYM711", name: "Professional Development" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "PSYM712", name: "Individual Supervision III" },
              { id: "PSYM713", name: "Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [],
            electiveCount: 6,
          },
        },
      },
    },
  },
  ELIT: {
    id: "ELIT",
    name: "English Language and Literature",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ELIT101", name: "Introduction to Literature" },
            ],
            electiveCount: 3,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "EDU103", name: "Introduction to Foreign Language Pedagogy" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "ELT105", name: "Introduction to Linguistics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELIT202", name: "Survey of English Literature I" },
              { id: "ELT202", name: "Language Acquisition" },
            ],
            electiveCount: 3,
          },
          "4": {
            mandatory: [
              { id: "ELIT211", name: "Academic Writing" },
              { id: "ELIT203", name: "Survey of English Literature II" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "ELIT303", name: "Translation Theory and Practice" },
              { id: "ELT321", name: "Introduction to English Language Teaching Methodology" },
            ],
            electiveCount: 3,
          },
          "6": {
            mandatory: [
              { id: "ELIT316", name: "Consecutive and Simultaneous Interpreting" },
              { id: "ELT415", name: "Shakespeare" },
            ],
            electiveCount: 3,
          },
          "7": {
            mandatory: [
              { id: "ELIT412", name: "Literary Theory and Criticism I" },
              { id: "ELT370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ELIT413", name: "Literary Theory and Criticism II" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELITM101", name: "Comparative Literature in Theory and Practice" },
              { id: "ELITM102", name: "Contemporary Principles in English Language Teaching" },
              { id: "ELITM103", name: "Methodology of Scientific Work" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELITM104", name: "Graduation Project (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELITM201", name: "Comparative Literature in Theory and Practice" },
              { id: "ELITM202", name: "Contemporary Principles in English Language Teaching" },
              { id: "ELITM203", name: "Methodology of Scientific Work" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELITM204", name: "Master Thesis (24 ECTS)" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELITM301", name: "Methodology of Scientific Work" },
              { id: "ELITM302", name: "Translation Project" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELITM303", name: "Research Project" },
              { id: "ELITM304", name: "Teaching Practice" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "ELITM305", name: "Creative Project" },
              { id: "ELITM306", name: "Internship in English Studies" },
              { id: "ELITM307", name: "Master's Thesis Proposal" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ELITM308", name: "Publishing Practice" },
              { id: "ELITM309", name: "Master's Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT650", name: "Comparative Studies of Literature and Cinema" },
              { id: "ELIT660", name: "Applied Linguistics" },
              { id: "ELIT670", name: "Educational Philosophy and English Language Teaching" },
              { id: "ELIT680", name: "Research Methodology in Anglistics" },
              { id: "ELIT699", name: "PhD Thesis (120 ECTS)" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  VACD: {
    id: "VACD",
    name: "Visual Arts and Visual Communication Design",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "VA101", name: "Visual Language I" },
              { id: "VA102", name: "Introduction to Visual Communication Design" },
              { id: "VA103", name: "Language of Drawing I" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "VA104", name: "Language of Drawing II" },
              { id: "VA211", name: "Digital Vector Graphics" },
              { id: "VA306", name: "Digital Photo Imaging" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "VA121", name: "History of Art I" },
              { id: "VA216", name: "Graphic Design I" },
              { id: "VA303", name: "Typography I" },
              { id: "VA307", name: "Non-Linear Editing I" },
              { id: "VACD312", name: "Photography" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "VA217", name: "Graphic Design II" },
              { id: "VA324", name: "History of Graphic Design" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "VA403", name: "3D Design I" },
              { id: "VA406", name: "User Experience Design (UX Design) I" },
            ],
            electiveCount: 3,
          },
          "6": {
            mandatory: [],
            electiveCount: 5,
          },
          "7": {
            mandatory: [
              { id: "VA370", name: "Work Placement / Internship" },
              { id: "VA408", name: "Research Methods in Visual Communication" },
              { id: "VA415", name: "Design Studio I" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "VA490", name: "Graduation Project" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "VACDM101", name: "VA501 - Studio Project I" },
              { id: "VACDM102", name: "VA522 - Visual Communication Theory" },
              { id: "VACDM103", name: "VA523 - Fields of Design" },
              { id: "VACDM104", name: "VA525 - Research Methodology" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "VACDM105", name: "VA524 - Critical Practice" },
              { id: "VACDM106", name: "VA560 - Final Art Project" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "VACDM201", name: "VA501 - Studio Project I" },
              { id: "VACDM202", name: "VA522 - Visual Communication Theory" },
              { id: "VACDM203", name: "VA523 - Fields of Design" },
              { id: "VACDM204", name: "VA525 - Research Methodology" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "VACDM205", name: "VA580 - Master Thesis" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "VACDM301", name: "VA501 - Studio Project I" },
              { id: "VACDM302", name: "VA522 - Visual Communication Theory" },
              { id: "VACDM303", name: "VA523 - Fields of Design" },
              { id: "VACDM304", name: "VA525 - Research Methodology" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "VACDM305", name: "VA524 - Critical Practice" },
              { id: "VACDM306", name: "VA530 - Artistic / Research Activity I" },
            ],
            electiveCount: 2,
          },
          "3": {
            mandatory: [
              { id: "VACDM307", name: "VA531 - Artistic / Research Activity II" },
              { id: "VACDM308", name: "VA532 - Artistic / Research Activity III" },
              { id: "VACDM309", name: "VA595 - Master's Thesis Proposal" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "VACDM310", name: "VA570 - Practice / Research-Based Internship" },
              { id: "VACDM311", name: "VA580 - Master Thesis" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  MAC: {
    id: "MAC",
    name: "Media and Communication",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CULT101", name: "Understanding Cultural Encounters" },
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MAC101", name: "Communication Theory" },
              { id: "PSY103", name: "Introduction to Psychology" },
              { id: "VA102", name: "Introduction to Visual Communication Design" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT103", name: "Nonverbal Communication" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "IR101", name: "Introduction to International Relations" },
              { id: "MAC102", name: "Introduction to Media Studies" },
              { id: "SOC102", name: "Introduction to Sociology" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELT210", name: "Rhetoric" },
              { id: "MAC201", name: "Media Theory" },
              { id: "MAC202", name: "Introduction to Storytelling" },
              { id: "MAC203", name: "Basic Journalism" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "ELT211", name: "Audience, Language, and Thought" },
              { id: "MAC204", name: "Radio and Television Reporting" },
              { id: "MAC205", name: "Internet Studies" },
              { id: "PSY308", name: "Social Psychology" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "MAC301", name: "Media Literacy" },
              { id: "MAC302", name: "Media Economics Management" },
              { id: "MAC303", name: "Media Regulations and Internet Law" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "MAC304", name: "Multimedia Journalism" },
              { id: "MAC305", name: "Public Relations and Advertising" },
              { id: "VA444", name: "Digital TV Production" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "MAC401", name: "Research Methods in Media Studies" },
              { id: "MAC402", name: "Crisis Communication" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "LAW310", name: "Intellectual Property Law" },
              { id: "MAC490", name: "Graduation Project" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  CULT: {
    id: "CULT",
    name: "Cultural Studies",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ENG111", name: "ENG111 - Freshman English" },
              { id: "MAN111", name: "MAN111 - Communication and Reporting" },
              { id: "MATH101", name: "MATH101 - Calculus I" },
              { id: "ECON101", name: "ECON101 - Introduction to Economics" },
              { id: "HUM101", name: "HUM101 - Science and Technology" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ENG112", name: "ENG112 - Freshman English II" },
              { id: "HIST191", name: "HIST191 - History of Civilization" },
              { id: "SPS103", name: "SPS103 - Law and Ethics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ANTH211", name: "ANTH211 - Globalism and Glocalism" },
              { id: "CULT205", name: "CULT205 - Culture and Advertisement" },
              { id: "SOC201", name: "SOC201 - Social Theory" },
            ],
            electiveCount: 3,
          },
          "4": {
            mandatory: [
              { id: "CULT201", name: "CULT201 - Theory and Practice of Cultural Studies" },
              { id: "CULT202", name: "CULT202 - Introduction to Anthropology" },
              { id: "CULT203", name: "CULT203 - Cultural History" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "CULT206", name: "CULT206 - Introduction to Media Studies" },
              { id: "CULT207", name: "CULT207 - Introduction to Film Studies" },
              { id: "CULT310", name: "CULT310 - Bosnian Cultural Heritage I" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "CULT311", name: "CULT311 - Bosnian Cultural Heritage II" },
              { id: "CULT315", name: "CULT315 - Media, Culture and Society" },
              { id: "CULT318", name: "CULT318 - Anthropology and Ethnography" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "CULT413", name: "CULT413 - Research Methodology in Cultural Studies" },
              { id: "SOC311", name: "SOC311 - Sociology of Culture" },
              { id: "SOC314", name: "SOC314 - Sociology of Media" },
              { id: "SOC351", name: "SOC351 - Sociology of Religion" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "SOC410", name: "SOC410 - Identity Studies" },
              { id: "SOC412", name: "SOC412 - Ethnicity and Nationalism" },
              { id: "CULT401", name: "CULT401 - Bachelor Thesis" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "Master (Professional MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CULTM101", name: "CULT510 - Cultural Heritage and Tourism Industry" },
              { id: "CULTM102", name: "MBA530 - Management and Cultural Industries" },
              { id: "CULTM103", name: "SOC502 - Digital Media and Popular Culture" },
              { id: "CULTM104", name: "SOC503 - Social and Cultural Theory" },
              { id: "CULTM105", name: "SPS501 - Methodology in Social Sciences" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "CULTM106", name: "CULT521 - Cultural and Creative Industries" },
              { id: "CULTM107", name: "CULT593 - Graduation Project (12 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "Master (Academic MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CULTM201", name: "CULT523 - Cultural Diplomacy" },
              { id: "CULTM202", name: "MBA530 - Management and Cultural Industry" },
              { id: "CULTM203", name: "SOC502 - Digital Media and Popular Culture" },
              { id: "CULTM204", name: "SOC503 - Social and Cultural Theory" },
              { id: "CULTM205", name: "SPS501 - Methodology in Social Sciences" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "CULTM206", name: "CULT510 - Cultural Heritage and Tourism" },
              { id: "CULTM207", name: "CULT594 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CULTPHD101", name: "SPS601 - Advanced Methodology in Social Sciences" },
              { id: "CULTPHD102", name: "CULT608 - Social Institutions" },
              { id: "CULTPHD103", name: "CULT620 - Scientific-Research Work" },
              { id: "CULTPHD104", name: "CULT701 - Doctoral Dissertation" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  SPS: {
    id: "SPS",
    name: "Political Sciences",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "MATH100", name: "Mathematical Skills" },
              { id: "POLS102", name: "Introduction to Political Science" },
              { id: "POLS101", name: "Introduction to Philosophy" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "SOC102", name: "Introduction to Sociology" },
              { id: "IR101", name: "Introduction to International Relations" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "POLS204", name: "Comparative Political Analysis" },
              { id: "SOC201", name: "Social Theory" },
              { id: "HIST202", name: "History of the Balkans" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "POLS211", name: "Politics and the Media" },
              { id: "HIST201", name: "Historical Thought" },
              { id: "POLS212", name: "Political Participation" },
              { id: "IR215", name: "EU System" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "POLS306", name: "Religion and Politics" },
              { id: "SPS311", name: "Quantitative Research Methods" },
              { id: "POLS301", name: "Political Philosophy" },
              { id: "POLS304", name: "Politics in BiH" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "POLS303", name: "Survey of Political History" },
              { id: "SPS312", name: "Qualitative Research Methods" },
              { id: "POLS302", name: "Contemporary Political Thought" },
              { id: "SOC351", name: "Political Sociology" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "HIST309", name: "Social and Economic History of Europe" },
              { id: "SPS370", name: "Work Placement / Internship" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "SOC404", name: "New Social Movements" },
              { id: "POLS407", name: "Politics and Governance in the Balkans" },
              { id: "POLS499", name: "Graduation Project" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-balkan-academic": {
        id: "master-balkan-academic",
        name: "Master (Balkan Studies, Academic MA)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSM101", name: "SPS514 - Politics, Religion and Society of the Balkans" },
              { id: "SPSM102", name: "SPS501 - Methodology in Social Sciences" },
              { id: "SPSM103", name: "IR504 - Thesis Preparation Seminar" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "SPSM104", name: "POLS594 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-balkan-professional": {
        id: "master-balkan-professional",
        name: "Master (Balkan Studies, Professional MA)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSM201", name: "SPS514 - Politics, Religion and Society of the Balkans" },
              { id: "SPSM202", name: "SPS501 - Methodology in Social Sciences" },
              { id: "SPSM203", name: "IR504 - Thesis Preparation Seminar" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "SPSM204", name: "POLS590 - Professional Project (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-european": {
        id: "master-european",
        name: "Master (European Studies, MA)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSM301", name: "SPS502 - Advanced Studies in European Politics" },
              { id: "SPSM302", name: "SPS501 - Methodology in Social Sciences" },
              { id: "SPSM303", name: "IR504 - Thesis Preparation Seminar" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "SPSM304", name: "POLS590 - Professional Project (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-european-academic": {
        id: "master-european-academic",
        name: "Master (European Studies, Academic MA)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSM301", name: "SPS502 - Advanced Studies in European Politics" },
              { id: "SPSM302", name: "SPS501 - Methodology in Social Sciences" },
              { id: "SPSM303", name: "IR504 - Thesis Preparation Seminar" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "SPSM304", name: "POLS594 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-european-professional": {
        id: "master-european-professional",
        name: "Master (European Studies, Professional MA)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSM401", name: "SPS502 - Advanced Studies in European Politics" },
              { id: "SPSM402", name: "SPS501 - Methodology in Social Sciences" },
              { id: "SPSM403", name: "IR504 - Thesis Preparation Seminar" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "SPSM404", name: "POLS590 - Professional Project (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPSPHD101", name: "SPS601 - Advanced Methodology in Social Sciences" },
              { id: "SPSPHD102", name: "SPS604 - Dissertation Preparation Seminar" },
              { id: "SPSPHD103", name: "SPS620 - Scientific Activity (Research Seminar)" },
              { id: "SPSPHD104", name: "POLS791 - PhD Thesis" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  PSIR: {
    id: "PSIR",
    name: "Political Science and International Relations",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ECON111", name: "ECON111 - Introduction to Microeconomics" },
              { id: "ELIT100", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "MATH100", name: "MATH100 - Mathematical Skills" },
              { id: "POLS102", name: "POLS102 - Introduction to Political Science" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ECON112", name: "ECON112 - Introduction to Macroeconomics" },
              { id: "ELIT200", name: "ELIT200 - Critical Reading and Writing" },
              { id: "IR101", name: "IR101 - Introduction to International Relations" },
              { id: "SOC102", name: "SOC102 - Introduction to Sociology" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "IR211", name: "IR211 - International Relations Theories" },
              { id: "POLS101", name: "POLS101 - Introduction to Philosophy" },
              { id: "POLS204", name: "POLS204 - Comparative Political Analysis" },
              { id: "POLS306", name: "POLS306 - Religion and Politics" },
              { id: "SOC201", name: "SOC201 - Social Theory" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ECON204", name: "ECON204 - International Political Economy" },
              { id: "IR212", name: "IR212 - Politics in Europe" },
              { id: "IR214", name: "IR214 - International Law" },
              { id: "IR216", name: "IR216 - Foreign Policy Analysis" },
              { id: "POLS211", name: "POLS211 - Politics and the Media" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "IR215", name: "IR215 - EU System" },
              { id: "IR300", name: "IR300 - Research Methodology and Design" },
              { id: "IR301", name: "IR301 - Political Geography and Geopolitics" },
              { id: "IR312", name: "IR312 - Diplomacy" },
              { id: "POLS301", name: "POLS301 - Political Philosophy" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "IR304", name: "IR304 - Security Studies" },
              { id: "IR305", name: "IR305 - International Organizations" },
              { id: "POLS302", name: "POLS302 - Contemporary Political Thought" },
              { id: "POLS304", name: "POLS304 - Politics in BiH" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "SPS370", name: "SPS370 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [],
            electiveCount: 5,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (Second Cycle, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSIRM101", name: "IR502 - International Relations Theories" },
              { id: "PSIRM102", name: "POLS500 - Political Theory" },
              { id: "PSIRM103", name: "SPS501 - Methodology in Social Sciences" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "PSIRM104", name: "POLS594 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "PSIRM201", name: "IR502 - International Relations Theories" },
              { id: "PSIRM202", name: "POLS500 - Political Theory" },
              { id: "PSIRM203", name: "SPS501 - Methodology in Social Sciences" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [],
            electiveCount: 5,
          },
          "3": {
            mandatory: [
              { id: "PSIRM204", name: "POLS589 - Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 4,
          },
          "4": {
            mandatory: [
              { id: "PSIRM205", name: "POLS594 - Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IR600", name: "Theories of International Relations" },
              { id: "SPS601", name: "Advanced Methodology in Social Sciences" },
              { id: "POLS600", name: "Advanced Political Theory" },
            ],
            electiveCount: 6,
          },
        },
      },
    },
  },
  ECON: {
    id: "ECON",
    name: "Economics",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ECON111", name: "ECON111 - Introduction to Microeconomics" },
              { id: "ELIT100", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "MAN102", name: "MAN102 - Introduction to Management" },
              { id: "MATH100", name: "MATH100 - Mathematical Skills" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ECON112", name: "ECON112 - Introduction to Macroeconomics" },
              { id: "ELIT200", name: "ELIT200 - Critical Reading and Writing" },
              { id: "IBF112", name: "IBF112 - Principles of International Business" },
              { id: "MATH101", name: "MATH101 - Calculus I" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ECON201", name: "ECON201 - Intermediate Microeconomics" },
              { id: "ECON211", name: "ECON211 - Business Statistics I" },
              { id: "IBF210", name: "IBF210 - Financial Mathematics" },
              { id: "IBF231", name: "IBF231 - Financial Accounting" },
              { id: "MAN205", name: "MAN205 - Marketing" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ECON202", name: "ECON202 - Intermediate Macroeconomics" },
              { id: "ECON204", name: "ECON204 - International Political Economy" },
              { id: "ECON212", name: "ECON212 - Business Statistics II" },
              { id: "IBF208", name: "IBF208 - Business Finance" },
              { id: "MAN352", name: "MAN352 - Consumer Behavior" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "ECON301", name: "ECON301 - Econometrics I" },
              { id: "ECON350", name: "ECON350 - Financial Institutions and Markets" },
              { id: "ECON352", name: "ECON352 - Money and Banking" },
              { id: "ECON455", name: "ECON455 - Labor Economics" },
              { id: "IBF402", name: "IBF402 - International Trade" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "ECON320", name: "ECON320 - Public Economics" },
              { id: "ECON404", name: "ECON404 - International Monetary System" },
              { id: "ECON430", name: "ECON430 - Growth and Development" },
              { id: "IBF401", name: "IBF401 - International Finance" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "ECON470", name: "ECON470 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [],
            electiveCount: 5,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (Second Cycle, 60 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  IR: {
    id: "IR",
    name: "International Relations",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IR101", name: "IR101 - Introduction to International Relations" },
              { id: "MATH100", name: "MATH100 - Mathematical Skills" },
              { id: "ECON111", name: "ECON111 - Introduction to Microeconomics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "SOC102", name: "SOC102 - Introduction to Sociology" },
              { id: "POLS102", name: "POLS102 - Introduction to Political Science" },
              { id: "ECON112", name: "ECON112 - Introduction to Macroeconomics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "IR211", name: "IR211 - International Relations Theories" },
              { id: "IR212", name: "IR212 - Politics in Europe" },
              { id: "POLS204", name: "POLS204 - Comparative Political Analysis" },
              { id: "POLS306", name: "POLS306 - Religion and Politics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 - Critical Reading and Writing" },
              { id: "IR213", name: "IR213 - International Issues in the Balkans" },
              { id: "IR214", name: "IR214 - International Law" },
              { id: "IR215", name: "IR215 - EU System" },
              { id: "IR216", name: "IR216 - Foreign Policy Analysis" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "IR301", name: "IR301 - Political Geography and Geopolitics" },
              { id: "IR307", name: "IR307 - Contemporary International Politics" },
              { id: "IR312", name: "IR312 - Diplomacy" },
              { id: "IR300", name: "IR300 - Research Methodology and Design" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "ECON204", name: "ECON204 - International Political Economy" },
              { id: "IR304", name: "IR304 - Security Studies" },
              { id: "IR305", name: "IR305 - International Organisations" },
              { id: "SPS312", name: "SPS312 - Qualitative Research Methods" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "IR470", name: "IR470 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [
              { id: "IR491", name: "IR491 - Graduation Project (12 ECTS or program electives)" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (Second Cycle, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "SPS501", name: "SPS501 - Methodology in Social Sciences" },
              { id: "IR502", name: "IR502 - International Relations Theories" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "IR590", name: "IR590 - Master Thesis" },
            ],
            electiveCount: 3,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  HTM: {
    id: "HTM",
    name: "Hospitality and Tourism Management",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "HTM101", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "HTM102", name: "MATH100 - Mathematical Skills" },
              { id: "HTM103", name: "ECON111 - Introduction to Microeconomics" },
              { id: "HTM104", name: "MAN102 - Introduction to Management" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "HTM201", name: "ELIT200 - Critical Reading and Writing" },
              { id: "HTM202", name: "MATH101 - Calculus I" },
              { id: "HTM203", name: "ECON112 - Introduction to Macroeconomics" },
              { id: "HTM204", name: "IBF205 - Principles of International Business" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "HTM301", name: "ECON211 - Business Statistics I" },
              { id: "HTM302", name: "ECON201 - Intermediate Microeconomics" },
              { id: "HTM303", name: "MAN231 - Financial Accounting" },
              { id: "HTM304", name: "MAN205 - Marketing" },
              { id: "HTM305", name: "IBF102 - Managerial Mathematics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "HTM401", name: "ECON221 - Business Statistics II" },
              { id: "HTM402", name: "ECON202 - Intermediate Macroeconomics" },
              { id: "HTM403", name: "IBF208 - Business Finance" },
              { id: "HTM404", name: "MAN332 - Business Law" },
              { id: "HTM405", name: "HTM200 - Principles of Travel and Tourism" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "HTM501", name: "MAN321 - Managerial Accounting" },
              { id: "HTM502", name: "MAN359 - Research Methods in Business" },
              { id: "HTM503", name: "MAN434 - Business Communication" },
              { id: "HTM504", name: "HTM300 - Hospitality Management" },
              { id: "HTM505", name: "HTM310 - Principles of Gastronomy" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "HTM601", name: "MAN302 - Human Resource Management" },
              { id: "HTM602", name: "MAN303 - Entrepreneurship and Small Business Management" },
              { id: "HTM603", name: "MAN402 - Strategic Management" },
              { id: "HTM604", name: "HTM320 - The Business of Leisure" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "HTM701", name: "HTM470 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [],
            electiveCount: 5,
          },
        },
      },
    },
  },
  MAN: {
    id: "MAN",
    name: "Management",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ECON111", name: "ECON111 - Introduction to Microeconomics" },
              { id: "ELIT100", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "MAN102", name: "MAN102 - Introduction to Management" },
              { id: "MATH100", name: "MATH100 - Mathematical Skills" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ECON112", name: "ECON112 - Introduction to Macroeconomics" },
              { id: "ELIT200", name: "ELIT200 - Critical Reading and Writing" },
              { id: "IBF112", name: "IBF112 - Principles of International Business" },
              { id: "MATH101", name: "MATH101 - Calculus I" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ECON201", name: "ECON201 - Intermediate Microeconomics" },
              { id: "ECON211", name: "ECON211 - Business Statistics I" },
              { id: "IBF210", name: "IBF210 - Financial Mathematics" },
              { id: "IBF231", name: "IBF231 - Financial Accounting" },
              { id: "MAN205", name: "MAN205 - Marketing" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ECON202", name: "ECON202 - Intermediate Macroeconomics" },
              { id: "ECON221", name: "ECON221 - Business Statistics II" },
              { id: "IBF208", name: "IBF208 - Business Finance" },
              { id: "MAN304", name: "MAN304 - Organizational Behavior" },
              { id: "MAN352", name: "MAN352 - Consumer Behavior" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "ECON352", name: "ECON352 - Money and Banking" },
              { id: "IBF321", name: "IBF321 - Managerial Accounting" },
              { id: "MAN305", name: "MAN305 - Organization Theory" },
              { id: "MAN345", name: "MAN345 - Organizational Leadership" },
              { id: "MAN359", name: "MAN359 - Research Methods in Business" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "MAN302", name: "MAN302 - Human Resource Management" },
              { id: "MAN303", name: "MAN303 - Entrepreneurship and Small Business Management" },
              { id: "MAN332", name: "MAN332 - Business Law" },
              { id: "MAN402", name: "MAN402 - Strategic Management" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "MAN470", name: "MAN470 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [],
            electiveCount: 5,
          },
        },
      },
      "master-1y-professional": {
        id: "master-1y-professional",
        name: "MBA (Professional, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MANM101", name: "MBA501 - Financial and Managerial Accounting" },
              { id: "MANM102", name: "MBA521 - Management and Organization" },
              { id: "MANM103", name: "MBA541 - Marketing Management" },
              { id: "MANM104", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "MANM105", name: "MBA592 - MBA Graduation Project (12 ECTS)" },
            ],
            electiveCount: 4,
          },
        },
      },
      "master-1y-academic": {
        id: "master-1y-academic",
        name: "MBA (Academic, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MANM201", name: "MBA501 - Financial and Managerial Accounting" },
              { id: "MANM202", name: "MBA521 - Management and Organization" },
              { id: "MANM203", name: "MBA541 - Marketing Management" },
              { id: "MANM204", name: "MBA581 - Advanced Research Methods in Business" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "MANM205", name: "MBA598 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "MBA (2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MANM301", name: "MBA501 - Financial and Managerial Accounting" },
              { id: "MANM302", name: "MBA521 - Management and Organization" },
              { id: "MANM303", name: "MBA541 - Marketing Management" },
              { id: "MANM304", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "MANM305", name: "MBA589 - Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "MANM306", name: "MBA598 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (180 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  IBF: {
    id: "IBF",
    name: "International Business and Finance",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBF101", name: "ECON111 - Introduction to Microeconomics" },
              { id: "IBF102", name: "ELIT100 - Academic English and Effective Communication" },
              { id: "IBF103", name: "MAN102 - Introduction to Management" },
              { id: "IBF104", name: "MATH100 - Mathematical Skills" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "IBF201", name: "ECON112 - Introduction to Macroeconomics" },
              { id: "IBF202", name: "ELIT200 - Critical Reading and Writing" },
              { id: "IBF203", name: "IBF112 - Principles of International Business" },
              { id: "IBF204", name: "MATH101 - Calculus I" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "IBF301", name: "ECON201 - Intermediate Microeconomics" },
              { id: "IBF302", name: "ECON211 - Business Statistics I" },
              { id: "IBF303", name: "IBF210 - Financial Mathematics" },
              { id: "IBF304", name: "IBF231 - Financial Accounting" },
              { id: "IBF305", name: "MAN205 - Marketing" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "IBF401", name: "ECON202 - Intermediate Macroeconomics" },
              { id: "IBF402", name: "ECON221 - Business Statistics II" },
              { id: "IBF403", name: "IBF208 - Business Finance" },
              { id: "IBF404", name: "MAN332 - Business Law" },
              { id: "IBF405", name: "MAN352 - Consumer Behavior" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "IBF501", name: "ECON352 - Money and Banking" },
              { id: "IBF502", name: "IBF318 - International Management" },
              { id: "IBF503", name: "IBF321 - Managerial Accounting" },
              { id: "IBF504", name: "IBF402 - International Trade" },
              { id: "IBF505", name: "MAN359 - Research Methods in Business / ECON301 - Econometrics I" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "IBF601", name: "IBF310 - Business Ethics" },
              { id: "IBF602", name: "IBF401 - International Marketing" },
              { id: "IBF603", name: "IBF401 - International Finance" },
              { id: "IBF604", name: "IBF409 - Investment and Portfolio Management" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "IBF701", name: "IBF470 - Work Placement / Internship" },
            ],
            electiveCount: 4,
          },
          "8": {
            mandatory: [],
            electiveCount: 5,
          },
        },
      },
      "master-1y-ib-professional": {
        id: "master-1y-ib-professional",
        name: "Master (International Business, Professional, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFM101", name: "IBF502 - International Financial Environment" },
              { id: "IBFM102", name: "IBF503 - International Business Environment" },
              { id: "IBFM103", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "IBFM104", name: "IBF592 - Graduation Project (12 ECTS)" },
              { id: "IBF507", name: "IBF507 - Managing the Multinational Enterprise" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-ib-academic": {
        id: "master-1y-ib-academic",
        name: "Master (International Business, Academic, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFM201", name: "IBF502 - International Financial Environment" },
              { id: "IBFM202", name: "IBF503 - International Business Environment" },
              { id: "IBFM203", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "IBFM204", name: "IBF599 - Master Thesis (24 ECTS)" },
              { id: "IBFM203", name: "IBF507 - Managing the Multinational Enterprise" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y-ib": {
        id: "master-2y-ib",
        name: "Master (International Business, 2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFM301", name: "IBF502 - International Financial Environment" },
              { id: "IBFM302", name: "IBF503 - International Business Environment" },
              { id: "IBFM303", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "IBFM304", name: "IBF507 - Managing the Multinational Enterprise" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "IBFM305", name: "IBF589 - Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "IBFM306", name: "IBF599 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-fin-professional": {
        id: "master-1y-fin-professional",
        name: "Master (International Finance, Professional, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFF101", name: "IBF502 - International Financial Environment" },
              { id: "IBFF102", name: "IBF503 - International Business Environment" },
              { id: "IBFF103", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "IBFF104", name: "ECON506 - Applied Econometrics" },
              { id: "IBFF105", name: "IBF592 - Graduation Project (12 ECTS)" },
            ],
            electiveCount: 3,
          },
        },
      },
      "master-1y-fin-academic": {
        id: "master-1y-fin-academic",
        name: "Master (International Finance, Academic, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFF201", name: "IBF502 - International Financial Environment" },
              { id: "IBFF202", name: "IBF503 - International Business Environment" },
              { id: "IBFF203", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "IBFF204", name: "ECON506 - Applied Econometrics" },
              { id: "IBFF205", name: "IBF599 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y-fin": {
        id: "master-2y-fin",
        name: "Master (International Finance, 2-Year, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFF301", name: "IBF502 - International Financial Environment" },
              { id: "IBFF302", name: "IBF503 - International Business Environment" },
              { id: "IBFF303", name: "MBA581 - Advanced Business Research Methods" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "IBFF304", name: "ECON506 - Applied Econometrics" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "IBFF305", name: "IBF589 - Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "IBFF306", name: "IBF599 - Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "phd-ib": {
        id: "phd-ib",
        name: "PhD (International Business, 180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFPHD101", name: "BUS601 - Qualitative Research Methods in Business" },
              { id: "IBFPHD102", name: "BUS602 - Quantitative Research Methods in Business" },
              { id: "IBFPHD103", name: "BUS691 - Directed Research Project I" },
              { id: "IBFPHD104", name: "BUS692 - Directed Research Project II" },
              { id: "IBFPHD105", name: "BUS698 - Doctoral Thesis" },
            ],
            electiveCount: 4,
          },
        },
      },
      "phd-fin": {
        id: "phd-fin",
        name: "PhD (Finance, 180 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "IBFPHD201", name: "BUS602 - Quantitative Research Methods in Business" },
              { id: "IBFPHD202", name: "BUS601 - Qualitative Research Methods in Business" },
              { id: "IBFPHD203", name: "BUS691 - Directed Research Project I" },
              { id: "IBFPHD204", name: "BUS692 - Directed Research Project II" },
              { id: "IBFPHD205", name: "BUS698 - Doctoral Thesis" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  CEIT: {
    id: "CEIT",
    name: "Computer Education and Instructional Tech",
    degrees: {
      integrated: {
        id: "integrated",
        name: "Integrated Program (10 Semesters, 300 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MATH201", name: "Linear Algebra" },
              { id: "CEIT201", name: "Office Operations" },
              { id: "PSY103", name: "Introduction to Psychology" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "CEIT202", name: "Electronic Business" },
              { id: "EDU102", name: "Introduction to Pedagogy" },
              { id: "MATH203", name: "Introduction to Probability and Statistics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "CS214", name: "Programming" },
              { id: "CEIT203", name: "Ethics in Computing" },
              { id: "PSY210", name: "Life-Span Development" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "CS304", name: "Computer Architecture" },
              { id: "CEIT301", name: "Information Technologies in Education I" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "CS302", name: "Algorithms and Data Structures" },
              { id: "EDU312", name: "Social Pedagogy" },
              { id: "CEIT308", name: "Informatics Teaching Methodology" },
              { id: "EDU311", name: "Inclusive Education" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "CS307", name: "Operating Systems" },
              { id: "EDU323", name: "Didactics" },
              { id: "MATH204", name: "Discrete Mathematics" },
              { id: "CS306", name: "Database Management" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "PSY314", name: "Educational Psychology" },
              { id: "CEIT307", name: "Teaching Practice I (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "CEIT401", name: "Distance Learning" },
              { id: "CEIT407", name: "Teaching Practice II (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "9": {
            mandatory: [
              { id: "CEIT507", name: "Teaching Practice III (12 ECTS)" },
              { id: "CEIT402", name: "Research Methods in Education" },
            ],
            electiveCount: 2,
          },
          "10": {
            mandatory: [
              { id: "EDU583", name: "Methodology of Scientific Work" },
              { id: "CEIT699", name: "MA Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  TLT: {
    id: "TLT",
    name: "Turkish Language and Literature Teaching",
    degrees: {
      integrated: {
        id: "integrated",
        name: "Integrated Program (10 Semesters, 300 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "TLT104", name: "Turkish Language I (Turkish Phonetics)" },
              { id: "TLT113", name: "Turkish Oral Communication Skills" },
              { id: "PSY103", name: "Introduction to Psychology" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "TLT114", name: "Turkish Language II (Turkish Morphology)" },
              { id: "EDU103", name: "Introduction to Foreign Language Pedagogy" },
              { id: "TLT212", name: "Introduction to Turkish Literature" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "TLT204", name: "Turkish Language III (Turkish Vocabulary)" },
              { id: "TLT311", name: "Modern Turkish Literature" },
              { id: "PSY212", name: "Life-Span Development" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "TLT214", name: "Turkish Language IV (Turkish Sentence Knowledge)" },
              { id: "TLT312", name: "Ottoman Turkish" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "TLT315", name: "Language and Literature Teaching-Learning Approaches" },
              { id: "TLT203", name: "Linguistics" },
              { id: "TLT318", name: "Folk Literature" },
              { id: "EDU301", name: "Inclusion in Foreign Language Teaching" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "TLT317", name: "Teaching Language Skills (Understanding-Explanation)" },
              { id: "TLT319", name: "History of Turkish Language" },
              { id: "TLT411", name: "Divan Literature" },
              { id: "EDU313", name: "Didactics and Foreign Language Learning" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "PSY314", name: "Educational Psychology" },
              { id: "TLT371", name: "Teaching Practice I (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "TLT406", name: "Turkish Language Teaching and Material Design" },
              { id: "TLT471", name: "Teaching Practice II (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "9": {
            mandatory: [
              { id: "TLT571", name: "Teaching Practice III (12 ECTS)" },
              { id: "TLT565", name: "Evaluation in Turkish Language Teaching" },
            ],
            electiveCount: 2,
          },
          "10": {
            mandatory: [
              { id: "EDU583", name: "Methodology of Scientific Work" },
              { id: "TLT599", name: "MA Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (Second Cycle, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "EDU583", name: "Methodology of Scientific Work" },
              { id: "TLT571", name: "Teaching Practice III (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "TLT599", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (Second Cycle, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "EDU583", name: "Methodology of Scientific Work" },
              { id: "TLT371", name: "Teaching Practice I (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "TLT471", name: "Teaching Practice II (12 ECTS)" },
              { id: "ELIT506", name: "Translation Project (12 ECTS)" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "TLT571", name: "Teaching Practice III (12 ECTS)" },
              { id: "ELIT507", name: "Creative Project (9 ECTS)" },
              { id: "TLT598", name: "Master's Thesis Proposal (9 ECTS)" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ELIT530", name: "Publishing Practice (6 ECTS)" },
              { id: "TLT599", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  ELT: {
    id: "ELT",
    name: "English Language and Literature Teaching",
    degrees: {
      integrated: {
        id: "integrated",
        name: "Integrated Program (10 Semesters, 300 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "Academic English and Effective Communication" },
              { id: "ELIT101", name: "Introduction to Literature" },
              { id: "PSY103", name: "Introduction to Psychology" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "EDU103", name: "Introduction to Foreign Language Pedagogy" },
              { id: "ELIT200", name: "Critical Reading and Writing" },
              { id: "ELT105", name: "Introduction to Linguistics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELIT202", name: "Survey of English Literature I" },
              { id: "ELT202", name: "Language Acquisition" },
              { id: "PSY212", name: "Life-Span Development" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "ELIT201", name: "Academic Writing" },
              { id: "ELIT203", name: "Survey of English Literature II" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "EDU301", name: "Inclusion in Foreign Language Teaching" },
              { id: "ELT310", name: "English Morphology" },
              { id: "ELT311", name: "English Phonetics" },
              { id: "ELT321", name: "Introduction to English Language Teaching Methodology" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "EDU313", name: "Didactics and Foreign Language Learning" },
              { id: "ELT212", name: "English Syntax" },
              { id: "ELT322", name: "English Language Teaching Methodology" },
              { id: "ELT323", name: "Early Foreign Language Learning" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "ELT371", name: "Teaching Practice I (12 ECTS)" },
              { id: "PSY314", name: "Educational Psychology" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "ELT471", name: "Teaching Practice II (12 ECTS)" },
              { id: "ELT562", name: "Lifelong Learning and English Language Teaching" },
            ],
            electiveCount: 2,
          },
          "9": {
            mandatory: [
              { id: "ELT565", name: "Evaluation in English Language Teaching" },
              { id: "ELT571", name: "Teaching Practice III (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "10": {
            mandatory: [
              { id: "EDU583", name: "Methodology of Scientific Work" },
              { id: "ELT599", name: "MA Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y": {
        id: "master-1y",
        name: "Master (Second Cycle, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELT574", name: "Teaching Practice III (12 ECTS)" },
              { id: "ELT580", name: "Methodology of Scientific Work" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELT599", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 1,
          },
        },
      },
      "master-2y": {
        id: "master-2y",
        name: "Master (Second Cycle, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELT572", name: "Teaching Practice I (12 ECTS)" },
              { id: "ELT580", name: "Methodology of Scientific Work" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELIT506", name: "Translation Project (12 ECTS)" },
              { id: "ELT573", name: "Teaching Practice II (12 ECTS)" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "ELT574", name: "Teaching Practice III (12 ECTS)" },
              { id: "ELIT507", name: "Creative Project (9 ECTS)" },
              { id: "ELT598", name: "Master's Thesis Proposal (9 ECTS)" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ELIT530", name: "Publishing Practice (6 ECTS)" },
              { id: "ELT599", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      phd: {
        id: "phd",
        name: "PhD (Third Cycle, 180 ECTS)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  LAW: {
    id: "LAW",
    name: "Law",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (LLB, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW103", name: "Civil Law I" },
              { id: "LAW105", name: "Legal Systems" },
              { id: "LAW110", name: "Introduction to Law I" },
              { id: "LAW117", name: "Constitutional Law I" },
              { id: "SPS150", name: "World History" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ECON111/ECON112", name: "Introduction to Microeconomics/Introduction to Macroeconomics" },
              { id: "LAW104", name: "Civil Law II" },
              { id: "LAW106", name: "Roman Law" },
              { id: "LAW118", name: "Constitutional Law II" },
              { id: "LAW120", name: "Introduction to Law II" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "LAW201", name: "Administrative Law I" },
              { id: "LAW203", name: "Contract Law I" },
              { id: "LAW205", name: "Criminal Law I" },
              { id: "LAW207", name: "Public International Law" },
              { id: "LAW219", name: "General Theory of State" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "LAW202", name: "Administrative Law II" },
              { id: "LAW204", name: "Contract Law II" },
              { id: "LAW206", name: "Criminal Law II" },
              { id: "LAW210", name: "Business Law" },
              { id: "LAW218", name: "Legal Writing and Drafting" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [
              { id: "LAW301", name: "Property Law I" },
              { id: "LAW303", name: "EU Public Law" },
              { id: "LAW305", name: "Philosophy of Law" },
              { id: "LAW308", name: "Tax Law" },
              { id: "LAW309", name: "Labor Law" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "LAW302", name: "Property Law II" },
              { id: "LAW310", name: "Intellectual Property Law" },
              { id: "LAW316", name: "Insurance and Social Security Law" },
              { id: "LAW333", name: "Tort Law" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "LAW403", name: "Private International Law" },
              { id: "LAW405", name: "Criminal Procedure Law I" },
              { id: "LAW407", name: "Civil Procedure Law" },
              { id: "LAW409", name: "EU Private Law" },
              { id: "LAW410", name: "Commercial Law I" },
            ],
            electiveCount: 1,
          },
          "8": {
            mandatory: [
              { id: "LAW402", name: "Commercial Law II" },
              { id: "LAW406", name: "Execution and Bankruptcy Law" },
              { id: "LAW408", name: "Criminal Procedure Law II" },
              { id: "LAW416", name: "Inheritance Law" },
            ],
            electiveCount: 2,
          },
        },
      },
      "master-1y-public": {
        id: "master-1y-public",
        name: "Comparative Public Law (MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW501", name: "Public International Law" },
              { id: "LAW502", name: "EU Law" },
              { id: "LAW503", name: "Research Methods for Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW530", name: "Comparative Constitutional Law" },
              { id: "LAW595", name: "Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-public-cyber": {
        id: "master-1y-public-cyber",
        name: "Comparative Public Law (DL Track: Cyber Law, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW501", name: "Public International Law" },
              { id: "LAW502", name: "EU Law" },
              { id: "LAW503", name: "Research Methods in Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW530", name: "Comparative Constitutional Law" },
              { id: "LAW595", name: "Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-public-eu": {
        id: "master-1y-public-eu",
        name: "Comparative Public Law (DL Track: EU Law and Integration, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW501", name: "Public International Law" },
              { id: "LAW502", name: "EU Law" },
              { id: "LAW503", name: "Research Methods in Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW530", name: "Comparative Constitutional Law" },
              { id: "LAW595", name: "Master Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-2y-public": {
        id: "master-2y-public",
        name: "Comparative Public Law (MA, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW501", name: "Public International Law" },
              { id: "LAW502", name: "EU Law" },
              { id: "LAW503", name: "Research Methods for Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW530", name: "Comparative Constitutional Law" },
              { id: "LAW550", name: "Research Activity I (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "3": {
            mandatory: [
              { id: "LAW551", name: "Research Activity II (12 ECTS)" },
              { id: "LAW552", name: "Seminar (12 ECTS)" },
              { id: "LAW599", name: "Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "LAW595", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-private": {
        id: "master-1y-private",
        name: "Comparative Private Law (MA, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW515", name: "Private International Law" },
              { id: "LAW516", name: "European Private Law" },
              { id: "LAW503", name: "Research Methods for Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW537", name: "International Business Law" },
              { id: "LAW595", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-1y-private-business": {
        id: "master-1y-private-business",
        name: "Comparative Private Law (DL Track: Law and Business, 60 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW515", name: "Private International Law" },
              { id: "LAW516", name: "European Private Law" },
              { id: "LAW503", name: "Research Methods for Legal Studies" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW537", name: "International Business Law" },
              { id: "LAW595", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
      "master-2y-private": {
        id: "master-2y-private",
        name: "Comparative Private Law (MA, 120 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW503", name: "Research Methods for Legal Studies" },
              { id: "LAW515", name: "Private International Law" },
              { id: "LAW516", name: "European Private Law" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "LAW537", name: "International Business Law" },
              { id: "LAW550", name: "Research Activity I (12 ECTS)" },
            ],
            electiveCount: 2,
          },
          "3": {
            mandatory: [
              { id: "LAW551", name: "Research Activity II (12 ECTS)" },
              { id: "LAW552", name: "Seminar (12 ECTS)" },
              { id: "LAW599", name: "Master's Thesis Proposal (12 ECTS)" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "LAW595", name: "Master's Thesis (24 ECTS)" },
            ],
            electiveCount: 0,
          },
        },
      },
    },
  },
  "ITU-ME": {
    id: "ITU-ME",
    name: "ITU - Mechanical Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "NS104", name: "NS104 – General Chemistry" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "NS102", name: "NS102 – Physics I" },
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "ENS221", name: "ENS221 – Introduction to Engineering" },
              { id: "ENS103", name: "ENS103 – Introduction to Machine Design" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "NS122", name: "NS122 – Physics II" },
              { id: "ENS209", name: "ENS209 – Statics" },
              { id: "ENS213", name: "ENS213 / CS103 – Programming for Engineers / Introduction to Programming" },
              { id: "MATH201", name: "MATH201 – Linear Algebra" },
              { id: "ENS207", name: "ENS207 – Engineering Graphics" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "ME208", name: "ME208 – Dynamics" },
              { id: "ENS202", name: "ENS202 – Thermodynamics" },
              { id: "ENS205", name: "ENS205 – Materials Science" },
              { id: "MATH202", name: "MATH202 – Differential Equations" },
              { id: "ENS208", name: "ENS208 – Introduction to Manufacturing Systems" },
              { id: "ME210", name: "ME210 – Strength of Materials I" },
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "MATH205", name: "MATH205 – Numerical Analysis" },
              { id: "ENS204", name: "ENS204 – Thermodynamics II" },
              { id: "ENS203", name: "ENS203 – Electrical Circuits I" },
              { id: "ME304", name: "ME304 – Fluid Mechanics I" },
              { id: "ME211", name: "ME211 – Strength of Materials II" },
              { id: "ME206", name: "ME206 – Engineering Materials" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "MAK229E", name: "MAK 229E – Fluid Mechanics II" },
              { id: "MAK313E", name: "MAK 313E – Heat Transfer" },
              { id: "MAK339E", name: "MAK 339E – Machine Design I" },
              { id: "MAK333E", name: "MAK 333E – System Dynamics and Control" },
              { id: "MAK353E", name: "MAK 353E – Manufacturing Processes" },
              { id: "MAK315E", name: "MAK 315E – Mechanical Vibrations" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "MAK342E", name: "MAK 342E – Machine Design II" },
              { id: "MAK324E", name: "MAK 324E – Theory of Machines" },
              { id: "MAK312E", name: "MAK 312E – Measurement Systems" },
              { id: "EKO201E", name: "EKO 201E – Economics" },
              { id: "DAN301E", name: "DAN 301E – Career Advising" },
            ],
            electiveCount: 3,
          },
          "7": {
            mandatory: [
              { id: "ATA101E", name: "ATA 101E – History of Turkish Revolution I" },
              { id: "MAK404E", name: "MAK 404E – Mechanical Engineering Laboratory" },
              { id: "MAK4901E", name: "MAK 4901E – Mechanical Engineering Design I" },
              { id: "MAK405E", name: "MAK 405E – Innovative Design Methods in Mechanical Engineering" },
              { id: "TUR101", name: "TUR 101 – Turkish I" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ATA102E", name: "ATA 102E – History of Turkish Revolution II" },
              { id: "MAK4902E", name: "MAK 4902E – Mechanical Engineering Design II" },
              { id: "TUR102", name: "TUR 102 – Turkish II" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  "ITU-ARCH": {
    id: "ITU-ARCH",
    name: "ITU - Architecture",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "ARCH100", name: "ARCH100 – Introduction to Architectural Design" },
              { id: "ARCH216-6", name: "ARCH216-6 – Introduction to CAD" },
              { id: "ARCH101", name: "ARCH101 – Basic Design Communication" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "ARCH109", name: "ARCH109 – Basic Design Communication II" },
              { id: "ARCH106", name: "ARCH106 – Introduction to Building Technology" },
              { id: "ARCH108", name: "ARCH108 – Introduction to Architectural Design II" },
              { id: "ARCH102", name: "ARCH102 – History of Architecture I" },
              { id: "ARCH208", name: "ARCH208 – Architectural Communication" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "ARCH217", name: "ARCH217 – History of Architecture II" },
              { id: "ARCH201-8", name: "ARCH201-8 – Architectural Design Studio I" },
              { id: "ARCH204-6", name: "ARCH204-6 – Structural Design I" },
              { id: "ARCH203", name: "ARCH203 – Building Services I" },
              { id: "ARCH313-6", name: "ARCH313-6 – Building Construction I" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "4": {
            mandatory: [
              { id: "ARCH202-8", name: "ARCH202-8 – Architectural Design Studio II" },
              { id: "ARCH210-6", name: "ARCH210-6 – Structural Design II" },
              { id: "ARCH211", name: "ARCH211 – Building Services II" },
              { id: "ARCH358-6", name: "ARCH358-6 – Building Construction II" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "5": {
            mandatory: [
              { id: "EKO201E", name: "EKO 201E – Economics" },
              { id: "MIM351E", name: "MIM 351E – Architectural Design V" },
              { id: "TUR111", name: "TUR 111 – Turkish Language for Foreigners I" },
              { id: "MIM333E", name: "MIM 333E – Building Production Systems" },
              { id: "MIM306E", name: "MIM 306E – Urbanism and Planning Law" },
              { id: "MIM322E", name: "MIM 322E – Conservation of Historic Buildings & Sites" },
              { id: "MIM304E", name: "MIM 304E – History of Architecture III" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "MIM312E", name: "MIM 312E – Architectural Design VI" },
              { id: "MIM361E", name: "MIM 361E – Architectural Survey & Restoration Studio" },
              { id: "MIM359E", name: "MIM 359E – Construction Management & Economy" },
              { id: "TUR112", name: "TUR 112 – Turkish Language for Foreigners II" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "MIM411E", name: "MIM 411E – Architectural Design VII" },
              { id: "MIM484E", name: "MIM 484E – Construction Project" },
              { id: "ATA121", name: "ATA 121 – Turkish History I" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "ATA122", name: "ATA 122 – Turkish History II" },
              { id: "MIM4902E", name: "MIM 4902E – Diploma Project" },
            ],
            electiveCount: 1,
          },
        },
      },
    },
  },
  "ITU-ECON": {
    id: "ITU-ECON",
    name: "ITU - Economics",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "SPS150", name: "SPS150 – World History" },
              { id: "ECON107", name: "ECON107 – Python" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "ECON112", name: "ECON112 – Introduction to Macroeconomics" },
              { id: "IBF310", name: "IBF310 – Business Ethics" },
              { id: "ECON108", name: "ECON108 – MATLAB" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "ECON211", name: "ECON211 – Business Statistics I" },
              { id: "ECON201", name: "ECON201 – Intermediate Microeconomics" },
              { id: "IBF231", name: "IBF231 – Financial Accounting" },
              { id: "IBF210", name: "IBF210 – Financial Mathematics" },
              { id: "LAW110", name: "LAW110 – Introduction to Law I" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "4": {
            mandatory: [
              { id: "ECON221", name: "ECON221 – Business Statistics II" },
              { id: "ECON202", name: "ECON202 – Intermediate Macroeconomics" },
              { id: "ECON320", name: "ECON320 – Public Economics" },
              { id: "ECON470", name: "ECON470 – Work Placement / Internship" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "5": {
            mandatory: [
              { id: "ECN301E", name: "ECN301E – Econometrics I" },
              { id: "ECN307E", name: "ECN307E – Game Theory" },
              { id: "ECN305E", name: "ECN305E – Industrial Organization" },
              { id: "ECN311E", name: "ECN311E – International Trade" },
              { id: "ECN309E", name: "ECN309E – Money, Banking and Financial Markets" },
              { id: "TUR101", name: "TUR101 – Turkish I" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "ECN302E", name: "ECN302E – Econometrics II" },
              { id: "ECN412E", name: "ECN412E – Environmental Economics" },
              { id: "ECN303E", name: "ECN303E – Development Economics" },
              { id: "ECN308E", name: "ECN308E – Competition Law and Policy" },
              { id: "ECN312E", name: "ECN312E – International Finance" },
              { id: "DAN301", name: "DAN301 – Career Advising" },
              { id: "ATA101", name: "ATA101 – Atatürk's Principles and History of Renovations I" },
            ],
            electiveCount: 0,
          },
          "7": {
            mandatory: [
              { id: "ECN401E", name: "ECN401E – Turkish Economy" },
              { id: "ECN432E", name: "ECN432E – Labor Economics" },
              { id: "TUR102", name: "TUR102 – Turkish II" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ECN402E", name: "ECN402E – Project Appraisal" },
              { id: "ECN4902E", name: "ECN4902E – Economic Design" },
              { id: "ATA102", name: "ATA102 – Atatürk's Principles and History of Renovations II" },
              { id: "ECN314E", name: "ECN314E – Financial Economics" },
            ],
            electiveCount: 2,
          },
        },
      },
    },
  },
  "ITU-ECE": {
    id: "ITU-ECE",
    name: "ITU - Electronics and Comms Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "CS103", name: "CS103 – Introduction to Programming" },
              { id: "ENS205", name: "ENS205 – Materials Science" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "NS102", name: "NS102 – Physics" },
              { id: "ENS221", name: "ENS221 – Introduction to Engineering" },
              { id: "NS104", name: "NS104 – General Chemistry" },
            ],
            electiveCount: 0,
          },
          "2": {
            mandatory: [
              { id: "ENS203", name: "ENS203 – Electrical Circuits I" },
              { id: "ELIT100", name: "ELIT1000 – Academic English and Effective Communication" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "NS105", name: "NS105 – Physics II" },
              { id: "MATH201", name: "MATH201 – Linear Algebra" },
              { id: "CS105", name: "CS105 – Advanced Programming" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "EE201", name: "EE201 – Analog Electronics I" },
              { id: "EE202", name: "EE202 – Electrical Circuits II" },
              { id: "CS303", name: "CS303 – Digital Design" },
              { id: "MATH202", name: "MATH202 – Differential Equations" },
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ELIT200", name: "ELIT2000 – Critical Reading and Writing" },
              { id: "EE301", name: "EE301 – Analog Electronics II" },
              { id: "ENS201", name: "ENS201 – Electromagnetism I" },
              { id: "ENS211", name: "ENS211 – Signals and Systems" },
              { id: "MATH205", name: "MATH205 – Numerical Analysis" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "EHB227E", name: "EHB 227E – Introduction to Optics" },
              { id: "EHB307E", name: "EHB 307E – Communication I" },
              { id: "KON313E", name: "KON 313E – Feedback Control Systems" },
              { id: "EHB334E", name: "EHB 334E – Random Signals and Noise" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "EHB311E", name: "EHB 311E – Intro. to Electronics Laboratory" },
            ],
            electiveCount: 5,
          },
          "7": {
            mandatory: [
              { id: "EHB4901E", name: "EHB 4901E – Elect. & Comm. Eng. Design I" },
              { id: "ATA121", name: "ATA 121 – Atatürk's Principles and History of Turkish Revolution I" },
              { id: "TUR121", name: "TUR 121 – Turkish I" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "EHB4902E", name: "EHB 4902E – Elect. & Comm. Eng. Design II" },
              { id: "ATA122", name: "ATA 122 – Atatürk's Principles and History of Turkish Revolution II" },
              { id: "TUR122", name: "TUR 122 – Turkish II" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "ITU-BIO": {
    id: "ITU-BIO",
    name: "ITU - Bioengineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "NS102", name: "NS102 – Physics I (with Lab)" },
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "NS104", name: "NS104 – General Chemistry" },
              { id: "BE101", name: "BE101 – Intro to Bioengineering" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "NS207", name: "NS207 – Organic Chemistry" },
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "NS112", name: "NS112 – Understanding Science and Technology" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "NS122", name: "NS122 – Physics II" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "BES210", name: "BES210 – Engineering Mathematics" },
              { id: "CMP103", name: "CMP103 – Intro. to Comp. & Info. Systems" },
              { id: "BES211", name: "BES211 – Mass and Energy Balances in Bioengineering" },
              { id: "BIO101", name: "BIO101 – General Biology" },
              { id: "ATA101", name: "ATA101 – History of the Turkish Revolution I" },
              { id: "MTH271", name: "MTH271 – Probability and Statistics" },
              { id: "TUR101", name: "TUR101 – Turkish I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "BES202", name: "BES202 – Numerical Analysis with Computer Programming" },
              { id: "BEN102", name: "BEN102 – Microbiology (with Lab)" },
              { id: "BES204", name: "BES204 – Fluid Mechanics" },
              { id: "BEN351", name: "BEN351 – Bioengineering Thermodynamics" },
              { id: "TUR102", name: "TUR102 – Turkish II" },
              { id: "ATA102", name: "ATA102 – History of the Turkish Revolution II" },
              { id: "BEN323", name: "BEN323 – Materials Science" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "BES207", name: "BES207 – Cell Biology (with Lab)" },
              { id: "BES315", name: "BES315 – Biochemistry I (with Lab)" },
              { id: "BEN321", name: "BEN321 – Reaction Kinetics and Design in Biotech" },
              { id: "BEN352", name: "BEN352 – Transport Processes in Bioengineering" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "BES328", name: "BES328 – Biochemistry II (with Lab)" },
              { id: "BEN324", name: "BEN324 – Bioengineering Lab I" },
              { id: "BEN326", name: "BEN326 – Genetics" },
              { id: "BES311", name: "BES311 – Process Control" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "BIO415", name: "BIO415 – Genetic Engineering" },
              { id: "BIO370", name: "BIO370 – Work Placement / Internship" },
              { id: "IE408", name: "IE408 – Project Management" },
            ],
            electiveCount: 1,
          },
          "8": {
            mandatory: [
              { id: "BIO407", name: "BIO407 – Protein Engineering" },
              { id: "ENS309", name: "ENS309 – Ethics in Engineering and Science" },
              { id: "BIO312", name: "BIO312 – Techniques in Molecular Biology" },
              { id: "ENS490", name: "ENS490 – Graduation Project" },
            ],
            electiveCount: 1,
          },
        },
      },
    },
  },
  "ITU-CE": {
    id: "ITU-CE",
    name: "ITU - Computer Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "CS103", name: "CS103 – Introduction to Programming" },
              { id: "NS102", name: "NS102 – Physics" },
              { id: "ENS101", name: "ENS101 – Introduction to Engineering" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "CS105", name: "CS105 – Advanced Programming" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "MATH201", name: "MATH201 – Linear Algebra" },
              { id: "ENS203", name: "ENS203 – Electrical Circuits I" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "CS303", name: "CS303 – Digital Design" },
              { id: "MATH204", name: "MATH204 – Discrete Mathematics" },
              { id: "CS206", name: "CS206 – Data Structures" },
              { id: "MATH202", name: "MATH202 – Differential Equations" },
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "EE201", name: "EE201 – Analog Electronics I" },
              { id: "AID101", name: "AID101 – Fundamentals of Data Science" },
              { id: "MATH205", name: "MATH205 – Numerical Analysis" },
              { id: "CS309", name: "CS309 – Advanced Logic Design" },
              { id: "CS313", name: "CS313 – Theory of Computation" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "BLG335E", name: "BLG335E – Analysis of Algorithms I" },
              { id: "BLG351E", name: "BLG351E – Microcomputer Lab" },
              { id: "EHB311E", name: "EHB311E – Introduction to Electronics Laboratory" },
              { id: "BLG317E", name: "BLG317E – Database Systems" },
              { id: "BLG212E", name: "BLG212E – Microprocessor Systems" },
              { id: "ING201A", name: "ING201A – Essentials of Research Paper Writing" },
              { id: "TUR111", name: "TUR111 – Turkish for Foreign Students I" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "BLG322E", name: "BLG322E – Computer Architecture" },
              { id: "BLG312E", name: "BLG312E – Computer Operating Systems" },
              { id: "BLG336E", name: "BLG336E – Analysis of Algorithms II" },
              { id: "BLG354E", name: "BLG354E – Signals and Systems for Computer Eng." },
              { id: "TUR112", name: "TUR112 – Turkish for Foreign Students II" },
              { id: "DAN102", name: "DAN102 – Entrepreneurship and Career Advising" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "ATA121", name: "ATA121 – Atatürk Principles and History of Turkish Revolution I" },
              { id: "BLG4901E", name: "BLG4901E – Computer Engineering Design I" },
              { id: "BLG411E", name: "BLG411E – Software Engineering" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "ATA122", name: "ATA122 – Principles of Atatürk and History of Revolution II" },
              { id: "EKO201E", name: "EKO201E – Economy" },
              { id: "BLG4902E", name: "BLG4902E – Computer Engineering Design II" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "IU-ECON": {
    id: "IU-ECON",
    name: "IU - Economics",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "SPS150", name: "SPS150 – World History" },
              { id: "ECON107", name: "ECON107 – Python" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "ECON112", name: "ECON112 – Introduction to Macroeconomics" },
              { id: "IBF310", name: "IBF310 – Business Ethics" },
              { id: "ECON108", name: "ECON108 – MATLAB" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "ECON211", name: "ECON211 – Business Statistics I" },
              { id: "ECON201", name: "ECON201 – Intermediate Microeconomics" },
              { id: "IBF231", name: "IBF231 – Financial Accounting" },
              { id: "IBF210", name: "IBF210 – Financial Mathematics" },
              { id: "LAW110", name: "LAW110 – Introduction to Law I" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "4": {
            mandatory: [
              { id: "ECON221", name: "ECON221 – Business Statistics II" },
              { id: "ECON202", name: "ECON202 – Intermediate Macroeconomics" },
              { id: "ECON320", name: "ECON320 – Public Economics" },
              { id: "ECON470", name: "ECON470 – Work Placement / Internship" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "5": {
            mandatory: [
              { id: "INGB3001", name: "INGB3001 – International Economics I" },
              { id: "INGB3003", name: "INGB3003 – Financial Markets and Institutions" },
              { id: "INGB3005", name: "INGB3005 – Econometrics I" },
              { id: "ODTD0001", name: "ODTD0001 – Turkish Language I" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "INGB3002", name: "INGB3002 – International Economics II" },
              { id: "INGB3004", name: "INGB3004 – Fiscal Policy" },
              { id: "INGB3006", name: "INGB3006 – Econometrics II" },
              { id: "ODTD0002", name: "ODTD0002 – Turkish Language II" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "INGB1019", name: "INGB1019 – Atatürk's Principles and History of Renovations I" },
            ],
            electiveCount: 5,
          },
          "8": {
            mandatory: [
              { id: "INGB1020", name: "INGB1020 – Atatürk's Principles and History of Renovations II" },
            ],
            electiveCount: 5,
          },
        },
      },
    },
  },
  "IU-MGMT": {
    id: "IU-MGMT",
    name: "IU - Management",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH100", name: "MATH100 – Mathematical Skills" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "MAN102", name: "MAN102 – Introduction to Management" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "ECON112", name: "ECON112 – Introduction to Macroeconomics" },
              { id: "IBF112", name: "IBF112 – Principles of International Business" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ECON211", name: "ECON211 – Business Statistics I" },
              { id: "ECON201", name: "ECON201 – Intermediate Microeconomics" },
              { id: "IBF231", name: "IBF231 – Financial Accounting" },
              { id: "MAN205", name: "MAN205 – Marketing" },
              { id: "IBF210", name: "IBF210 – Financial Mathematics" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "ECON221", name: "ECON221 – Business Statistics II" },
              { id: "ECON202", name: "ECON202 – Intermediate Macroeconomics" },
              { id: "IBF208", name: "IBF208 – Business Finance" },
              { id: "MAN304", name: "MAN304 – Organizational Behavior" },
              { id: "MAN470", name: "MAN470 – Work Placement/Internship" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "ODAI0001", name: "ODAI0001 – Principles of Atatürk and History of Turkish Revolution I" },
              { id: "ODTD0001", name: "ODTD0001 – Turkish I" },
              { id: "INIS3017", name: "INIS3017 – Research Methodology" },
              { id: "INIS3046", name: "INIS3046 – Human Resources Management" },
              { id: "INIS2039", name: "INIS2039 – Computer Applications in Business" },
            ],
            electiveCount: 3,
          },
          "6": {
            mandatory: [
              { id: "ODAI0002", name: "ODAI0002 – Principles of Atatürk and History of Turkish Revolution II" },
              { id: "ODTD0002", name: "ODTD0002 – Turkish II" },
              { id: "INIS2004", name: "INIS2004 – Organization and Management" },
              { id: "INIS2077", name: "INIS2077 – Financial Reporting" },
              { id: "INIS3078", name: "INIS3078 – Operations Research" },
              { id: "INIS3010", name: "INIS3010 – Production Management" },
              { id: "INIS3018", name: "INIS3018 – Marketing Management" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "INIS3023", name: "INIS3023 – Cost Accounting" },
              { id: "INIS3040", name: "INIS3040 – Management Information Systems" },
              { id: "INIS4005", name: "INIS4005 – Strategic Management" },
              { id: "INIS3047", name: "INIS3047 – Industrial Relations" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "INIS3079", name: "INIS3079 – Managerial Accounting" },
              { id: "INIS4019", name: "INIS4019 – Marketing Strategies" },
              { id: "INIS3002", name: "INIS3002 – Financial Management" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "IU-PSIR": {
    id: "IU-PSIR",
    name: "IU - Political Science and IR",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH100", name: "MATH100 – Mathematical Skills" },
              { id: "POLS102", name: "POLS102 – Introduction to Political Science" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "SOC102", name: "SOC102 – Introduction to Sociology" },
              { id: "IR101", name: "IR101 – Introduction to International Relations" },
              { id: "ECON112", name: "ECON112 – Introduction to Macroeconomics" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "POLS101", name: "POLS101 – Introduction to Philosophy" },
              { id: "POLS204", name: "POLS204 – Comparative Political Analysis" },
              { id: "SOC201", name: "SOC201 – Social Theory" },
              { id: "POLS306", name: "POLS306 – Religion and Politics" },
              { id: "IR211", name: "IR211 – International Relations Theories" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "IR212", name: "IR212 – Politics in Europe" },
              { id: "POLS211", name: "POLS211 – Politics and the Media" },
              { id: "IR214", name: "IR214 – International Law" },
              { id: "IR216", name: "IR216 – Foreign Policy Analysis" },
              { id: "ECON470", name: "ECON470 – Work Placement/Internship" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "POLS301", name: "Contemporary Political Theories" },
              { id: "POLS302", name: "Political and Social Structure of the Ottoman Empire" },
              { id: "ULSL3375", name: "ULSL3375 – Political Actors and Institutions" },
              { id: "ULSL3169", name: "ULSL3169 – Topics in International Relations" },
              { id: "ODTD0001", name: "ODTD0001 – Turkish Language I" },
            ],
            electiveCount: 1,
          },
          "6": {
            mandatory: [
              { id: "ULSL3233", name: "ULSL3233 – Turkish Politics" },
              { id: "ULSL3376", name: "ULSL3376 – Democracy and Democratization" },
              { id: "ULSL3194", name: "ULSL3194 – Topics in Political History" },
              { id: "IR301", name: "International Organizations" },
              { id: "ODTD0002", name: "ODTD0002 – Turkish Language II" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "INGB1019", name: "INGB1019 – Atatürk's Principles and History of Renovations I" },
              { id: "ULSL4215", name: "ULSL4215 – Human Rights" },
              { id: "ULSL4340", name: "ULSL4340 – Political Sociology" },
              { id: "ULSL4377", name: "ULSL4377 – Diplomacy and Negotiation" },
              { id: "IR402", name: "Introduction to Turkish Foreign Policy" },
            ],
            electiveCount: 1,
          },
          "8": {
            mandatory: [
              { id: "INGB1020", name: "INGB1020 – Atatürk's Principles and History of Renovations II" },
              { id: "ULSL4364", name: "ULSL4364 – Disputed Issues in International Law" },
              { id: "IR403", name: "Turkish Foreign Policy" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "IU-LAW": {
    id: "IU-LAW",
    name: "IU - Law",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW110", name: "LAW110 – Introduction to Law I" },
              { id: "LAW103", name: "LAW103 – Civil Law I" },
              { id: "LAW105", name: "LAW105 – Legal Systems" },
              { id: "LAW117", name: "LAW117 – Constitutional Law I" },
              { id: "SPS150", name: "SPS150 – World History" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "LAW120", name: "LAW120 – Introduction to Law II" },
              { id: "LAW104", name: "LAW104 – Civil Law II" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "LAW118", name: "LAW118 – Constitutional Law II" },
              { id: "LAW106", name: "LAW106 – Roman Law" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "LAW201", name: "LAW201 – Administrative Law I" },
              { id: "LAW203", name: "LAW203 – Contract Law I" },
              { id: "LAW205", name: "LAW205 – Criminal Law I" },
              { id: "LAW207", name: "LAW207 – Public International Law" },
              { id: "LAW219", name: "LAW219 – General Theory of State" },
              { id: "LAW303", name: "LAW303 – EU Public Law" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "LAW202", name: "LAW202 – Administrative Law II" },
              { id: "LAW204", name: "LAW204 – Contract Law II" },
              { id: "LAW206", name: "LAW206 – Criminal Law II" },
              { id: "LAW218", name: "LAW218 – Legal Writing and Drafting" },
              { id: "LAW210", name: "LAW210 – Business Law" },
            ],
            electiveCount: 1,
          },
          "5": {
            mandatory: [],
            electiveCount: 0,
          },
          "6": {
            mandatory: [],
            electiveCount: 0,
          },
          "7": {
            mandatory: [],
            electiveCount: 0,
          },
          "8": {
            mandatory: [],
            electiveCount: 0,
          },
        },
      },
    },
  },
  "IU-CE": {
    id: "IU-CE",
    name: "IU - Computer Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "CS103", name: "CS103 – Introduction to Programming" },
              { id: "NS102", name: "NS102 – Physics" },
              { id: "ENS101", name: "ENS101 – Introduction to Engineering" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "CS105", name: "CS105 – Advanced Programming" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "MATH201", name: "MATH201 – Linear Algebra" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
              { id: "MATH204", name: "MATH204 – Discrete Mathematics" },
              { id: "CS206", name: "CS206 – Data Structures" },
              { id: "MATH202", name: "MATH202 – Differential Equations" },
            ],
            electiveCount: 1,
          },
          "4": {
            mandatory: [
              { id: "ENS203", name: "ENS203 – Electrical Circuits I" },
              { id: "CS304", name: "CS304 – Computer Architecture" },
              { id: "MATH205", name: "MATH205 – Numerical Analysis" },
              { id: "CS306", name: "CS306 – Database Management" },
              { id: "CS207", name: "CS207 – Analysis of Algorithms" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "CMPE3302", name: "CMPE3302 – Operating Systems" },
              { id: "CMPE3168", name: "CMPE3168 – Introduction to Data Science" },
              { id: "CITS3330", name: "CITS3330 – Humanities and Philosophy" },
              { id: "TURK0101", name: "TURK0101 – Turkish Language I" },
              { id: "HIST0101", name: "HIST0101 – Atatürk's Principles and History of The Revolution I" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "CMPE3269", name: "CMPE3269 – Introduction to Artificial Intelligence" },
              { id: "CMPE3241", name: "CMPE3241 – Introduction to Software Engineering" },
              { id: "CMPE3334", name: "CMPE3334 – Computer Networks" },
              { id: "CMPE2235", name: "CMPE2235 – Principles of Programming Languages" },
              { id: "TURK0201", name: "TURK0201 – Turkish Language II" },
              { id: "HIST0201", name: "HIST0201 – Atatürk's Principles and History of The Revolution II" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "CMPE4901", name: "CMPE4901 – Engineering Project I" },
              { id: "CMPE4137", name: "CMPE4137 – Formal Languages and Automata Theory" },
              { id: "CMPE4101", name: "CMPE4101 – Entrepreneurship" },
              { id: "OHES4411", name: "OHES4411 – Occupational Health and Safety-I" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "CMPE4902", name: "CMPE4902 – Engineering Project II" },
              { id: "OHES4421", name: "OHES4421 – Occupational Health and Safety-II" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  "IU-ELIT": {
    id: "IU-ELIT",
    name: "IU - English Language and Literature",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "ELIT101", name: "ELIT101 – Introduction to Literature" },
            ],
            electiveCount: 3,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "EDU103", name: "EDU103 – Introduction to Foreign Language Pedagogy" },
              { id: "ELT105", name: "ELT105 – Introduction to Linguistics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELIT202", name: "ELIT202 – Survey of English Literature I" },
              { id: "ELT202", name: "ELT202 – Language Acquisition" },
            ],
            electiveCount: 3,
          },
          "4": {
            mandatory: [
              { id: "ELIT201", name: "ELIT201 – Academic Writing" },
              { id: "ELIT203", name: "ELIT203 – Survey of English Literature II" },
            ],
            electiveCount: 3,
          },
          "5": {
            mandatory: [
              { id: "INDE3016", name: "INDE3016 – Eighteenth Century English Novel" },
              { id: "INDE3031", name: "INDE3031 – Introduction to Literary Criticism" },
              { id: "INDE3017", name: "INDE3017 – Shakespeare and His Time" },
              { id: "ODAI0001", name: "ODAI0001 – Atatürk's Principles and the History of the Revolution I" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "INDE3022", name: "INDE3022 – Nineteenth Century English Poetry" },
              { id: "INDE3021", name: "INDE3021 – Contemporary Literary Theory" },
              { id: "INDE3020", name: "INDE3020 – Victorian Novel" },
              { id: "ODAI0002", name: "ODAI0002 – Atatürk's Principles and the History of the Revolution II" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "INDE4002", name: "INDE4002 – Modern English Drama" },
              { id: "INDE4025", name: "INDE4025 – Twentieth Century English Novel" },
              { id: "INDE4023", name: "INDE4023 – Special Topics in English Literature" },
              { id: "ODTD0001", name: "ODTD0001 – Turkish Language I" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "INDE4026", name: "INDE4026 – Academic Writing and Ethics" },
              { id: "INDE4027", name: "INDE4027 – Contemporary English Poetry" },
              { id: "INDE4029", name: "INDE4029 – Postmodern English Novel" },
              { id: "ODTD0002", name: "ODTD0002 – Turkish Language II" },
            ],
            electiveCount: 2,
          },
        },
      },
    },
  },
  "HWG-MBA": {
    id: "HWG-MBA",
    name: "Ludwigshafen (HWG LU) - Management",
    degrees: {
      "master-2y": {
        id: "master-2y",
        name: "MBA Dual Diploma (60 ECTS IUS + 90 ECTS Ludwigshafen)",
        semesters: {
          "1": { mandatory: [], electiveCount: 0 },
          "2": { mandatory: [], electiveCount: 0 },
          "3": { mandatory: [], electiveCount: 0 },
          "4": { mandatory: [], electiveCount: 0 },
        },
      },
    },
  },
  "MU-CE": {
    id: "MU-CE",
    name: "MU - Computer Engineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "CS103", name: "CS103 – Introduction to Programming" },
              { id: "NS102", name: "NS102 – Physics" },
              { id: "ENS101", name: "ENS101 – Introduction to Engineering" },
            ],
            electiveCount: 2,
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "CS105", name: "CS105 – Advanced Programming" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "MATH201", name: "MATH201 – Linear Algebra" },
              { id: "NS122", name: "NS122 – Physics II" },
            ],
            electiveCount: 0,
          },
          "3": {
            mandatory: [
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
              { id: "MATH204", name: "MATH204 – Discrete Mathematics" },
              { id: "CS206", name: "CS206 – Data Structures" },
              { id: "ENS203", name: "ENS203 – Electrical Circuits I" },
              { id: "CS305", name: "CS305 – Programming Languages" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "EE201", name: "EE201 – Analog Electronics I" },
              { id: "MATH202", name: "MATH202 – Differential Equations" },
              { id: "MATH205", name: "MATH205 – Numerical Analysis" },
              { id: "CS314", name: "CS314 – Systems Programming" },
              { id: "CS207", name: "CS207 – Analysis of Algorithms" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "CSE3000", name: "CSE3000 – Summer Practice I" },
              { id: "CSE3215", name: "CSE3215 – Digital Logic Design" },
              { id: "CSE3033", name: "CSE3033 – Operating Systems" },
              { id: "CSE3055", name: "CSE3055 – Database Systems" },
              { id: "CSE3063", name: "CSE3063 – Object-Oriented Software Design" },
              { id: "IE3081", name: "IE3081 – Modeling and Discrete Simulation" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "CSE3038", name: "CSE3038 – Computer Organization" },
              { id: "CSE3044", name: "CSE3044 – Software Engineering" },
              { id: "CSE3048", name: "CSE3048 – Introduction to Signals and Systems" },
              { id: "CSE3264", name: "CSE3264 – Formal Languages and Automata Theory" },
              { id: "IE3235", name: "IE3235 – Operations Research" },
              { id: "COM2202", name: "COM2202 – Technical Communication and Entrepreneurship" },
            ],
            electiveCount: 0,
          },
          "7": {
            mandatory: [
              { id: "CSE4000", name: "CSE4000 – Summer Practice II" },
              { id: "CSE4074", name: "CSE4074 – Computer Networks" },
              { id: "CSE4219", name: "CSE4219 – Principles of Embedded System Design" },
              { id: "CSE4297", name: "CSE4297 – Engineering Project I" },
              { id: "ISG121", name: "ISG121 – Occupational Health and Safety I" },
              { id: "CSE4288", name: "CSE4288 – Introduction to Machine Learning" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "CSE4298", name: "CSE4298 – Engineering Project II" },
              { id: "ISG122", name: "ISG122 – Occupational Health and Safety II" },
            ],
            electiveCount: 5,
          },
        },
      },
    },
  },
  "MU-BIOE": {
    id: "MU-BIOE",
    name: "MU - Bioengineering",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "NS104", name: "NS104 – General Chemistry" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "NS102", name: "NS102 – Physics" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "MATH102", name: "MATH102 – Calculus II" },
              { id: "NS207", name: "NS207 – Organic Chemistry" },
              { id: "NS103", name: "NS103 – Biology" },
              { id: "NS112", name: "NS112 – Understanding Science and Technology" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "MATH202", name: "MATH202 – Differential Equations" },
              { id: "NS205", name: "NS205 – Cell Biology" },
              { id: "ENS205-6", name: "ENS205-6 – Materials Science" },
              { id: "MATH203", name: "MATH203 – Introduction to Probability and Statistics" },
              { id: "NS202", name: "NS202 – Biochemistry I" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "NS209", name: "NS209 – Genetics I" },
              { id: "ENS213", name: "ENS213 – Programming for Engineers" },
              { id: "BIO305", name: "BIO305 – Biochemistry II" },
            ],
            electiveCount: 2,
          },
          "5": {
            mandatory: [
              { id: "BIOE3200", name: "BIOE3200 – Summer Practice I" },
              { id: "BIOE2201", name: "BIOE2201 – Microbiology for Bioengineers" },
              { id: "BIOE2211", name: "BIOE2211 – Bioengineering Principles" },
              { id: "ECON2003", name: "ECON2003 – Introduction to Economics" },
              { id: "BIOE3215", name: "BIOE3215 – Biotransport Phenomena I" },
              { id: "BIOE3235", name: "BIOE3235 – Bioprocess Unit Operations I" },
              { id: "BIOE3271", name: "BIOE3271 – Bioinformatics" },
            ],
            electiveCount: 0,
          },
          "6": {
            mandatory: [
              { id: "BIOE2240", name: "BIOE2240 – Bioreaction Kinetics" },
              { id: "BIOE2282", name: "BIOE2282 – Bioengineering Thermodynamics" },
              { id: "BIOE3216", name: "BIOE3216 – Biotransport Phenomena II" },
              { id: "BIOE3236", name: "BIOE3236 – Bioprocess Unit Operations II" },
              { id: "BIOE3242", name: "BIOE3242 – Bioreactor Design" },
            ],
            electiveCount: 1,
          },
          "7": {
            mandatory: [
              { id: "BIOE4200", name: "BIOE4200 – Summer Practice II" },
              { id: "BIOE4265", name: "BIOE4265 – Bioprocess Dynamics and Control" },
              { id: "BIOE4290", name: "BIOE4290 – Innovation and Entrepreneurship" },
              { id: "BIOE4291", name: "BIOE4291 – Computer Aided Unit Operations Design" },
              { id: "BIOE4297", name: "BIOE4297 – Bioengineering Project I" },
              { id: "BIOE3211", name: "BIOE3211 – Bioengineering Lab I" },
              { id: "IISG101", name: "IISG101 – Occupational Health and Safety I" },
            ],
            electiveCount: 0,
          },
          "8": {
            mandatory: [
              { id: "BIOE4266", name: "BIOE4266 – Analytical Techniques in Bioengineering" },
              { id: "BIOE4292", name: "BIOE4292 – Bioprocess Design and Economics" },
              { id: "BIOE4298", name: "BIOE4298 – Bioengineering Project II" },
              { id: "BIOE3212", name: "BIOE3212 – Bioengineering Lab II" },
              { id: "IISG102", name: "IISG102 – Occupational Health and Safety II" },
            ],
            electiveCount: 1,
          },
        },
      },
    },
  },
  "MU-ELT": {
    id: "MU-ELT",
    name: "MU - English Language Teaching",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "ELIT101", name: "ELIT101 – Introduction to Literature" },
              { id: "PSY103", name: "PSY103 – Introduction to Psychology" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "EDU103", name: "EDU103 – Introduction to Foreign Language Pedagogy" },
              { id: "ELT105", name: "ELT105 – Introduction to Linguistics" },
            ],
            electiveCount: 2,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "ELIT202", name: "ELIT202 – Survey of English Literature I" },
              { id: "ELT202", name: "ELT202 – Language Acquisition" },
              { id: "PSY212", name: "PSY212 – Life-Span Development" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "ELIT201", name: "ELIT201 – Academic Writing" },
              { id: "ELIT203", name: "ELIT203 – Survey of English Literature II" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "MU-PSY": {
    id: "MU-PSY",
    name: "MU - Psychology",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "POLS101", name: "POLS101 – Introduction to Philosophy" },
              { id: "PSY103", name: "PSY103 – Introduction to Psychology" },
              { id: "SOC102", name: "SOC102 – Introduction to Sociology" },
            ],
            electiveCount: 1,
          },
          "2": {
            mandatory: [
              { id: "NS103", name: "NS103 – Biology" },
              { id: "PSY105", name: "PSY105 – Statistics in Psychology" },
              { id: "PSY219", name: "PSY219 – Introduction to Psychology II" },
              { id: "SPS120", name: "SPS120 – Critical Thinking" },
            ],
            electiveCount: 1,
          },
          "3": {
            mandatory: [
              { id: "PSY204", name: "PSY204 – Biological Psychology" },
              { id: "PSY212", name: "PSY212 – Life-Span Development" },
              { id: "PSY214", name: "PSY214 – Applied Statistics" },
              { id: "PSY215", name: "PSY215 – Adolescent Psychology" },
              { id: "PSY305", name: "PSY305 – Cognitive Psychology" },
              { id: "PSY425", name: "PSY425 – History & Systems" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "CS100", name: "CS100 – Computer Skills" },
              { id: "PSY303", name: "PSY303 – Personality Psychology" },
              { id: "PSY308", name: "PSY308 – Social Psychology" },
              { id: "PSY311", name: "PSY311 – Organizational Psychology" },
              { id: "PSY319", name: "PSY319 – Learning" },
              { id: "PSY414", name: "PSY414 – Psychology of Adulthood and Aging" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "PSY3001", name: "PSY3001 – Research Methods" },
              { id: "PSY3003", name: "PSY3003 – Psychopathology" },
              { id: "PSY3005", name: "PSY3005 – Measurement and Assessment in Psychology" },
              { id: "PSY1003", name: "PSY1003 – Orientation to Psychology" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "PSY3002", name: "PSY3002 – Experimental Psychology" },
              { id: "PSY3004", name: "PSY3004 – Clinical Psychology" },
              { id: "THU100", name: "THU100 – Topluma Hizmet Uygulamaları" },
            ],
            electiveCount: 3,
          },
          "7": {
            mandatory: [],
            electiveCount: 6,
          },
          "8": {
            mandatory: [
              { id: "PSY4002", name: "PSY4002 – Ethics in Psychology" },
            ],
            electiveCount: 4,
          },
        },
      },
    },
  },
  "MU-MGMT": {
    id: "MU-MGMT",
    name: "MU - Management",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "ELIT100", name: "ELIT100 – Academic English and Effective Communication" },
              { id: "MAN102", name: "MAN102 – Introduction to Management" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "LAW110", name: "LAW110 – Introduction to Law" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "ELIT200", name: "ELIT200 – Critical Reading and Writing" },
              { id: "MATH101", name: "MATH101 – Calculus I" },
              { id: "ECON112", name: "ECON112 – Introduction to Macroeconomics" },
              { id: "ECON105", name: "ECON105 – Understanding Business" },
              { id: "IBF106", name: "IBF106 – Introduction to Business Analytics" },
            ],
            electiveCount: 1,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "MAN305", name: "MAN305 – Organization Theory" },
              { id: "MAN205", name: "MAN205 – Marketing" },
              { id: "ECON211", name: "ECON211 – Business Statistics I" },
              { id: "IBF210", name: "IBF210 – Financial Mathematics" },
              { id: "IBF231", name: "IBF231 – Financial Accounting" },
            ],
            electiveCount: 0,
          },
          "4": {
            mandatory: [
              { id: "MAN302", name: "MAN302 – Human Resource Management" },
              { id: "MAN304", name: "MAN304 – Organizational Behavior" },
              { id: "ECON221", name: "ECON221 – Business Statistics II" },
              { id: "IBF208", name: "IBF208 – Business Finance" },
              { id: "MAN332", name: "MAN332 – Business Law" },
            ],
            electiveCount: 0,
          },
          "5": {
            mandatory: [
              { id: "ACC3041", name: "ACC3041 – Cost Accounting" },
              { id: "MIS3021", name: "MIS3021 – Management Information Systems" },
              { id: "PROD3001", name: "PROD3001 – Operations Management" },
              { id: "MGT3019", name: "MGT3019 – Small Business Management" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "ACC3042", name: "ACC3042 – Managerial Accounting" },
              { id: "BUS3002", name: "BUS3002 – Innovation Management" },
              { id: "PROD3002", name: "PROD3002 – Supply Chain Management" },
              { id: "MRK3050", name: "MRK3050 – Marketing Decision Making" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "MRK4051", name: "MRK4051 – Marketing Research" },
              { id: "MGT4007", name: "MGT4007 – Entrepreneurship" },
              { id: "FNCE4047", name: "FNCE4047 – International Finance" },
            ],
            electiveCount: 3,
          },
          "8": {
            mandatory: [
              { id: "MRK4052", name: "MRK4052 – Marketing Research Project" },
              { id: "MGT4056", name: "MGT4056 – Strategic Management" },
              { id: "ACC4002", name: "ACC4002 – Financial Statement Analysis" },
            ],
            electiveCount: 3,
          },
        },
      },
    },
  },
  "MU-LAW": {
    id: "MU-LAW",
    name: "MU - Law",
    degrees: {
      bachelor: {
        id: "bachelor",
        name: "Bachelor (I Cycle, 240 ECTS)",
        semesters: {
          "1": {
            mandatory: [
              { id: "LAW110", name: "LAW110 – Introduction to Law I" },
              { id: "LAW103", name: "LAW103 – Civil Law I" },
              { id: "LAW105", name: "LAW105 – Legal Systems" },
              { id: "LAW117", name: "LAW117 – Constitutional Law I" },
              { id: "SPS150", name: "SPS150 – World History" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "I",
          },
          "2": {
            mandatory: [
              { id: "LAW120", name: "LAW120 – Introduction to Law II" },
              { id: "LAW104", name: "LAW104 – Civil Law II" },
              { id: "ECON111", name: "ECON111 – Introduction to Microeconomics" },
              { id: "LAW118", name: "LAW118 – Constitutional Law II" },
              { id: "LAW106", name: "LAW106 – Roman Law" },
            ],
            electiveCount: 0,
            foreignLanguageElective: "II",
          },
          "3": {
            mandatory: [
              { id: "LAW201", name: "LAW201 – Administrative Law I" },
              { id: "LAW203", name: "LAW203 – Contract Law I" },
              { id: "LAW205", name: "LAW205 – Criminal Law I" },
              { id: "LAW207", name: "LAW207 – Public International Law" },
              { id: "LAW219", name: "LAW219 – General Theory of State" },
            ],
            electiveCount: 2,
          },
          "4": {
            mandatory: [
              { id: "LAW202", name: "LAW202 – Administrative Law II" },
              { id: "LAW204", name: "LAW204 – Contract Law II" },
              { id: "LAW206", name: "LAW206 – Criminal Law II" },
              { id: "LAW218", name: "LAW218 – Legal Writing and Drafting" },
              { id: "LAW210", name: "LAW210 – Business Law" },
            ],
            electiveCount: 2,
          },
          "5": {
            mandatory: [
              { id: "LAW301", name: "LAW301 – Property Law I" },
              { id: "LAW303", name: "LAW303 – Criminal Law Special Provisions I" },
              { id: "LAW305", name: "LAW305 – Civil Procedure Law I" },
              { id: "LAW307", name: "LAW307 – Labor Law I" },
            ],
            electiveCount: 2,
          },
          "6": {
            mandatory: [
              { id: "LAW302", name: "LAW302 – Property Law II" },
              { id: "LAW304", name: "LAW304 – Criminal Law Special Provisions II" },
              { id: "LAW306", name: "LAW306 – Civil Procedure Law II" },
              { id: "LAW308", name: "LAW308 – Labor Law II" },
            ],
            electiveCount: 2,
          },
          "7": {
            mandatory: [
              { id: "LAW401", name: "LAW401 – Maritime Commercial and Insurance Law I" },
              { id: "LAW403", name: "LAW403 – Private International Law I" },
              { id: "LAW405", name: "LAW405 – Execution and Bankruptcy Law I" },
              { id: "LAW407", name: "LAW407 – Criminal Procedure Law I" },
            ],
            electiveCount: 2,
          },
          "8": {
            mandatory: [
              { id: "LAW402", name: "LAW402 – Maritime Commercial and Insurance Law II" },
              { id: "LAW404", name: "LAW404 – Private International Law II" },
              { id: "LAW406", name: "LAW406 – Execution and Bankruptcy Law II" },
              { id: "LAW408", name: "LAW408 – Criminal Procedure Law II" },
            ],
            electiveCount: 2,
          },
        },
      },
    },
  },
};

// Helper functions
export function getBranchData(branchId: string): Branch | null {
  return curriculum[branchId] || null;
}

function getBranchNameFromCurriculum(branchId: string): string {
  return curriculum[branchId]?.name || "Unknown";
}

// Re-export via branches.ts which adds fallback logic
export { getBranchNameFromCurriculum as _getBranchNameFromCurriculum };

export function getAvailableDegreeTypes(branchId: string): DegreeType[] {
  const branch = curriculum[branchId];
  if (!branch) return [];
  return Object.values(branch.degrees);
}

export function getDegreeTypeName(branchId: string, degreeId: string): string {
  return curriculum[branchId]?.degrees[degreeId]?.name || "Unknown";
}

export function getAvailableSemesters(branchId: string, degreeId: string, phdSemesterCount?: number): string[] {
  // For PhD programs, return dynamic range based on phdSemesterCount
  const isPhdProgram = degreeId === "phd" || degreeId === "phd-ib" || degreeId === "phd-fin";
  if (isPhdProgram) {
    const count = phdSemesterCount ?? 6;
    return Array.from({ length: count }, (_, i) => String(i + 1));
  }
  
  const degree = curriculum[branchId]?.degrees[degreeId];
  if (!degree) return [];
  return Object.keys(degree.semesters).sort((a, b) => parseInt(a) - parseInt(b));
}

export function getSemesterMandatoryCourses(
  branchId: string,
  degreeId: string,
  semesterId: string
): Subject[] {
  return (
    curriculum[branchId]?.degrees[degreeId]?.semesters[semesterId]?.mandatory || []
  );
}

export function getSemesterElectiveCount(
  branchId: string,
  degreeId: string,
  semesterId: string
): number {
  return (
    curriculum[branchId]?.degrees[degreeId]?.semesters[semesterId]?.electiveCount || 0
  );
}

export function getSemesterForeignLanguageElective(
  branchId: string,
  degreeId: string,
  semesterId: string | null | undefined
): "I" | "II" | undefined {
  if (!semesterId) return undefined;
  return curriculum[branchId]?.degrees[degreeId]?.semesters[semesterId]?.foreignLanguageElective;
}

/**
 * Default display names for each elective slot so "Elective Course" and "Spoken Language"
 * are distinguishable (e.g. semester 4: "Elective Course 4" and "Spoken Language IV").
 */
export function getElectiveSlotLabels(
  branchId: string,
  degreeId: string,
  semesterId: string
): string[] {
  const count = getSemesterElectiveCount(branchId, degreeId, semesterId);
  if (count === 0) return [];

  if (branchId === "MD" && degreeId === "integrated") {
    const labels: Record<string, string[]> = {
      "1": ["Elective Course 1"],
      "2": ["Elective Course II"],
      "3": ["Elective Course 3", "Spoken Language III"],
      "4": ["Elective Course 4", "Spoken Language IV"],
      "5": ["Elective Course 5"],
      "6": ["Elective Course 6"],
      "7": ["Elective Clinical Course I", "Elective Clinical Course II"],
      "8": ["Clinical Elective Course I", "Clinical Elective Course II", "Clinical Elective Course III"],
      "9": ["Elective Internship Practice"],
    };
    const arr = labels[semesterId];
    if (arr) return arr.length >= count ? arr.slice(0, count) : [...arr, ...Array.from({ length: count - arr.length }, (_, i) => `Elective ${arr.length + i + 1}`)];
    return Array.from({ length: count }, (_, i) => `Elective ${i + 1}`);
  }

  if (branchId === "DM" && degreeId === "integrated") {
    const labels: Record<string, string[]> = {
      "1": ["Elective Course 1"],
      "2": ["Elective Course 2"],
      "3": ["Spoken Language III"],
      "4": ["Spoken Language IV"],
      "7": ["Internal Medicine (Elective)"],
      "8": ["Immunology (Elective)"],
    };
    const arr = labels[semesterId];
    if (arr) return arr.length >= count ? arr.slice(0, count) : [...arr, ...Array.from({ length: count - arr.length }, (_, i) => `Elective ${arr.length + i + 1}`)];
    return Array.from({ length: count }, (_, i) => `Elective ${i + 1}`);
  }

  return Array.from({ length: count }, (_, i) => `Elective ${i + 1}`);
}

/** Default name for the foreign-language elective slot (Spoken Language I / II). */
export function getDefaultForeignLanguageName(level: "I" | "II"): string {
  return level === "I" ? "Spoken Language I" : "Spoken Language II";
}
