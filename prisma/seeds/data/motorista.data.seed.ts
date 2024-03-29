const motoristas = [
    {
        "nome": "MARCOS ANTONIO DE MENEZES SANTOS",
        "telefone": "7999680968",
        "celular": "7999680968",
        "bairro": "INDUSTRIAL",
        "endereco": "TRAVESSA BASTO COELHO , 78",
        "data_nascimento": "1958-01-08T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "MARCOS AURELIO BARROS DE JESUS",
        "telefone": "7998875100",
        "celular": "7998875100",
        "bairro": "COROA DO MEIO",
        "endereco": "RUA. CORONEL JOSÉ FIGUEIREDO DE ALBUQUERQUE, 1869",
        "data_nascimento": "1979-06-19T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "798818355",
        "celular": "7988183553",
        "bairro": "ROSA MARIA",
        "endereco": "rUA. MANOEL RODRIGUES NETO, 38 SÃO CRISTOVÃO",
        "data_nascimento": "1976-02-20T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "GLAUBER ANSELMO LEITE VIEIRA DA SILVA",
        "telefone": "7932546706",
        "celular": "81635205",
        "bairro": "JOÃO ALVES FILHO",
        "endereco": "RUA. 23 NUMERO 121",
        "data_nascimento": "1988-07-20T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "Reginaldo dos Santos",
        "telefone": "7998026181",
        "celular": "7998026181",
        "bairro": "Santos Dumont",
        "endereco": "Av. Juscelino Kubitscheck, 1075, Casa 39",
        "data_nascimento": "1964-03-11T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JOSE CARLOS DOS SANTOS",
        "celular": "7998893038",
        "bairro": "SANTOS DUMONT/TAMADARE",
        "endereco": "AV. AYRTON SENA N° 626",
        "data_nascimento": "1983-09-27T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "ANDRE LEONCIO ALVES BISPO VIEIRA",
        "telefone": "7988199756",
        "celular": "7999849626",
        "bairro": "MARCOS FREIRE 2",
        "endereco": "RUA GALILEIA S/N RESIDENCIAL DOS PASAROS",
        "data_nascimento": "1985-07-14T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JOSÉ BISPO DOS SANTOS",
        "telefone": "7988141360",
        "celular": "7999414588",
        "bairro": "CONJ. ALVARO FRANCO",
        "endereco": "RUA 90 CASA N° 09",
        "data_nascimento": "1967-05-30T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "MARCOS ROBERTO BRITO SANTOS",
        "telefone": "7998825815",
        "celular": "7998825815",
        "bairro": "AMERICA",
        "endereco": "RUA. MEM E SÁ, 232 BAIRRO AMERICA",
        "data_nascimento": "1974-04-20T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "VALTER CRISTIANO DE JESUS SANTOS",
        "telefone": "7998659559",
        "celular": "7998659559",
        "bairro": "JOÃO ALVES FILHO",
        "endereco": "AV. E NUMERO 31 CONH. JOAO ALVES",
        "data_nascimento": "1986-06-25T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "HELDER MENEZES GONÇALVES",
        "telefone": "7999798899",
        "celular": "7999798899",
        "bairro": "AEROPORTO",
        "endereco": "RUA. E NUMERO 76 LOTEAMENTO SANTA CLARA",
        "data_nascimento": "1965-11-28T03:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "JOSÉ HORACIO VIEIRA",
        "telefone": "7999694354",
        "celular": "7999694354",
        "bairro": "FAROLANDIA",
        "endereco": "RUA. FISCAL ADALBERTO MENEZES DE ANDRADE, 71",
        "data_nascimento": "1955-01-14T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "WESLEY SANTOS",
        "telefone": "7988448363",
        "celular": "7988448363",
        "bairro": "MARCOS FREIRE 11",
        "endereco": "RUA. A 13 NUMERO 169 MARCOS FREIRE II",
        "data_nascimento": "1983-08-03T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "EVERTON PAIXÃO C. DE SANTANA GGTGG",
        "telefone": "7998573663",
        "celular": "7999228573",
        "bairro": "Sol Nascente",
        "endereco": "Rua Antônio Alves Aragão n°77",
        "data_nascimento": "1986-04-28T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "ALDOMIRO ACIOLE DO NASCIMENTO NETO",
        "celular": "7999130274",
        "bairro": "Matadouro",
        "endereco": "Rua K-2 n° 81 Conj. Bugio",
        "data_nascimento": "1986-12-17T02:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ALISSON DE MACENA",
        "telefone": "7991594527",
        "celular": "7991594527",
        "bairro": "SUISSA",
        "endereco": "RUA. GARARU,1315",
        "data_nascimento": "1982-03-08T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ROBERT AMAZONAS DE SOUZA",
        "telefone": "7999474625",
        "celular": "7999474625",
        "bairro": "SIQUEIRA CAMPOS",
        "endereco": "AU. AUGUSTO FRANCO, 2000",
        "data_nascimento": "1970-11-28T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "SERGIO MENDONÇA FONTES",
        "telefone": "7998456844",
        "celular": "7998456844",
        "bairro": "JABOTIANA",
        "endereco": "RUA. PROFESSOR JOS� ANTONIO DA COSTA MELO . 107 CONJUNTO JK",
        "data_nascimento": "1957-07-01T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "SIERBENTY ALVES BARRETO",
        "telefone": "799916089",
        "celular": "7999160896",
        "bairro": "MARCOS FREIRE II",
        "endereco": "AV. 02 LOTEAMENTO S�O BRAS , 1230",
        "data_nascimento": "1983-05-30T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "SAULO AUGUSTO SANTOS FEITOSA",
        "telefone": "7999941999",
        "celular": "7999941999",
        "bairro": "LUZIA",
        "endereco": "RUA. CANDIDO PORTINARI, 34 BAIRRO LUZIA",
        "data_nascimento": "1995-12-19T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ALEXANDRE CRUZ DA SILVA",
        "telefone": "7996399844",
        "celular": "7996399844",
        "bairro": "PIABETA",
        "endereco": "RUA. G 2 NUMERO 67 PIABETA",
        "data_nascimento": "1980-08-14T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "km",
        "telefone": "7996402056",
        "celular": "7988765716",
        "bairro": "18 DO FORTE",
        "endereco": "RUA. 19 DE JANEIRO, 77",
        "data_nascimento": "1986-09-06T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7999190767",
        "celular": "7999190767",
        "bairro": "POVOADO SANTA CECILIA",
        "endereco": "RUA. ANTONIO MARISCO, 68",
        "data_nascimento": "1973-05-28T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7999631229",
        "celular": "7988119838",
        "bairro": "CIDADE NOVA ",
        "endereco": "RUA S. VICENTE , 418 ",
        "data_nascimento": "1912-10-25T02:34:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "RICARDO AUGUSTO SANTOS MOTA",
        "telefone": "7932179572",
        "celular": "7999906290",
        "bairro": "LUZIA",
        "endereco": "AV: ADELIA FRANCO N: 3662, CONDOMINIO- BRINDISE AP, 802",
        "data_nascimento": "1994-02-01T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "JOS� CICERO VIEIRA DOS SANTOS",
        "telefone": "7998674834",
        "celular": "7988214113",
        "bairro": "Santos Dumont",
        "endereco": "Av. Visconde de Maracaju, 928",
        "data_nascimento": "1984-06-18T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "MACIEL DE SOUZA TEIXEIRA",
        "telefone": "7988355733",
        "celular": "7998840841",
        "bairro": "AM�RICA",
        "endereco": "RUA. PARAIBA, 1355",
        "data_nascimento": "1979-03-25T03:00:00.000Z",
        "vinculoNome": "COMISSIONAVEL"
    },
    {
        "nome": "EDVALDO SACRAMENTO DOS SANTOS",
        "telefone": "7996598091",
        "celular": "7996598091",
        "bairro": "MATADOURO",
        "endereco": "AV. S�O PAULO, 246",
        "data_nascimento": "1963-06-22T03:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "GILBERTO GOES VIEIRA",
        "telefone": "7999721366",
        "celular": "7999721366",
        "bairro": "SANTO ANTONIO",
        "endereco": "RUA. ARNALDO DANTAS,319",
        "data_nascimento": "1980-03-15T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "DECIO FEITOSA CORTES",
        "telefone": "7998907239",
        "celular": "7998907239",
        "bairro": "Santos Dumont",
        "endereco": "RUA . D NUMERO 55 CONJUNTO PRINCESA ISABEL",
        "data_nascimento": "1962-01-15T03:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "CARLOS AUGUSTO DE JESUS",
        "telefone": "7988437310",
        "celular": "7988437310",
        "bairro": "TAY�OCA",
        "endereco": "RUA; A 28 , 182 CONJUNTO MARCOS FREIE II",
        "data_nascimento": "1963-05-08T03:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "CLETO SOARES FELIZOLA",
        "telefone": "7998796806",
        "celular": "7998796806",
        "bairro": "BAIRRO CIRURGIA",
        "endereco": "RUA PORTO DA FOLHA ,883",
        "data_nascimento": "1960-02-05T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "MIRAILTON FERREIRA SANTOS",
        "telefone": "7998696992",
        "celular": "7998696992",
        "bairro": "COROA DO MEIO",
        "endereco": "TRAVESSA JOS� ROSENDO DOS SANTOS , 73 ",
        "data_nascimento": "1986-09-19T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "RICARDO VIEIRA OLIVEIRA",
        "telefone": "7998139906",
        "celular": "7998139906",
        "bairro": "FAROLANDIA",
        "endereco": "RUA. MARIA PASTORA, 210",
        "data_nascimento": "1977-12-15T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "ADOLPHO ARNALDO COX DOS SANTOS FILHO",
        "celular": "7998574330",
        "bairro": "Centro",
        "endereco": "Rua Maruim, 501",
        "data_nascimento": "1971-02-07T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JULIO CESAR PINHEIRO LIMA",
        "telefone": "7999373261",
        "celular": "7999373261",
        "bairro": "CIRURGIA",
        "endereco": "RUA. ESTANCIA 1552",
        "data_nascimento": "1981-04-10T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "EDVALDO JOSE DE SOUZA",
        "telefone": "7988473325",
        "celular": "7988473325",
        "bairro": "MARCOS FREIRE I",
        "endereco": "RUA. 05 NUMERO 8 MARCOS FREIRE I",
        "data_nascimento": "1968-04-10T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "LUIZ HENRIQUE ALVES DOS ANJOS TRINDADE",
        "telefone": "7991065899",
        "celular": "7991065899",
        "bairro": "S�O CONRADO",
        "endereco": "RUA. MERCEDES AMADO, 62 S�O CONRADO CONJUNTO ORLANDO DANTAS",
        "data_nascimento": "1996-03-08T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "km",
        "telefone": "7932144051",
        "celular": "7988016565",
        "bairro": "rua dos estudantes ",
        "endereco": "56 bairro getulio vargas",
        "data_nascimento": "1977-01-14T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "BRUNO DE SOUZA VIEIRA",
        "telefone": "7932550251",
        "celular": "7998557096",
        "bairro": "COROA DO MEIO",
        "endereco": "RUA PROFESSORA MARIA PUIREZA DE JESUS, 1325 ",
        "data_nascimento": "1990-07-16T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "CARLOS ALBERTO FIGUEIREDO",
        "telefone": "7999933786",
        "celular": "7999933786",
        "bairro": "TIO JUQUINHA",
        "endereco": "RUA GETULIO VARGAS 42",
        "data_nascimento": "1915-02-14T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "CLARCKSON ROLEMBERG MARANH�O",
        "telefone": "0",
        "celular": "7988197389",
        "bairro": "suissa",
        "endereco": "suissa",
        "data_nascimento": "1912-08-17T02:34:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7999368065",
        "celular": "7999368065",
        "bairro": "BAIRRO GRAGERU",
        "endereco": "RUA JO�O SANTANA, 236",
        "data_nascimento": "1965-06-30T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "DENISON DA CRUZ SANTOS",
        "telefone": "0",
        "celular": "7988016543",
        "bairro": "................................",
        "endereco": "...................................",
        "data_nascimento": "1915-02-14T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "DIVALDO CRUZ",
        "telefone": "0",
        "celular": "7988228477",
        "bairro": "IIJ",
        "endereco": "KKM",
        "data_nascimento": "1914-02-21T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "0",
        "celular": "7999614813",
        "bairro": "INDUSTRIAL",
        "endereco": "RUA ALAGOAS  N 1816",
        "data_nascimento": "1959-01-04T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "0",
        "celular": "7999974743",
        "bairro": "CIRURGIA",
        "endereco": "RUA PORTO DA FOLHA, 1131",
        "data_nascimento": "1982-09-28T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "0",
        "celular": "7999658118",
        "bairro": "MARCOS FREIRE II",
        "endereco": "AV. PERIMETRAL SUL, 184",
        "data_nascimento": "1982-11-02T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7998668812",
        "celular": "7932113401",
        "bairro": "m",
        "endereco": "m",
        "data_nascimento": "1950-08-06T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7932566709",
        "celular": "088545202",
        "bairro": "MARCOS FREIRE III",
        "endereco": "AV. PERIMETRAL I  N� 2860",
        "data_nascimento": "1982-02-07T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7981217723",
        "celular": "7981217723",
        "bairro": "SANTA MARIA",
        "endereco": "rua 03 , 273",
        "data_nascimento": "1913-01-11T02:34:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JOSE SOARES DA SILVA FILHO",
        "telefone": "0",
        "celular": "7981199743",
        "bairro": "COROA DO MEIO",
        "endereco": "RUA PROF. MARIA PUREZA DE JESUS",
        "data_nascimento": "1969-11-05T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7932144051",
        "celular": "7990005990",
        "bairro": "EDUARDO GOMES ",
        "endereco": "RUA VITORIA N27 ",
        "data_nascimento": "1978-12-20T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "NIVALDO BISPO DOS SANTOS",
        "telefone": "7988471255",
        "celular": "7988471255",
        "bairro": ",,,,,",
        "endereco": "....",
        "data_nascimento": "1915-02-27T03:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "SANDRO BEZERRA SANTOS",
        "telefone": "0",
        "celular": "7988375790",
        "bairro": "INDUSTRIAL",
        "endereco": "RUA S�O JO�O  N 302",
        "data_nascimento": "1980-07-12T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "SERGIO LUIZ MACEDO VIEIRA",
        "telefone": "0",
        "celular": "7999096242",
        "bairro": "INACIO BARBOSA",
        "endereco": "RUA JOSE GON�ALVES VALEN�A, 19",
        "data_nascimento": "1998-02-11T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "WENDELL DE SOUZA ALVES",
        "telefone": "7996555465",
        "celular": "7988039897",
        "bairro": "BAIRRO INDUSTRIAL",
        "endereco": "RUA D 306",
        "data_nascimento": "1985-09-13T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "LOCADORA 01",
        "telefone": "0000000000",
        "celular": "0000000000",
        "bairro": "S�O JOSE",
        "endereco": "RUA VILA CRISTINA, 1051",
        "data_nascimento": "1912-08-01T02:34:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "LOCADORA 02",
        "telefone": "0000000000",
        "celular": "0000000000",
        "bairro": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "endereco": "xxxxxxxxxxxxxxxxxxxx",
        "data_nascimento": "1912-08-05T02:34:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ADEMIR DIAS GOMES",
        "telefone": "7981049820",
        "celular": "7988228505",
        "bairro": "XXXXX",
        "endereco": "GGGGGG",
        "data_nascimento": "1912-08-11T02:34:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7999693427",
        "celular": "7991389359",
        "bairro": "Coroa do Meio",
        "endereco": "Rua Prof. Jugurta Feitosa Franco; 928",
        "data_nascimento": "1979-03-22T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JACKSON LIMA SANTOS",
        "telefone": "7999443805",
        "celular": "7999443805",
        "bairro": "COROA DO MEIO",
        "endereco": "RUA. MARIA PUREZA DE JESUS, 1330 ",
        "data_nascimento": "1986-05-01T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "VALMIR JOSE SILVA DE ARAUJO",
        "celular": "7988622828",
        "bairro": "COROA DO MEIO",
        "endereco": "RUA GERV�SIO ARAUJO DE SOUZA 1571 ",
        "data_nascimento": "1966-11-22T02:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "PAULO FRANCISCO DOS SANTOS SILVA",
        "telefone": "7999789117",
        "celular": "7999789117",
        "bairro": "SIQUEIRA CAMPOS",
        "endereco": "RUA. ACRE.69 ",
        "data_nascimento": "1983-10-01T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "CLEDIVANIA SOUZA DOS SANTOS",
        "telefone": "7996611192",
        "celular": "7996611192",
        "bairro": "SANTO ANTONIO",
        "endereco": "RUA. S�O FRANCISCO . 205 BAIRRO SANTO ANTONIO",
        "data_nascimento": "1973-06-26T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "JEF�RSON LUIZ SANTOS MENEZES",
        "telefone": "7996611612",
        "celular": "7996611612",
        "bairro": "AM�RICA",
        "endereco": "RUA. OSVALDO SAMPOIO, 700 BAIRRO AM�RICA",
        "data_nascimento": "1991-08-13T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ANTONIO CARLOS DA SILVA SANTOS",
        "telefone": "7999565400",
        "celular": "7999565400",
        "bairro": "FAROLANDIA",
        "endereco": "AV. MURILO DANTAS, 1409 FAROL�NDIA AUGUSTO FRANCO",
        "data_nascimento": "1972-09-06T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "km",
        "telefone": "7991228508",
        "celular": "7999662876",
        "bairro": "FAROL�NDIA",
        "endereco": "rUA LENIO DE MOURA MORAES, COND. PRAIA DO CEAR�",
        "data_nascimento": "1980-05-27T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "JOS� SILVANO CRUZ",
        "telefone": "7988095910",
        "celular": "7988095910",
        "bairro": "MOSQUEIRO",
        "endereco": "RODOVIA JO�O ALVES BEZERRA, 880",
        "data_nascimento": "1966-11-15T02:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "MOISES BARBOSA DA SILVA",
        "celular": "7998135548",
        "bairro": "ROSA ELZE",
        "endereco": "RUA. B D 543 CONJUNTO ROSA ELZE",
        "data_nascimento": "1967-01-20T02:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "EVERTON PAIX�O C. DE SANTANA",
        "telefone": "7998573663",
        "celular": "7999228573",
        "bairro": "Sol Nascente",
        "endereco": "Rua Ant�nio Alves Arag�o n�77",
        "data_nascimento": "1986-04-28T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ERILIO JOS� DA SILVA SANTOS",
        "telefone": "7930240567",
        "celular": "7998622417",
        "bairro": "CIRURGIA",
        "endereco": "RUA PERMINIO DE SOUZA, 539",
        "data_nascimento": "1981-04-13T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "CARLOS MAGNO DE OLIVEIRA ",
        "telefone": "7996367636",
        "celular": "7996361636",
        "bairro": "GETULIO VARGAS",
        "endereco": "RUA. S�O CRISTOV�O, 1161",
        "data_nascimento": "1971-11-25T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "SALVADOR BATISTA DOS SANTOS",
        "telefone": "7998130549",
        "celular": "7998130549",
        "bairro": "INACIO BARBOSA",
        "endereco": "RUA. QUIRINO, 970 COND. PARQUE DAS VIOLETAS INACIO BARBOSA",
        "data_nascimento": "1974-05-28T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "MAURICIO MIGUEL LIMA SANTOS",
        "telefone": "7999410737",
        "celular": "7999410737",
        "bairro": "LUZIA",
        "endereco": "RUA. ERONDINA NOBRE SANTOS. 51",
        "data_nascimento": "1994-03-08T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ALLAN NUNES DOS SANTOS",
        "telefone": "7999213431",
        "celular": "7999213431",
        "bairro": "SIQUEIRA CAMPOS",
        "endereco": "RIA 12 DE OUTUBRO.21",
        "data_nascimento": "1988-07-17T03:00:00.000Z",
        "vinculoNome": "COMISSIONAVEL"
    },
    {
        "nome": "HELISSON LUIZ SANTOS",
        "telefone": "7998509899",
        "celular": "7998509899",
        "bairro": "FAROLANDIA",
        "endereco": "RUA; I NUMERO 93 CONJUNTO AUGUSTO FRANCO",
        "data_nascimento": "1981-09-01T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "MARCIO MURILO SANTOS LIMA",
        "telefone": "7999527302",
        "celular": "7999527302",
        "bairro": "SANTOS DUMOPNT",
        "endereco": "RUA. C 1 NUMERO 181 CASA B SANTOS DUMONT",
        "data_nascimento": "1981-03-03T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "ANDRE LUIZ SANTOS SANTANA",
        "telefone": "7999173259",
        "celular": "7999173259",
        "bairro": "18 DO FORTE",
        "endereco": "AV. ALVARO MACIEL 138 BAIRRO 18 DO FORTE",
        "data_nascimento": "1991-06-30T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "OZIEL SANTOS",
        "telefone": "7996372018",
        "celular": "7996372018",
        "bairro": "S�O CONRADO",
        "endereco": "RUA. JOS� BATALHA DE GOIS, 122 CONJUNTO ORLANDO DANTAS",
        "data_nascimento": "1964-02-17T02:00:00.000Z",
        "vinculoNome": "EFETIVO"
    },
    {
        "nome": "DAVI LIMA ALVELOS",
        "telefone": "7931985333",
        "celular": "7999624211",
        "bairro": "13 DE JULHO",
        "endereco": "RUA VILA CRISTINA S/N",
        "data_nascimento": "1984-07-27T03:00:00.000Z",
        "vinculoNome": "COMISSIONAVEL"
    },
    {
        "nome": "GILVAN SOUZA SANDES",
        "telefone": "7931985333",
        "celular": "7988194678",
        "bairro": "13 DE JULHO",
        "endereco": "RUA VILA CRISTINA S/N",
        "data_nascimento": "1961-12-26T03:00:00.000Z",
        "vinculoNome": "COMISSIONAVEL"
    },
    {
        "nome": "PAULO ROBERTO DA SILVA",
        "telefone": "7988438371",
        "celular": "7988438371",
        "bairro": "J�AO ALVES FILHO",
        "endereco": "RUA. 16 NUMERO 23 JOAO ALVES FILHO",
        "data_nascimento": "1966-08-14T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "JOS� GILVAN OLIVEIRA DOS SANTOS",
        "telefone": "799807",
        "celular": "7998076606",
        "bairro": "AUGUSTO FRANCO",
        "endereco": "RUA. CEL MANOEL RAMOS DOS SANTOS, 126 CONJ. AUGUSTO FRANCO",
        "data_nascimento": "1964-12-11T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "JADSON PINHEIRO DE ANDRADE",
        "telefone": "7998724272",
        "celular": "7998724272",
        "bairro": "AREIA BRANCA MOSQUEIRO",
        "endereco": "RUA. ROSA MISTICA, 40 AREIA BRANCA MOSQUEIRO",
        "data_nascimento": "1994-04-04T03:00:00.000Z",
        "vinculoNome": "TERCEIRIZADO"
    },
    {
        "nome": "km",
        "telefone": "7998528045",
        "celular": "7998528045",
        "bairro": "grageru",
        "endereco": "av. hermes fontes,  condominio verdes mares apto 203 bloco e",
        "data_nascimento": "1952-03-01T02:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "km",
        "telefone": "7932144051",
        "celular": "7988016565",
        "bairro": "rua dos estudantes",
        "endereco": "56 bairro getulio vargas",
        "data_nascimento": "1977-01-14T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "ZENITON VIEIRA DA SILVA",
        "telefone": "7988430046",
        "celular": "7999795045",
        "bairro": "GRAGERU",
        "endereco": "RUA. FRANKLIN DE CAMPOS SOBRAL, 1575 APT 1304 MONTELIER",
        "data_nascimento": "1961-12-01T03:00:00.000Z",
        "vinculoNome": "AFASTADO"
    },
    {
        "nome": "SILVIO AUGUSTO M. FEITOSA",
        "celular": "7999884692",
        "bairro": "Grageru",
        "endereco": "Rua C�ndido Portinari",
        "data_nascimento": "1965-11-15T03:00:00.000Z",
        "vinculoNome": "COMISSIONAVEL"
    }
]

export default motoristas;