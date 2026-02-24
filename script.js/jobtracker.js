// console.log(jobplacement)

let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById("total-jobs");
let totalInterview = document.getElementById("interview-jobs");
let totalReject = document.getElementById("rejected-jobs");
let allCards = document.getElementById("allCards");
let filterSection = document.getElementById("filterJobSection");
let mainContainer = document.getElementById("allCardSection");
let availableJobsCount = document.querySelector(".font-bold h2");

let allFilterButton = document.getElementById("btnAll");
let interviewFilterButton = document.getElementById("btnInterview");
let rejectedFilterButton = document.getElementById("btnRejected");

function init() {
    // Add delete-btn class to all delete divs
    document.querySelectorAll('.deletdiv1').forEach(div => {
        div.classList.add('delete-btn');
    });
    
    updateCounts();
    setupEventListeners();
    // Set initial active state for All button
    if (allFilterButton) {
        allFilterButton.classList.add("bg-blue-500", "text-white");
        allFilterButton.classList.remove("bg-white", "text-black");
    }
}

function updateCounts() {
    if (totalCount) totalCount.innerText = allCards.children.length;
    if (totalInterview) totalInterview.innerText = interviewList.length;
    if (totalReject) totalReject.innerText = rejectedList.length;
    
    // Update available jobs count in header
    if (availableJobsCount) {
        availableJobsCount.innerText = allCards.children.length + " jobs";
    }
}

function toggle(id) {
    // Reset all filter buttons to default state
    [allFilterButton, interviewFilterButton, rejectedFilterButton].forEach(btn => {
        if (btn) {
            btn.classList.remove("bg-blue-500", "text-white");
            btn.classList.add("bg-white", "text-black");
        }
    });

    // Highlight selected filter button
    let selected = document.getElementById(id);
    if (selected) {
        selected.classList.remove("bg-white", "text-black");
        selected.classList.add("bg-blue-500", "text-white");
    }

    // Hide all sections first
    allCards.classList.add("hidden");
    filterSection.classList.add("hidden");
    mainContainer.classList.remove("hidden");

    if (id === "btnAll") {
        // Show all cards
        allCards.classList.remove("hidden");
        filterSection.classList.add("hidden");
        
        // Update the status of NOT APPLIED buttons to show they're still NOT APPLIED
        // This ensures they appear with the original style
        document.querySelectorAll('#allCards button').forEach(btn => {
            if (btn.textContent.trim() === 'NOT APPLIED') {
                btn.classList.add('bg-sky-300', 'text-black');
                btn.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
            }
        });
    } else if (id === "btnInterview") {
        // Show only interview cards
        filterSection.classList.remove("hidden");
        renderFilteredList(interviewList, "INTERVIEW", "green");
        
        // Don't change the NOT APPLIED buttons - they remain as they are
        // The interview filter button is already highlighted in blue
    } else if (id === "btnRejected") {
        // Show only rejected cards
        filterSection.classList.remove("hidden");
        renderFilteredList(rejectedList, "REJECTED", "red");
        
        // Don't change the NOT APPLIED buttons - they remain as they are
        // The rejected filter button is already highlighted in blue
    }
}

function renderFilteredList(list, status, color) {
    if (!filterSection) return;
    
    filterSection.innerHTML = '';
    filterSection.className = "container max-w-[1110px] mx-auto px-20 py-0 mt-10";
    
    if (list.length === 0) {
        filterSection.innerHTML = `<div class="text-center py-10 text-gray-500 bg-white rounded-lg">No ${status.toLowerCase()} jobs yet</div>`;
        return;
    }

    list.forEach(job => {
        let card = createFilteredCard(job, status, color);
        filterSection.appendChild(card);
    });
}

