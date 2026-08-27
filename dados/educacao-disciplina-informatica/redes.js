var Q_ESP_educacao_disciplina_informatica_REDES = [
  {
    "disciplina": "REDES",
    "tema": "Conteúdos Fundamentais",
    "p": "Um endereço IP identifica:",
    "o": [
      "Um website",
      "Um email",
      "Um dispositivo numa rede de computadores",
      "Um ficheiro"
    ],
    "r": 2,
    "e": "O endereço IP (Internet Protocol) é um identificador único atribuído a cada dispositivo conectado a uma rede.",
    "f": "MED, Programa de Informática ENS/ESS"
  },
  {
    "disciplina": "REDES",
    "tema": "Conteúdos Fundamentais",
    "p": "A pilha de protocolos TCP/IP inclui:",
    "o": [
      "Apenas TCP",
      "Apenas IP",
      "HTTP, FTP, SMTP",
      "Aplicação, Transporte, Rede e Interface de Rede"
    ],
    "r": 3,
    "e": "O modelo TCP/IP tem 4 camadas: Aplicação (HTTP, FTP, SMTP), Transporte (TCP, UDP), Rede (IP) e Interface de Rede.",
    "f": "MED, Programa de Informática ENS/ESS"
  },
  {
    "disciplina": "REDES",
    "tema": "Conceitos Gerais",
    "p": "Em redes de computadores, a comunicação de dados consiste em:",
    "o": [
      "Apenas na transmissão de voz sobre IP",
      "Troca de informação entre dispositivos através de um meio de transmissão",
      "Armazenamento de dados em disco rígido",
      "Execução de programas num único computador"
    ],
    "r": 1,
    "e": "Comunicação de dados é o processo de transferir dados entre dois ou mais dispositivos através de um meio de transmissão (cabo, fibra óptica, ondas electromagnéticas).",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Topologias de Rede",
    "p": "Na topologia de rede em estrela, todos os dispositivos estão conectados a:",
    "o": [
      "Um dispositivo central (switch ou hub)",
      "Um cabo linear partilhado por todos",
      "Dois dispositivos vizinhos numa cadeia",
      "Uma antena central sem fios"
    ],
    "r": 0,
    "e": "Na topologia em estrela, cada dispositivo conecta-se a um nó central (switch, hub ou router). Se o nó central falha, toda a rede é afectada.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Meios de Transmissão",
    "p": "O cabo de par entrançado (UTP) é classificado como:",
    "o": [
      "Meio de transmissão guiado",
      "Meio de transmissão não guiado",
      "Meio de transmissão óptico",
      "Meio de transmissão por satélite"
    ],
    "r": 0,
    "e": "Os meios guiados são cabos físicos que conduzem os sinais: par entrançado (UTP/STP), coaxial e fibra óptica. Os meios não guiados usam ondas electromagnéticas (Wi-Fi, rádio, satélite).",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Modelo OSI",
    "p": "No modelo OSI, a camada responsável pelo encaminhamento (routing) dos pacotes entre redes é:",
    "o": [
      "Camada Física",
      "Camada de Rede",
      "Camada de Transporte",
      "Camada de Sessão"
    ],
    "r": 1,
    "e": "A camada de Rede (3.ª do modelo OSI) é responsável pelo endereçamento lógico e encaminhamento dos pacotes entre redes diferentes (ex.: protocolo IP). A camada de Transporte (4.ª) garante a entrega fiável (TCP).",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Protocolos",
    "p": "O protocolo TCP (Transmission Control Protocol) caracteriza-se por:",
    "o": [
      "Ser não orientado à conexão",
      "Garantir a entrega fiável e ordenada dos dados",
      "Operar na camada de Rede",
      "Não utilizar confirmações de recepção"
    ],
    "r": 1,
    "e": "TCP é orientado à conexão, garantindo que todos os pacotes chegam ao destino correctamente ordenados e sem erros, através de confirmações (ACK) e retransmissões.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Protocolos",
    "p": "O protocolo UDP (User Datagram Protocol) é preferível ao TCP quando:",
    "o": [
      "A fiabilidade é mais importante que a velocidade",
      "A velocidade é prioritária e a perda ocasional de pacotes é aceitável (ex.: streaming de vídeo)",
      "Os dados transmitidos são confidenciais",
      "A rede é extremamente instável"
    ],
    "r": 1,
    "e": "UDP é não orientado à conexão e mais rápido que TCP, sendo adequado para streaming, jogos online e VoIP, onde a velocidade é prioritária e perdas pontuais são toleráveis.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Endereçamento IP",
    "p": "O endereço IP 192.168.1.1 pertence à classe:",
    "o": [
      "Classe A",
      "Classe B",
      "Classe C",
      "Classe D"
    ],
    "r": 2,
    "e": "Endereços Classe C têm o primeiro octeto entre 192-223. São os mais comuns em redes locais (ex.: 192.168.x.x). Classe A: 1-126, Classe B: 128-191, Classe D: 224-239 (multicast).",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Dispositivos de Rede",
    "p": "O dispositivo de rede que opera na camada de Ligação de Dados (camada 2) e utiliza endereços MAC para encaminhar tramas é:",
    "o": [
      "Hub",
      "Router",
      "Switch",
      "Modem"
    ],
    "r": 2,
    "e": "O switch opera na camada de Ligação de Dados, usando endereços MAC para encaminhar tramas apenas para a porta de destino, ao contrário do hub que replica os dados para todas as portas. O router opera na camada de Rede (camada 3).",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Topologias de Rede",
    "p": "Na topologia de rede em anel, os dispositivos estão organizados:",
    "o": [
      "Em torno de um dispositivo central (switch ou hub)",
      "Num círculo, onde cada dispositivo está ligado a dois vizinhos, formando um ciclo fechado",
      "Ao longo de um único cabo linear partilhado",
      "Numa hierarquia de níveis com um nó raiz"
    ],
    "r": 1,
    "e": "Na topologia em anel, cada dispositivo conecta-se a dois vizinhos, formando um percurso fechado. O sinal circula em torno do anel passando por cada dispositivo.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Meios de Transmissão",
    "p": "A fibra óptica como meio de transmissão caracteriza-se por:",
    "o": [
      "Transmitir sinais eléctricos através de cabos de cobre",
      "Transmitir sinais luminosos, oferecendo alta velocidade e imunidade a interferências electromagnéticas",
      "Ser o meio de transmissão mais barato do mercado",
      "Ter alcance máximo limitado a 10 metros"
    ],
    "r": 1,
    "e": "A fibra óptica transmite pulsos de luz através de filamentos de vidro ou plástico, permitindo velocidades elevadas, longas distâncias (km) e imunidade total a interferências electromagnéticas.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Modelo OSI",
    "p": "No modelo OSI, a camada de Transporte (4.ª) é responsável por:",
    "o": [
      "Encaminhar pacotes entre redes diferentes",
      "Garantir a entrega fiável dos dados e controlo de fluxo entre a origem e o destino",
      "Definir as características eléctricas dos bits no cabo",
      "Apresentar os dados formatados ao utilizador"
    ],
    "r": 1,
    "e": "A camada de Transporte segmenta os dados recebidos da camada de Sessão e garante a entrega fiável (TCP) ou rápida (UDP), incluindo controlo de fluxo e correcção de erros.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Modelo OSI",
    "p": "A camada Física (1.ª) do modelo OSI trata de:",
    "o": [
      "Endereçamento lógico dos dispositivos na rede",
      "Transmissão de bits através do meio físico, definindo cabos, conectores, tensões e frequências",
      "Compressão e encriptação dos dados transmitidos",
      "Formatação dos dados para apresentação ao utilizador"
    ],
    "r": 1,
    "e": "A camada Física define as especificações eléctricas, mecânicas e funcionais para transmitir bits (0s e 1s) pelo meio, incluindo tipos de cabo, conectores, níveis de tensão e taxas de transmissão.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Protocolos",
    "p": "O protocolo ARP (Address Resolution Protocol) tem como função:",
    "o": [
      "Resolver nomes de domínio (ex.: google.com) em endereços IP",
      "Descobrir o endereço MAC associado a um endereço IP dentro da mesma rede local",
      "Atribuir endereços IP dinâmicos a dispositivos",
      "Encriptar a comunicação entre dois dispositivos na rede"
    ],
    "r": 1,
    "e": "O ARP envia um pedido broadcast ('quem tem o IP X?') e o dispositivo com esse IP responde com o seu MAC. Esta associação é guardada na cache ARP local.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Endereçamento IP",
    "p": "A máscara de sub-rede 255.255.255.0 indica que a parte de rede do endereço IP ocupa:",
    "o": [
      "8 bits (apenas o primeiro octeto)",
      "16 bits (os dois primeiros octetos)",
      "24 bits (os três primeiros octetos)",
      "32 bits (o endereço completo)"
    ],
    "r": 2,
    "e": "255 em binário são 8 bits a 1. 255.255.255.0 = 24 bits a 1 (rede) seguidos de 8 bits a 0 (hosts). Também representado como /24 em notação CIDR.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Dispositivos de Rede",
    "p": "O comando 'ping' é utilizado para:",
    "o": [
      "Configurar o endereço IP de um dispositivo",
      "Testar a conectividade entre dois dispositivos na rede e medir o tempo de resposta",
      "Listar todas as pastas partilhadas na rede",
      "Alterar a máscara de sub-rede"
    ],
    "r": 1,
    "e": "O ping envia pacotes ICMP Echo Request para o destino e aguarda resposta. O resultado mostra se o destino está acessível, o tempo de ida e volta (RTT) e a percentagem de perda.",
    "f": "MED, Concurso de Professores 2023"
  },
  {
    "disciplina": "REDES",
    "tema": "Dispositivos de Rede",
    "p": "Uma VLAN (Virtual Local Area Network) permite:",
    "o": [
      "Aumentar a velocidade física da rede",
      "Segmentar logicamente uma rede física em redes virtuais isoladas, melhorando a segurança e reduzindo o domínio de broadcast",
      "Substituir completamente os cabos de rede por comunicação sem fios",
      "Eliminar a necessidade de switches na infra-estrutura"
    ],
    "r": 1,
    "e": "VLANs dividem uma rede física em múltiplos domínios de broadcast lógicos. Dispositivos em VLANs diferentes comunicam apenas através de um router, permitindo segmentação sem hardware adicional.",
    "f": "MED, Concurso de Professores 2023"
  }
];
