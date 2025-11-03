<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Project for APPLICATION DEVELOPMENT 2</title>
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
        <h2>Project Dashboard</h2>
        <nav>
          <button type="button" data-page="/employees">Employees</button>
          <button type="button" data-page="/projects">Projects</button>
          <button type="button" data-page="/tasks">Tasks</button>
        </nav>
      </aside>
      <main class="content">
        <div class="home-container">
          <h1>Welcome to Project Management System, Project for APPLICATION DEVELOPMENT 2.</h1>
          <section class="project-info">
            <h2>About This Project</h2>
            <p>
              This system demonstrates project management functionality, including managing employees, projects, and tasks. It is developed as part of the Application Development 2 course requirements.
            </p>
          </section>
        </div>
      </main>
    </div>
    <script src="main.js"></script>
  </body>
</html>
