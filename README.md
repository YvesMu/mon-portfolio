<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>VueJS - Airtable Integration</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="readme-container">
    <h1>🎨 Projet VueJS - Airtable Integration</h1>
    <p>Bienvenue dans le projet <strong>VueJS - Airtable Integration</strong> !<br>
    Ce projet propose une interface moderne et responsive pour consulter des projets étudiants directement depuis une base de données <strong>Airtable</strong>.</p>

    <h2>📋 Description</h2>
    <ul>
      <li>🔄 Récupération dynamique des projets publiés depuis Airtable</li>
      <li>👀 Affichage dans une interface Vue 3 moderne</li>
      <li>❤️ Fonction like sur chaque projet</li>
      <li>🔍 Recherche par technologies</li>
    </ul>

    <h2>🚀 Fonctionnalités</h2>
    <ul>
      <li>✅ Affichage dynamique</li>
      <li>🔎 Recherche par techno</li>
      <li>👍 Like</li>
      <li>📱 Responsive</li>
    </ul>

    <h2>📦 Prérequis</h2>
    <ul>
      <li>Node.js (LTS)</li>
      <li>npm</li>
      <li>Compte Airtable + API key</li>
      <li>Compte GitHub</li>
    </ul>

    <h2>🛠️ Installation</h2>
    <pre><code>git clone https://github.com/YvesMu/Projet_airtable_MUYves.git
cd Projet_airtable_MUYves
npm install</code></pre>

    <h2>🔐 Fichier .env</h2>
    <pre><code>VITE_AIRTABLE_BASE=app744Lf8ON85OjM9
VITE_AIRTABLE_API_KEY=patGCBLW3jHuNnMgX.3d5d1367a0bea724a20b2d9e4195f059a9fc96697f3f16f9a5d755364c3cbe72</code></pre>

    <h2>▶️ Lancer en local</h2>
    <pre><code>npm run dev</code></pre>

    <h2>📂 Structure</h2>
    <pre><code>├── src/
│   ├── components/
│   ├── views/
│   ├── api/
│   └── App.vue
├── .env
├── package.json
├── vite.config.js</code></pre>

    <h2>🤝 Contribuer</h2>
    <p>Fork, pull request, issues bienvenus ✨</p>

    <h2>📄 Licence</h2>
    <p>Open-source à but éducatif.</p>
  </div>
</body>
</html>
<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f9f9fb;
  color: #333;
  padding: 2rem;
}

.readme-container {
  background: white;
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

h1, h2 {
  color: #2c3e50;
}

ul {
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.5rem;
}

pre {
  background: #eee;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: monospace;
}

code {
  font-size: 0.95rem;
}
</style>
