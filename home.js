// Modal(Pop-Up)
function openModal(){
  document.getElementById("jobModal").style.display="flex";
}

function closeModal(){
  document.getElementById("jobModal").style.display="none";
}

// LOAD SAVED JOBS
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

displayJobs();


// Add Job
function addJob(){

  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("companyName").value;
  const location = document.getElementById("location").value;

  if(!title || !company || !location){
    alert("Fill all fields");
    return;
  }

  const job = {title, company, location};

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs();
  closeModal();
}

// Display Job

function displayJobs(){

  const container = document.getElementById("jobContainer");
  container.innerHTML = "";

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p><b>${job.company}</b></p>
        <p>${job.location}</p>
      </div>
    `;
  });
}

// Explore Job

document.getElementById("Explr-btn").addEventListener("click",exploreJob)

function exploreJob(){
  window.open("JobCards.html", "_blank");
}