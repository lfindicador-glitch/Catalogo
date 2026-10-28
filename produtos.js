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
  ],
  "persRotulo": "Nome do bebê",
  "persExemplo": "Ex.: Benjamin",
  "persPergunta": "Personalizar com nome?",
  "descricao": [
   "Enfeite de porta de maternidade Ursinho Príncipe, personalizado com o nome – placa flâmula redonda (GUPM:05).",
   "## Conteúdo",
   "- 1 porta maternidade + 1 pendurador",
   "- Material: MDF Premium",
   "Observação: a opção do nome espelhado em 3D acompanha o desenho em 3D.",
   "## Medidas",
   "- Porta maternidade: 25 cm",
   "- Pendurador: 8 cm"
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
  ],
  "descricao": [
   "Placa decorativa em MDF branco – \"Tudo posso naquele que me fortalece\", Filipenses 4:13. Leve fé, inspiração e elegância para o seu ambiente. Com acabamento delicado, gravação a laser e cordão de sisal para pendurar, é perfeita para salas, quartos, escritórios, espaços de oração e ambientes cristãos.",
   "## Características",
   "- Fabricada em MDF branco de alta qualidade",
   "- Gravação a laser com excelente acabamento",
   "- Frase bíblica: \"Tudo posso naquele que me fortalece\" – Filipenses 4:13",
   "- Cordão de sisal para fácil instalação",
   "- Design delicado e atemporal",
   "- Ideal para decoração ou presente especial",
   "Excelente opção de presente para amigos, familiares, aniversários, batizados, casamentos e outras ocasiões especiais."
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
  ],
  "persRotulo": "Nome do bebê",
  "persExemplo": "Ex.: Amelie",
  "persPergunta": "Personalizar com nome?",
  "descricao": [
   "Dê mais vida ao quarto do seu baby com esta plaquinha em MDF: uma peça alegre e moderna, ideal para decorar o quartinho, a porta da maternidade, festa infantil e ensaio fotográfico. Também é uma ótima opção para presentear quem está esperando um bebê.",
   "## Descrição do produto",
   "- Material: MDF 3 mm",
   "- Forma: redonda",
   "- Medida: 25 cm",
   "- Impressão: adesivo vinílico laminado, de alta qualidade e resolução",
   "## Especial",
   "- Enviamos o suporte redondo do porta maternidade para pendurar",
   "- Acompanha o cordão para pendurar",
   "- Acompanha fita dupla face no pendurador, para melhor fixação (sem furos)"
  ]
 },
 {
  "id": 45,
  "codigo": "casinha_led",
  "nome": "Casinha Decorativa com Luz LED em MDF",
  "nomeCompleto": "Casinha Decorativa com Luz LED – Enfeite Iluminado em MDF para Sala de Estar, Quarto ou Escritório",
  "categoria": "Luminárias",
  "personalizavel": false,
  "medidas": "17 cm de altura x 12 cm de largura x 12 cm de comprimento",
  "foto": "fotos/casinha_led.jpg",
  "fotosExtra": [
   "fotos/casinha_led_2.jpg",
   "fotos/casinha_led_3.jpg",
   "fotos/casinha_led_4.jpg"
  ],
  "descricao": [
   "Deixe sua decoração ainda mais encantadora com essa linda casinha iluminada, em MDF com LED.",
   "Ideal para: decoração de Natal, salas, aparadores e ambientes aconchegantes.",
   "## Medidas",
   "- Altura: 17 cm",
   "- Largura: 12 cm",
   "- Comprimento: 12 cm",
   "Um charme especial para decorar ou presentear!"
  ]
 },
 {
  "id": 46,
  "codigo": "kit_3_quadros_flores",
  "nome": "Quadros Decoração Kit 3 Faces Clínica De Estética Mdf 3mm",
  "nomeCompleto": "Quadros Decoração Kit 3 Faces Clínica De Estética Mdf 3mm – Kit 3 Quadros Decorativos em MDF Flores",
  "categoria": "Quadros",
  "personalizavel": false,
  "medidas": "3 peças de 50 x 25 cm cada",
  "foto": "fotos/kit_3_quadros_flores.jpg",
  "fotosExtra": [
   "fotos/kit_3_quadros_flores_2.jpg",
   "fotos/kit_3_quadros_flores_3.jpg"
  ],
  "descricao": [
   "Deixe seu ambiente mais elegante e delicado! Um design moderno com recortes florais que transforma a decoração do quarto, sala ou cantinho especial.",
   "## O kit contém",
   "- 3 peças decorativas em MDF",
   "- Tamanho de cada peça: 50 x 25 cm",
   "- Modelo com recortes vazados de flores",
   "Ideal para quartos, salas, corredores e ambientes decorativos. Um diferencial: decoração moderna, delicada e cheia de personalidade."
  ]
 },
 {
  "id": 47,
  "codigo": "kit_lua_nuvens_estrelas",
  "nome": "Aplique Lua, Nuvens e Estrelas Brancas MDF (1 lua, 3 nuvens e 5 estrelas)",
  "nomeCompleto": "Aplique Lua, Nuvens e Estrelas Brancas MDF (1 lua, 3 nuvens e 5 estrelas) – Kit com 9 peças, MDF 3 mm, acompanha fita dupla face",
  "categoria": "Decoração infantil",
  "personalizavel": false,
  "medidas": "Lua 20 cm de altura; nuvem G 32 x 21 cm; nuvem M 27 x 17,5 cm; nuvem P 20 x 13 cm; 5 estrelas de 10 cm de altura",
  "foto": "fotos/kit_lua_nuvens_estrelas.jpg",
  "fotosExtra": [
   "fotos/kit_lua_nuvens_estrelas_2.jpg"
  ],
  "descricao": [
   "Transforme o quarto infantil em um ambiente mágico, delicado e aconchegante! Ideal para decorar quartos de bebê, berços e paredes.",
   "## O kit contém 9 peças",
   "- 1 lua – 20 cm de altura",
   "- 1 nuvem G – 32 x 21 cm",
   "- 1 nuvem M – 27 x 17,5 cm",
   "- 1 nuvem P – 20 x 13 cm",
   "- 5 estrelas – 10 cm de altura cada",
   "## Material",
   "- MDF de qualidade, espessura 3 mm",
   "- Instruções de uso: usar a fita dupla face enviada",
   "Perfeito para criar uma composição linda e personalizada no quartinho do seu bebê!"
  ]
 },
 {
  "id": 48,
  "codigo": "cod8_nome_personalizado",
  "nome": "Nome Personalizado em MDF 3mm 60cm de Largura – Quarto de Bebê",
  "nomeCompleto": "COD8 - Nome Personalizado em MDF 3mm 60cm de Largura - Decoração Quarto de Bebê",
  "categoria": "Decoração infantil",
  "personalizavel": true,
  "medidas": "60 cm de largura",
  "foto": "fotos/cod8_nome_personalizado.jpg",
  "fotosExtra": [
   "fotos/cod8_nome_personalizado_2.jpg",
   "fotos/cod8_nome_personalizado_3.jpg",
   "fotos/cod8_nome_personalizado_4.jpg",
   "fotos/cod8_nome_personalizado_5.jpg"
  ],
  "persRotulo": "Nome que será recortado",
  "persExemplo": "Ex.: Aurora",
  "persPergunta": "Escolher o nome?",
  "descricao": [
   "Deixe o quarto ainda mais especial com a Placa de Nome Personalizado em MDF. Um item moderno e exclusivo para destacar o nome da criança, trazendo charme e identidade ao ambiente.",
   "## Detalhes do produto",
   "- Material: MDF de alta qualidade",
   "- Nome totalmente personalizado",
   "- Acabamento liso e elegante",
   "- Cor: Preto (podendo ser pintado conforme sua preferência)",
   "- Ideal para parede, porta, prateleiras ou cabeceira",
   "## Indicado para",
   "- Decoração de quarto infantil e de bebê",
   "- Porta de maternidade",
   "- Presente criativo e exclusivo"
  ]
 },
 {
  "id": 49,
  "codigo": "cod9_placa_entrada_casamento",
  "nome": "Placa de Entrada Casamento Nada Antes Nada Depois",
  "nomeCompleto": "COD9 - Placa de Entrada Casamento Nada Antes Nada Depois Entrada Noiva Pajem Daminha Festa Comemoração Decoração Cerimonial MDF",
  "categoria": "Casamento e festas",
  "personalizavel": true,
  "medidas": "30 x 23 cm",
  "foto": "fotos/cod9_placa_entrada_casamento.jpg",
  "fotosExtra": [
   "fotos/cod9_placa_entrada_casamento_2.jpg",
   "fotos/cod9_placa_entrada_casamento_3.jpg"
  ],
  "persRotulo": "Mensagem da placa",
  "persExemplo": "Ex.: Nada antes, nada depois",
  "persPergunta": "Escrever a sua mensagem?",
  "descricao": [
   "Plaquinha de casamento personalizada.",
   "Medidas: 30 x 23 cm.",
   "Fazemos com a sua mensagem!"
  ]
 },
 {
  "id": 50,
  "codigo": "cod10_em_tudo_dai_gracas",
  "nome": "Frase Decorativa Em Tudo Dai Graças com Coração em MDF 3mm",
  "nomeCompleto": "COD10 - Frase Decorativa Em Tudo Dai Graças Com Coração Decorativo em Mdf 3mm",
  "categoria": "Placas e frases",
  "personalizavel": false,
  "medidas": "100 cm de comprimento x 10 cm de altura",
  "foto": "fotos/cod10_em_tudo_dai_gracas.jpg",
  "fotosExtra": [
   "fotos/cod10_em_tudo_dai_gracas_2.jpg",
   "fotos/cod10_em_tudo_dai_gracas_3.jpg"
  ],
  "cores": [
   "Preto"
  ],
  "descricao": [
   "Quadro frase \"Em Tudo Dai Graças\" + coração decorativo em MDF preto, 100 x 10 cm – decoração com fé e estilo.",
   "Leve mais amor, gratidão e fé para sua casa! Este lindo quadro decorativo em MDF na cor preta traz a frase \"Em Tudo Dai Graças\" acompanhada de um delicado coração, perfeito para deixar qualquer ambiente mais acolhedor, elegante e cheio de significado.",
   "## Detalhes do produto",
   "- Material: MDF preto de 3 mm de alta qualidade",
   "- Medidas: 100 cm de comprimento x 10 cm de altura",
   "- Corte a laser, com excelente acabamento",
   "- Leve e fácil de instalar (fita dupla face, cola ou preguinhos já inclusos)",
   "- Ideal para sala, quarto, hall, escritório, área gourmet ou aquele cantinho especial",
   "Uma peça que transmite boas energias, gratidão e fé, além de deixar seu espaço mais bonito e elegante. Ótima opção para presentear quem você ama."
  ]
 },
 {
  "id": 51,
  "codigo": "cod11_kit_safari",
  "nome": "Kit Safari Infantil 4 Peças – Macaco, Girafa, Elefante e Leão",
  "nomeCompleto": "COD11 - Kit Safari Infantil 4 Peças Decoração Parede Quarto Bebê Leão Elefante Girafa Macaco Minimalista",
  "categoria": "Decoração infantil",
  "personalizavel": false,
  "medidas": "Macaco 11 x 11 cm; girafa 9 x 18 cm; elefante 14 x 12 cm; leão 12 x 12 cm (largura x altura)",
  "foto": "fotos/cod11_kit_safari.jpg",
  "fotosExtra": [
   "fotos/cod11_kit_safari_2.jpg",
   "fotos/cod11_kit_safari_3.jpg",
   "fotos/cod11_kit_safari_4.jpg"
  ],
  "cores": [],
  "descricao": [
   "Transforme o quartinho do seu pequeno em uma verdadeira aventura Safari! Este Kit Safari Decorativo em MDF laminado traz charme, delicadeza e personalidade para o quarto do bebê ou das crianças, com macaco, girafa, elefante e leão.",
   "## Principais benefícios",
   "- Decoração moderna e encantadora para quartos infantis",
   "- Tema Safari que estimula a criatividade e a imaginação",
   "- MDF laminado com acabamento refinado e alta durabilidade",
   "- Fácil instalação na parede",
   "- Excelente opção para chá de bebê, nascimento ou aniversário",
   "- Acompanha fita dupla face para fixação",
   "## Características técnicas",
   "- Material: MDF laminado de alta qualidade",
   "- Espessura: 3 mm",
   "- Corte a laser de alta precisão",
   "- Produto fabricado no Brasil",
   "## Como instalar",
   "- Escolha a posição desejada na parede e limpe a superfície",
   "- Use a fita dupla face enviada junto ao produto",
   "- Fixe os animais na disposição que preferir",
   "## Conteúdo da embalagem",
   "- Macaco: 11 cm de largura x 11 cm de altura",
   "- Girafa: 9 cm de largura x 18 cm de altura",
   "- Elefante: 14 cm de largura x 12 cm de altura",
   "- Leão: 12 cm de largura x 12 cm de altura",
   "As cores foram cuidadosamente escolhidas para uma decoração alegre, moderna e harmoniosa."
  ]
 },
 {
  "id": 52,
  "codigo": "cod12_jogador_futebol",
  "nome": "Enfeite Jogador de Futebol em MDF com Nome e Número 30cm",
  "nomeCompleto": "COD12 - Enfeite Jogador de Futebol em MDF com Nome e Número Personalizado 30cm Decoração Quarto Infantil – Display de Mesa Jogador Futebol Personalizado",
  "categoria": "Decoração infantil",
  "personalizavel": true,
  "medidas": "15 cm de largura x 30 cm de altura",
  "foto": "fotos/cod12_jogador_futebol.jpg",
  "fotosExtra": [
   "fotos/cod12_jogador_futebol_2.jpg",
   "fotos/cod12_jogador_futebol_3.jpg",
   "fotos/cod12_jogador_futebol_4.jpg",
   "fotos/cod12_jogador_futebol_5.jpg"
  ],
  "cores": [
   "Azul",
   "Preto",
   "Branco",
   "Rosa",
   "Verde",
   "Laranja",
   "Cinza",
   "Cru"
  ],
  "persRotulo": "Nome e número do jogador",
  "persExemplo": "Ex.: Pedro, número 10",
  "persPergunta": "Personalizar com nome e número?",
  "descricao": [
   "Display de mesa de jogador de futebol personalizado, em MDF 3 mm. Transforme a decoração da festa ou do quarto infantil em um verdadeiro campo de futebol!",
   "## Ficha técnica",
   "- Material: MDF 3 mm laminado de alta qualidade",
   "- Largura: 15 cm",
   "- Altura: 30 cm",
   "- Cores disponíveis: Azul, Preto, Branco, Rosa, Verde, Laranja, Cinza e Cru",
   "- Produto leve, resistente e durável, com corte preciso e excelente acabamento",
   "- Personalizável com nome e número",
   "## Principais benefícios",
   "- Deixa a decoração mais temática e profissional",
   "- Ideal para aniversários, festas e decoração de quarto infantil",
   "- Ótima opção de presente personalizado",
   "## Como usar",
   "- Perfeito sobre mesas principais, mesas de doces ou decoração de quarto",
   "- Combine com outros itens do tema futebol",
   "## Conteúdo da embalagem",
   "- 1 display de mesa jogador de futebol em MDF personalizado"
  ]
 },
 {
  "id": 53,
  "codigo": "cod13_luminaria_letra_nome",
  "nome": "Luminária Infantil Personalizada com Nome e Letra Inicial – MDF LED",
  "nomeCompleto": "COD13 - Luminária Infantil Personalizada com Nome MDF LED – Letra Inicial Decorativa Quarto",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "30 x 30 cm",
  "foto": "fotos/cod13_luminaria_letra_nome.jpg",
  "fotosExtra": [
   "fotos/cod13_luminaria_letra_nome_2.jpg",
   "fotos/cod13_luminaria_letra_nome_3.jpg",
   "fotos/cod13_luminaria_letra_nome_4.jpg",
   "fotos/cod13_luminaria_letra_nome_5.jpg"
  ],
  "cores": [
   "Rosa",
   "Azul",
   "Vermelho",
   "Preto",
   "Branco",
   "Cru",
   "Verde"
  ],
  "persRotulo": "Nome (a letra inicial é feita a partir do nome)",
  "persExemplo": "Ex.: Ayla",
  "persPergunta": "Personalizar com nome?",
  "descricao": [
   "O toque de magia que faltava no quartinho do seu bebê! Imagine ver o nome do seu maior amor iluminado com um brilho suave e acolhedor. Uma luminária personalizada que é símbolo de carinho e transforma o ambiente.",
   "Disponível nas cores: rosa, azul, vermelho, preto, branco, cru e verde. Acabamento laminado de alta qualidade – não utilizamos MDF pintado, o que garante mais durabilidade e melhor acabamento.",
   "## Principais benefícios",
   "- Exclusividade total: personalizada com o nome e a inicial",
   "- Luz de LED suave, ideal para amamentação ou para crianças que têm medo do escuro",
   "- Presente inesquecível para chás de bebê e visitas de maternidade",
   "- MDF laminado de alta durabilidade, com corte preciso a laser",
   "## Detalhes do produto",
   "- Material: MDF laminado (fácil limpeza e resistência)",
   "- Medidas: 30 cm x 30 cm",
   "- Iluminação: LED de alto brilho já instalado",
   "- Funciona a bateria (inclusa): não consome energia elétrica e não precisa de tomada por perto",
   "- Botão liga/desliga discreto",
   "## Indicação de uso",
   "- Quarto infantil e berçários: fixada na parede ou apoiada em nichos",
   "- Porta de maternidade",
   "- Presente para afilhados, sobrinhos e filhos de amigos",
   "- Cenário de fotos e ensaios mensais",
   "## Conteúdo da embalagem",
   "- 1 luminária personalizada (letra + nome) em MDF com LED",
   "- Baterias inclusas (pronto para ligar)"
  ]
 },
 {
  "id": 54,
  "codigo": "cod14_luminaria_camisa_futebol",
  "nome": "Luminária Camisa de Futebol Personalizada em MDF com LED",
  "nomeCompleto": "COD14 - Luminária Camisa de Futebol Personalizada em MDF com LED | Nome e Número | Decoração Esportiva",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "39 cm de altura x 36 cm de largura",
  "foto": "fotos/cod14_luminaria_camisa_futebol.jpg",
  "fotosExtra": [
   "fotos/cod14_luminaria_camisa_futebol_2.jpg",
   "fotos/cod14_luminaria_camisa_futebol_3.jpg",
   "fotos/cod14_luminaria_camisa_futebol_4.jpg"
  ],
  "persRotulo": "Nome e número da camisa",
  "persExemplo": "Ex.: Luis, número 7",
  "persPergunta": "Personalizar com nome e número?",
  "descricao": [
   "Decore o quarto dos pequenos craques com muito estilo! A Camisa Futebol Personalizada em MDF laminado deixa o ambiente moderno, aconchegante e cheio de personalidade. Ideal para quartos infantis, cantinho gamer, área esportiva ou para presentear quem ama futebol.",
   "Tamanho: altura 39 cm – largura 36 cm.",
   "Produto feito sob encomenda: prazo de até 5 dias úteis para produção, após a confirmação do pedido.",
   "## Personalização",
   "- Nome e número personalizados",
   "- A cor do MDF pode ser escolhida na hora do pedido",
   "## O que você recebe",
   "- 1 camisa decorativa personalizada",
   "- Detalhes vazados em tema futebol",
   "- Fita dupla face inclusa para fixação na parede",
   "- Produto pronto para instalar",
   "## Material",
   "- MDF laminado de alta qualidade",
   "- Acabamento moderno e elegante",
   "- Material resistente e durável",
   "## Diferenciais",
   "- Decoração exclusiva e personalizada",
   "- Ideal para quarto infantil e decoração temática",
   "- Ótima opção para presente",
   "- Fácil instalação",
   "- Funciona com pilhas"
  ]
 },
 {
  "id": 55,
  "codigo": "cod15_kit_displays_futebol",
  "nome": "Kit 4 Displays de Mesa Futebol MDF Vazado – Festa Infantil",
  "nomeCompleto": "COD15 - Kit 4 Displays de Mesa Futebol MDF Vazado Decoração Festa Infantil",
  "categoria": "Decoração infantil",
  "personalizavel": false,
  "medidas": "Aproximadamente 20 cm cada peça",
  "foto": "fotos/cod15_kit_displays_futebol.jpg",
  "fotosExtra": [
   "fotos/cod15_kit_displays_futebol_2.jpg",
   "fotos/cod15_kit_displays_futebol_3.jpg",
   "fotos/cod15_kit_displays_futebol_4.jpg"
  ],
  "cores": [
   "Vermelho",
   "Azul",
   "Rosa",
   "Cru",
   "Branco",
   "Verde",
   "Preto"
  ],
  "descricao": [
   "Quer transformar a festa do seu pequeno craque em um verdadeiro espetáculo? Com o Kit de Displays Futebol da Corte e Cria Decor, você leva para a mesa do bolo o acabamento profissional das grandes festas. Feitos com corte a laser de alta precisão.",
   "## Principais benefícios",
   "- Cenário de estádio: design moderno e vazado, que traz profundidade e beleza à decoração",
   "- MDF laminado (não é pintura): brilho constante e maior durabilidade",
   "- O acabamento fosco/acetinado não reflete o flash, garantindo fotos perfeitas",
   "- Mais durável que papelão: aguenta a festa inteira e depois decora o quarto",
   "## Características técnicas",
   "- Material: MDF laminado de alta qualidade, nas cores Vermelho, Azul, Rosa, Cru, Branco, Verde e Preto",
   "- Kit com 4 unidades: camisa 10, chuteira, escrita \"GOOL\" e bola de futebol",
   "- Dimensões: aproximadamente 20 cm cada",
   "- Corte a laser (bordas perfeitas, sem rebarbas)",
   "## Como usar",
   "- Ideal para mesas de aniversário, estantes de quartos infantis ou painéis de festa",
   "- Por serem grandes (20 cm), funcionam como peças centrais na mesa do bolo ou no chão, perto do painel",
   "## Conteúdo da embalagem",
   "- 1 display camisa 10",
   "- 1 display chuteira",
   "- 1 display letreiro \"GOOL\"",
   "- 1 display bola de futebol",
   "Os itens são enviados desmontados para chegarem intactos; a montagem é simples e intuitiva."
  ]
 },
 {
  "id": 56,
  "codigo": "cod16_kit_nichos_nuvem",
  "nome": "Kit Três Nichos Modelo Nuvem em MDF – Quarto de Bebê",
  "nomeCompleto": "COD16 - Kit Três Nichos Modelo Nuvem Em Mdf Quarto De Bebê",
  "categoria": "Prateleiras",
  "personalizavel": false,
  "medidas": "Cada prateleira: 29,5 cm de comprimento x 18 cm de largura x 8 cm de altura",
  "foto": "fotos/cod16_kit_nichos_nuvem.jpg",
  "fotosExtra": [
   "fotos/cod16_kit_nichos_nuvem_2.jpg",
   "fotos/cod16_kit_nichos_nuvem_3.jpg",
   "fotos/cod16_kit_nichos_nuvem_4.jpg"
  ],
  "cores": [
   "Vermelho",
   "Azul",
   "Rosa",
   "Cru",
   "Branco",
   "Verde",
   "Preto"
  ],
  "descricao": [
   "Transforme o quarto do seu pequeno em um refúgio de ternura e organização! As prateleiras em formato de nuvem unem a funcionalidade de que você precisa à doçura que seu bebê merece.",
   "## Principais benefícios",
   "- Decoração instantânea, sem reformas",
   "- Instalação sem furos: acompanha fita dupla face de alta resistência",
   "- MDF laminado de alta qualidade em várias cores, para combinar com o enxoval",
   "- Ideal para expor bichinhos de pelúcia ou a naninha favorita",
   "- Fácil de limpar e com acabamento impecável, sem rebarbas",
   "## Características técnicas",
   "- Fabricação própria – Corte e Cria Decor",
   "- Material: MDF laminado premium",
   "- Cores: Vermelho, Azul, Rosa, Cru, Branco, Verde e Preto",
   "- Instalação: fita dupla face de alta aderência (já inclusa)",
   "- Dimensões: comprimento 29,5 cm, largura 18 cm, altura 8 cm (prateleira)",
   "## Para quem é",
   "- Mamães e papais que buscam um quarto digno de revista",
   "- Quem mora em imóvel alugado e não quer furar paredes",
   "- Presente de chá de bebê inesquecível e útil",
   "## Conteúdo da embalagem",
   "- Itens selecionados no pedido (prateleira)",
   "- Fita dupla face aplicada no produto"
  ]
 },
 {
  "id": 57,
  "codigo": "cod17_palavras_mdf",
  "nome": "Palavras em MDF – Happy Birthday, Boy or Girl, Chá de Panela e mais",
  "nomeCompleto": "COD17 - Palavras em MDF plaquinha decorativas aniversário happy birthday decoração PRATA ou DOURADO",
  "categoria": "Casamento e festas",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/cod17_palavras_mdf.jpg",
  "fotosExtra": [
   "fotos/cod17_palavras_mdf_2.jpg",
   "fotos/cod17_palavras_mdf_3.jpg"
  ],
  "cores": [
   "Cru",
   "Dourado",
   "Preto"
  ],
  "persRotulo": "Qual palavra você quer?",
  "persExemplo": "Happy Birthday, Boy or Girl, Chá de Panela, Chá Revelação ou Oh Baby",
  "persPergunta": "Escolher a palavra?",
  "descricao": [
   "Deixe sua festa muito mais bonita com esse lindo aplique em MDF 3 mm! Traga vida para o ambiente com uma decoração simples, barata e moderna.",
   "Palavras disponíveis: Happy Birthday, Boy or Girl, Chá de Panela, Chá Revelação e Oh Baby. Cores: Cru, Dourado e Preto.",
   "Fácil de instalar: não precisa furar a parede nem fazer sujeira. É só escolher bem o local e fixar, sem pregos e parafusos.",
   "Vai super bem embalado: nossa equipe é treinada para você receber o item na mais perfeita condição.",
   "## Conteúdo da embalagem",
   "- 1 aplique em MDF",
   "- 1 fita 3M"
  ]
 },
 {
  "id": 58,
  "codigo": "cod18_porta_alianca_jesus",
  "nome": "Porta Aliança Branco Casamento – Até Que Ele Jesus Venha",
  "nomeCompleto": "COD18 - Porta Aliança Branco Casamento Até Que Ele Jesus Venha MDF Minimalista Luxo Cristão",
  "categoria": "Casamento e festas",
  "personalizavel": false,
  "medidas": null,
  "foto": "fotos/cod18_porta_alianca_jesus.jpg",
  "fotosExtra": [
   "fotos/cod18_porta_alianca_jesus_2.jpg",
   "fotos/cod18_porta_alianca_jesus_3.jpg"
  ],
  "cores": [
   "Branco",
   "Cru",
   "Preto",
   "Vermelho",
   "Azul",
   "Rosa",
   "Verde"
  ],
  "descricao": [
   "O momento do \"sim\" merece um detalhe que carregue toda a fé e o amor do casal. Nossa placa porta alianças une a delicadeza do MDF laminado com uma mensagem que transborda propósito. A peça perfeita para eternizar a união e depois decorar o novo lar.",
   "## Principais benefícios",
   "- Design exclusivo: gravação precisa com detalhes florais e frase romântica religiosa",
   "- Versátil: serve para a entrada das alianças e fica linda como quadro decorativo depois do evento",
   "- Acabamento premium: MDF laminado de alta qualidade, em várias cores",
   "## Características técnicas",
   "- Material: MDF laminado de alta resistência",
   "- Cores: Branco, Cru, Preto, Vermelho, Azul, Rosa e Verde",
   "- Formato: redondo, com furo central para laço",
   "- Gravação a laser de alta definição",
   "## Como usar",
   "- No dia do casamento, amarre as alianças no furo central com a fita de sua preferência",
   "- Depois da cerimônia, use a fita dupla face inclusa para fixar a placa na parede do quarto, sala ou cantinho de oração",
   "## Conteúdo da embalagem",
   "- 1 placa decorativa/porta alianças em MDF laminado",
   "- Fita dupla face já aplicada no produto"
  ]
 },
 {
  "id": 59,
  "codigo": "cod19_nichos_bola_futebol",
  "nome": "Kit 3 Nichos Redondos Bola de Futebol MDF – Quarto Infantil",
  "nomeCompleto": "COD19 - Kit 3 Nichos Redondos Bola De Futebol MDF Decoração Quarto Infantil Bebê Menino Prateleira Organizadora",
  "categoria": "Prateleiras",
  "personalizavel": false,
  "medidas": null,
  "foto": "fotos/cod19_nichos_bola_futebol.jpg",
  "fotosExtra": [
   "fotos/cod19_nichos_bola_futebol_2.jpg",
   "fotos/cod19_nichos_bola_futebol_3.jpg"
  ],
  "cores": [
   "Vermelho",
   "Azul",
   "Rosa",
   "Cru",
   "Branco",
   "Verde",
   "Preto"
  ],
  "descricao": [
   "Transforme o quarto do seu pequeno em um refúgio de ternura e organização! As prateleiras unem a funcionalidade de que você precisa e um design moderno que encanta à primeira vista.",
   "## Principais benefícios",
   "- Decoração instantânea, sem reformas",
   "- Instalação sem furos: acompanha fita dupla face de alta resistência",
   "- MDF laminado de alta qualidade em diversas cores, para combinar com o enxoval",
   "- Ideal para expor bichinhos de pelúcia ou a naninha favorita",
   "- Fácil de limpar, com acabamento impecável e sem rebarbas",
   "## Características técnicas",
   "- Fabricação própria – Corte e Cria Decor",
   "- Material: MDF laminado premium",
   "- Cores: Vermelho, Azul, Rosa, Cru, Branco, Verde e Preto",
   "- Instalação: fita dupla face de alta aderência (já inclusa)",
   "## Para quem é",
   "- Mamães e papais que buscam um quarto digno de revista",
   "- Quem mora em imóvel alugado e não quer furar paredes",
   "- Presente de chá de bebê inesquecível e útil",
   "## Conteúdo da embalagem",
   "- Itens selecionados no pedido (prateleira)",
   "- Fita dupla face aplicada no produto"
  ]
 },
 {
  "id": 60,
  "codigo": "cod20_placa_foto_casal",
  "nome": "Placa Decorativa Personalizada com Foto do Casal em MDF",
  "nomeCompleto": "COD20 - Placa Decorativa Personalizada com Foto do Casal MDF Dia dos Namorados Casamento Presente Romântico",
  "categoria": "Casamento e festas",
  "personalizavel": true,
  "medidas": null,
  "foto": "fotos/cod20_placa_foto_casal.jpg",
  "fotosExtra": [
   "fotos/cod20_placa_foto_casal_2.jpg",
   "fotos/cod20_placa_foto_casal_3.jpg"
  ],
  "persRotulo": "Nomes do casal, data e frase (a foto do casal é enviada pelo WhatsApp)",
  "persExemplo": "Ex.: Yasmin & Rafael, 01/05/26",
  "persPergunta": "Personalizar a placa?",
  "descricao": [
   "Transforme sua foto em uma lembrança inesquecível! Surpreenda quem você ama com uma placa decorativa personalizada com a foto do casal, nomes e data especial. Um presente exclusivo para celebrar o amor e eternizar momentos importantes.",
   "## Personalize do seu jeito",
   "- Nomes do casal",
   "- Data especial",
   "- Foto do casal transformada em ilustração",
   "- Frase ou versículo personalizado (opcional)",
   "## Ideal para presentear",
   "- Dia dos Namorados",
   "- Casamento e aniversário de namoro",
   "- Noivado e bodas",
   "- Presente romântico e decoração",
   "## Como fazer o pedido",
   "- Informe os nomes, a data e a frase no pedido",
   "- Depois de enviar o pedido pelo WhatsApp, mande também a foto do casal na conversa",
   "- Aguarde a nossa confirmação \"OK, RECEBIDO\"",
   "Importante: envie todas as informações e a foto no momento do pedido para evitar atrasos na produção.",
   "## Prazo de fabricação",
   "Produto feito sob encomenda e personalizado especialmente para você. O prazo de fabricação é de 5 dias úteis, além do prazo de transporte.",
   "## Sobre o produto",
   "- Placa decorativa personalizada em MDF",
   "- Arte exclusiva com nomes, data e foto",
   "- Peça produzida sob encomenda"
  ]
 },
 {
  "id": 61,
  "codigo": "cod21_porta_alianca_personalizado",
  "nome": "Porta Aliança MDF Branco Personalizado Gravado a Laser",
  "nomeCompleto": "COD21 - Porta Aliança MDF Branco Personalizado Gravado a Laser Casamento Nome dos Noivos Suporte Alianças",
  "categoria": "Casamento e festas",
  "personalizavel": true,
  "medidas": "20 cm de diâmetro",
  "foto": "fotos/cod21_porta_alianca_personalizado.jpg",
  "fotosExtra": [
   "fotos/cod21_porta_alianca_personalizado_2.jpg",
   "fotos/cod21_porta_alianca_personalizado_3.jpg"
  ],
  "persRotulo": "Nomes dos noivos e data",
  "persExemplo": "Ex.: Marcela e André, 03/08/24",
  "persPergunta": "Personalizar com nomes e data?",
  "descricao": [
   "Placa decorativa personalizada em MDF 20 cm – um toque especial para o seu momento. Perfeita para eternizar momentos únicos como casamentos, noivados, aniversários ou datas especiais. Com design delicado e gravação de alta precisão, traz um visual elegante e sofisticado.",
   "## Diferenciais",
   "- Personalização com nomes e data",
   "- Corte e gravação a laser de alta precisão",
   "- Acabamento fino e elegante",
   "- Design delicado e atemporal",
   "- Ideal para decoração ou presente especial",
   "## Especificações",
   "- Material: MDF de alta qualidade",
   "- Formato: redondo",
   "- Medida: 20 cm de diâmetro",
   "- Espessura: aproximadamente 3 mm",
   "- Cor: natural (pode variar conforme a iluminação)",
   "## Perfeito para",
   "- Decoração de casamento",
   "- Noivado e bodas",
   "- Presente personalizado",
   "- Decoração de ambientes e lembranças especiais",
   "Dica: combine com flores, suporte ou cavalete para uma apresentação ainda mais encantadora!"
  ]
 },
 {
  "id": 62,
  "codigo": "cod22_luminaria_basquete",
  "nome": "Luminária Painel LED Camisa de Basquete Personalizada 40cm",
  "nomeCompleto": "COD22 - Luminária Painel LED Personalizado Camisa Basquete Nome e Número - Decoração Quarto Infantil 40cm",
  "categoria": "Luminárias",
  "personalizavel": true,
  "medidas": "40 cm de altura",
  "foto": "fotos/cod22_luminaria_basquete.jpg",
  "fotosExtra": [
   "fotos/cod22_luminaria_basquete_2.jpg",
   "fotos/cod22_luminaria_basquete_3.jpg"
  ],
  "cores": [
   "Preto"
  ],
  "persRotulo": "Nome e número da camisa",
  "persExemplo": "Ex.: Michael Jordan, número 1",
  "persPergunta": "Personalizar com nome e número?",
  "descricao": [
   "Dê um \"Slam Dunk\" na decoração do quarto do seu pequeno craque! Luminária de parede personalizada em formato de camisa de basquete, perfeita para crianças e jovens apaixonados por esporte. Traz um toque de exclusividade e iluminação aconchegante ao quarto, sala de jogos ou área gourmet.",
   "## Por que escolher esta luminária",
   "- Totalmente personalizável: você escolhe o nome e o número",
   "- Design exclusivo: corte a laser com a silhueta da camisa e o detalhe da mão com a bola",
   "- Efeito de luz indireta, que cria um ambiente acolhedor: ideal como luz noturna ou peça de destaque",
   "- Tamanho ideal: 40 cm de altura, para ganhar destaque na parede sem ocupar espaço excessivo",
   "## Ficha técnica",
   "- Material: MDF de alta qualidade com acabamento em preto fosco",
   "- Iluminação: LED integrado (econômico e durável)",
   "- Dimensões: 40 cm de altura (largura proporcional ao modelo)",
   "- Instalação: super simples, como pendurar um quadro",
   "Garanta já um presente inesquecível para quem vive e respira basquete!"
  ]
 }
];
