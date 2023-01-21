const whiteBelt0 = "/assets/images/faixas/branca/branca_sem_ponta.png";
const whiteBelt1 = "/assets/images/faixas/branca/branca_ponta_um.png";
const whiteBelt2 = "/assets/images/faixas/branca/branca_ponta_dois.png";
const whiteBelt3 = "/assets/images/faixas/branca/branca_ponta_tres.png";
const whiteBelt4 = "/assets/images/faixas/branca/branca_ponta_quatro.png";

const gray0 = "/assets/images/faixas/cinza/cinza_branca.png";
const gray1 = "/assets/images/faixas/cinza/cinza.png";
const gray2 = "/assets/images/faixas/cinza/cinza_preta.png";

const yellow0 = "/assets/images/faixas/amarelo/amarelo_branca.png";
const yellow1 = "/assets/images/faixas/amarelo/amarelo.png";
const yellow2 = "/assets/images/faixas/amarelo/amarelo_preta.png";

const orange0 = "/assets/images/faixas/laranja/laranja_branca.png";
const orange1 = "/assets/images/faixas/laranja/laranja.png";
const orange2 = "/assets/images/faixas/laranja/laranja_preta.png";

const green0 = "/assets/images/faixas/verde/verde_branca.png";
const green1 = "/assets/images/faixas/verde/verde.png";
const green2 = "/assets/images/faixas/verde/verde_preta.png";

const blueBelt0 = "/assets/images/faixas/azul/azul_sem_ponta.png";
const blueBelt1 = "/assets/images/faixas/azul/azul_ponta_um.png";
const blueBelt2 = "/assets/images/faixas/azul/azul_ponta_dois.png";
const blueBelt3 = "/assets/images/faixas/azul/azul_ponta_tres.png";
const blueBelt4 = "/assets/images/faixas/azul/azul_ponta_quatro.png";

const purple0 = "/assets/images/faixas/roxa/roxa_sem_ponta.png";
const purple1 = "/assets/images/faixas/roxa/roxa_ponta_um.png";
const purple2 = "/assets/images/faixas/roxa/roxa_ponta_dois.png";
const purple3 = "/assets/images/faixas/roxa/roxa_ponta_tres.png";
const purple4 = "/assets/images/faixas/roxa/roxa_ponta_quatro.png";

const brown0 = "/assets/images/faixas/marrom/marrom_sem_ponta.png";
const brown1 = "/assets/images/faixas/marrom/marrom_ponta_um.png";
const brown2 = "/assets/images/faixas/marrom/marrom_ponta_dois.png";
const brown3 = "/assets/images/faixas/marrom/marrom_ponta_tres.png";
const brown4 = "/assets/images/faixas/marrom/marrom_ponta_quatro.png";

const black0 = "/assets/images/faixas/preta/preta_sem_ponta.png";
const black1 = "/assets/images/faixas/preta/preta_ponta_um.png";
const black2 = "/assets/images/faixas/preta/preta_ponta_dois.png";
const black3 = "/assets/images/faixas/preta/preta_ponta_tres.png";
const black4 = "/assets/images/faixas/preta/preta_ponta_quatro.png";
const black5 = "/assets/images/faixas/preta/preta_ponta_cinco.png";
const black6 = "/assets/images/faixas/preta/preta_ponta_seis.png";
const black7 = "/assets/images/faixas/preta/preta_ponta_sete.png";

export const list = [];
list[0] = whiteBelt0;
list[1] = whiteBelt1;
list[2] = whiteBelt2;
list[3] = whiteBelt3;
list[4] = whiteBelt4;

list[5] = gray0;
list[6] = gray1;
list[7] = gray2;

list[8] = yellow0;
list[9] = yellow1;
list[10] = yellow2;

list[11] = orange0;
list[12] = orange1;
list[13] = orange2;

list[14] = green0;
list[15] = green1;
list[16] = green2;

list[17] = blueBelt0;
list[18] = blueBelt1;
list[19] = blueBelt2;
list[20] = blueBelt3;
list[21] = blueBelt4;

list[22] = purple0;
list[23] = purple1;
list[24] = purple2;
list[25] = purple3;
list[26] = purple4;

list[27] = brown0;
list[28] = brown1;
list[29] = brown2;
list[30] = brown3;
list[31] = brown4;

list[32] = black0;
list[33] = black1;
list[34] = black2;
list[35] = black3;
list[36] = black4;
list[37] = black5;
list[38] = black6;
list[39] = black7;

function NivelService(nivel: number) {
  return list[nivel];
}

export default NivelService;
