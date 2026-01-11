/**
 * INTELLIGENCE | APP LOGIC V2
 * Comprehensive system for life tracking.
 */

Chart.defaults.color = 'rgba(255, 255, 255, 0.4)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.elements.line.tension = 0.4;
Chart.defaults.elements.point.radius = 0;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.animation = { duration: 1500, easing: 'easeOutQuart' };

const UI = {
    currentView: 'overview',
    renderedViews: new Set(['overview']),

    init() {
        this.initNavigation();
        this.renderOverview();
        this.initHeatmap();
        window.onload = () => this.handleInitialLoad();
    },

    handleInitialLoad() {
        // Any specific startup logic
    },

    initNavigation() {
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.addEventListener('click', () => {
                const view = li.getAttribute('data-view');
                this.switchView(view);
                document.querySelector('.nav-links li.active').classList.remove('active');
                li.classList.add('active');
            });
        });
    },

    switchView(viewId) {
        if (this.currentView === viewId) return;
        const oldView = document.querySelector('.view.active');
        const newView = document.getElementById(`view-${viewId}`);
        if (!newView) return;

        oldView.classList.remove('active');
        newView.classList.add('active');
        this.currentView = viewId;

        const titles = {
            'overview': ['System Overview', 'Strategic summary of all life vectors.'],
            'financial': ['Financial Control', 'Wealth trajectory and asset intelligence.'],
            'budget': ['Budget Intelligence', 'Resource allocation and spending behavior.'],
            'habits': ['Discipline Timeline', 'Consistency monitoring and habit formation.'],
            'goals': ['Strategic Strategy', 'Long-term vision and milestone progress.'],
            'productivity': ['Performance Metrics', 'Time architecture and cognitive output.'],
            'health': ['Vitality Dashboard', 'Biological markers and physical performance.']
        };

        document.getElementById('view-title').innerText = titles[viewId][0];
        document.getElementById('view-subtitle').innerText = titles[viewId][1];

        // Lazy render charts
        if (!this.renderedViews.has(viewId)) {
            this.renderViewCharts(viewId);
            this.renderedViews.add(viewId);
        }
    },

    renderOverview() {
        this.createLineChart('chart-networth', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], [120, 125, 122, 130, 135, 138, 142], '#3b82f6');
        this.createBarChart('chart-focus-mini', ['M', 'T', 'W', 'T', 'F', 'S', 'S'], [6, 7, 5, 8, 9, 4, 3], '#8b5cf6');
        this.createLineChart('chart-sleep-mini', ['1', '2', '3', '4', '5', '6', '7'], [82, 75, 88, 92, 84, 79, 85], '#10b981');
        
        // Populate Overview Weekly Grid
        this.populateWeeklyGrid('overview-weekly-grid');
    },

    populateWeeklyGrid(containerId) {
        const grid = document.getElementById(containerId);
        if (!grid) return;
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dates = ['11/15', '11/16', '11/17', '11/18', '11/19', '11/20', '11/21'];
        grid.innerHTML = '';
        days.forEach((day, i) => {
            const percent = Math.floor(Math.random() * 50) + 40;
            const offset = 251 - (251 * percent) / 100;
            grid.innerHTML += `
                <div class="day-progress">
                    <svg class="circle-svg">
                        <circle class="circle-bg" cx="40" cy="40" r="35"></circle>
                        <circle class="circle-fill" cx="40" cy="40" r="35" style="stroke-dasharray: 251; stroke-dashoffset: ${offset}"></circle>
                    </svg>
                    <span class="day-label">${day}</span>
                </div>
            `;
        });
    },

    renderViewCharts(viewId) {
        switch(viewId) {
            case 'financial':
                this.renderFinancial();
                break;
            case 'budget':
                this.renderBudget();
                break;
            case 'habits':
                this.renderHabits();
                break;
            case 'productivity':
                this.renderProductivity();
                break;
            case 'health':
                this.renderHealth();
                break;
            case 'goals':
                this.renderGoals();
                break;
        }
    },

    renderFinancial() {
        // 1. Expenses by Category (Pie)
        const expCtx = document.getElementById('chart-fin-exp-cat').getContext('2d');
        new Chart(expCtx, {
            type: 'pie',
            data: {
                labels: ['Rent', 'Food', 'Internet', 'Leisure', 'Transport'],
                datasets: [{
                    data: [2000, 450, 60, 400, 288],
                    backgroundColor: ['#3b82f6', '#10b981', '#fbbf24', '#8b5cf6', '#4ade80'],
                    borderWidth: 0
                }]
            }
        });

        // 2. Plan vs Actual (Bar)
        const planCtx = document.getElementById('chart-fin-plan-act').getContext('2d');
        new Chart(planCtx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [
                    { label: 'Plan', data: [7000, 4110], backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 },
                    { label: 'Actual', data: [7100, 3198], backgroundColor: '#3b82f6', borderRadius: 4 }
                ]
            }
        });

        // 3. Income by Category (Pie)
        const incCtx = document.getElementById('chart-fin-inc-cat').getContext('2d');
        new Chart(incCtx, {
            type: 'pie',
            data: {
                labels: ['Salary', 'Freelance', 'Dividends'],
                datasets: [{
                    data: [5000, 1500, 600],
                    backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
                    borderWidth: 0
                }]
            }
        });

        // 4. Detailed Table
        const tableBody = document.getElementById('fin-exp-table-body');
        const rows = [
            { s: 'Rent', p: '2,000.00', a: '2,000.00' },
            { s: 'Food', p: '1,000.00', a: '450.00' },
            { s: 'Internet', p: '60.00', a: '60.00' },
            { s: 'Transport', p: '300.00', a: '288.00' }
        ];
        tableBody.innerHTML = rows.map(r => `<tr><td>${r.s}</td><td>${r.p}</td><td>${r.a}</td></tr>`).join('');
    },

    renderBudget() {
        this.createBarChart('chart-budget-categories', ['Housing', 'Food', 'Transport', 'Study', 'Leisure'], [1200, 450, 300, 200, 600], '#3b82f6');
        const ctx = document.getElementById('chart-budget-utilization').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Spent', 'Remaining'],
                datasets: [{
                    data: [64, 36],
                    backgroundColor: ['#3b82f6', 'rgba(255,255,255,0.05)'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '80%' }
        });
    },

    renderHabits() {
        // 1. Generate Table Header (Days 1-30)
        const header = document.getElementById('habit-days-header');
        if (!header) return;
        header.innerHTML = '<th class="sticky-col">Habit</th>';
        const days = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
        for (let i = 1; i <= 30; i++) {
            const dayName = days[(i - 1) % 7];
            header.innerHTML += `<th>${dayName}<br>${i}</th>`;
        }

        // 2. Generate Habits Grid
        const gridBody = document.getElementById('habit-grid-body');
        const habits = [
            'Wake up at 05:00 ⏰', 'Gym 💪', 'Reading / Learning 📖',
            'Day Planning 🗓️', 'Budget Tracking 💰', 'Project Work 🎯',
            'No Alcohol 🚫', 'Social Media Detox 🌿', 'Goal Journaling 📓'
        ];
        
        gridBody.innerHTML = '';
        habits.forEach(habit => {
            let row = `<tr><td class="sticky-col">${habit}</td>`;
            for (let i = 0; i < 30; i++) {
                const isChecked = Math.random() > 0.4;
                row += `<td><div class="habit-cb ${isChecked ? 'checked' : ''}"></div></td>`;
            }
            row += '</tr>';
            gridBody.innerHTML += row;
        });

        // 3. Mood & Motivation Chart
        this.renderMoodMotivationChart();
        this.renderHabitAnalysis();
    },

    renderMoodMotivationChart() {
        const ctx = document.getElementById('chart-mood-motivation').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => i + 1),
                datasets: [
                    {
                        label: 'Mood',
                        data: Array.from({length: 30}, () => Math.floor(Math.random() * 4) + 6),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Motivation',
                        data: Array.from({length: 30}, () => Math.floor(Math.random() * 5) + 5),
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 10, display: true, grid: { color: 'rgba(255,255,255,0.03)' } },
                    x: { display: true, ticks: { maxTicksLimit: 10 } }
                }
            }
        });
    },

    renderHabitAnalysis() {
        const container = document.getElementById('habit-analysis');
        container.innerHTML = `
            <div class="habit-stat mb-16">
                <span class="label">Consistency Rate</span>
                <span class="value">92%</span>
                <div class="progress-bar-container"><div class="progress-bar-fill" style="width: 92%"></div></div>
            </div>
            <div class="habit-stat mb-16">
                <span class="label">Longest Streak</span>
                <span class="value">14 Days</span>
                <div class="progress-bar-container"><div class="progress-bar-fill" style="width: 70%; background: #8b5cf6;"></div></div>
            </div>
        `;
    },

    renderProductivity() {
        // 1. Weekly Circles
        this.populateWeeklyGrid('productivity-weekly-grid');

        // 2. Task Table
        const taskBody = document.getElementById('task-list-body');
        if (!taskBody) return;
        const tasks = [
            { t: 'Create a development plan', d: '11/28/2025', p: 'High', s: 'Not Started', c: 'Work', done: true },
            { t: 'Analyze the market report', d: '11/30/2025', p: 'Medium', s: 'In Progress', c: 'Work', done: true },
            { t: 'Set up website traffic', d: '12/11/2025', p: 'High', s: 'Not Started', c: 'Work', done: false },
            { t: 'Organize personal finances', d: '11/15/2025', p: 'Medium', s: 'In Progress', c: 'Money', done: false },
            { t: 'Call with Oleg', d: '12/22/2025', p: 'Low', s: 'Not Started', c: 'Social', done: false }
        ];

        taskBody.innerHTML = '';
        tasks.forEach(task => {
            taskBody.innerHTML += `
                <tr>
                    <td><div class="habit-cb ${task.done ? 'checked' : ''}"></div></td>
                    <td>${task.t}</td>
                    <td>${task.d}</td>
                    <td><span class="trend ${task.p === 'High' ? 'highlight-red' : 'pos'}">${task.p}</span></td>
                    <td>${task.s}</td>
                    <td>${task.c}</td>
                </tr>
            `;
        });
    },

    renderHealth() {
        this.createLineChart('chart-health-vitals', ['M', 'T', 'W', 'T', 'F'], [72, 74, 70, 68, 71], '#10b981');
        this.createBarChart('chart-steps', ['M', 'T', 'W', 'T', 'F'], [8000, 12000, 10000, 9500, 11000], '#3b82f6');
        this.createLineChart('chart-water', ['1', '2', '3', '4', '5'], [2, 2.5, 2.2, 2.8, 2.4], '#3b82f6');
    },

    renderGoals() {
        this.createLineChart('chart-goals-curve', ['2023', '2024', '2025'], [10, 45, 85], '#8b5cf6');
    },

    initHeatmap() {
        const heatmap = document.getElementById('heatmap-overview');
        if (!heatmap) return;
        for (let i = 0; i < 28; i++) {
            const dot = document.createElement('div');
            dot.className = 'heat-dot' + (Math.random() > 0.3 ? ' active' : '');
            if (dot.classList.contains('active')) dot.style.opacity = Math.random() * 0.7 + 0.3;
            heatmap.appendChild(dot);
        }
    },

    createLineChart(id, labels, data, color, stepped = false) {
        const ctx = document.getElementById(id).getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 150);
        grad.addColorStop(0, hexToRgba(color, 0.15));
        grad.addColorStop(1, hexToRgba(color, 0));
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    borderColor: color,
                    backgroundColor: grad,
                    fill: true,
                    stepped: stepped
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } }
            }
        });
    },

    createMultiLineChart(id, labels, dataSets, colors) {
        const ctx = document.getElementById(id).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: dataSets.map((d, i) => ({
                    data: d,
                    borderColor: colors[i],
                    fill: false
                }))
            },
            options: {
                maintainAspectRatio: false,
                scales: { 
                    y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    },

    createBarChart(id, labels, data, color) {
        const ctx = document.getElementById(id).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: color,
                    borderRadius: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { x: { display: false }, y: { display: false } }
            }
        });
    }
};

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

UI.init();
