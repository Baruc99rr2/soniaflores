export default async function handler(req, res) {
  // Obtenemos la ruta que el bot quería visitar (ej: /propiedades/1)
  const path = req.query.path || '';
  const targetUrl = `https://soniaflores.vercel.app/${path}`;
  const prerenderUrl = `https://service.prerender.io/${targetUrl}`;

  try {
    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'UVfJloBF0H6yuWkL2pYu' // Tu token real
      }
    });

    // Copiamos las cabeceras que nos devuelve Prerender (incluyendo x-prerender-request-id)
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const html = await response.text();
    res.status(response.status).send(html);
  } catch (error) {
    // Si algo falla, dejamos que cargue por defecto
    res.status(500).send(error.message);
  }
}