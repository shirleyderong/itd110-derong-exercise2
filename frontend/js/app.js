const API_URL = "http://localhost:3000/api/students";

const el = (id) => document.getElementById(id);

const form = el("studentForm");
const list = el("studentList");
const statusPill = el("statusPill");
const countText = el("countText");
const formTitle = el("formTitle");
const submitBtn = el("submitBtn");
const clearBtn = el("clearBtn");
const refreshBtn = el("refreshBtn");

const setStatus = (text, isError = false) => {
    statusPill.textContent = text;
    statusPill.style.background = isError ? "#ffdee9" : "#ffe8f2";
    statusPill.style.color = isError ? "#a61b4d" : "#8b2d56";
};

const fetchJSON = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`);
    }
    return data;
};

const clearForm = () => {
    form.reset();
    el("studentId").value = "";
    formTitle.textContent = "Add student";
    submitBtn.textContent = "Save";
    setStatus("Ready");
};

const loadStudents = async () => {
    try {
        setStatus("Loading...");
        const students = await fetchJSON(API_URL);
        renderStudents(students);
        setStatus("Ready");
    } catch (err) {
        setStatus("Load Failed", true);
        console.error(err);
    }
};

const renderStudents = (students) => {
    list.innerHTML = "";
    countText.textContent = `${students.length} total`;

    if (!students.length) {
        list.innerHTML = `<p class="sub" style="grid-column: 1/-1; text-align: center;">No student records found.</p>`;
        return;
    }

    students.forEach((s) => {
        const isInc = s.inc === "true" || s.inc === true;
        const card = document.createElement("div");
        card.className = "student";
        card.innerHTML = `
            <div class="name">${s.name}</div>
            <div class="meta">
                ${s.email} • ${s.course}<br/>
                GPA: ${s.gpa || 'N/A'} • Age: ${s.age || 'N/A'}
            </div>
            <span class="badge ${isInc ? 'inc' : ''}">
                ${isInc ? 'INCOMPLETE' : 'REGULAR'}
            </span>
            <div class="row">
                <button class="btn ghost" type="button" onclick="editStudent('${s.id}')">Edit</button>
                <button class="btn ghost danger" type="button" onclick="deleteStudent('${s.id}')">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
};

form.onsubmit = async (e) => {
    e.preventDefault();
    const id = el("studentId").value;
    
    const payload = {
        name: el("name").value.trim(),
        email: el("email").value.trim(),
        course: el("course").value.trim(),
        gpa: el("gpa").value,
        age: el("age").value,
        inc: el("inc").checked
    };

    try {
        setStatus("Processing...");
        const result = await fetchJSON(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        clearForm();
        loadStudents();
        console.log("Success:", result);
    } catch (err) {
        alert(`Server Error: ${err.message}`); 
        setStatus("Validation Error", true);
    }
};

window.editStudent = async (id) => {
    try {
        setStatus("Loading...");
        const s = await fetchJSON(`${API_URL}/${id}`);
        el("studentId").value = s.id;
        el("name").value = s.name;
        el("email").value = s.email;
        el("course").value = s.course;
        el("gpa").value = s.gpa || "";
        el("age").value = s.age || "";
        el("inc").checked = (s.inc === "true" || s.inc === true);

        formTitle.textContent = "Edit student";
        submitBtn.textContent = "Update";
        window.scrollTo({ top: 0, behavior: "smooth" });
        setStatus("Editing");
    } catch (err) { 
        alert(err.message); 
        setStatus("Error", true);
    }
};

window.deleteStudent = async (id) => {
    if (!confirm("Delete this student?")) return;
    try {
        setStatus("Deleting...");
        await fetchJSON(`${API_URL}/${id}`, { method: "DELETE" });
        loadStudents();
    } catch (err) { 
        alert(err.message); 
        setStatus("Error", true);
    }
};

clearBtn.onclick = clearForm;
refreshBtn.onclick = loadStudents;

document.addEventListener("DOMContentLoaded", loadStudents);