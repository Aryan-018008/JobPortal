/* ===============================
   JOB DATA
================================*/

const baseJobs = [
{
title:"Frontend Developer",
company:"Google",
location:"Remote",
category:"IT",
experience:"Mid",
salary:"₹8 LPA",
desc:"Build modern UI using React and APIs."
},
{
title:"UI Designer",
company:"Adobe",
location:"Bangalore",
category:"Design",
experience:"Fresher",
salary:"₹5 LPA",
desc:"Design modern interfaces and prototypes."
},
{
title:"Marketing Manager",
company:"Amazon",
location:"Delhi",
category:"Marketing",
experience:"Senior",
salary:"₹12 LPA",
desc:"Lead digital marketing campaigns."
},
];

/* Demo data for pagination */
const jobs = [];
let idCounter = 1;

for(let i=0;i<5;i++){
  baseJobs.forEach(job=>{
    jobs.push({
      id: idCounter++,   // ✅ unique id
      ...job
    });
  });
}

/* ===============================
   GLOBAL VARIABLES
================================*/

const container = document.getElementById("jobContainer");

// let currentPage = 1;
// const perPage = 6;
let filteredJobs = [...jobs];

/* ===============================
   RENDER JOBS
================================*/

function renderJobs(){

  container.innerHTML = "";

  if(filteredJobs.length === 0){
    container.innerHTML =
      `<p class="no-result">No jobs found</p>`;
    return;
  }

  filteredJobs.forEach(job => {

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <div class="job-header">
        <div>
          <div class="job-title">${job.title}</div>
          <div class="company">
            <i class="fa-solid fa-building"></i> ${job.company}
          </div>
        </div>
      </div>

      <div class="job-info">
        <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
        <span><i class="fa-solid fa-briefcase"></i> ${job.category}</span>
        <span><i class="fa-solid fa-user"></i> ${job.experience}</span>
        <span><i class="fa-solid fa-indian-rupee-sign"></i> ${job.salary}</span>
      </div>

      <p class="job-desc">${job.desc}</p>

      <button class="view-btn">Apply Now</button>
    `;

    container.appendChild(card);
  });
}
/* ===============================
   PAGINATION
================================*/

// function updatePagination(){

//   const totalPages =
//     Math.max(1, Math.ceil(filteredJobs.length / perPage));

//   document.getElementById("pageInfo").textContent =
//     `Page ${currentPage} / ${totalPages}`;

//   document.getElementById("prevBtn").disabled =
//     currentPage === 1;

//   document.getElementById("nextBtn").disabled =
//     currentPage === totalPages;
// }

// document.getElementById("prevBtn").onclick = () => {
//   if(currentPage > 1){
//     currentPage--;
//     renderJobs();
//   }
// };

// document.getElementById("nextBtn").onclick = () => {
//   const totalPages =
//     Math.ceil(filteredJobs.length / perPage);

//   if(currentPage < totalPages){
//     currentPage++;
//     renderJobs();
//   }
// };

/* ===============================
   FILTERING
================================*/

function applyFilters(){

  const search =
    document.getElementById("searchInput")
    .value.toLowerCase().trim();

  const location =
    document.getElementById("locationFilter").value;

  const category =
    document.getElementById("categoryFilter").value;

  const exp =
    document.getElementById("experienceFilter").value;

  /* FILTER */
  let results = jobs.filter(job =>
    job.title.toLowerCase().includes(search) &&
    (!location || job.location === location) &&
    (!category || job.category === category) &&
    (!exp || job.experience === exp)
  );

  /* ✅ REMOVE VISUAL DUPLICATES */
  const seen = new Set();

  filteredJobs = results.filter(job => {

    const key =
      job.title + job.company + job.location;

    if(seen.has(key)) return false;

    seen.add(key);
    return true;
  });

  currentPage = 1;
  renderJobs();
}
/* ===============================
   RESET FILTERS
================================*/

document.getElementById("resetBtn").onclick = () => {

  document.getElementById("searchInput").value = "";
  document.getElementById("locationFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("experienceFilter").value = "";

  filteredJobs = [...jobs];
  currentPage = 1;

  renderJobs();
};

/* ===============================
   FILTER EVENTS (IMPORTANT)
================================*/

document.getElementById("searchInput")
  .addEventListener("input", applyFilters);

document.getElementById("locationFilter")
  .addEventListener("change", applyFilters);

document.getElementById("categoryFilter")
  .addEventListener("change", applyFilters);

document.getElementById("experienceFilter")
  .addEventListener("change", applyFilters);

/* ===============================
   INITIAL LOAD
================================*/

renderJobs();