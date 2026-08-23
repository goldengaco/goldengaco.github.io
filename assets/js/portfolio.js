/**
 * Carlos García - Professional Portfolio
 * Core Interactive Features & Terminal Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initInteractiveTerminal();
  initSkillsFilter();
  initProjectsFilter();
  initCopyEmail();
  initServiceWorker();
});

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        console.log('🚀 PWA Service Worker registrado con éxito:', reg.scope);
      }).catch((err) => {
        console.log('Service Worker no registrado:', err);
      });
    });
  }
}

/* ==========================================================================
   1. Navbar & Mobile Menu Handling
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksArr = document.querySelectorAll('.nav-link');

  // Scroll effect for navbar background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking a link
    navLinksArr.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active section scroll spy
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id], article[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksArr.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Dynamic Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingRole');
  if (!typingElement) return;

  const roles = [
    'Administrador de Servidores (Linux & Windows)',
    'Administrador de Bases de Datos (DBA Enterprise)',
    'Cloud & Infrastructure Engineer (GCP & MuleSoft)',
    'DevSecOps & Automatización (Bash, Python & Rust)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Interactive CLI Terminal Sandbox
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const quickButtons = document.querySelectorAll('.terminal-quick-btn');

  if (!terminalInput || !terminalBody) return;

  const terminalCommands = {
    help: () => `
<div class="terminal-line"><span style="color: #00e5ff;">Comandos disponibles:</span></div>
<div class="terminal-line">  <span style="color: #10b981;">about</span>       - Resumen del perfil profesional</div>
<div class="terminal-line">  <span style="color: #10b981;">skills</span>      - Stack tecnológico y especialidades</div>
<div class="terminal-line">  <span style="color: #10b981;">projects</span>    - Proyectos destacados y herramientas</div>
<div class="terminal-line">  <span style="color: #10b981;">experience</span>  - Trayectoria y responsabilidades clave</div>
<div class="terminal-line">  <span style="color: #10b981;">contact</span>     - Canales de contacto y redes</div>
<div class="terminal-line">  <span style="color: #10b981;">uptime</span>      - Estado del servidor y métricas</div>
<div class="terminal-line">  <span style="color: #10b981;">clear</span>       - Limpiar la consola</div>`,

    whoami: () => `
<div class="terminal-line"><span style="color: #38bdf8; font-weight: bold;">Carlos Javier García Contreras</span></div>
<div class="terminal-line">Especialista en Infraestructura Crítica, Administración de Servidores Linux/Windows, DBA Multi-motor (PostgreSQL, SQL Server, MySQL, Informix, Netezza) y Automatización Avanzada.</div>
<div class="terminal-line">Enfocado en alta disponibilidad (HA), DRP, optimización de rendimiento y arquitectura Cloud/MuleSoft.</div>`,

    about: () => terminalCommands.whoami(),

    skills: () => `
<div class="terminal-line"><span style="color: #00e5ff;">=== STACK TÉCNICO COMPLETO ===</span></div>
<div class="terminal-line"><span style="color: #38bdf8;">[Bases de Datos & DWH]:</span> PostgreSQL, MS SQL Server, IBM Informix, IBM Netezza, Yellowbrick Data Warehouse, MongoDB, MySQL, MariaDB, SQLite, DuckDB.</div>
<div class="terminal-line"><span style="color: #38bdf8;">[Servidores, Cloud & SO]:</span> Linux (RHEL, CentOS, Fedora, Debian, Ubuntu, Slackware, Pop!_OS), Windows Server, GCP, AWS (EC2/S3/Logs), Docker.</div>
<div class="terminal-line"><span style="color: #38bdf8;">[Middleware]:</span> JBoss EAP, JBoss Fuse, Apache Tomcat, Nginx, Apache HTTP, MuleSoft Runtime & CloudHub.</div>
<div class="terminal-line"><span style="color: #38bdf8;">[Monitoreo & APM]:</span> Zabbix, Nagios, Icinga, Datadog, AppDynamics, Dynatrace.</div>
<div class="terminal-line"><span style="color: #38bdf8;">[Lenguajes & Dev]:</span> Bash, PowerShell, Python (FastAPI/ETL), Rust, Go (Golang), JavaScript.</div>`,

    projects: () => `
<div class="terminal-line"><span style="color: #00e5ff;">=== PROYECTOS DESTACADOS ===</span></div>
<div class="terminal-line">1. <span style="color: #34d399; font-weight: bold;">MuleRadarVcore</span>: Radar forense de vCores, capacidad y FinOps en MuleSoft.</div>
<div class="terminal-line">2. <span style="color: #34d399; font-weight: bold;">GCP Security Hardening Suite</span>: 33 checklists de auditoría y scripts de aseguramiento de infraestructura.</div>
<div class="terminal-line">3. <span style="color: #34d399; font-weight: bold;">DBA Multi-Engine Migration & Tuning</span>: Optimización de queries, índices y migración entre motores heterogéneos.</div>
<div class="terminal-line">4. <span style="color: #34d399; font-weight: bold;">MarketRadar & VivyDisk</span>: Analizadores de alto rendimiento con Rust y DuckDB.</div>
<div class="terminal-line"><em>Usa el selector visual abajo para explorar detalles completos.</em></div>`,

    experience: () => `
<div class="terminal-line"><span style="color: #00e5ff;">=== TRAYECTORIA PROFESIONAL ===</span></div>
<div class="terminal-line">• <span style="color: #38bdf8;">Administrador de Servidores & DBA:</span> Operación de ambientes Productivos, DRP, QA y Desarrollo.</div>
<div class="terminal-line">• <span style="color: #38bdf8;">Gestión de Middleware:</span> Nginx, Apache, Tomcat, JBoss Fuse y MuleSoft Runtime.</div>
<div class="terminal-line">• <span style="color: #38bdf8;">Automatización:</span> Creación de pipelines y scripts bash/ps1 para tareas repetitivas y monitoreo.</div>
<div class="terminal-line">• <span style="color: #38bdf8;">Bases de Datos:</span> Mantenimiento, backup/recovery, tuning de índices y replicación.</div>`,

    contact: () => `
<div class="terminal-line"><span style="color: #00e5ff;">=== INFORMACIÓN DE CONTACTO ===</span></div>
<div class="terminal-line">Email:    <a href="mailto:carlosjgarciac@gmail.com" style="color: #38bdf8; text-decoration: underline;">carlosjgarciac@gmail.com</a></div>
<div class="terminal-line">LinkedIn: <a href="https://www.linkedin.com/in/carlosjgarciac" target="_blank" style="color: #38bdf8; text-decoration: underline;">linkedin.com/in/carlosjgarciac</a></div>
<div class="terminal-line">GitHub:   <a href="https://github.com/goldengaco" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/goldengaco</a></div>`,

    uptime: () => `
<div class="terminal-line"><span style="color: #10b981;">● node-sysadmin-prod.carlos.local</span></div>
<div class="terminal-line">Uptime: 247 days, 14 hours, 32 mins</div>
<div class="terminal-line">Load average: 0.12, 0.08, 0.05</div>
<div class="terminal-line">Memory: 4.2 GiB / 32 GiB (13% utilized)</div>
<div class="terminal-line">Status: <span style="color: #10b981; font-weight: bold;">ALL SYSTEMS OPERATIONAL (99.99%)</span></div>`,

    certs: () => `
<div class="terminal-line"><span style="color: #00e5ff;">=== CERTIFICACIONES & CREDENCIALES VERIFICADAS ===</span></div>
<div class="terminal-line">1. <span style="color: #38bdf8; font-weight: bold;">Google Cloud Platform (GCP)</span>: Desarrollo y Despliegue en la Nube (Platzi Verificado).</div>
<div class="terminal-line">2. <span style="color: #38bdf8; font-weight: bold;">AWS IAM & Cloud Computing</span>: Roles, Seguridad y Políticas de Acceso (Platzi Verificado).</div>
<div class="terminal-line">3. <span style="color: #38bdf8; font-weight: bold;">Linux Servidores</span>: Administración de Servidores Linux & Manejo de Recursos (Platzi Verificado).</div>
<div class="terminal-line">4. <span style="color: #38bdf8; font-weight: bold;">Git & GitHub</span>: Flujos Profesionales de Control de Versiones & CI/CD (Platzi Verificado).</div>
<div class="terminal-line">5. <span style="color: #38bdf8; font-weight: bold;">PostgreSQL Enterprise DBA</span>: Query Tuning, Replicación Streaming y DRP.</div>
<div class="terminal-line">6. <span style="color: #38bdf8; font-weight: bold;">MuleSoft Anypoint Platform</span>: CloudHub Operations & FinOps vCores.</div>
<div class="terminal-line"><em>Visita la sección de Certificaciones en la página para enlaces directos a las credenciales oficiales.</em></div>`,

    certificaciones: () => terminalCommands.certs(),

    uname: () => `<div class="terminal-line"><span style="color: #38bdf8;">Linux devops-node 7.2.2-hardened #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span></div>`,
    
    'uname -a': () => terminalCommands.uname(),

    sudo: () => `<div class="terminal-line" style="color: #f43f5e;">carlos is already in sudoers file. Incident reported to Santa Claus 🎅.</div>`,
    
    clear: () => {
      const outputContainer = document.getElementById('terminalOutput');
      if (outputContainer) outputContainer.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const outputContainer = document.getElementById('terminalOutput');
    if (!outputContainer) return;

    // Echo user command
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'terminal-line';
    cmdEcho.innerHTML = `<span class="terminal-prompt">carlos@devops-node:~$</span> <span style="color: #f8fafc;">${escapeHTML(rawCmd)}</span>`;
    outputContainer.appendChild(cmdEcho);

    // Run command handler
    if (cmd === 'clear') {
      terminalCommands.clear();
    } else if (terminalCommands[cmd]) {
      const resultHTML = terminalCommands[cmd]();
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = resultHTML;
      outputContainer.appendChild(resultDiv);
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'terminal-line';
      errorDiv.innerHTML = `<span style="color: #f8fafc;">bash: ${escapeHTML(cmd)}: command not found. Escribe <span style="color: #00e5ff; font-weight: bold;">help</span> para ver los comandos disponibles.</span>`;
      outputContainer.appendChild(errorDiv);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value;
      terminalInput.value = '';
      executeCommand(command);
    }
  });

  // Quick Action Buttons
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
        terminalInput.focus();
      }
    });
  });

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
}

/* ==========================================================================
   4. Skills Category Tabs Filter
   ========================================================================== */
function initSkillsFilter() {
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Projects Category Filter
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Copy Email to Clipboard & Toast Alert
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'carlosjgarciac@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast();
    }).catch(() => {
      // Fallback
      prompt("Copia el correo electrónico:", email);
    });
  });

  function showToast() {
    if (!copyToast) return;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 3000);
  }
}
