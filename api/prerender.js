export default async function handler(req, res) {
  try {
    const path = req.query.path || '';
    const targetUrl = `https://soniaflores.vercel.app${path.startsWith('/') ? path : '/' + path}`;
    const prerenderUrl = `https://service.prerender.io/${targetUrl}`;

    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'UVfJloBF0H6yuWkL2pYu'
      }
    });

    // Copiar headers de Prerender
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-length') {
        res.setHeader(key, value);
      }
    });

    const html = await response.text();
    res.status(response.status).send(html);

  } catch (error) {
    console.error('Prerender Error:', error);
    res.status(500).send('Error en prerender proxy');
  }
}