/**
 * INTELLIGENCE SYSTEM // CORE ENGINE v.2
 * High-performance data visualization for the Precision Alabaster theme.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Shared Chart Configurations - High Contrast
    Chart.defaults.color = '#374151'; // Slate 700
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 11;

    const defaultAnimation = {
        duration: 2000,
        easing: 'easeOutQuart'
    };

    // --- INITIALIZATION DISPATCHER ---
    initSharedElements();
    
    // Index Page
    if (document.getElementById('financial-growth-chart')) {
        initIndexCharts(defaultAnimation);
        initEditorialCharts(defaultAnimation);
    }
    
    // Detailed Modules Case-Insensitive Check
    if (document.getElementById('financial-networth-detailed')) initFinancialModule(defaultAnimation);

    if (document.getElementById('expenses-by-category-chart')) initFinancialDashboard(defaultAnimation);
    
    // Habit Tracker is now initialized via auth observer in HTML to ensure UID availability
});

function initSharedElements() {
    if (document.getElementById('habit-matrix')) populateHabitGrid('habit-matrix', 42); 
    if (document.getElementById('habit-matrix-large')) populateHabitGrid('habit-matrix-large', 120);
}

function populateHabitGrid(id, count) {
    const matrix = document.getElementById(id);
    if (!matrix) return;
    matrix.innerHTML = ''; 
    for (let i = 0; i < count; i++) {
        const cell = document.createElement('div');
        cell.className = 'habit-cell';
        if (Math.random() > 0.3) {
            cell.classList.add('active');
            cell.style.opacity = 0.5 + Math.random() * 0.5;
        }
        matrix.appendChild(cell);
    }
}

function initIndexCharts(anim) {
    const finCtx = document.getElementById('financial-growth-chart');
    if (finCtx) {
        new Chart(finCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    data: [82, 89, 95, 110, 128, 135, 142],
                    borderColor: '#926b2d', // Bold Bronze
                    borderWidth: 2.5, tension: 0.4, pointRadius: 0, fill: true,
                    backgroundColor: createGradient(finCtx, 'rgba(146, 107, 45, 0.1)', 'transparent')
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } }, animation: anim }
        });
    }



    const goalCtx = document.getElementById('productivity-dist-chart');
    if (goalCtx) {
        new Chart(goalCtx, {
            type: 'bar',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{ data: [6, 8, 7, 9, 6, 4, 1], backgroundColor: '#1f2937', borderRadius: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } }, animation: anim }
        });
    }

    const healthCtx = document.getElementById('health-vitality-chart');
    if (healthCtx) {
        new Chart(healthCtx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7],
                datasets: [{ data: [85, 92, 78, 88, 95, 82, 90], borderColor: '#0f172a', borderWidth: 2, tension: 0.5, pointRadius: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } }, animation: anim }
        });
    }
}

function initEditorialCharts(anim) {
    const finEdCtx = document.getElementById('editorial-fin-viz');
    if (finEdCtx) {
        new Chart(finEdCtx, {
            type: 'line',
            data: {
                labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
                datasets: [{
                    data: [100, 110, 105, 120, 140, 160],
                    borderColor: '#926b2d', borderWidth: 3, tension: 0.4, fill: false, pointRadius: 4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: false }, scales: { x: { display: false }, y: { display: false } }, animation: anim }
        });
    }

    const prodEdCtx = document.getElementById('editorial-prod-viz');
    if (prodEdCtx) {
        new Chart(prodEdCtx, {
            type: 'bar',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7],
                datasets: [{ data: [40, 60, 50, 80, 70, 90, 100], backgroundColor: '#111827', borderRadius: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: false }, scales: { x: { display: false }, y: { display: false } }, animation: anim }
        });
    }
}

function initFinancialDashboard(anim) {
    const expensesCtx = document.getElementById('expenses-by-category-chart');
    if (expensesCtx) {
        new Chart(expensesCtx, {
            type: 'pie',
            data: {
                labels: ['Rent', 'Mobile phone', 'Internet', 'Subscriptions', 'Food', 'Hobbies', 'Taxi', 'Debts'],
                datasets: [{
                    data: [3000, 30, 30, 50, 1000, 200, 100, 50],
                    backgroundColor: ['#4285f4', '#db4437', '#f4b400', '#0f9d58', '#ff7043', '#9c27b0', '#00bcd4', '#e91e63'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 10 } } }, animation: anim }
        });
    }

    const planActualCtx = document.getElementById('plan-actual-chart');
    if (planActualCtx) {
        new Chart(planActualCtx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [
                    { label: 'Plan', data: [7000, 4110], backgroundColor: '#4285f4' },
                    { label: 'Actual', data: [7100, 3198], backgroundColor: '#db4437' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top' } }, animation: anim }
        });
    }

    const incomeCtx = document.getElementById('income-by-category-chart');
    if (incomeCtx) {
        new Chart(incomeCtx, {
            type: 'pie',
            data: {
                labels: ['Salary', 'Business / Dividends'],
                datasets: [{
                    data: [5000, 2100],
                    backgroundColor: ['#4285f4', '#db4437'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 10 } } }, animation: anim }
        });
    }
}

function createGradient(canvas, start, stop) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, stop);
    return gradient;
}

// --- HOMEPAGE / DASHBOARD LIVE STATS ---

async function initDashboardHabitStats(uid) {
    if (!uid) return;
    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const docId = `${monthsArr[now.getMonth()].toLowerCase()}_${now.getFullYear()}`;
    
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('habits').doc(docId);
    
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            const habits = data.habits || [];
            const days = 30;
            
            // 1. Update Habit Grid Visualization
            const matrix = document.getElementById('habit-matrix');
            if (matrix && habits.length > 0) {
                matrix.innerHTML = '';
                // Just show current day's status for all habits in the mini grid
                const today = now.getDate() - 1;
                habits.forEach(h => {
                    const cell = document.createElement('div');
                    cell.className = 'habit-cell';
                    if (h.data && h.data[today]) cell.classList.add('active');
                    matrix.appendChild(cell);
                });
            }

            // 2. Calculate Daily Momentum (for charts)
            const dailyCompletion = [];
            for (let d = 0; d < days; d++) {
                let done = 0;
                habits.forEach(h => { if (h.data && h.data[d]) done++; });
                const percent = habits.length ? Math.round((done / habits.length) * 100) : 0;
                dailyCompletion.push(percent);
            }

            // 3. Update Efficiency Stats
            let totalCompleted = 0;
            habits.forEach(h => {
                if (h.data) totalCompleted += h.data.filter(v => v).length;
            });
            const totalPossible = habits.length * days;
            const globalPercent = totalPossible ? Math.round((totalCompleted / totalPossible) * 100) : 0;

            const habitValEl = document.getElementById('habit-count-display');
            if (habitValEl) habitValEl.innerText = habits.length;

            const efficiencyEl = document.querySelector('.stats-ribbon .stat-unit:nth-child(2) .stat-num');
            if (efficiencyEl) efficiencyEl.innerText = globalPercent + '%';

            const stabilityIndexEl = document.querySelector('.editorial-section .stat-num');
            if (stabilityIndexEl) stabilityIndexEl.innerText = globalPercent + '%';

            // 4. Render Momentum Chart (homepage mini) - MATCHING HABITS.HTML STYLE
            const momentumCtx = document.getElementById('habit-momentum-chart');
            if (momentumCtx) {
                new Chart(momentumCtx, {
                    type: 'line',
                    data: {
                        labels: Array.from({length: days}, (_, i) => i + 1),
                        datasets: [{
                            data: dailyCompletion,
                            borderColor: '#10b981', // Discipline Green from habits.html
                            borderWidth: 3, 
                            tension: 0.3, 
                            pointRadius: 0, 
                            fill: true,
                            backgroundColor: createGradient(momentumCtx, 'rgba(16, 185, 129, 0.1)', 'transparent')
                        }]
                    },
                    options: { 
                        responsive: true, 
                        maintainAspectRatio: false, 
                        plugins: { legend: { display: false } }, 
                        scales: { 
                            x: { display: false }, 
                            y: { display: false, min: 0, max: 100 } 
                        },
                        animation: { duration: 2000, easing: 'easeOutQuart' }
                    }
                });
            }

            // 5. Render Editorial Comparison Chart (homepage bottom)
            const prodEdCtx = document.getElementById('editorial-prod-viz');
            if (prodEdCtx) {
                if (window.prodEdChart) window.prodEdChart.destroy();
                window.prodEdChart = new Chart(prodEdCtx, {
                    type: 'bar',
                    data: {
                        labels: ['W1', 'W2', 'W3', 'W4'],
                        datasets: [{ 
                            label: 'Execution',
                            data: [
                                dailyCompletion.slice(0, 7).reduce((a,b)=>a+b,0)/7,
                                dailyCompletion.slice(7, 14).reduce((a,b)=>a+b,0)/7,
                                dailyCompletion.slice(14, 21).reduce((a,b)=>a+b,0)/7,
                                dailyCompletion.slice(21, 28).reduce((a,b)=>a+b,0)/7
                            ], 
                            backgroundColor: '#111827', 
                            borderRadius: 4 
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: false }, scales: { x: { display: true }, y: { display: false, min: 0, max: 100 } } }
                });
            }
        }
    } catch (e) {
        console.error("Dashboard Sync Error:", e);
    }
}

async function initDashboardFinancialStats(uid) {
    if (!uid) return;
    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const docId = `financial_${monthsArr[now.getMonth()].toLowerCase()}_${now.getFullYear()}`;
    
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('financial').doc(docId);
    
    try {
        const doc = await docRef.get();
        let finData = { income: [], expense: [], startingAmount: 0 };
        if (doc.exists) {
            finData = doc.data();
        }

        const sumInAct = (finData.income || []).reduce((a, b) => a + Number(b.actual), 0);
        const sumExAct = (finData.expense || []).reduce((a, b) => a + Number(b.actual), 0);
        const balanceActual = sumInAct - sumExAct;
        const totalActual = (finData.startingAmount || 0) + balanceActual;

        // Update Homepage Card Labels
        const netWorthEl = document.getElementById('dash-net-worth');
        if (netWorthEl) netWorthEl.innerText = `₹${totalActual.toLocaleString()}`;

        const trendEl = document.getElementById('dash-wealth-trend');
        const badgeEl = document.getElementById('dash-wealth-badge');
        if (badgeEl) {
            const growth = balanceActual > 0 ? ((balanceActual / (finData.startingAmount || 1)) * 100).toFixed(1) : "0.0";
            badgeEl.innerText = `+${growth}%`;
            if (trendEl) trendEl.innerText = balanceActual >= 0 ? 'Ascending' : 'Descending';
        }

        // Render Homepage Financial Chart
        const finCtx = document.getElementById('financial-growth-chart');
        if (finCtx) {
            const existingChart = Chart.getChart(finCtx);
            if (existingChart) existingChart.destroy();

            // Pseudo-historical points for aesthetic trajectory
            const points = [
                finData.startingAmount * 0.95,
                finData.startingAmount * 0.98,
                finData.startingAmount,
                finData.startingAmount + (balanceActual * 0.3),
                finData.startingAmount + (balanceActual * 0.7),
                totalActual
            ];

            new Chart(finCtx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', ''],
                    datasets: [{
                        data: points,
                        borderColor: '#76a36f',
                        borderWidth: 3,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true,
                        backgroundColor: createGradient(finCtx, 'rgba(118, 163, 111, 0.1)', 'transparent')
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { legend: { display: false } }, 
                    scales: { x: { display: false }, y: { display: false } }, 
                    animation: { duration: 2000, easing: 'easeOutQuart' } 
                }
            });
        }
    } catch (e) {
        console.error("Financial Stats Error:", e);
    }
}

// --- DASHBOARD TASK STATS ---

async function initDashboardTaskStats(uid) {
    if (!uid) return;
    
    const db = firebase.firestore();
    
    try {
        const snapshot = await db.collection('users').doc(uid).collection('tasks').get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const incompleteTasks = totalTasks - completedTasks;

        // Update task count display
        const taskCountEl = document.getElementById('task-count-display');
        if (taskCountEl) taskCountEl.innerText = incompleteTasks > 0 ? incompleteTasks : '--';

        // Render task completion chart
        const taskCtx = document.getElementById('task-completion-chart');
        if (taskCtx && totalTasks > 0) {
            const existingChart = Chart.getChart(taskCtx);
            if (existingChart) existingChart.destroy();

            new Chart(taskCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [completedTasks, incompleteTasks],
                        backgroundColor: ['#10b981', '#e5e7eb'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '75%',
                    plugins: { legend: { display: false } },
                    animation: { duration: 2000, easing: 'easeOutQuart' }
                }
            });
        } else if (taskCtx) {
            // Default empty chart
            new Chart(taskCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [0, 1],
                        backgroundColor: ['#10b981', '#e5e7eb'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '75%',
                    plugins: { legend: { display: false } }
                }
            });
        }
    } catch (e) {
        console.error("Task Stats Error:", e);
    }
}

// --- DASHBOARD WEEKLY PLANNER STATS ---
async function initDashboardWeeklyStats(uid) {
    try {
        const db = firebase.firestore();
        
        // Get current week start (Sunday)
        const today = new Date();
        const dayOfWeek = today.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);
        
        const weekId = `week_${weekStart.toISOString().split('T')[0]}`;
        
        const docRef = db.collection('users').doc(uid).collection('weeklyPlanner').doc(weekId);
        const doc = await docRef.get();
        
        let dailyCounts = [0, 0, 0, 0, 0, 0, 0];
        let dailyCompleted = [0, 0, 0, 0, 0, 0, 0];
        let totalTasks = 0;
        let completedTasks = 0;
        
        if (doc.exists && doc.data().days) {
            const days = doc.data().days;
            for (let i = 0; i < 7; i++) {
                const dayTasks = days[i] || [];
                dailyCounts[i] = dayTasks.length;
                dailyCompleted[i] = dayTasks.filter(t => t.completed).length;
                totalTasks += dayTasks.length;
                completedTasks += dailyCompleted[i];
            }
        }
        
        // Update display
        const displayEl = document.getElementById('weekly-completed-display');
        if (displayEl) {
            displayEl.innerText = `${completedTasks} / ${totalTasks}`;
        }
        
        // Render bar chart
        const chartCtx = document.getElementById('weekly-planner-chart');
        if (chartCtx) {
            const existingChart = Chart.getChart(chartCtx);
            if (existingChart) existingChart.destroy();
            
            new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                        {
                            label: 'Completed',
                            data: dailyCompleted,
                            backgroundColor: '#22c55e',
                            borderRadius: 4,
                            barPercentage: 0.8
                        },
                        {
                            label: 'Remaining',
                            data: dailyCounts.map((total, i) => total - dailyCompleted[i]),
                            backgroundColor: '#dcfce7',
                            borderRadius: 4,
                            barPercentage: 0.8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false }
                    },
                    scales: {
                        x: { 
                            stacked: true,
                            grid: { display: false },
                            ticks: { font: { size: 10, weight: 600 }, color: '#166534' }
                        },
                        y: { 
                            stacked: true,
                            beginAtZero: true,
                            grid: { color: 'rgba(34, 197, 94, 0.1)' },
                            ticks: { stepSize: 1, font: { size: 9 } }
                        }
                    },
                    animation: { duration: 2000, easing: 'easeOutQuart' }
                }
            });
        }
    } catch (e) {
        console.error("Weekly Stats Error:", e);
    }
}


// --- ADVANCED HABIT TRACKER LOGIC (FIREBASE INTEGRATED) ---

const now = new Date();
let currentYear = now.getFullYear();
let currentMonthIdx = now.getMonth();
const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function initHabitTracker(uid) {
    if (!uid) return;
    window.currentUid = uid;
    
    updateHeaderUI();
    const docId = `${monthsArr[currentMonthIdx].toLowerCase()}_${currentYear}`;
    
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('habits').doc(docId);
    
    let fetchedData = null;
    try {
        const doc = await docRef.get();
        if (doc.exists) fetchedData = doc.data();
    } catch (e) {
        console.error("Error loading habits:", e);
    }

    // Load custom habits or defaults
    const habitsBase = fetchedData && fetchedData.habits ? fetchedData.habits : [
        { name: 'Wake up at 05:00 ⏰', goal: 30 },
        { name: 'Gym 💪', goal: 30 },
        { name: 'Reading / Learning 📖', goal: 30 },
        { name: 'Day Planning 📝', goal: 30 }
    ];

    const days = 30; // Static for grid consistency
    
    // Mental State initialization
    const mentalMetrics = fetchedData && fetchedData.mental ? fetchedData.mental : [
        { name: 'Mood', values: Array.from({length: days}, () => 5) },
        { name: 'Motivation', values: Array.from({length: days}, () => 5) }
    ];

    window.habitData = habitsBase;
    window.mentalData = mentalMetrics;
    window.daysCount = days;

    renderHabitTracker();
}

function renderHabitTracker() {
    const habits = window.habitData;
    const mental = window.mentalData;
    const days = window.daysCount;
    const dayLabelsArr = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
    
    const tableBody = document.getElementById('habit-table-body');
    const dayLabelRow = document.querySelector('.day-label-row');
    const dateLabelRow = document.querySelector('.date-label-row');
    const mentalTableBody = document.getElementById('mental-table-body');

    if (!tableBody) return;

    // 1. Setup Day and Date Labels
    dayLabelRow.innerHTML = '';
    dateLabelRow.innerHTML = '';

    for (let i = 1; i <= days; i++) {
        const label = dayLabelsArr[(i + 5) % 7];
        const thDay = document.createElement('th');
        thDay.innerText = label;
        dayLabelRow.appendChild(thDay);

        const thDate = document.createElement('th');
        thDate.innerText = i;
        dateLabelRow.appendChild(thDate);
    }

    // 2. Generate Habit Rows
    tableBody.innerHTML = '';
    habits.forEach((habit, hIdx) => {
        const tr = document.createElement('tr');
        tr.className = 'habit-row';
        tr.innerHTML = `<td class="habit-name-col">${habit.name} <span class="delete-habit" onclick="removeHabit(${hIdx})">×</span></td>`;
        
        if (!habit.data) habit.data = Array.from({length: days}, () => false);
        
        habit.data.forEach((isChecked, dIdx) => {
            const td = document.createElement('td');
            td.innerHTML = `
                <div class="checkbox-container" onclick="toggleHabit(${hIdx}, ${dIdx})">
                    <div class="custom-checkbox ${isChecked ? 'checked' : ''}" id="check-${hIdx}-${dIdx}"></div>
                </div>
            `;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });

    // 3. Setup Mental State
    mentalTableBody.innerHTML = ''; 
    mental.forEach((metric, mIdx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="habit-name-col">${metric.name}</td>`;
        metric.values.forEach((val, dIdx) => {
            tr.innerHTML += `
                <td>
                    <div class="mental-cell">
                        <span id="mental-${mIdx}-${dIdx}">${val}</span> 
                        <div class="adj-controls">
                            <span class="adj-btn" onclick="adjustMental(${mIdx}, ${dIdx}, 1)">+</span>
                            <span class="adj-btn" onclick="adjustMental(${mIdx}, ${dIdx}, -1)">-</span>
                        </div>
                    </div>
                </td>`;
        });
        mentalTableBody.appendChild(tr);
    });

    updateTrackerCalculations(false);
}

function updateHeaderUI() {
    const display = document.getElementById('current-month-display');
    if (display) display.innerText = `${monthsArr[currentMonthIdx]} ${currentYear}`;
}

window.changeMonth = (delta) => {
    currentMonthIdx += delta;
    if (currentMonthIdx > 11) { currentMonthIdx = 0; currentYear++; }
    if (currentMonthIdx < 0) { currentMonthIdx = 11; currentYear--; }
    initHabitTracker(window.currentUid);
};

window.openHabitModal = () => document.getElementById('habit-modal').classList.add('active');
window.closeHabitModal = () => document.getElementById('habit-modal').classList.remove('active');

window.addNewHabit = async () => {
    const nameInput = document.getElementById('new-habit-name');
    const goalInput = document.getElementById('new-habit-goal');
    
    if (!nameInput.value) return;

    const newHabit = {
        name: nameInput.value,
        goal: parseInt(goalInput.value) || 30,
        data: Array.from({length: window.daysCount}, () => false)
    };

    window.habitData.push(newHabit);
    nameInput.value = '';
    closeHabitModal();
    
    // Re-render locally first for instant feedback
    renderHabitTracker();
    updateTrackerCalculations(true); // Save new habit
};

window.removeHabit = (idx) => {
    if (confirm("Delete this habit?")) {
        window.habitData.splice(idx, 1);
        renderHabitTracker();
        updateTrackerCalculations(true); // Ensure save after deletion
    }
};

function adjustMental(mIdx, dIdx, delta) {
    let newVal = window.mentalData[mIdx].values[dIdx] + delta;
    if (newVal < 1) newVal = 1; if (newVal > 10) newVal = 10;
    window.mentalData[mIdx].values[dIdx] = newVal;
    document.getElementById(`mental-${mIdx}-${dIdx}`).innerText = newVal;
    updateTrackerCalculations(true); // Trigger Save
}

function toggleHabit(hIdx, dIdx) {
    window.habitData[hIdx].data[dIdx] = !window.habitData[hIdx].data[dIdx];
    const el = document.getElementById(`check-${hIdx}-${dIdx}`);
    if (el) el.classList.toggle('checked');
    updateTrackerCalculations(true); // Trigger Save
}

function updateTrackerCalculations(shouldSave = true) {
    const habits = window.habitData;
    const days = window.daysCount;
    if (!habits) return;
    
    // ... UI Updates (Footer, Stats, Charts) ...
    const footerProgress = document.querySelector('.footer-row.progress-percent');
    const footerDone = document.querySelector('.footer-row.done-count');
    const footerNotDone = document.querySelector('.footer-row.not-done-count');

    if (footerProgress) {
        footerProgress.innerHTML = '<td class="habit-name-col">Progress</td>';
        footerDone.innerHTML = '<td class="habit-name-col">Done</td>';
        footerNotDone.innerHTML = '<td class="habit-name-col">Not Done</td>';
    }

    let totalCompleted = 0;
    const dailyCompletion = [];

    for (let d = 0; d < days; d++) {
        let done = 0;
        habits.forEach(h => { if (h.data && h.data[d]) done++; });
        totalCompleted += done;
        const percent = habits.length ? Math.round((done / habits.length) * 100) : 0;
        dailyCompletion.push(percent);

        if (footerProgress) {
            footerProgress.innerHTML += `<td>${percent}%</td>`;
            footerDone.innerHTML += `<td>${done}</td>`;
            footerNotDone.innerHTML += `<td>${habits.length - done}</td>`;
        }
    }

    const analysisBody = document.getElementById('analysis-table-body');
    if (analysisBody) {
        analysisBody.innerHTML = '';
        habits.forEach(h => {
            const actual = h.data ? h.data.filter(v => v).length : 0;
            const prog = Math.round((actual / h.goal) * 100);
            analysisBody.innerHTML += `
                <tr>
                    <td>${h.goal}</td>
                    <td>${actual}</td>
                    <td>
                        <div class="mini-progress-track">
                            <div class="mini-progress-fill" style="width: ${prog}%"></div>
                        </div>
                    </td>
                </tr>`;
        });

        // Global Stats calculation
        const totalPossible = habits.length * days;
        const globalPercent = totalPossible ? ((totalCompleted / totalPossible) * 100).toFixed(1) : "0";

        const habitsCountVal = document.querySelector('.habits-count .stat-value');
        const habitsEfficiencyVal = document.querySelector('.header-right .stat-value.bold');
        const efficiencyFill = document.querySelector('.progress-group .progress-bar-fill');

        if (habitsCountVal) habitsCountVal.innerText = habits.length;
        if (habitsEfficiencyVal) habitsEfficiencyVal.innerText = globalPercent + '%';
        if (efficiencyFill) efficiencyFill.style.width = globalPercent + '%';
    }

    renderTrackerCharts(dailyCompletion);
    
    if (shouldSave) {
        saveUserData(window.currentUid, habits, window.mentalData);
    }
}

async function saveUserData(uid, habits, mental) {
    if (!uid) return;
    const syncStatus = document.getElementById('sync-status');
    if (syncStatus) syncStatus.innerText = '// Syncing...';

    const docId = `${monthsArr[currentMonthIdx].toLowerCase()}_${currentYear}`;
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('habits').doc(docId);
    
    try {
        await docRef.set({
            habits: habits,
            mental: mental,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        if (syncStatus) {
            syncStatus.innerText = '// Synced';
            setTimeout(() => { syncStatus.innerText = ''; }, 2000);
        }
    } catch (e) {
        console.error("Sync Error:", e);
        if (syncStatus) syncStatus.innerText = '// Sync Failed';
    }
}

let mainChart, mentalChart;

function renderTrackerCharts(dailyData) {
    const mainCtxElement = document.getElementById('main-progress-chart');
    const mentalCtxElement = document.getElementById('mental-state-chart');
    if (!mainCtxElement || !mentalCtxElement) return;

    if (mainChart) mainChart.destroy();
    if (mentalChart) mentalChart.destroy();

    mainChart = new Chart(mainCtxElement, {
        type: 'line',
        data: {
            labels: Array.from({length: dailyData.length}, (_, i) => i + 1),
            datasets: [{
                data: dailyData,
                borderColor: '#10b981',
                backgroundColor: createChartGradient(mainCtxElement, 'rgba(16, 185, 129, 0.1)'),
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBorderColor: '#fff',
                pointBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e1e1e',
                    padding: 12,
                    displayColors: false,
                    titleFont: { weight: '800' }
                }
            },
            scales: { 
                x: { display: false }, 
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    ticks: { stepSize: 25, color: '#999', font: { size: 10 } }, 
                    grid: { color: '#f5f5f5', drawBorder: false } 
                } 
            }
        }
    });

    mentalChart = new Chart(mentalCtxElement, {
        type: 'line',
        data: {
            labels: Array.from({length: dailyData.length}, (_, i) => i + 1),
            datasets: [{
                data: window.mentalData[0].values.map(v => v * 10),
                borderColor: '#f59e0b',
                backgroundColor: createChartGradient(mentalCtxElement, 'rgba(245, 158, 11, 0.05)'),
                borderWidth: 3,
                tension: 0.3,
                pointRadius: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false }, 
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    ticks: { stepSize: 25, color: '#999', font: { size: 10 } }, 
                    grid: { color: '#f5f5f5', drawBorder: false } 
                } 
            }
        }
    });
}

function createChartGradient(ctxElement, color) {
    const ctx = ctxElement.getContext('2d');
    const height = ctxElement.clientHeight || 300;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    return gradient;
}

// --- ADVANCED FINANCIAL TRACKER LOGIC (FIREBASE INTEGRATED) ---

let currentFinMode = 'expense';
window.financialData = {
    income: [],
    expense: [],
    debt: [],
    startingAmount: 8000
};

async function initFinancialTracker(uid) {
    if (!uid) return;
    window.currentUid = uid;

    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const docId = `financial_${monthsArr[now.getMonth()].toLowerCase()}_${now.getFullYear()}`;
    
    // Update display month
    const monthDisplay = document.getElementById('current-month-display');
    if (monthDisplay) monthDisplay.innerText = `${monthsArr[now.getMonth()]} ${now.getFullYear()}`;

    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('financial').doc(docId);
    
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            window.financialData = doc.data();
        } else {
            // Start with a clean slate for new users
            window.financialData = {
                income: [],
                expense: [],
                debt: [],
                startingAmount: 0
            };
        }
    } catch (e) {
        console.error("Error loading financial data:", e);
    }

    renderFinancialTracker();
}

window.updateStartingAmount = () => {
    const newVal = prompt("Enter new Starting Amount:", window.financialData.startingAmount);
    if (newVal !== null && !isNaN(newVal)) {
        window.financialData.startingAmount = parseFloat(newVal);
        renderFinancialTracker();
        saveFinancialData();
    }
};

function renderFinancialTracker() {
    const data = window.financialData;
    
    // Update Starting Amount
    const startEl = document.getElementById('starting-amount-display');
    if (startEl) startEl.innerText = '₹' + Number(data.startingAmount || 0).toLocaleString();

    // Render Tables
    renderFinTable('expense-table-body', data.expense, 'expense');
    renderFinTable('income-table-body', data.income, 'income');
    renderFinTable('debt-table-body', data.debt, 'debt');

    updateFinancialCalculations();
}

function renderFinTable(id, list, type) {
    const tbody = document.getElementById(id);
    if (!tbody) return;
    tbody.innerHTML = '';
    
    list.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.source}</td>
            <td>${Number(item.plan).toLocaleString()}</td>
            <td>${Number(item.actual).toLocaleString()}</td>
            <td><span class="delete-fin-entry" onclick="removeFinEntry('${type}', ${idx})">×</span></td>
        `;
        tbody.appendChild(tr);
    });
}

window.openFinModal = (type) => {
    currentFinMode = type;
    const modal = document.getElementById('fin-modal');
    modal.classList.add('active');
    
    // Reset labels
    const title = document.getElementById('fin-modal-title');
    const labelSource = document.getElementById('label-source');
    const labelPlan = document.getElementById('label-plan');
    const labelActual = document.getElementById('label-actual');

    if (type === 'income') {
        title.innerText = 'Add Planned Income';
        labelSource.innerText = 'Income Source';
        labelPlan.innerText = 'Planned Amount';
        labelActual.innerText = 'Actual Amount';
    } else if (type === 'expense') {
        title.innerText = 'Add Planned Expense';
        labelSource.innerText = 'Expense Source';
        labelPlan.innerText = 'Planned Amount';
        labelActual.innerText = 'Actual Amount';
    } else if (type === 'debt') {
        title.innerText = 'Add Debt Entry';
        labelSource.innerText = 'Debt Source';
        labelPlan.innerText = 'Total Debt';
        labelActual.innerText = 'Paid Out';
    }
};

window.closeFinModal = () => document.getElementById('fin-modal').classList.remove('active');

window.saveFinEntry = () => {
    const source = document.getElementById('fin-source').value;
    const plan = parseFloat(document.getElementById('fin-plan').value) || 0;
    const actual = parseFloat(document.getElementById('fin-actual').value) || 0;

    if (!source) return;

    if (!window.financialData[currentFinMode]) window.financialData[currentFinMode] = [];
    window.financialData[currentFinMode].push({ source, plan, actual });
    
    document.getElementById('fin-source').value = '';
    document.getElementById('fin-plan').value = 0;
    document.getElementById('fin-actual').value = 0;

    closeFinModal();
    renderFinancialTracker();
    saveFinancialData();
};

window.removeFinEntry = (type, idx) => {
    if (confirm("Remove this entry?")) {
        window.financialData[type].splice(idx, 1);
        renderFinancialTracker();
        saveFinancialData();
    }
};

async function saveFinancialData() {
    const uid = window.currentUid;
    if (!uid) return;

    const syncStatus = document.getElementById('sync-status');
    if (syncStatus) syncStatus.innerText = '// Syncing...';

    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const docId = `financial_${monthsArr[now.getMonth()].toLowerCase()}_${now.getFullYear()}`;
    
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(uid).collection('financial').doc(docId);
    
    try {
        await docRef.set(window.financialData, { merge: true });
        if (syncStatus) {
            syncStatus.innerText = '// Synced';
            setTimeout(() => { syncStatus.innerText = ''; }, 2000);
        }
    } catch (e) {
        console.error("Financial Sync Error:", e);
    }
}

function updateFinancialCalculations() {
    const data = window.financialData;
    
    const sumIncomePlan = (data.income || []).reduce((a, b) => a + Number(b.plan), 0);
    const sumIncomeActual = (data.income || []).reduce((a, b) => a + Number(b.actual), 0);
    
    const sumExpensePlan = (data.expense || []).reduce((a, b) => a + Number(b.plan), 0);
    const sumExpenseActual = (data.expense || []).reduce((a, b) => a + Number(b.actual), 0);
    
    const sumDebtsTotal = (data.debt || []).reduce((a, b) => a + Number(b.plan), 0);
    
    const balancePlan = sumIncomePlan - sumExpensePlan;
    const balanceActual = sumIncomeActual - sumExpenseActual;
    
    const totalBalancePlan = (data.startingAmount || 0) + balancePlan;
    const totalBalanceActual = (data.startingAmount || 0) + balanceActual;

    // Update Wealth Momentum Card
    const netWorthEl = document.getElementById('net-worth-display');
    if (netWorthEl) {
        netWorthEl.innerText = `₹${totalBalanceActual.toLocaleString()}`;
    }
    
    const trendLabel = document.getElementById('wealth-trend-label');
    const trendBadge = document.getElementById('wealth-trend-badge');
    if (trendBadge) {
        const growth = balanceActual > 0 ? ((balanceActual / (data.startingAmount || 1)) * 100).toFixed(1) : "0.0";
        trendBadge.innerText = `+${growth}%`;
        if (trendLabel) trendLabel.innerText = balanceActual >= 0 ? 'Ascending' : 'Descending';
    }

    // Update Summary Header
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = '₹' + val.toLocaleString(); };
    setVal('sum-income-plan', sumIncomePlan);
    setVal('sum-income-actual', sumIncomeActual);
    setVal('sum-expense-plan', sumExpensePlan);
    setVal('sum-expense-actual', sumExpenseActual);
    setVal('sum-balance-plan', balancePlan);
    setVal('sum-balance-actual', balanceActual);
    setVal('sum-total-plan', totalBalancePlan);
    setVal('sum-total-actual', totalBalanceActual);
    setVal('sum-debts-total', sumDebtsTotal);

    refreshFinancialCharts();
}

function refreshFinancialCharts() {
    const data = window.financialData;
    const anim = { duration: 1000 };

    // Expenses Pie
    const expensesCtx = document.getElementById('expenses-by-category-chart');
    if (expensesCtx) {
        const existingChart = Chart.getChart(expensesCtx);
        if (existingChart) existingChart.destroy();
        
        const labels = (data.expense || []).map(e => e.source);
        if (labels.length > 0) {
            window.expensesPie = new Chart(expensesCtx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: (data.expense || []).map(e => e.actual),
                        backgroundColor: ['#4285f4', '#db4437', '#f4b400', '#0f9d58', '#ff7043', '#9c27b0', '#00bcd4', '#e91e63'],
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } }, animation: anim }
            });
        }
    }

    // Plan vs Actual Bar
    const planActualCtx = document.getElementById('plan-actual-chart');
    if (planActualCtx) {
        const existingChart = Chart.getChart(planActualCtx);
        if (existingChart) existingChart.destroy();

        const sumInPlan = (data.income || []).reduce((a, b) => a + Number(b.plan), 0);
        const sumInAct = (data.income || []).reduce((a, b) => a + Number(b.actual), 0);
        const sumExPlan = (data.expense || []).reduce((a, b) => a + Number(b.plan), 0);
        const sumExAct = (data.expense || []).reduce((a, b) => a + Number(b.actual), 0);

        if (sumInPlan > 0 || sumExPlan > 0 || sumInAct > 0 || sumExAct > 0) {
            window.planActualBar = new Chart(planActualCtx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses'],
                    datasets: [
                        { label: 'Plan', data: [sumInPlan, sumExPlan], backgroundColor: '#4285f4', borderRadius: 4 },
                        { label: 'Actual', data: [sumInAct, sumExAct], backgroundColor: '#db4437', borderRadius: 4 }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, animation: anim, scales: { y: { beginAtZero: true } } }
            });
        }
    }

    // Income Pie
    const incomeCtx = document.getElementById('income-by-category-chart');
    if (incomeCtx) {
        const existingChart = Chart.getChart(incomeCtx);
        if (existingChart) existingChart.destroy();

        const labels = (data.income || []).map(i => i.source);
        if (labels.length > 0) {
            window.incomePie = new Chart(incomeCtx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: (data.income || []).map(i => i.actual),
                        backgroundColor: ['#4285f4', '#db4437', '#f4b400', '#0f9d58'],
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } }, animation: anim }
            });
        }
    }

    // Wealth Momentum Line Chart
    const wealthCtx = document.getElementById('wealth-momentum-chart');
    if (wealthCtx) {
        const existingChart = Chart.getChart(wealthCtx);
        if (existingChart) existingChart.destroy();

        const totalActual = (data.startingAmount || 0) + ((data.income || []).reduce((a, b) => a + Number(b.actual), 0) - (data.expense || []).reduce((a, b) => a + Number(b.actual), 0));
        
        // Generate pseudo-historical data points for the aesthetic line
        const points = [
            data.startingAmount * 0.95,
            data.startingAmount * 0.97,
            data.startingAmount,
            data.startingAmount * 1.02,
            data.startingAmount * 1.05,
            totalActual
        ];

        window.wealthChart = new Chart(wealthCtx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', 'Current'],
                datasets: [{
                    data: points,
                    borderColor: '#76a36f',
                    backgroundColor: 'rgba(118, 163, 111, 0.1)',
                    borderWidth: 4,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { 
                        display: true,
                        grid: { display: false },
                        ticks: { display: false }
                    }
                },
                animation: anim
            }
        });
    }
}


