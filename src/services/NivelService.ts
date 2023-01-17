const whiteBelt0 = "/assets/images/faixas/branca/branca_sem_ponta.png";
const whiteBelt1 = "/assets/images/faixas/branca/branca_ponta_um.png";
const whiteBelt2 = "/assets/images/faixas/branca/branca_ponta_dois.png";
const whiteBelt3 = "/assets/images/faixas/branca/branca_ponta_tres.png";
const whiteBelt4 = "/assets/images/faixas/branca/branca_ponta_quatro.png";

const list = {
  "1": whiteBelt0,
  "2": whiteBelt1,
  "3": whiteBelt2,
  "4": whiteBelt3,
  "5": whiteBelt4,
};

function NivelService(nivel: string) {
  return list[nivel];
}

export default NivelService;
