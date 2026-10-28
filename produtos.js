// Lista de produtos do catálogo. O campo "id" não pode mudar nunca (os links de orçamento usam ele).
// Produtos novos recebem o próximo número livre.
window.PRODUTOS = [
 {
  "id": 2,
  "codigo": "caixa_luminaria",
  "nome": "Caixa Luminária MDF Led Presente Criativo Namoro Proposta Cubo Box",
  "nomeCompleto": "Caixa Luminária MDF Led Presente Criativo Namoro Proposta Cubo Box Lightbox Abajur Casal Namorados",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/caixa_luminaria.jpg"
 },
 {
  "id": 4,
  "codigo": "enfeite_de_maternidade",
  "nome": "Enfeite De Maternidade Nuvem Com Nome Bebê Led Porta Maternidade",
  "nomeCompleto": "Enfeite De Maternidade Nuvem Com Nome Bebê Led Porta Maternidade",
  "categoria": "Maternidade",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/enfeite_de_maternidade.jpg"
 },
 {
  "id": 5,
  "codigo": "escultura",
  "nome": "Escultura Decorativa de Parede em Metal Folhas Ginkgo",
  "nomeCompleto": "Escultura Decorativa de Parede em Metal Folhas Ginkgo – Jardim Coberto, Varanda e Sala",
  "categoria": "Esculturas",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/escultura.jpg"
 },
 {
  "id": 6,
  "codigo": "frase_de_parede",
  "nome": "Frase de Parede Seja Forte e Corajosa Decorativo Casa Sala + Coração",
  "nomeCompleto": "Frase de Parede Seja Forte e Corajosa Decorativo Casa Sala + Coração Geometrico Mdf Cabeceira",
  "categoria": "Placas e frases",
  "personalizavel": false,
  "medidas": null,
  "foto": "fotos/frase_de_parede.jpg"
 },
 {
  "id": 7,
  "codigo": "kit_3_lum",
  "nome": "Kit 3 Luminária Nuvem Led Quarto Infantil Neném Mdf 3mm 30*20 CADA",
  "nomeCompleto": "Kit 3 Luminária Nuvem Led Quarto Infantil Neném Mdf 3mm 30*20 CADA",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "30 x 20 cm cada",
  "foto": "fotos/kit_3_lum.jpg"
 },
 {
  "id": 22,
  "codigo": "luminaria_borboleta_1",
  "nome": "Kit 3 Luminárias Borboleta em MDF com LED",
  "nomeCompleto": "Kit 3 Luminárias Borboleta em MDF com LED – Decoração Infantil Parede Quarto Sala 25x17",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "25 x 17 cm",
  "foto": "fotos/luminaria_borboleta_1.jpg"
 },
 {
  "id": 8,
  "codigo": "kit_3_luminarias_safari",
  "nome": "Kit 3 Luminárias Infantil Safari MDF LED",
  "nomeCompleto": "Kit 3 Luminárias Infantil Safari MDF LED – Leão, Girafa e Elefante | 32x20cm cada",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "32 x 20 cm cada",
  "foto": "fotos/kit_3_luminarias_safari.jpg"
 },
 {
  "id": 9,
  "codigo": "kit_3_luminarias_sem_fio",
  "nome": "KIT 3 Luminárias Sem Fio Lua/Estrela/Nuvem MDF LED Branco Frio",
  "nomeCompleto": "KIT 3 Luminárias Sem Fio Lua/Estrela/Nuvem MDF LED Branco Frio",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_3_luminarias_sem_fio.jpg"
 },
 {
  "id": 10,
  "codigo": "kit_3_prateleiras",
  "nome": "Kit 3 Prateleiras Dinossauro MDF Infantil",
  "nomeCompleto": "Kit 3 Prateleiras Dinossauro MDF Infantil – Decoração Quarto Bebê/Menino/Menina",
  "categoria": "Prateleiras",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_3_prateleiras.jpg"
 },
 {
  "id": 11,
  "codigo": "kit_3_prateleiras_safari_infantil",
  "nome": "Kit 3 Prateleiras Safari Infantil MDF Laminado Organização Quarto Bebê",
  "nomeCompleto": "Kit 3 Prateleiras Safari Infantil MDF Laminado Organização Quarto Bebê",
  "categoria": "Prateleiras",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_3_prateleiras_safari_infantil.jpg"
 },
 {
  "id": 12,
  "codigo": "kit_3_quadros_vazados",
  "nome": "Kit 3 Quadros Vazados Cactos Decoração Quarto Sala Mdf 3mm Preto",
  "nomeCompleto": "Kit 3 Quadros Vazados Cactos Decoração Quarto Sala Mdf 3mm Preto C/Dupla Face 45*25",
  "categoria": "Quadros",
  "personalizavel": true,
  "medidas": "45 x 25 cm",
  "foto": "fotos/kit_3_quadros_vazados.jpg"
 },
 {
  "id": 13,
  "codigo": "kit_com_2",
  "nome": "Kit Com 2 Luminária Decorativa Lua e Estrela 50x26cm",
  "nomeCompleto": "Kit Com 2 Luminária Decorativa Lua e Estrela 50x26cm – Luz LED Quente Infantil",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "50 x 26 cm",
  "foto": "fotos/kit_com_2.jpg"
 },
 {
  "id": 14,
  "codigo": "kit_com_2_quadros",
  "nome": "KIT COM 2 Quadros Geométricos Vazados Mdf Preto 45x60cm",
  "nomeCompleto": "KIT COM 2 Quadros Geométricos Vazados Mdf Preto 45x60cm",
  "categoria": "Quadros",
  "personalizavel": true,
  "medidas": "45 x 60 cm",
  "foto": "fotos/kit_com_2_quadros.jpg"
 },
 {
  "id": 15,
  "codigo": "kit_com_3",
  "nome": "KIT COM 3",
  "nomeCompleto": "KIT COM 3 - Luminárias Infantil Balão e Nuvens em MDF com LED – Criativa para Quarto de Criança",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_com_3.jpg"
 },
 {
  "id": 3,
  "codigo": "castelo",
  "nome": "KIT COM 3 Luminárias Decorativas Infantil Castelo Coroa Carruagem",
  "nomeCompleto": "KIT COM 3 Luminárias Decorativas Infantil Castelo Coroa Carruagem – MDF 3mm",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/castelo.jpg"
 },
 {
  "id": 21,
  "codigo": "luminaria_bichos",
  "nome": "KIT COM 3 LUMINÁRIAS Decorativas Infantil MDF 60x20 com Luz LED",
  "nomeCompleto": "KIT COM 3 LUMINÁRIAS Decorativas Infantil MDF 60x20 com Luz LED – Animais Fofos, Quarto de Criança",
  "categoria": "Luminárias",
  "personalizavel": false,
  "medidas": "Kit 60 x 20 cm (peça compacta 20 x 20 cm)",
  "foto": "fotos/luminaria_bichos.jpg"
 },
 {
  "id": 24,
  "codigo": "luminaria_dinossauro",
  "nome": "KIT COM 3 LUMINÁRIAS Dinossauros com Iluminação LED",
  "nomeCompleto": "KIT COM 3 LUMINÁRIAS Dinossauros com Iluminação LED – 60x18 cm – Infantil",
  "categoria": "Luminárias",
  "personalizavel": false,
  "medidas": "60 x 18 cm",
  "foto": "fotos/luminaria_dinossauro.jpg"
 },
 {
  "id": 16,
  "codigo": "kit_com_3_quadros",
  "nome": "KIT COM 3 Quadro Vazado Balões Decorativos Infantil MDF 3mm CRU",
  "nomeCompleto": "KIT COM 3 Quadro Vazado Balões Decorativos Infantil MDF 3mm CRU",
  "categoria": "Quadros",
  "personalizavel": false,
  "medidas": "Balão grande 35 x 25,5 cm; médio 25 x 19 cm; pequeno 18,5 x 14 cm",
  "foto": "fotos/kit_com_3_quadros.jpg"
 },
 {
  "id": 41,
  "codigo": "vazado_folhas",
  "nome": "KIT COM 3 QUADROS Vazado Folhas Decoração Quarto Sala Mdf 3mm Preto",
  "nomeCompleto": "KIT COM 3 QUADROS Vazado Folhas Decoração Quarto Sala Mdf 3mm Preto 60X30",
  "categoria": "Quadros",
  "personalizavel": false,
  "medidas": "60 x 30 cm cada quadro",
  "foto": "fotos/vazado_folhas.jpg"
 },
 {
  "id": 17,
  "codigo": "kit_com_4_quadros",
  "nome": "KIT COM 4 Quadros Decorativos MDF Branco DE TRANSPORTES (CARRO, AVIÃO E",
  "nomeCompleto": "KIT COM 4 Quadros Decorativos MDF Branco DE TRANSPORTES (CARRO, AVIÃO E BARCO)",
  "categoria": "Quadros",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_com_4_quadros.jpg"
 },
 {
  "id": 20,
  "codigo": "lembrancinha_casamento",
  "nome": "KIT COM 50 Lembrancinhas Personalizadas Casamento e Noivado MDF Branco",
  "nomeCompleto": "KIT COM 50 Lembrancinhas Personalizadas Casamento e Noivado MDF Branco",
  "categoria": "Lembrancinhas",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/lembrancinha_casamento.jpg"
 },
 {
  "id": 18,
  "codigo": "kit_de_luminarias",
  "nome": "Kit de luminárias 2 Balão e 3 Nuvens Decorativas em MDF com LED",
  "nomeCompleto": "Kit de luminárias 2 Balão e 3 Nuvens Decorativas em MDF com LED – Quarto Infantil Bebê",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "Balões G 40 x 26 cm, M 28 x 18 cm; nuvens G 40 x 25 cm, M 33 x 20 cm, P 25 x 17 cm",
  "foto": "fotos/kit_de_luminarias.jpg"
 },
 {
  "id": 19,
  "codigo": "kit_luminaria_led_1",
  "nome": "Kit Luminária LED Quarto Bebê Avião e Nuvens MDF Decoração Completa 5",
  "nomeCompleto": "Kit Luminária LED Quarto Bebê Avião e Nuvens MDF Decoração Completa 5 Peças Luz Quente",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/kit_luminaria_led_1.jpg"
 },
 {
  "id": 1,
  "codigo": "LUMINARIA_BORBOLETA",
  "nome": "Luminária Borboleta MDF Personalizada com Nome Infantil",
  "nomeCompleto": "Luminária Borboleta MDF Personalizada com Nome Infantil – Decor Quarto Bebê",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/LUMINARIA_BORBOLETA.jpg"
 },
 {
  "id": 23,
  "codigo": "luminaria_decorativa_borboleta",
  "nome": "Luminária Decorativa Borboleta com Nome Personalizado em MDF com LED +",
  "nomeCompleto": "Luminária Decorativa Borboleta com Nome Personalizado em MDF com LED + Flores – Quarto Infantil",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/luminaria_decorativa_borboleta.jpg"
 },
 {
  "id": 27,
  "codigo": "luminaria_infantil",
  "nome": "Luminária Infantil Astronauta Foguete MDF com LED 30x40cm",
  "nomeCompleto": "Luminária Infantil Astronauta Foguete MDF com LED 30x40cm – Quarto Bebê e Criança, Decoração Parede",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "30 x 40 cm",
  "foto": "fotos/luminaria_infantil.jpg"
 },
 {
  "id": 25,
  "codigo": "luminaria_dinossauro_com_nome_personalizado",
  "nome": "Luminária Infantil Dinossauros com Nome Personalizado em MDF com LED",
  "nomeCompleto": "Luminária Infantil Dinossauros com Nome Personalizado em MDF com LED - Quarto Menino 50*20",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "50 x 20 cm",
  "foto": "fotos/luminaria_dinossauro_com_nome_personalizado.jpg"
 },
 {
  "id": 32,
  "codigo": "luminaria_timao_nautico",
  "nome": "Luminária Infantil Timão Náutico em MDF 33cm",
  "nomeCompleto": "Luminária Infantil Timão Náutico em MDF 33cm – Decoração Marítima com LED para Quarto",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "33 cm",
  "foto": "fotos/luminaria_timao_nautico.jpg"
 },
 {
  "id": 26,
  "codigo": "luminaria_goleiro",
  "nome": "Luminária LED Goleiro Personalizada Com Nome Enfeite de Parede Camisa e",
  "nomeCompleto": "Luminária LED Goleiro Personalizada Com Nome Enfeite de Parede Camisa e Luva 40cm",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "40 cm",
  "foto": "fotos/luminaria_goleiro.jpg"
 },
 {
  "id": 28,
  "codigo": "luminaria_mdf",
  "nome": "Luminária MDF Personalizada 12x9cm Presente Casal Com Frase e Iniciais",
  "nomeCompleto": "Luminária MDF Personalizada 12x9cm Presente Casal Com Frase e Iniciais Decoração Quarto Namorados",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "12 x 9 cm",
  "foto": "fotos/luminaria_mdf.jpg"
 },
 {
  "id": 29,
  "codigo": "luminaria_nossa_senhora",
  "nome": "Luminária Nossa Senhora Aparecida MDF com LED e Oração Ave Maria",
  "nomeCompleto": "Luminária Nossa Senhora Aparecida MDF com LED e Oração Ave Maria – Decoração Religiosa Parede 30cm",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "30 cm",
  "foto": "fotos/luminaria_nossa_senhora.jpg"
 },
 {
  "id": 30,
  "codigo": "luminaria_nuvem",
  "nome": "Luminária Nuvem Futebol Personalizada LED MDF Infantil Decoração Quarto",
  "nomeCompleto": "Luminária Nuvem Futebol Personalizada LED MDF Infantil Decoração Quarto Menino",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/luminaria_nuvem.jpg"
 },
 {
  "id": 31,
  "codigo": "luminaria_sagrada_famlia",
  "nome": "Luminária Sagrada Família em MDF Decorativa",
  "nomeCompleto": "Luminária Sagrada Família em MDF Decorativa | Luz LED | Decoração Religiosa Personalizada",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/luminaria_sagrada_famlia.jpg"
 },
 {
  "id": 33,
  "codigo": "nuvem_com_led",
  "nome": "Nuvem Com Led E Nome Do Bebe Enfeite porta de maternidade e quarto bebe",
  "nomeCompleto": "Nuvem Com Led E Nome Do Bebe Enfeite porta de maternidade e quarto bebe",
  "categoria": "Maternidade",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/nuvem_com_led.jpg"
 },
 {
  "id": 35,
  "codigo": "placa_decorativa",
  "nome": "Placa Decorativa Frase: \"Para todo o sempre!\" com Coração Decoração de",
  "nomeCompleto": "Placa Decorativa Frase: \"Para todo o sempre!\" com Coração Decoração de Ambientes",
  "categoria": "Placas e frases",
  "personalizavel": false,
  "medidas": null,
  "foto": "fotos/placa_decorativa.jpg"
 },
 {
  "id": 36,
  "codigo": "placa_nome_personalizado",
  "nome": "Placa Nome Personalizado em MDF",
  "nomeCompleto": "Placa Nome Personalizado em MDF – Letreiro Decorativo Parede Quarto Infantil",
  "categoria": "Placas e frases",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/placa_nome_personalizado.jpg"
 },
 {
  "id": 37,
  "codigo": "prateleira_luminaria_borboleta",
  "nome": "Prateleira Luminária Borboleta em MDF com Iluminação LED",
  "nomeCompleto": "Prateleira Luminária Borboleta em MDF com Iluminação LED – Decoração Quarto Infantil",
  "categoria": "Prateleiras",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/prateleira_luminaria_borboleta.jpg"
 },
 {
  "id": 38,
  "codigo": "quadro_decorativo",
  "nome": "Quadro Decorativo Dama e o Cavalo em MDF 3mm Preto Fosco 42cm x 40cm",
  "nomeCompleto": "Quadro Decorativo Dama e o Cavalo em MDF 3mm Preto Fosco 42cm x 40cm",
  "categoria": "Quadros",
  "personalizavel": true,
  "medidas": "42 x 40 cm",
  "foto": "fotos/quadro_decorativo.jpg"
 },
 {
  "id": 34,
  "codigo": "pai_nosso",
  "nome": "Quadro Pai Nosso em MDF Preto",
  "nomeCompleto": "Quadro Pai Nosso em MDF Preto – Decorativo Parede Sala Quarto Escritório Religioso Moderno",
  "categoria": "Quadros",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/pai_nosso.jpg"
 },
 {
  "id": 39,
  "codigo": "regua_de_crescimento",
  "nome": "Régua de Crescimento Infantil Girafa em MDF Decoração e Medição de",
  "nomeCompleto": "Régua de Crescimento Infantil Girafa em MDF Decoração e Medição de Altura",
  "categoria": "Decoração infantil",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/regua_de_crescimento.jpg"
 },
 {
  "id": 40,
  "codigo": "trio_quadros",
  "nome": "Trio Quadros Caminhonete Carro Chevy 3D decoração MDF 3mm",
  "nomeCompleto": "Trio Quadros Caminhonete Carro Chevy 3D decoração MDF 3mm",
  "categoria": "Quadros",
  "personalizavel": false,
  "medidas": null,
  "foto": "fotos/trio_quadros.jpg"
 },
 {
  "id": 42,
  "codigo": "cod1_ursinho_principe",
  "nome": "Porta Maternidade Ursinho Príncipe Personalizado com Nome",
  "nomeCompleto": "COD1 - Enfeite Porta Maternidade Ursinho Príncipe Personalizado com Nome - Placa Flâmula Redonda (1 porta maternidade + 1 pendurador, MDF Premium)",
  "categoria": "Maternidade",
  "personalizavel": true,
  "medidas": "Porta maternidade 25 cm + pendurador 8 cm",
  "foto": "fotos/cod1_ursinho_principe.jpg",
  "fotosExtra": [
   "fotos/cod1_ursinho_principe_2.jpg",
   "fotos/cod1_ursinho_principe_3.jpg",
   "fotos/cod1_ursinho_principe_4.jpg",
   "fotos/cod1_ursinho_principe_5.jpg",
   "fotos/cod1_ursinho_principe_6.jpg"
  ]
 },
 {
  "id": 43,
  "codigo": "cod2_placa_crista",
  "nome": "Kit Placa Decorativa Cristã + Suporte Redondo MDF Branco",
  "nomeCompleto": "COD2 - Kit Placa Decorativa Cristã + Suporte Redondo MDF Branco 20x20 - Tudo Posso Naquele que Me Fortalece, Filipenses 4:13",
  "categoria": "Placas e frases",
  "personalizavel": false,
  "medidas": "20 x 20 cm",
  "foto": "fotos/cod2_placa_crista.jpg",
  "fotosExtra": [
   "fotos/cod2_placa_crista_2.jpg"
  ]
 },
 {
  "id": 44,
  "codigo": "cod3_arco_iris_boho",
  "nome": "Porta Maternidade Arco-Íris Boho com Nome Personalizado",
  "nomeCompleto": "COD3 - Enfeite Porta Maternidade Arco-Íris Boho - Nome personalizado - Guirlanda (MDF 3 mm, redondo, com suporte e cordão)",
  "categoria": "Maternidade",
  "personalizavel": true,
  "medidas": "25 cm",
  "foto": "fotos/cod3_arco_iris_boho.jpg",
  "fotosExtra": [
   "fotos/cod3_arco_iris_boho_2.jpg",
   "fotos/cod3_arco_iris_boho_3.jpg"
  ]
 }
];
