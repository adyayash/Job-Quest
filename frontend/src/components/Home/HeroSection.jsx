import React, { useEffect, useState, useContext } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";


const HeroSection = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalJobSeekers: 0,
    totalEmployers: 0,
  });

  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const jobsCount = await axios.get("http://localhost:4000/api/v1/jobs/count");
        const jobSeekersCount = await axios.get("http://localhost:4000/api/v1/users/jobseekers/count");
        const employersCount = await axios.get("http://localhost:4000/api/v1/users/employers/count");
        const companiesCount = await axios.get("http://localhost:4000/api/v1/companies/count"); 

        setStats({
          totalJobs: jobsCount.data.totalJobs,
          totalJobSeekers: jobSeekersCount.data.totalJobSeekers,
          totalEmployers: employersCount.data.totalEmployers,
          totalCompanies: companiesCount.data.totalCompanies, // Update state with companies count
        });
      } catch (error) {
        toast.error("Failed to load stats");
      }
    };

    fetchCounts();
  }, []);

  const details = [
    {
      id: 1,
      title: stats.totalJobs,
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: stats.totalCompanies,
      subTitle: "Companies", // Updated subTitle to reflect companies
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: stats.totalJobSeekers,
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: stats.totalEmployers,
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  const renderContentBasedOnRole = () => {
    if (user && user.role === "Employer") {
      return (
        <>
        <h2>Find the right talent to enhance your organization</h2>
        <p>
          As an employer, discover top-tier candidates tailored to your company's needs. Effortlessly post job listings, efficiently screen applicants, and streamline your entire hiring process for the best results.
        </p>
        </>
      );
    } else if (user && user.role === "Job Seeker") {
      return (
        <>
        <h1>Find a job that suits</h1>
        <h1>your interests and skills</h1>
        <p>
          As a job seeker, explore a variety of jobs that match your skills and interests.
          Apply now and take the next step in your career journey.
        </p>
        </>
      );
    } else {
      // Fallback content for visitors who are not logged in or have an unknown role
      return (
        <p>
          Discover a world of opportunities. Whether you're looking to hire top talent or find your dream job, we've got you covered.
        </p>
      );
    }
  };

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            {renderContentBasedOnRole()}
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
