import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./sidebar.css";
import SIDEBAR_DATA from "../config/sideBarConfig.js";
import emailjs from "@emailjs/browser";

function Sidebar() {
  let navigate = useNavigate();
  let [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  let [popText, setPopText] = useState("");
  let userEmail = sessionStorage.getItem("userEmail");
  let userFirstName = sessionStorage.getItem("userFirstName");
  let userLastName = sessionStorage.getItem("userLastName");

  function sendEmailClick() {
    const emailTo = document.getElementById("emailTo");
    const emailToError = document.getElementById("emailToError");
    const emailBody = document.getElementById("emailBody");
    const emailSubject = document.getElementById("emailSubject");
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const imageInput = document.getElementById("imageInput").value;

    if (emailTo.value === "") {
      emailToError.style = "margin-left:75px";
      emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`;
    } else if (emailTo.value.match(emailPattern)) {
      emailToError.innerHTML = "";
      let sendingEmailDetails = {
        emailTo: emailTo.value,
        emailFrom: userEmail,
        emailSenderName: userFirstName + " " + userLastName,
        emailSubject: emailSubject.value,
        emailBody: emailBody.value,
        emailDateTime: new Date().toLocaleString(),
        read: false,
        sent: true,
        imageInput: imageInput,
      };

      axios
        .post(
          "https://gmail-clone-email-be.onrender.com/newEmail",
          sendingEmailDetails
        )
        .then((response) => {
          setModal(false);
          handleClick();
          setPopText("Email sent");
          console.log(sendingEmailDetails);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`;
    }
  }

  function emailToValidate() {
    const emailTo = document.getElementById("emailTo");
    const emailToError = document.getElementById("emailToError");
    if (emailTo.value === "") {
      emailToError.style = "margin-left:75px";
      emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`;
    } else {
      emailToError.innerHTML = "";
    }
  }

  function modalClose() {
    const emailTo = document.getElementById("emailTo");
    const emailSubject = document.getElementById("emailSubject");
    const emailBody = document.getElementById("emailBody");

    if (emailTo.value || emailSubject.value || emailBody.value) {
      let draftEmailDetails = {
        emailTo: emailTo.value,
        emailFrom: userEmail,
        emailSenderName: userFirstName + " " + userLastName,
        emailSubject: emailSubject.value,
        emailBody: emailBody.value,
        emailDateTime: new Date().toLocaleString(),
        draftEmail: true,
      };
      axios
        .post(
          "https://gmail-clone-email-be.onrender.com/newEmail",
          draftEmailDetails
        )
        .then((response) => {
          setModal(!modal);
          setPopText("Email saved as draft");
          handleClick();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setModal(!modal);
    }
  }
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  // const config = {
  //   Host: "smtp.elasticemail.com",
  //   Username: "projectemail@yopmail.com",
  //   Password: "74D4E166762FF8A0BBB2D89FA1F489D941B1",
  //   port: 2525,
  // };
  // const sendMail = (e) => {
  //   e.preventDefault();
  //   if (window.Email) {
  //     window.Email.send({
  //       ...config,
  //       To: "vcharitrav25@gmail.com",
  //       From: "vcharitrav25@gmail.com",
  //       Subject: "This is the subject",
  //       Body: "And this is the body",
  //     }).then((message) => alert(message));
  //   }
  // };

  const sendEmail = (e) => {
    e.preventDefault();
    alert("ok");
    emailjs
      .sendForm("service_w2vss61", "template_z7gj84e", e.target, {
        publicKey: "qS4RdhTT_otzO07Fq",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content ">
            <div
              class="modal-header"
              style={{
                backgroundColor: "#f2f6fc",
              }}
            >
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                New Message
              </h1>
              <button
                type="button"
                class="btn-close btn-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={sendEmail}>
                <lable name="user_email"> </lable>
                <input
                  style={{
                    width: "95%",
                    border: "0px",
                    backgroundColor: "transparent",
                    outline: "none",
                    margin: "1%",
                  }}
                  class="border-bottom"
                  placeholder="Recipient"
                  type="email"
                  name="user_email"
                  // onKeyUp={() => {
                  //   emailToValidate();
                  // }}
                />
                <span className="text-danger" id="emailToError"></span>
                <input
                  style={{
                    width: "95%",
                    border: "0px",
                    backgroundColor: "transparent",
                    outline: "none",
                    margin: "1%",
                  }}
                  class="border-bottom"
                  placeholder="Subject"
                  type="text"
                  name="subject"
                />
                <textarea
                  class="form-control"
                  // placeholder="Leave a comment here"
                  id="floatingTextarea"
                  rows={10}
                  border="none"
                  name="message"
                  style={{
                    boxShadow: "none",
                    border: "none",
                  }}
                ></textarea>

                <div
                  className="d-flex justify-content-start mt-3 mb-3"
                  style={{ marginLeft: "75px" }}
                >
                  <button
                    class="btn btn-primary"
                    type="submit"
                    value="Send"
                    data-bs-dismiss="modal"
                  >
                    Send
                  </button>

                  <input
                    type="file"
                    className="form-control ms-3 w-50"
                    id="imageInput"
                    multiple
                  ></input>
                  <i
                    className="mt-2 fa-regular fa-trash-can fs-5 icon delete"
                    style={{ marginLeft: "135px" }}
                    title="Delete"
                    data-bs-dismiss="modal"
                    // onClick={emailDeleteIconClick}
                  ></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="shadow"
        size="lg"
        isOpen={modal}
        toggle={() => {
          modalClose();
        }}
      >
        <ModalHeader
          toggle={() => {
            modalClose();
          }}
        >
          New Message
        </ModalHeader>
        <ModalBody>
          <div className="container border rounded">
            <div>
              <div className="mt-2 d-flex justify-content-center">
                <input
                  id="emailTo"
                  label="To"
                  variant="standard"
                  style={{ width: "80%" }}
                  onKeyUp={() => {
                    emailToValidate();
                  }}
                />
              </div>
              <span className="text-danger" id="emailToError"></span>
            </div>
            <div className="d-flex justify-content-center">
              <input
                id="emailSubject"
                label="Subject"
                variant="standard"
                style={{ width: "80%" }}
              />
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <input
                id="emailBody"
                label="Email body"
                multiline
                rows={9}
                variant="standard"
                style={{ width: "80%" }}
              />
            </div>
            <div
              className="d-flex justify-content-start mt-3 mb-3"
              style={{ marginLeft: "75px" }}
            >
              <button
                variant="contained"
                onClick={() => {
                  sendEmailClick();
                }}
              >
                Send
              </button>
              <input
                type="file"
                className="form-control ms-3 w-50"
                id="imageInput"
                multiple
              ></input>
              {/* <i className="mt-2 fa-regular fa-trash-can fs-5 icon delete" style={{ marginLeft: '135px' }} title='Delete' onClick={emailDeleteIconClick}></i> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* compose new email modal end */}

      <div className="col-2">
        <div className="text-center">
          <button
            type="button"
            class=" btn-lg btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ backgroundColor: "#c2e7ff", color: "#001d35" }}
            // onClick={() => {
            //   setModal(true);
            // }}
          >
            <i className="fa-sharp fa-solid fa-pencil"></i> Compose
          </button>
          <button
            onClick={() => {
              setModal(true);
            }}
          >
            compose
          </button>
        </div>

        <ul class="list-group list-group-flush" border="none">
          {SIDEBAR_DATA.map((data) => {
            return (
              <div>
                <li class="list-group-item" style={{ cursor: "pointer" }}>
                  {
                    <img
                      src={data.icon}
                      alt="Gmail"
                      aria-hidden="true"
                      role="presentation"
                      width="15%"
                      height="15%"
                      cursor="pointer"
                    ></img>
                  }
                  {data.title}
                </li>
              </div>
            );
          })}
        </ul>
        <div className="row mt-3">
          <div className="col icon" style={{ marginLeft: "37px" }}>
            <p className="fs-5">
              <i className="fa-solid fa-inbox icon" title="Inbox"></i>
            </p>
            <p className="fs-5">
              <i className="fa-regular fa-star icon " title="Starred"></i>
            </p>
            <p className="fs-5">
              <i className="fa-solid fa-tag icon" title="Important"></i>
            </p>
            <p className="fs-5">
              <i
                className="fa-regular fa-paper-plane icon sent"
                title="Sent"
              ></i>
            </p>
            <p className="fs-5">
              <i className="fa-regular fa-file icon" title="Drafts"></i>
            </p>
            <p className="fs-5">
              <i
                className="fa-regular fa-trash-can icon delete"
                title="Delete"
              ></i>
            </p>
            <p className="fs-5">
              <i
                className="fa-solid fa-circle-exclamation icon delete"
                title="Spam"
              ></i>
            </p>
          </div>
          <div className="col" style={{ marginRight: "40px" }}>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Inbox
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/starred-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Starred
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/important-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Important
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/sent-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Sent
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/draft-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Drafts
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/trash-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Trash
            </p>
            <p
              className="fs-5 icon inbox"
              onClick={() => {
                navigate("/new-home/spam-emails");
              }}
              style={{ fontFamily: "Trebuchet MS", maxWidth: "fit-content" }}
            >
              Spam
            </p>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={popText}
        action={action}
      />
    </>
  );
}

export default Sidebar;
