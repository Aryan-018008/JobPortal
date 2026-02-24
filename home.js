// Modal(Pop-Up)
function openModal(){
  document.getElementById("jobModal").style.display="flex";
}

function closeModal(){
  document.getElementById("jobModal").style.display="none";
}

// Saved Jobs Loading
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

if(document.getElementById("jobContainer")){
  displayJobs();
}


// Add Job
function addJob(){

  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("companyName").value;
  const location = document.getElementById("location").value;

  if(!title || !company || !location){
    alert("Fill all fields");
    return;
  }

  const job = {title, company, location,createdAt : Date.now()};

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs();
  closeModal();
}

// Latest Time
function timeAgo(timestamp){

  if(!timestamp) return "Just now";

  const diff = Date.now() - Number(timestamp);

  if(isNaN(diff)) return "Just now";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if(seconds < 60) return "Just now";
  if(minutes < 60) return minutes + " min ago";
  if(hours < 24) return hours + " hr ago";
  return days + " day ago";
}

// Display Job

function displayJobs(){

  const container = document.getElementById("jobContainer");
  container.innerHTML = "";

  const latestJobs = jobs.slice(-3).reverse();

  latestJobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p><b>${job.company}</b></p>
        <p>${job.location}</p>
        <small class="time">${timeAgo(job.createdAt || Date.now())}</small>      
        </div>
    `;
  });
}

// Explore Job

document.getElementById("Explr-btn").addEventListener("click",exploreJob)

function exploreJob(){
  window.open("JobCard.html", "_blank");
}


/* Company Modal(HomePage)*/

const companiesBtn = document.getElementById("companiesBtn");
const companyModal = document.getElementById("companyModal");
const closeCompany = document.querySelector(".close-company");
const companyList = document.getElementById("companyList");

/* OPEN MODAL */
companiesBtn.addEventListener("click", function(e){
  e.preventDefault();
  renderCompanies();
  companyModal.style.display = "flex";
});

/* CLOSE MODAL */
closeCompany.addEventListener("click", () =>{
  companyModal.style.display = "none";
});

/* CLICK OUTSIDE CLOSE */
window.addEventListener("click", (e)=>{
  if(e.target === companyModal){
    companyModal.style.display = "none";
  }
});

/* LOAD COMPANIES FROM LOCALSTORAGE */
function renderCompanies(){

  companyList.innerHTML = "";

  const jobsData =
    JSON.parse(localStorage.getItem("jobs")) || [];

  if(jobsData.length === 0){
    companyList.innerHTML = "<p>No companies available</p>";
    return;
  }

  /* Uniq Comp */
  const uniqueCompanies =
    [...new Set(jobsData.map(job => job.company))];

  uniqueCompanies.forEach(company => {

    const count =
      jobsData.filter(j => j.company === company).length;

    const div = document.createElement("div");
    div.className = "company-item";

    div.innerHTML = `
      <strong>${company}</strong>
      <span> (${count} openings)</span>
    `;

    
    div.addEventListener("click", () => {

      localStorage.setItem("selectedCompany", company);
      window.open("JobCard.html", "_blank");

    });

    companyList.appendChild(div);
  });
}

