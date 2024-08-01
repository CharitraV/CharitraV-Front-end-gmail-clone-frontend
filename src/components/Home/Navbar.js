import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import sixDots from "../../constant/sixDots.png";

function Navbar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState();
  const userEmail = sessionStorage.getItem("userEmail");
  const userFirstName = sessionStorage.getItem("userFirstName");
  const userLastName = sessionStorage.getItem("userLastName");

  function logoutClick() {
    sessionStorage.clear();
    navigate("/login");
  }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
        <div class="container-fluid">
          {/* gmail */}
          {/* <a class="navbar-brand" href="http://localhost:3001"> */}
          <div>
            {/* <a
              href="#sidebar"
              class=" d-lock mt3"
              data-bs-toggle="offcanvas"
              role="button"
              aria-controls="sidebar"
            > */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                // fill="currentColor"
                // class="bi bi-list"
                viewBox="0 0 16 16"
                color="black"
                alt="Menu"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            {/* </a> */}






            <img
              // class="gb_Ec"
              src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
              alt="Gmail"
              aria-hidden="true"
              role="presentation"
              width="109px"
              height="40px"
            ></img>
          </div>
          {/* Search */}
          <div
            class="d-flex"
            role="search"
            style={{
              backgroundColor: "#e3f2fd",
              padding: "1%",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              width: "60%",
              // height:"70%",
              justifyContent: "space-between",
              padding: "1% 2%",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              alt="search"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              // class="form-control me-2"
              type="search"
              placeholder="Search Mail"
              // aria-label="Search"
              style={{
                backgroundColor: "#e3f2fd",
                border: "none",
                width: "100%",
                height: "100%",
                padding: "1%",
                borderStyle: "none",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              alt="Tune"
              backgroundColour="light blue"
            >
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
            </svg>
          </div>
          <div className="">
            <div className="row">
              <div className="col ">
                <i
                  className="fs-4 fa-regular fa-circle-question icon"
                  title="Support"
                ></i>
              </div>
              <div className="col">
                <i className="fs-4 fa-solid fa-gear icon" title="Settings"></i>
              </div>
              <div className="col">
                <i className="fs-4 fa-solid icon" title="Settings"></i>
                <img src={sixDots} width="15" height="21" />
              </div>
              <div className="col">
                <i
                  className="fs-4 fa-regular fa-circle-user icon"
                  title="Profile"
                  onClick={handleClick("bottom-end")}
                ></i>
              </div>

              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <div className="d-flex ">
                        <div className="mt-4 ms-3">
                          <i className="fs-3 fa-regular fa-circle-user icon"></i>
                        </div>
                        <div className="mt-2 ms-2 me-3">
                          <span>{userFirstName} </span>
                          <span>{userLastName}</span> <br />
                          <span>{userEmail}</span>
                        </div>
                      </div>
                      <div className="mt-3 text-center pb-3">
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => {
                            logoutClick();
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </nav>

      {/* <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="sidebar"
        aria-labelledby="sidebar-lable"
      ></div> */}
    </>
  );
}

export default Navbar;
