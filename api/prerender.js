export default async function handler(req, res) {
  try {
    const path = req.query.path || '';
    
    // Evitamos problemas de dobles barras '/' en la URL de destino
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const targetUrl = `https://soniaflores.vercel.app${cleanPath}`;
    const prerenderUrl = `https://service.prerender.io/${targetUrl}`;

    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'UVfJloBF0H6yuWkL2pYu'
      }
    });

    // Copiar headers de Prerender de forma segura
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Excluimos content-length y content-encoding para evitar conflictos de compresión
      if (lowerKey !== 'content-length' && lowerKey !== 'content-encoding') {
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