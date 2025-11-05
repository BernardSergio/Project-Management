<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>St. Therese School - Project Management System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,900;1,400&display=swap"
      rel="stylesheet"
    />
    <script
      src="https://kit.fontawesome.com/b1f55e06c6.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="school-header">
          <div class="school-icon">
            <!-- Replace this div with your actual logo -->
            <img src="st-therese-logo.png" alt="St. Therese School Logo" class="logo-img" />
          </div>
          <h2>St. Therese School</h2>
          <p class="tagline">Project Management Portal</p>
        </div>
        <nav>
          <button type="button" data-page="/employees">
            <i class="fas fa-users"></i>
            <span>Staff Directory</span>
          </button>
          <button type="button" data-page="/projects">
            <i class="fas fa-folder-open"></i>
            <span>School Projects</span>
          </button>
          <button type="button" data-page="/tasks">
            <i class="fas fa-tasks"></i>
            <span>Task Manager</span>
          </button>
        </nav>
      </aside>
      <main class="content">
        <div class="home-container">
          <div class="welcome-banner">
            <h1>Welcome to St. Therese School</h1>
            <p class="subtitle">Project Management & Coordination System</p>
          </div>

          <section class="project-info">
            <div class="info-card">
              <div class="card-icon">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <h2>Streamlined Project Management</h2>
              <p>
                This comprehensive system empowers St. Therese School to efficiently manage
                school projects, coordinate staff assignments, and track task progress.
                Designed specifically for educational institutions, it brings organization
                and clarity to collaborative initiatives.
              </p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <i class="fas fa-users-cog"></i>
              </div>
              <h2>Staff & Resource Coordination</h2>
              <p>
                Easily manage staff members, assign responsibilities, and monitor project
                participation. Our intuitive interface ensures that every team member knows
                their role and can contribute effectively to school initiatives.
              </p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h2>Track Progress & Success</h2>
              <p>
                Monitor project milestones, task completion rates, and team performance
                in real-time. Make informed decisions with clear visibility into all
                ongoing school projects and activities.
              </p>
            </div>
          </section>

          <footer class="home-footer">
            <p>Developed for Application Development 2</p>
            <p class="copyright">&copy; 2025 St. Therese School. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
    <script src="main.js"></script>
  </body>
</html>