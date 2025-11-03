INSERT INTO employees (first_name, last_name, title) VALUES
('John', 'Doe', 'Project Manager'),
('Jane', 'Smith', 'Software Engineer'),
('Robert', 'Brown', 'Backend Developer'),
('Emily', 'Johnson', 'Frontend Developer'),
('Michael', 'Lee', 'QA Tester'),
('Sarah', 'Davis', 'UI/UX Designer'),
('David', 'Wilson', 'DevOps Engineer'),
('Laura', 'Garcia', 'Business Analyst'),
('James', 'Martinez', 'Technical Lead'),
('Olivia', 'Anderson', 'Database Administrator');

INSERT INTO projects (name, start_date, due_date, status, created_at, updated_at) VALUES
('Website Redesign', '2025-10-01', '2025-12-01', 'IN_PROGRESS', NOW(), NOW()),
('Inventory Management System', '2025-09-15', '2025-11-30', 'IN_PROGRESS', NOW(), NOW()),
('Mobile App Development', '2025-10-10', '2026-01-15', 'IN_PROGRESS', NOW(), NOW());

INSERT INTO tasks (name, description, priority, due_date, project_id, status, created_at, updated_at) VALUES
('Create Wireframes', 'Design UI wireframes for client approval', 'MEDIUM', '2025-10-25', 1, 'IN_PROGRESS', NOW(), NOW()),
('Setup CI/CD Pipeline', 'Configure Jenkins for automated deployment', 'HIGH', '2025-10-30', 2, 'IN_PROGRESS', NOW(), NOW()),
('Implement Login API', 'Develop secure authentication endpoints', 'HIGH', '2025-10-28', 2, 'NOT_STARTED', NOW(), NOW()),
('Database Schema Design', 'Design normalized database schema', 'HIGH', '2025-10-22', 2, 'IN_PROGRESS', NOW(), NOW()),
('Frontend Dashboard', 'Create admin dashboard with charts', 'MEDIUM', '2025-11-10', 1, 'NOT_STARTED', NOW(), NOW()),
('User Testing', 'Conduct usability testing with sample users', 'LOW', '2025-11-20', 1, 'NOT_STARTED', NOW(), NOW()),
('Push Notifications', 'Integrate Firebase push notifications', 'MEDIUM', '2025-11-15', 3, 'NOT_STARTED', NOW(), NOW()),
('Bug Fixing Sprint', 'Fix reported bugs from testing phase', 'HIGH', '2025-11-22', 1, 'IN_PROGRESS', NOW(), NOW()),
('API Documentation', 'Write OpenAPI documentation for backend', 'LOW', '2025-11-25', 2, 'IN_PROGRESS', NOW(), NOW()),
('Database Backup Automation', 'Automate nightly database backups', 'MEDIUM', '2025-11-05', 2, 'IN_PROGRESS', NOW(), NOW()),
('Integrate Payment Gateway', 'Add Stripe payment support', 'HIGH', '2025-11-18', 3, 'IN_PROGRESS', NOW(), NOW()),
('Dark Mode Feature', 'Implement dark/light theme toggle', 'LOW', '2025-11-28', 1, 'NOT_STARTED', NOW(), NOW()),
('Security Audit', 'Perform penetration testing and code review', 'HIGH', '2025-12-05', 2, 'IN_PROGRESS', NOW(), NOW()),
('Set Up Staging Server', 'Deploy staging environment for QA', 'MEDIUM', '2025-10-24', 2, 'NOT_STARTED', NOW(), NOW()),
('Add Notifications Panel', 'Show user notifications in UI', 'MEDIUM', '2025-11-30', 1, 'NOT_STARTED', NOW(), NOW()),
('Performance Optimization', 'Optimize queries and frontend load times', 'HIGH', '2025-12-10', 1, 'IN_PROGRESS', NOW(), NOW()),
('Email Integration', 'Add email alerts for project updates', 'LOW', '2025-11-25', 2, 'NOT_STARTED', NOW(), NOW()),
('Create Landing Page', 'Build marketing landing page for app', 'MEDIUM', '2025-10-31', 3, 'IN_PROGRESS', NOW(), NOW()),
('Sprint Planning', 'Plan next sprint tasks and resources', 'LOW', '2025-10-27', 1, 'NOT_STARTED', NOW(), NOW()),
('Deployment to Production', 'Go live with production release', 'HIGH', '2025-12-15', 2, 'NOT_STARTED', NOW(), NOW());

INSERT INTO employee_projects (employee_id, project_id) VALUES
(1,1),(1,2),
(2,1),(2,3),
(3,2),(3,3),
(4,1),(4,3),
(5,2),
(6,1),
(7,2),(7,3),
(8,1),
(9,3),
(10,2),(10,1);

INSERT INTO employee_tasks (employee_id, task_id) VALUES
-- Website Redesign (Project 1)
(6, 1),  -- Sarah (UI/UX) → Create Wireframes
(4, 5),  -- Emily (Frontend) → Frontend Dashboard
(6, 12), -- Sarah (UI/UX) → Dark Mode Feature
(1, 8),  -- John (PM) → Bug Fixing Sprint
(1, 19), -- John (PM) → Sprint Planning

-- Inventory Management System (Project 2)
(3, 2),  -- Robert (Backend) → Setup CI/CD Pipeline
(3, 3),  -- Robert (Backend) → Implement Login API
(10, 4), -- Olivia (DBA) → Database Schema Design
(7, 10), -- David (DevOps) → Database Backup Automation
(7, 14), -- David (DevOps) → Set Up Staging Server

-- Mobile App Development (Project 3)
(2, 7),  -- Jane (Engineer) → Push Notifications
(4, 11), -- Emily (Frontend) → Integrate Payment Gateway
(2, 18); -- Jane (Engineer) → Create Landing Page