import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";// Assuming Context is imported

const HowItWorks = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleAccountClick = () => {
    navigate("/register"); // Navigate to Register component
  };

  const handleJobActionClick = () => {
    if (user && user.role === "Job Seeker") {
      navigate("/job/getall"); // Navigate to MyJobs if user is a Job Seeker
    } else {
      navigate("/job/post"); // Navigate to PostJob if user is an Employer
    }
  };

  const handleApplyOrRecruitClick = () => {
    if (user && user.role === "Job Seeker") {
      navigate("/applications/me"); // Navigate to MyApplications if Job Seeker
    } else {
      navigate("/applications/me"); // Navigate to MyApplications if Employer (recruitment)
    }
  };

  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Job-Quest Works</h3>
          <div className="banner">
            <div className="card" onClick={handleAccountClick}>
              <FaUserPlus />
              <p>Create Account</p>
              <p>Sign up to start your job search or post job opportunities.</p>
            </div>
            <div className="card" onClick={handleJobActionClick}>
              <MdFindInPage />
              <p>
                {user && user.role === "Job Seeker" ? "Find a Job" : "Post a Job"}
              </p>
              <p>
                {user && user.role === "Job Seeker"
                  ? "Browse through available jobs tailored to your skills."
                  : "Share your job openings to attract the right talent."}
              </p>
            </div>
            <div className="card" onClick={handleApplyOrRecruitClick}>
              <IoMdSend />
              <p>
                {user && user.role === "Job Seeker"
                  ? "View My Applications"
                  : "Recruit Suitable Candidates"}
              </p>
              <p>
                {user && user.role === "Job Seeker"
                  ? "Check the status of your job applications and track your progress."
                  : "Review applications and find the best candidates for your jobs."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;