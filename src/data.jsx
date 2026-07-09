export const categoryItem = [
  { category_title: "Todos", image: "/propiedades/unisex.jpg" },
  { category_title: "Venta", image: "/propiedades/ld3.jpg" },
  { category_title: "Alquiler", image: "/propiedades/topm2.jpg" },
];

export const productsData = [
    {
        id: 1,
        images: [
          '/propiedades/kid1.1.jpg', 
          '/propiedades/kid1.1.jpg', 
          '/propiedades/kid1.1.jpg'
        ],
        name: 'Terreno de 600 m2 en Bajo La Viña Av. Balbín al 2300',
        price: 45000,
        category: 'Venta',
        description: 'Excelente oportunidad de inversión en una de las zonas con mayor crecimiento de San Salvador de Jujuy. Terreno plano ideal para desarrollo residencial.',
        detalles: {
            tipo: 'Terreno',
            barrio: 'Bajo La Viña',
            calle: 'Av. Balbín',
            numero: '2300',
            mostrarDireccionExacta: true,
            superficie_m2: 600,
            frente_m: 15,
            fondo_m: 40,
            antiguedad: 0,
            servicios: ['Agua Potable', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: ['Cerramiento perimetral'],
            mapaQuery: 'Av. Balbín 2300, Bajo La Viña, San Salvador de Jujuy'
        }
    },
    {
        id: 2,
        images: [
          '/propiedades/topm1.jpg', 
          '/propiedades/topm1.jpg', 
          '/propiedades/topm1.jpg'
        ],
        name: 'Casa de 250 m2 en Los Perales',
        price: 135000,
        category: 'Venta',
        description: 'Hermosa propiedad de categoría distribuida en dos plantas. Zona tranquila y residencial con excelente entorno.',
        detalles: {
            tipo: 'Casa',
            barrio: 'Los Perales',
            calle: 'Los Jacarandás',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 250,
            frente_m: 10,
            fondo_m: 25,
            ambientes: 4,
            dormitorios: 3,
            banos: 2,
            antiguedad: 8,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: ['Jardín'],
            mapaQuery: 'Barrio Los Perales, San Salvador de Jujuy'
        }
    },
    {
        id: 3,
        images: [
          '/propiedades/ld1.jpg', 
          '/propiedades/ld1.jpg', 
          '/propiedades/ld1.jpg'
        ],
        name: 'Departamento de 65 m2 en Centro Patricias Argentinas al 400',
        price: 55000,
        category: 'Venta',
        description: 'Luminoso departamento céntrico ideal para estudiantes u oficinas. Cuenta con balcón al frente y bajas expensas.',
        detalles: {
            tipo: 'Departamento',
            barrio: 'Centro',
            calle: 'Patricias Argentinas',
            numero: '400',
            mostrarDireccionExacta: true,
            superficie_m2: 65,
            ambientes: 2,
            dormitorios: 1,
            banos: 1,
            antiguedad: 5,
            expensas: 12000,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Patricias Argentinas 400, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 4,
        images: [
          '/propiedades/unisex.jpg', 
          '/propiedades/unisex.jpg', 
          '/propiedades/unisex.jpg'
        ],
        name: 'Departamento de 45 m2 en Ciudad de Nieva',
        price: 350,
        category: 'Alquiler',
        description: 'Monoambiente amplio amoblado en el corazón de Ciudad de Nieva. Seguridad las 24 hs.',
        detalles: {
            tipo: 'Departamento',
            barrio: 'Ciudad de Nieva',
            calle: 'Iriarte',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 45,
            ambientes: 1,
            dormitorios: 0,
            banos: 1,
            antiguedad: 2,
            expensas: 15000,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Barrio Ciudad de Nieva, San Salvador de Jujuy'
        }
    },
    {
        id: 5,
        images: [
          '/propiedades/kid4.jpg', 
          '/propiedades/kid4.jpg', 
          '/propiedades/kid4.jpg'
        ],
        name: 'Local de 80 m2 en Centro Belgrano al 700',
        price: 850,
        category: 'Alquiler',
        description: 'Local comercial con excelente vidriera en planta baja sobre peatonal/calle de alto tránsito.',
        detalles: {
            tipo: 'Local',
            barrio: 'Centro',
            calle: 'Belgrano',
            numero: '700',
            mostrarDireccionExacta: true,
            superficie_m2: 80,
            frente_m: 5,
            fondo_m: 16,
            ambientes: 1,
            banos: 1,
            antiguedad: 12,
            expensas: 8000,
            servicios: ['Agua Potable', 'Cloaca', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Belgrano 700, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 6,
        images: [
          '/propiedades/ld3.jpg', 
          '/propiedades/ld3.jpg', 
          '/propiedades/ld3.jpg'
        ],
        name: 'Galpon de 400 m2 en Palpalá',
        price: 95000,
        category: 'Venta',
        description: 'Galpón parabólico apto para ingreso de camiones de gran porte, ideal logística o depósito industrial.',
        detalles: {
            tipo: 'Galpon',
            barrio: 'Palpalá',
            calle: 'Ruta 1',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 400,
            frente_m: 12,
            fondo_m: 33,
            antiguedad: 15,
            servicios: ['Agua Potable', 'Electricidad', 'Pavimento'],
            adicionales: ['Cerramiento perimetral'],
            mapaQuery: 'Ruta 1, Palpalá, Jujuy'
        }
    },
    {
        id: 7,
        images: [
          '/propiedades/unisex2.jpg', 
          '/propiedades/unisex2.jpg', 
          '/propiedades/unisex2.jpg'
        ],
        name: 'Oficina de 50 m2 en Centro Necochea al 300',
        price: 40000,
        category: 'Venta',
        description: 'Oficina comercial dividida con durlock, muy funcional y lista para escriturar. Edificio corporativo.',
        detalles: {
            tipo: 'Oficina',
            barrio: 'Centro',
            calle: 'Necochea',
            numero: '300',
            mostrarDireccionExacta: true,
            superficie_m2: 50,
            ambientes: 2,
            banos: 1,
            antiguedad: 20,
            expensas: 18000,
            servicios: ['Agua Potable', 'Cloaca', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Necochea 300, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 8,
        images: [
          '/propiedades/topm2.jpg', 
          '/propiedades/topm2.jpg', 
          '/propiedades/topm2.jpg'
        ],
        name: 'Cochera de 15 m2 en Centro San Martín al 1000',
        price: 15000,
        category: 'Venta',
        description: 'Cochera fija cubierta subterránea con rampa automatizada y portón eléctrico.',
        detalles: {
            tipo: 'Cochera',
            barrio: 'Centro',
            calle: 'San Martín',
            numero: '1000',
            mostrarDireccionExacta: true,
            superficie_m2: 15,
            antiguedad: 4,
            expensas: 3500,
            servicios: ['Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'San Martín 1000, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 9,
        images: [
          '/propiedades/ml3.jpg', 
          '/propiedades/ml3.jpg', 
          '/propiedades/ml3.jpg'
        ],
        name: 'Deposito de 120 m2 en Almirante Brown',
        price: 600,
        category: 'Alquiler',
        description: 'Depósito de mercaderías seguro con persiana metálica reforzada eléctrica en zona comercial.',
        detalles: {
            tipo: 'Deposito',
            barrio: 'Almirante Brown',
            calle: 'Párroco Marshke',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 120,
            antiguedad: 10,
            servicios: ['Agua Potable', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Barrio Almirante Brown, San Salvador de Jujuy'
        }
    },
    {
        id: 10,
        images: [
          '/propiedades/kid3.jpg', 
          '/propiedades/kid3.jpg', 
          '/propiedades/kid3.jpg'
        ],
        name: 'Terreno de 450 m2 en San Pablo de Reyes',
        price: 18000,
        category: 'Venta',
        description: 'Lote plano en una ubicación inmejorable rodeado de naturaleza. Ideal para casa de fin de semana.',
        detalles: {
            tipo: 'Terreno',
            barrio: 'San Pablo de Reyes',
            calle: 'Paraísos',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 450,
            frente_m: 15,
            fondo_m: 30,
            antiguedad: 0,
            servicios: ['Agua Potable', 'Electricidad'],
            adicionales: ['Cerramiento perimetral'],
            mapaQuery: 'San Pablo de Reyes, Jujuy'
        }
    },
    {
        id: 11,
        images: [
          '/propiedades/gown3.jpg', 
          '/propiedades/gown3.jpg', 
          '/propiedades/gown3.jpg'
        ],
        name: 'Casa de 180 m2 en Cuyaya José de la Iglesia al 1500',
        price: 85000,
        category: 'Venta',
        description: 'Casa familiar tradicional en excelente estado de conservación. Garage para dos vehículos.',
        detalles: {
            tipo: 'Casa',
            barrio: 'Cuyaya',
            calle: 'José de la Iglesia',
            numero: '1500',
            mostrarDireccionExacta: true,
            superficie_m2: 180,
            frente_m: 10,
            fondo_m: 18,
            ambientes: 5,
            dormitorios: 3,
            banos: 1,
            antiguedad: 25,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: ['Jardín'],
            mapaQuery: 'José de la Iglesia 1500, Cuyaya, San Salvador de Jujuy'
        }
    },
    {
        id: 12,
        images: [
          '/propiedades/tr3.jpg', 
          '/propiedades/tr3.jpg', 
          '/propiedades/tr3.jpg'
        ],
        name: 'Departamento de 75 m2 en San Pedrito',
        price: 280,
        category: 'Alquiler',
        description: 'Departamento de 2 dormitorios con placares empotrados. Muy buena ventilación e iluminación.',
        detalles: {
            tipo: 'Departamento',
            barrio: 'San Pedrito',
            calle: 'Alvear',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 75,
            ambientes: 3,
            dormitorios: 2,
            banos: 1,
            antiguedad: 6,
            expensas: 9000,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Barrio San Pedrito, San Salvador de Jujuy'
        }
    },
    {
        id: 13,
        images: [
          '/propiedades/gown4.jpg', 
          '/propiedades/gown4.jpg', 
          '/propiedades/gown4.jpg'
        ],
        name: 'Local de 150 m2 en Centro Lamadrid al 400',
        price: 180000,
        category: 'Venta',
        description: 'Propiedad comercial estratégica ideal para bancos, franquicias o laboratorios médicos de primer nivel.',
        detalles: {
            tipo: 'Local',
            barrio: 'Centro',
            calle: 'General La Madrid',
            numero: '400',
            mostrarDireccionExacta: true,
            superficie_m2: 150,
            frente_m: 7,
            fondo_m: 21,
            ambientes: 2,
            banos: 2,
            antiguedad: 18,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'General La Madrid 400, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 14,
        images: [
          '/propiedades/kid6.jpg', 
          '/propiedades/kid6.jpg', 
          '/propiedades/kid6.jpg'
        ],
        name: 'Galpon de 600 m2 en Alto Comedero',
        price: 1200,
        category: 'Alquiler',
        description: 'Tinglado techado completo a metros de la colectora de Ruta 9. Excelente conectividad logística.',
        detalles: {
            tipo: 'Galpon',
            barrio: 'Alto Comedero',
            calle: 'Av. Forestal',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 600,
            frente_m: 20,
            fondo_m: 30,
            antiguedad: 3,
            servicios: ['Agua Potable', 'Electricidad', 'Pavimento'],
            adicionales: ['Cerramiento perimetral'],
            mapaQuery: 'Barrio Alto Comedero, San Salvador de Jujuy'
        }
    },
    {
        id: 15,
        images: [
          '/propiedades/ld4.jpg', 
          '/propiedades/ld4.jpg', 
          '/propiedades/ld4.jpg'
        ],
        name: 'Oficina de 35 m2 en Centro Senador Pérez al 200',
        price: 200,
        category: 'Alquiler',
        description: 'Consultorio u oficina privada ideal profesionales independientes. Muy bajas expensas mensuales.',
        detalles: {
            tipo: 'Oficina',
            barrio: 'Centro',
            calle: 'Senador Pérez',
            numero: '200',
            mostrarDireccionExacta: true,
            superficie_m2: 35,
            ambientes: 1,
            dormitorios: 0,
            banos: 1,
            antiguedad: 10,
            expensas: 7500,
            servicios: ['Agua Potable', 'Cloaca', 'Electricidad', 'Pavimento'],
            adicionales: [],
            mapaQuery: 'Senador Pérez 200, Centro, San Salvador de Jujuy'
        }
    },
    {
        id: 16,
        images: [
          '/propiedades/ld5.jpg', 
          '/propiedades/ld5.jpg', 
          '/propiedades/ld5.jpg'
        ],
        name: 'Terreno de 800 m2 en Yala',
        price: 32000,
        category: 'Venta',
        description: 'Fracción de terreno único en la villa turística de Yala. Entorno natural consolidado de primer nivel.',
        detalles: {
            tipo: 'Terreno',
            barrio: 'Yala',
            calle: 'Camino Real',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 800,
            frente_m: 20,
            fondo_m: 40,
            antiguedad: 0,
            servicios: ['Agua Potable', 'Electricidad'],
            adicionales: ['Cerramiento perimetral'],
            mapaQuery: 'Yala, Jujuy'
        }
    },
    {
        id: 17,
        images: [
          '/propiedades/ld6.jpg', 
          '/propiedades/ld6.jpg', 
          '/propiedades/ld6.jpg'
        ],
        // Ejemplo de cómo meterías un video a futuro si querés en el array
        video: '/propiedades/recorrido_casa_17.mp4', 
        name: 'Casa de 320 m2 en Bajo La Viña',
        price: 195000,
        category: 'Venta',
        description: 'Exclusiva residencia con quincho, piscina y parque. Diseño moderno con finas terminaciones en madera.',
        detalles: {
            tipo: 'Casa',
            barrio: 'Bajo La Viña',
            calle: 'Las Viñas',
            numero: '',
            mostrarDireccionExacta: false,
            superficie_m2: 320,
            frente_m: 12,
            fondo_m: 26,
            ambientes: 6,
            dormitorios: 4,
            banos: 3,
            antiguedad: 4,
            servicios: ['Agua Potable', 'Cloaca', 'Gas Natural', 'Electricidad', 'Pavimento'],
            adicionales: ['Jardín', 'Cerramiento perimetral'],
            mapaQuery: 'Barrio Bajo La Viña, San Salvador de Jujuy'
        }
    },
]