function createFilteredCard(job, status, color) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-lg p-6 mb-6 w-full shadow-sm";
    div.setAttribute('data-company', job.company);
    
    div.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="space-y-4 flex-1">
                <h3 class="font-bold text-xl">${job.company}</h3>
                <p class="text-lg font-medium">${job.position}</p>
                <p class="text-gray-600">${job.location || 'Remote'} • ${job.jobType || 'Full-time'} • ${job.salary || '$130,000 - $175,000'}</p>
                <button class="bg-${color}-500 border-0 text-white px-4 py-2 font-bold rounded status-btn">${status}</button>
                <p class="text-gray-700">${job.description}</p>
                <div class="flex gap-3 mt-4">
                    <button class="interested-btn bg-white rounded font-bold border-2 border-green-400 text-green-600 px-4 py-2 hover:bg-green-50">INTERVIEW</button>
                    <button class="rejected-btn border-2 border-red-500 font-bold bg-white px-4 py-2 text-red-600 hover:bg-red-50">REJECTED</button>   
                </div>
            </div>
            <div class="ml-4">
                <div class="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 delete-btn">
                    <i class="fa-regular fa-trash-can text-gray-400"></i>  
                </div>
            </div>
        </div>
    `;
    
    return div;
}

function setupEventListeners() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle Interested/INTERVIEW button
        if (target.classList.contains('interested-btn') || 
            (target.tagName === 'BUTTON' && target.textContent.trim() === 'INTERVIEW' && 
             !target.classList.contains('status-btn') && !target.closest('.status-btn'))) {
            e.preventDefault();
            
            const card = target.closest('[id^="card"], [data-company]');
            if (!card) return;

            // Extract job information
            const companyElem = card.querySelector('h3');
            const positionElem = card.querySelector('p:first-of-type') || card.querySelector('p:nth-child(2)');
            const descriptionElem = card.querySelector('p.text-gray-700') || card.querySelector('p:last-of-type');
            
            const company = companyElem?.innerText || 'Unknown Company';
            const position = positionElem?.innerText || 'Unknown Position';
            const description = descriptionElem?.innerText || 'No description available';
            
            const jobInfo = {
                company: company,
                position: position,
                description: description,
                location: 'Remote',
                jobType: 'Full-time',
                salary: '$130,000 - $175,000'
            };

            // Check if not already in interview list
            if (!interviewList.some(item => item.company === company)) {
                // Remove from rejected if present
                rejectedList = rejectedList.filter(item => item.company !== company);
                
                // Add to interview list
                interviewList.push(jobInfo);
                
                // Update the status button in the card
                const statusBtn = card.querySelector('.bg-sky-300, .status-btn');
                if (statusBtn && statusBtn.tagName === 'BUTTON') {
                    statusBtn.innerText = 'INTERVIEW';
                    statusBtn.classList.remove('bg-sky-300', 'bg-red-500');
                    statusBtn.classList.add('bg-green-500', 'text-white');
                } else {
                    // Find the NOT APPLIED button
                    const notAppliedBtn = Array.from(card.querySelectorAll('button')).find(btn => 
                        btn.textContent.trim() === 'NOT APPLIED'
                    );
                    if (notAppliedBtn) {
                        notAppliedBtn.innerText = 'INTERVIEW';
                        notAppliedBtn.classList.remove('bg-sky-300');
                        notAppliedBtn.classList.add('bg-green-500', 'text-white');
                    }
                }
                
                updateCounts();
                
                // If we're in interview view, update it
                if (interviewFilterButton && interviewFilterButton.classList.contains('bg-blue-500')) {
                    toggle('btnInterview');
                }
            }
        }
        
        // Handle Rejected button
        if (target.classList.contains('rejected-btn') || 
            (target.tagName === 'BUTTON' && target.textContent.trim() === 'REJECTED' && 
             !target.classList.contains('status-btn') && !target.closest('.status-btn'))) {
            e.preventDefault();
            
            const card = target.closest('[id^="card"], [data-company]');
            if (!card) return;

            // Extract job information
            const companyElem = card.querySelector('h3');
            const positionElem = card.querySelector('p:first-of-type') || card.querySelector('p:nth-child(2)');
            const descriptionElem = card.querySelector('p.text-gray-700') || card.querySelector('p:last-of-type');
            
            const company = companyElem?.innerText || 'Unknown Company';
            const position = positionElem?.innerText || 'Unknown Position';
            const description = descriptionElem?.innerText || 'No description available';
            
            const jobInfo = {
                company: company,
                position: position,
                description: description,
                location: 'Remote',
                jobType: 'Full-time',
                salary: '$130,000 - $175,000'
            };

            // Check if not already in rejected list
            if (!rejectedList.some(item => item.company === company)) {
                // Remove from interview if present
                interviewList = interviewList.filter(item => item.company !== company);
                
                // Add to rejected list
                rejectedList.push(jobInfo);
                
                // Update the status button in the card
                const statusBtn = card.querySelector('.bg-sky-300, .status-btn');
                if (statusBtn && statusBtn.tagName === 'BUTTON') {
                    statusBtn.innerText = 'REJECTED';
                    statusBtn.classList.remove('bg-sky-300', 'bg-green-500');
                    statusBtn.classList.add('bg-red-500', 'text-white');
                } else {
                    // Find the NOT APPLIED button
                    const notAppliedBtn = Array.from(card.querySelectorAll('button')).find(btn => 
                        btn.textContent.trim() === 'NOT APPLIED'
                    );
                    if (notAppliedBtn) {
                        notAppliedBtn.innerText = 'REJECTED';
                        notAppliedBtn.classList.remove('bg-sky-300');
                        notAppliedBtn.classList.add('bg-red-500', 'text-white');
                    }
                }
                
                updateCounts();
                
                // If we're in rejected view, update it
                if (rejectedFilterButton && rejectedFilterButton.classList.contains('bg-blue-500')) {
                    toggle('btnRejected');
                }
            }
        }
        
        // Handle Delete button
        const deleteBtn = target.closest('.delete-btn, .deletdiv1');
        
        if (deleteBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = deleteBtn.closest('[id^="card"], [data-company]');
            if (!card) return;
            
            // Get company name
            const companyElem = card.querySelector('h3');
            const company = companyElem?.innerText;
            if (!company) return;
            
            // Remove from arrays
            interviewList = interviewList.filter(job => job.company !== company);
            rejectedList = rejectedList.filter(job => job.company !== company);
            
            // Remove the card
            card.remove();
            
            // Update counts
            updateCounts();
            
            // Re-render current filtered view if active
            if (filterSection && !filterSection.classList.contains('hidden')) {
                if (interviewFilterButton && interviewFilterButton.classList.contains('bg-blue-500')) {
                    renderFilteredList(interviewList, "INTERVIEW", "green");
                } else if (rejectedFilterButton && rejectedFilterButton.classList.contains('bg-blue-500')) {
                    renderFilteredList(rejectedList, "REJECTED", "red");
                }
            }
            
            // If no cards left in all cards, show message
            if (allCards && allCards.children.length === 0) {
                allCards.innerHTML = '<div class="text-center py-10 text-gray-500 bg-white rounded-lg">No jobs available</div>';
            }
            
            // If we're in all view, make sure NOT APPLIED buttons have correct styling
            if (allFilterButton && allFilterButton.classList.contains('bg-blue-500')) {
                document.querySelectorAll('#allCards button').forEach(btn => {
                    if (btn.textContent.trim() === 'NOT APPLIED') {
                        btn.classList.add('bg-sky-300', 'text-black');
                        btn.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
                    }
                });
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);