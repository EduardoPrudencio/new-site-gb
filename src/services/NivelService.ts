const whiteBelt = "/assets/images/faixas/branca/branca_sem_ponta.png";

const list = {
  "1": whiteBelt,
};

function NivelService(nivel: string) {
  return list[nivel];
}

export default NivelService;
