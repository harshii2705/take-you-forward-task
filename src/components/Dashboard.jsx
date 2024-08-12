import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Timer from "./Timer";
import axios from 'axios'



const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [duration, setDuration] = useState(10);
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editContent = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { description, link };

	  try {
		  
		  const response = await axios.post("http:/localhost:8000/api/update-content",{
			  data
		  },{
			  headers: {
			  "Content-Type": "application/json",
			  }
		  })
		  
		  console.log(response);

      if (response.ok) {
        // Handle successful response
        console.log("Content updated successfully");
        closeModal();
      } else {
        // Handle error response
        console.error("Failed to update content");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setVisible(false);
    }
  }, [timeLeft]);

  return (
    <div className="dashboard">
      {visible && (
        <div className="banner">
          <h1>Banner</h1>
          <p>Set Banner to visible/unvisible:</p>
          <Toggle
            defaultChecked={true}
            onChange={() => {
              setVisible(!visible);
            }}
          />
        </div>
      )}

      <div>
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      </div>

      <div className="banner">
        <a href={link}>
          <p>{description || "Banner link"}</p>
        </a>
      </div>

      <div className="banner">
        <button onClick={editContent}>Edit banner content</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Banner Content</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                Link:
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
