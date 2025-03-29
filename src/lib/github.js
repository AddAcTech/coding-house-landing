// En un entorno real, esto se conectaría a la API de GitHub
export async function fetchGithubCommits() {
  // Simular un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Datos de ejemplo
  return [
    {
      id: "c1",
      commit: {
        message:
          "Implementación de autenticación biométrica para acceso seguro",
        author: {
          date: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
        },
      },
      author: {
        login: "cyberdev42",
        avatar_url: "https://i.pravatar.cc/150?img=1",
      },
      branch: "feature/auth",
      isNew: false,
    },
    {
      id: "c2",
      commit: {
        message:
          "Optimización de algoritmos de encriptación para mejorar rendimiento",
        author: {
          date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
        },
      },
      author: {
        login: "hackmaster",
        avatar_url: "https://i.pravatar.cc/150?img=2",
      },
      branch: "main",
      isNew: false,
    },
    {
      id: "c3",
      commit: {
        message: "Corrección de vulnerabilidad en el módulo de comunicación",
        author: {
          date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
        },
      },
      author: {
        login: "securityninja",
        avatar_url: "https://i.pravatar.cc/150?img=3",
      },
      branch: "hotfix/security",
      isNew: false,
    },
    {
      id: "c4",
      commit: {
        message: "Integración de nuevo sistema de análisis predictivo",
        author: {
          date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 horas atrás
        },
      },
      author: {
        login: "datamaster",
        avatar_url: "https://i.pravatar.cc/150?img=4",
      },
      branch: "feature/analytics",
      isNew: false,
    },
    {
      id: "c5",
      commit: {
        message: "Actualización de dependencias y librerías de seguridad",
        author: {
          date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 día atrás
        },
      },
      author: {
        login: "devops_guru",
        avatar_url: "https://i.pravatar.cc/150?img=5",
      },
      branch: "main",
      isNew: false,
    },
  ];
}
