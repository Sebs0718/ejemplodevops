/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Add new task
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" class="task-checkbox">
                <span class="checkmark"></span>
            </label>
            <span class="task-text">${escapeHTML(text)}</span>
            <button class="delete-btn" aria-label="Eliminar tarea">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;

        taskList.appendChild(li);
        taskInput.value = '';
        taskInput.focus();
    };

    // Handle clicks on the list (delegation)
    taskList.addEventListener('click', (e) => {
        // Toggle completed state
        if (e.target.matches('.task-checkbox')) {
            const li = e.target.closest('.task-item');
            if (e.target.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        }

        // Handle delete
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const li = deleteBtn.closest('.task-item');
            li.style.opacity = '0';
            li.style.transform = 'translateY(-10px)';
            li.style.transition = 'all 0.2s ease';
            setTimeout(() => {
                li.remove();
            }, 200);
        }
    });

    // Event listeners for adding tasks
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Helper function to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
