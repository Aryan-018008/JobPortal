/* -- Job Data--*/

const baseJobs = [
{
title:"Frontend Developer",
company:"Google",
location:"Remote",  //Remote/Other Location
category:"IT",      // It or design or marketig
experience:"Mid",   // Fresher or Mid or Senior
salary:"₹8 LPA",
skill1:"React JS",
skill2:"Angular JS",
skill3:"Tailwind_CSS",
desc:"Build modern UI."
},
{
title:"UI Designer",
company:"Adobe",
location:"Bangalore",
category:"Design",
experience:"Fresher",
salary:"₹5 LPA",
skill1:"Figma",
skill2:"AdobeXD",
skill3:"Prototyping",
desc:"Design modern interfaces and prototypes."
},

{
title:"Marketing Manager",
company:"Crystal Ent.",
location:"Delhi",
category:"Marketing",
experience:"Senior",
salary:"₹12 LPA",
skill1:"Communication",
skill2:"Client Interaction",
skill3:"SEO",
desc:"Lead digital marketing campaigns."
},
{
title:"Python Developer",
company:"WebdX",
location:"Bhubaneswar",
category:"IT",
experience:"Senior",
salary:"₹12 LPA",
skill1:"Python",
skill2:"Flask",
skill3:"APIs",
desc:"Python Application Development."
},
{
title:"Backend Developer",
company:"RobustY",
location:"Noida",
category:"IT",
experience:"Senior",
salary:"₹14 LPA",
skill1:"Node JS",
skill3:"MongoDB",
skill2:"Express JS",
desc:"Server-Side Error Handling"
},
{
title:"Graphic Design",
company:"TwinDesign",
location:"Chennai",
category:"Design",
experience:"Senior",
salary:"₹9 LPA",
skill3:"Figma",
skill2:"Photoshop",
skill1:"Typography",
desc:"Brand Identity and Logo Design"
},
{
title:"Sales Executive",
company:"we4u",
location:"Remote",
category:"Marketing",
experience:"Mid",
salary:"₹8 LPA",
skill1:"Communication",
skill2:"Client handling",
skill3:"Data Analytics",
desc:"Lead digital marketing campaigns."
},
{
title:"Java Developer",
company:"EaseSoft",
location:"Kerala",
category:"IT",
experience:"Fresher",
salary:"₹4 LPA",
skill1:"Java(core)",
skill2:"JWT",
skill3:"API Development",
desc:"Enterprise Java Solutions"
},

];

/* Demo data for pagination */
const jobs = [];
let idCounter = 1;

for(let i=0;i<1;i++){
  baseJobs.forEach(job=>{
    jobs.push({
      id: idCounter++,   
      ...job
    });
  });
}

/* Global Variables*/

const container = document.getElementById("jobContainer");


let filteredJobs = [...jobs];

/* Render Jobs */

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
        <span><i class="fa-solid fa-screwdriver-wrench"></i> ${job.skill1}</span>
        <span><i class="fa-solid fa-screwdriver-wrench"></i> ${job.skill2}</span>
        <span><i class="fa-solid fa-screwdriver-wrench"></i> ${job.skill3}</span>
      </div>

      <p class="job-desc">${job.desc}</p>

      <button class="view-btn">Save</button>
    `;
    const saveBtn = card.querySelector(".view-btn");

  saveBtn.addEventListener("click", () => {

      let savedJobs =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

      // avoid duplicate save
      const exists = savedJobs.some(j =>
        j.title === job.title &&
        j.company === job.company
      );

      if (exists) {
        alert("Job already saved!");
        return;
      }

      savedJobs.push(job);

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
      );

      alert("Job saved successfully!");
  });

    container.appendChild(card);
  });
}


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

//HomePage Redirection
// Redirect Modal Logic
const homeBtn = document.querySelector(".back-home-btn");
const redirectModal = document.getElementById("redirectModal");

homeBtn.addEventListener("click", function(e){
    e.preventDefault(); 

    // pop-up
    redirectModal.classList.add("active");

    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500); 
});