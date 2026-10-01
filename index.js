function checkSchedule() {
    const now = new Date();
    const currentTimeNum = (now.getHours() * 100) + now.getMinutes();

    const periods = document.querySelectorAll('[data-start]');
    let classFound = false;

    periods.forEach(period => {
        const startTimeNum = parseInt(period.dataset.start.replace(':', ''), 10);
        const endTimeNum = parseInt(period.dataset.end.replace(':', ''), 10);

        let isNow = false;

        // Special rule for overnight blocks (like Home block going from 15:30 to 07:45 next day)
        if (startTimeNum > endTimeNum) {
            if (currentTimeNum >= startTimeNum || currentTimeNum < endTimeNum) {
                isNow = true;
            }
        } else {
            // Normal daytime rule
            if (currentTimeNum >= startTimeNum && currentTimeNum < endTimeNum) {
                isNow = true;
            }
        }

        if (isNow) {
            period.classList.add('active');
            period.classList.remove('hidden');
            classFound = true;
        } else {
            period.classList.remove('active');
            period.classList.add('hidden');
        }
    });

    // Handle fallback if you are ever outside your scheduled layout hours
    const fallback = document.getElementById('no-class-message');
    if (!classFound) {
        fallback.classList.add('active');
        fallback.classList.remove('hidden');
    } else {
        fallback.classList.remove('active');
        fallback.classList.add('hidden');
    }
}

// Run immediately on page load
window.addEventListener('DOMContentLoaded', checkSchedule);

// Run a check every 30 seconds
setInterval(checkSchedule, 30000);
