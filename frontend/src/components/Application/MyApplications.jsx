import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs
        const jobsRes = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(jobsRes.data.jobs);

        // Fetch applications
        const applicationsRes = await axios.get(user.role === "Employer"
          ? "http://localhost:4000/api/v1/application/employer/getall"
          : "http://localhost:4000/api/v1/application/jobseeker/getall", {
          withCredentials: true,
        });
        setApplications(applicationsRes.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, [isAuthorized, user.role]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleJobClick = (jobId) => {
    setSelectedJob(jobId);
  };

  const filteredApplications = selectedJob
    ? applications.filter((app) => app.job && app.job._id === selectedJob)
    : applications;

  return (
    <section className="my_applications page">
      <div className="container">
  {user && user.role === "Job Seeker" ? (
    <div>
      <h1>My Applications</h1>
      <div className="job_cards_container">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="job_card"
            onClick={() => handleJobClick(job._id)}
          >
            <h3>{job.title}</h3>
            <p className="job_description">
              Click to see applications for this job
            </p>
          </div>
        ))}
      </div>
      {filteredApplications.length <= 0 ? (
        <h4>No Applications Found for Selected Job</h4>
      ) : (
        filteredApplications.map((element) => (
          <JobSeekerCard
            element={element}
            key={element._id}
            deleteApplication={deleteApplication}
            openModal={openModal}
          />
        ))
      )}
    </div>
  ) : (
    <div>
      <h1>Applications From Job Seekers</h1>
      <div className="job_cards_container">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="job_card"
            onClick={() => handleJobClick(job._id)}
          >
            <h3>{job.title}</h3>
            <p className="job_description">
              Click to see applications for this job
            </p>
          </div>
        ))}
      </div>
      {filteredApplications.length <= 0 ? (
        <h4>No Applications Found for Selected Job</h4>
      ) : (
        filteredApplications.map((element) => (
          <EmployerCard
            element={element}
            key={element._id}
            openModal={openModal}
          />
        ))
      )}
    </div>
  )}
</div>

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const jobTitle = element.job && element.job.title ? element.job.title : "Job Title Not Available";
  const companyName = element.job && element.job.company ? element.job.company : "Company Not Available";

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <h5>{jobTitle}</h5>
        <p><span>Company:</span> {companyName}</p>
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const jobTitle = element.job && element.job.title ? element.job.title : "Job Title Not Available";
  const companyName = element.job && element.job.company ? element.job.company : "Company Not Available";
  return (
    <div className="job_seeker_card">
      <div className="detail">
      <h5>{jobTitle}</h5>
      <p><span>Company:</span> {companyName}</p>
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};

export default MyApplications;